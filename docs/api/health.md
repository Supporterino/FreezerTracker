# Health Check

Liveness and readiness probe endpoint for monitoring and orchestration (e.g., Kubernetes). This endpoint requires no authentication and is exempt from rate limiting.

---

## GET /health

Check the API server and its dependencies.

| | |
|---|---|
| **Auth** | None |
| **Rate limit** | None (exempt) |

### Response `200 OK` -- healthy

Returned when the server and all dependencies are operational.

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```

### Response `503 Service Unavailable` -- unhealthy

Returned when one or more dependencies are down.

```json
{
  "status": "error",
  "error": {
    "database": {
      "status": "down"
    }
  }
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | `string` | `"ok"` when healthy, `"error"` when degraded |
| `info` | `object` | Present on success; maps dependency names to their status |
| `error` | `object` | Present on failure; maps failed dependency names to their status |

### Usage

**Kubernetes liveness probe:**

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

**Kubernetes readiness probe:**

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

### Example

```bash
curl http://localhost:3000/health
```

```bash
# Check status code in a script
if curl -sf http://localhost:3000/health > /dev/null; then
  echo "API is healthy"
else
  echo "API is down"
fi
```
