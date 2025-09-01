# Limbus Account Tracker
https://ritokito.github.io/Limbus-Account-Tracker/

# Table of Content
- [About](#about)
- [Project Contact](#project-context)
- [How To Use](#how-to-use)
  - [Terminology](#terminology)
  - [Usage](#usage)
    - [First Time Setup](#first-time-setup)
    - [Import/Export](#importexport)
    - [Currency](#currency)
    - [Identities](#identities)
    - [Filters](#filters)
    - [Wishlist & Ownership](#wishlist--ownership)
- [Credits/Disclaimer](#creditsdisclaimer)

# About
Limbus Account Tracker is a React App designed for players of Limbus Company by Project Moon. It helps track acquired characters, manage a wishlist, and monitor in-game currency and resources in a single place.

# Project Context
Limbus Company is a turn-based strategy game centered around collecting a characters, with well over 100 characters at this time. <br/>
Characters are obtained using currency specific to character type, that is there are 12 currency types. <br/>
As a relatively new player, I developed this tool to address few points of friction I've been having:<br/>
- The game lacks a centralized interface to view your full character roster and current Shard count; this information is spread across multiple menus.
- With so many characters available, it’s difficult to prioritize purchases. A clear overview of the collection, wishlist and available currency would make planning easier.
- The game does not alert players when they have enough currency to acquire a character requiring constant manual checks.

Limbus Account Tracker aims to streamline the process of checking the account progress and aims to help decision making.

# How to Use
## Terminology
- Sinner – The game’s 12 base characters, available to all players.
- Identity – Alternate versions of each Sinner. Think of them as collectible character variants.
- Shards – Each Sinner has their own unique Shard currency. You need 400 Shards of a specific Sinner to unlock one of their Identities.
  - Example: To get the [Edgar Family Heir] Identity for Gregor, you need 400 Gregor Shards.
- Nominal Crates – Main source of Shards. Each crate gives 1–3 Shards for Sinner of choice. For simplicity, 1 crate is considered equal to 2 Shards.
- Dispense – Refers to spending Shards to unlock an Identity.
- Rarity – Identities come in three rarities: 0 (lowest), 00, and 000 (highest).
- Damage Type – Each Identity has abilities tied to specific damage types.
- Sin – Similar to elemental affinities in other medias (e.g., fire, water). Identities have abilities linked to one or more Sins.
  
## Usage
- GitHub Pages
  - https://ritokito.github.io/Limbus-Account-Tracker/
- Locally
  - WIP

### First Time Setup
Since Limbus Company doesn’t provide an API or live account access, all data must be entered manually. You can save and reload your account state using export/import options.

If this is the first time you opening the App, make sure you follow the checklist:
- Setup currency values to align with your account
- Mark identities that are owned on your account
- Optional: Add identities you wish to dispense to the Wishlist
- Select "Download Data" in Import/Export section and save it on your computer
- Optional: Make a backup of downloaded data

For detailed explanation of each section see below.

### Import/Export
#### Export
- Click "Download Data" to save your current account state as a text file.
  - Or use "Copy to Clipboard" to copy the account data as a string, which you can paste into a text file of your choice.

#### Import
- Click "Load From File" to upload a previously saved account file.
  - Or paste your saved data string into the input field manually.
- Press "Import" to load the data.
- If you see "Status: Import Successful", everything worked.
- If you see "Status: Invalid Import String", the data may be corrupted — check for any accidentally added characters or try importing/copying original string again.

### Currency
This section lets you enter how much currency (Shards and Nominal Crates) you currently have.<br/>
If you're not a Limbus Company player, you can still experiment with different values.

- 1 Identity costs 400 Shards of the matching Sinner.
- 1 Nominal Crate counts as 2 Shards for any Sinner.
- Example: 200 Gregor Shards + 100 Nominal Crates = 400 total, enough to unlock a Gregor Identity which is signified by "Can Dispense".

### Identities
Here you'll find all available Identities grouped by Sinner. <br/>
You can add/remove Identities to/from Wishlist or Mark them as Owned or Not Owned.
- If you have enough currency to dispense an Identitiy, you will see "Can Dispense" on Wishlist Widget in bottom right corner AND in relevant Sinner section.
- [LCB Sinner] Identities are default and always marked as Owned. These cannot be changed.

### Filters
- Use the search box to filter Identities by name or keyword.
- Rarity, Sinner, Owned, and Wishlisted filters are disjunctive (show results matching any selected filter).
- Damage Type and Sin filters are conjunctive (show results matching all selected filters).
  
### Wishlist & Ownership
- To add to Wishlist: Hover over a card and click "Add to Wishlist".
- To remove from Wishlist: Hover and click "Remove From Wishlist".
- To mark as Owned: Hover and click "Mark as Owned".
  - If the Identity is in the Wishlist, this will also remove it from the Wishlist automatically.
- To unmark as Owned: Hover and click "Mark as Not Owned".
  
# Credits/Disclaimer
- This app is a fan-made project and is not affiliated with, endorsed, sponsored, or specifically approved by Project Moon, the developer of Limbus Company. <br/>
- All game-related assets, including images, logos, characters, and names, are copyright and/or trademark of their respective owners. <br/>
- All rights to such materials are reserved by their original creators. <br/>
- This app is intended for non-commercial, informational, or personal use only. <br/>
