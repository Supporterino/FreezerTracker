# User Guide

Welcome to the FreezerMan user guide. FreezerMan is a self-hosted household freezer inventory tracker that helps you keep track of what's in your freezers, when items expire, and who added what.

## Main Features

- **Household management** -- create a household and invite family members to collaborate
- **Freezer & compartment tracking** -- model your real freezers with named compartments (drawers, shelves, etc.)
- **Item inventory** -- log items with quantities, expiry dates, and notes
- **Expiry monitoring** -- color-coded expiry status so you never forget about buried food
- **Change history** -- every edit is recorded so you can see who changed what and when
- **QR code invites** -- invite household members without needing their email address

## Data Hierarchy

FreezerMan organizes your data in a simple top-down structure:

```
Household
└── Freezer
    └── Compartment
        └── Item
```

- A **Household** is the top-level organizational unit. It groups people, freezers, and items together.
- A **Freezer** belongs to a household and represents a physical freezer in your home.
- A **Compartment** is a section within a freezer -- a drawer, shelf, door bin, or any way you divide the space.
- An **Item** is a specific food entry stored in a compartment, with details like quantity, storage date, and expiry date.

## Getting Started Workflow

1. **Register an account** on your FreezerMan server
2. **Create a household** -- you automatically become the owner
3. **Add your freezers** -- one entry per physical freezer
4. **Set up compartments** -- divide each freezer into logical sections
5. **Start tracking items** -- add items as you put food in the freezer
6. **Invite your household** -- share a QR code so family members can join and contribute

## Guide Sections

| Section | What You'll Learn |
|---|---|
| [Managing Households](households.md) | Creating households, roles, inviting and removing members |
| [Freezers & Compartments](freezers-and-compartments.md) | Setting up freezers and organizing them into compartments |
| [Tracking Items](items.md) | Adding, editing, searching, and archiving freezer items |
| [Inviting Members](invites.md) | Generating QR code invites and managing access |
| [Expiry Tracking](expiry-tracking.md) | Understanding expiry statuses and staying on top of food dates |
| [FAQ](faq.md) | Answers to common questions |
