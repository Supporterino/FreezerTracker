# Reverse Proxy

A reverse proxy sits in front of the FreezerMan server to provide TLS termination (HTTPS), a clean domain name, and production-grade request handling.

---

## Why Use a Reverse Proxy?

- **HTTPS** -- encrypt traffic between clients and the server. Required for iOS and recommended everywhere.
- **Domain name** -- serve the API from `api.example.com` instead of `192.168.1.50:3000`.
- **Security** -- hide the application server from direct internet exposure.
- **Headers** -- forward real client IPs and protocol information to the server.

---

## Option 1: Caddy (Recommended)

Caddy is the simplest option. It automatically obtains and renews TLS certificates from Let's Encrypt with zero configuration.

### Install Caddy

See [caddyserver.com/docs/install](https://caddyserver.com/docs/install) for your platform.

### Caddyfile

```
api.example.com {
    reverse_proxy localhost:3000
}
```

That's it. Caddy handles:
- Automatic HTTPS certificate provisioning (Let's Encrypt / ZeroSSL)
- Certificate renewal
- HTTP-to-HTTPS redirect
- HTTP/2

### Run

```bash
caddy run
# or as a systemd service:
sudo systemctl enable --now caddy
```

---

## Option 2: Nginx with Let's Encrypt

For more control, use Nginx with certbot for certificate management.

### Install

```bash
# Debian/Ubuntu
sudo apt install nginx certbot python3-certbot-nginx

# macOS (Homebrew)
brew install nginx
```

### Obtain a Certificate

```bash
sudo certbot certonly --nginx -d api.example.com
```

### Nginx Configuration

Create `/etc/nginx/sites-available/freezer-tracker`:

```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name api.example.com;
    return 301 https://$host$request_uri;
}
```

Enable the site and reload:

```bash
sudo ln -s /etc/nginx/sites-available/freezer-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Certificate Renewal

Certbot installs a systemd timer (or cron job) that renews certificates automatically. Verify:

```bash
sudo certbot renew --dry-run
```

---

## After Setting Up the Proxy

Once your reverse proxy is running, update two things:

### 1. Server Environment Variables

Update your `.env` file (or Helm values) to reflect the public URL:

```bash
ALLOWED_ORIGINS=https://api.example.com
APP_BASE_URL=https://api.example.com
```

Restart the server for the changes to take effect.

### 2. Client Configuration

In the FreezerMan client app, update the server URL setting to your public HTTPS address:

```
https://api.example.com
```

---

## Verifying the Setup

```bash
# Check HTTPS is working
curl -I https://api.example.com/api/v1/health

# Expected: HTTP/2 200 (or HTTP/1.1 200)
```

---

## Next Steps

- Review the [security checklist](security.md) to ensure your deployment is hardened
- If using Kubernetes, the Helm chart has built-in [ingress support](kubernetes.md#ingress-with-tls) as an alternative to an external proxy
