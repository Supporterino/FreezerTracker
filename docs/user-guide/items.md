# Tracking Items

Items are the core of FreezerMan -- they represent the actual food stored in your freezers.

## Adding an Item

To add a new item:

1. Navigate to a freezer or compartment
2. Select **Add Item**
3. Fill in the details:

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | What the item is (e.g., "Chicken thighs", "Pizza dough") |
| **Quantity** | Yes | How many units or portions |
| **Freezer** | Yes | Which freezer it's stored in |
| **Compartment** | Yes | Which compartment within the freezer |
| **Notes** | No | Any extra details (e.g., "marinated", "from Costco") |
| **Stored date** | No | When the item was placed in the freezer |
| **Expiry date** | No | When the item expires (see [Expiry Tracking](expiry-tracking.md)) |

## Editing Items

Any household member can edit any item in the household. Tap or click on an item to open it, then modify whatever fields need updating -- name, quantity, compartment, notes, dates, etc.

## Change Tracking

Every time an item is edited, FreezerMan records:

- **Who** made the change
- **When** the change was made
- **Which field** was changed
- **Old value** and **new value**

This gives you a full audit trail. If someone updates a quantity or moves an item to a different compartment, you can see exactly what happened.

### Viewing Change History

Open an item and look for its change history section. Each entry shows the edit timestamp, the member who made the change, and what was modified. History is listed in reverse chronological order (most recent first).

## Searching and Filtering

When your inventory grows, use search and filters to find what you need:

- **Search by text** -- type a name or keyword to filter the item list
- **Filter by freezer** -- narrow results to a specific freezer
- **Filter by compartment** -- narrow further to a specific compartment
- **Filter by expiry status** -- show only items that are expiring soon or already expired

Filters can be combined. For example, you can search for "chicken" within a specific freezer that is expiring soon.

## Pagination

Items are paginated at the household level. If your household has a large number of items, they'll be split across pages rather than loaded all at once. Use the pagination controls to navigate through your inventory.

## Archiving Items

When you take something out of the freezer (or use it up), you can **archive** the item instead of permanently deleting it. Archiving:

- Removes the item from the active inventory view
- Preserves the item and its full change history
- Allows you to review what was previously stored

This is a soft delete -- the data is kept, just hidden from the main view.

### Viewing the Archive

Access the archive to see all previously archived items. This is useful for:

- Reviewing what you've used recently
- Checking how long ago something was stored
- Re-adding a similar item

### Permanent Deletion

Only the household **owner** can permanently delete items from the archive. This is irreversible and removes all data for that item, including its change history.

> **Tip:** Use archiving as your default way to "remove" items. Only permanently delete if you're sure you don't need the record.
