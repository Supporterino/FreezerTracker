# FAQ

Answers to common questions about FreezerMan.

---

### Can I reset my password?

Not yet. Password reset is a planned feature but has not been implemented. If you've lost access to your account, you'll need to ask whoever administers the server to reset it at the database level.

---

### Can I export my data?

There is no built-in export feature. If you need to extract your data, you can query the PostgreSQL database directly using standard SQL tools. See the [deployment documentation](../deployment/) for database connection details.

---

### Can I use FreezerMan on multiple devices?

Yes. Any device running the FreezerMan client app can connect to the same server. Your account and household data are stored on the server, so you'll see the same inventory regardless of which device you use. Just log in with the same account.

---

### Is there a web version?

No. The FreezerMan client is a native desktop and mobile application built with Tauri. There is no browser-based web version. You need to install the app on each device you want to use.

---

### Does FreezerMan work offline?

No. FreezerMan requires a connection to the server to function. All data is stored server-side, and the app does not cache data locally for offline use. Offline mode is not currently planned.

---

### Can I add photos to items?

No. FreezerMan does not support image attachments on items. This is a deliberate choice to keep the system simple and avoid the complexity of blob storage. Use the **notes** field to describe items in more detail if needed.

---

### How do I back up my data?

Back up the PostgreSQL database using `pg_dump`. This captures all household, freezer, compartment, item, and user data. See the [deployment documentation](../deployment/) for backup procedures and recommended schedules.

---

### Is there notification support for expiring items?

Not currently. Expiry tracking is visual only -- you can see color-coded badges and filter by expiry status within the app, but FreezerMan does not send push notifications, emails, or any other alerts. Notification support may be added in a future release.
