# Customization Documentation - v92 Branch

This document outlines all customizations made to the IdentityManager.Imx v92 branch compared to the upstream OneIdentity v92 branch.

## Overview

This fork contains hospital/healthcare-specific customizations (Sykehuspartner - Norwegian healthcare context) with emphasis on profit center management and streamlined UI for operational needs.

---

## Configuration & Build Changes

### 1. .gitignore (NEW)
**Location:** `.gitignore`

Excludes sensitive files from version control:
```
package-lock.json
.vscode/launch.json
imxweb/package-lock.json
imxweb/package.json
imxweb/projects/qer-app-portal/src/environments/environment.ts
imxweb/.npmrc
```

### 2. VS Code Launch Configurations (MODIFIED)
**Location:** `imxweb/.vscode/launch.json`

**Added:**
- "Launch Edge (QER App Portal)" configuration
- "Launch Edge Dev tools (QER App Portal)" configuration

**Purpose:** Support for Edge browser debugging in VS Code

### 3. Build Scripts (NEW)
**Location:** `imxweb/build_all.ps1` and `imxweb/build_all_production.ps1`

PowerShell scripts to automate building multiple modules in sequence:
- Builds all core libraries (qbm, qer, tsb, att, rms, aad, aob, uci, cpl, dpr, rmb, rps, o3t, olg, hds, pol, apc, sac)
- Builds all applications (qer-app-portal, qbm-app-landingpage, qer-app-operationssupport, qer-app-pwdportal)
- Production script includes compression to ZIP files

### 4. Package Dependencies (MODIFIED)
**Location:** `imxweb/package.json`

**Added:**
- `"imx-api-ccc": "file:imx-modules/imx-api-ccc.tgz"` - New profit center module
- `"build:dynamic": "ng build --configuration dynamic"` - New npm script

**Added Binary:**
- `imxweb/imx-modules/imx-api-ccc.tgz` - Profit center API module (version 9.2.387)

---

## Branding & Styling Changes

### 5. Favicon Change (MODIFIED)
**Location:** `imxweb/projects/qer-app-portal/src/index.html`

**Change:**
```html
<!-- Before -->
<link rel="icon" type="image/x-icon" href="assets/favicon.ico">

<!-- After -->
<link rel="icon" type="image/x-icon" href="assets/favicon-sor-ost.svg">
```

**Added Asset:** `imxweb/shared/assets/favicon-sor-ost.svg` (Custom SVG favicon with light blue and dark blue circles)

### 6. Logo Asset (NEW)
**Location:** `imxweb/shared/assets/logo-sykehuspartner.svg`

Added custom logo for Sykehuspartner (Norwegian healthcare organization) with light blue (#6cace4) and dark blue (#003087) branding.

### 7. Comprehensive Style Customizations (MODIFIED)
**Location:** `imxweb/projects/qer-app-portal/src/styles.scss`

**Dark Theme Customizations:**
- Masthead background: Changed to `$color-gray-80` with `!important`
- Masthead text color: Changed to `#f9fbfc` (light text)
- Logo filtering: Added `filter: invert(1) brightness(2) grayscale(100%)` for negative/grayscale effect
- Tile subtitles and product details: Changed to white `rgb(255, 255, 255)`

**Contrast Theme Customizations:**
- Similar text color adjustments to `rgb(255, 255, 255)`
- Improved readability for high-contrast mode

**Light Theme Customizations:**
- Masthead background: White `#ffffff`
- Masthead text color: Dark gray `#444647`
- Text elements: Black `rgb(0, 0, 0)`
- Product column display: Added `white-space: normal` and `word-wrap: break-word` for full product name visibility
- Date: 02.02.2026

---

## API & Environment Changes

### 8. Environment Configuration (MODIFIED)
**Location:** `imxweb/projects/qer-app-portal/src/environments/environment.ts`

**Change:**
```typescript
// Before
clientUrl: 'http://localhost:8182',

// After
clientUrl: 'https://idm01.lab.local/apiserver',//'http://localhost:8182',
```

**Purpose:** Redirect API calls to lab environment instead of localhost

---

## Component UI Modifications

### 9. Masthead Title Hidden (MODIFIED)
**Location:** `imxweb/projects/qbm/src/lib/mast-head/mast-head.component.html`

**Change:** Commented out the h1 heading displaying product name and app title
```html
<!-- <h1 class="imx-masthead-app-name" ... >
  {{ productName }} {{ appConfig?.Config?.Title }}
</h1> -->
```

### 10. Sidenav Search Toggle Hidden (MODIFIED)
**Location:** `imxweb/projects/qbm/src/lib/sidenav-tree/sidenav-tree.component.html`

**Change:** Commented out the search toggle button
```html
<!-- <button ... (click)="toggleSearchMode()" ... >
  <eui-icon icon="search"></eui-icon>
</button> -->
```

### 11. Button Text Changed (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/product-selection/service-item-edit/service-item-edit.component.html`

**Change:**
```html
<!-- Before -->
{{'#LDS#Submit' | translate}}

<!-- After -->
{{'#LDS#Add to cart' | translate}}
```

### 12. Identity Sidesheet Tabs Hidden (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/identities/identity-sidesheet/identity-sidesheet.component.html`

**Commented out:**
- Main Data tab (entire mat-tab block)
- Memberships tab (entire mat-tab block)

**Also Commented out:**
- "Generate Passcode" menu item
- "Assign to new manager" menu item

### 13. Request Number Hidden (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/request-history/itshop-request.ts`

**Change:** Commented out document number display in request history
```typescript
/* const document = new BaseReadonlyCdr(this.DocumentNumber.Column, '#LDS#Request number');
// this.propertyInfo.splice(3, 0, document); */
```

### 14. Team Role Tile Disabled (MODIFIED)
**Location:** `imxweb/projects/rmb/src/lib/team-role/team-role.component.ts`

**Change:** Hardcoded `showTeamRole = false` to hide Team Role tile from dashboard
```typescript
// Egen kode -- Kommentert ut denne nedenfor, slik at tile for Team Role på forsiden i ITShop ikke kommer opp.
// if(await this.permissionService.isPersonManager()){
//   this.showTeamRole = true;
//   await this.getTeamRole();
// }
this.showTeamRole = false; //Hardkoder denne til å være false for alle
```

### 15. Reports Menu Hidden (MODIFIED)
**Location:** `imxweb/projects/rps/src/lib/reports/edit-report.module.ts`

**Change:** Commented out setupMenu() call
```typescript
// this.setupMenu(); //Egen kode -- Kommentert ut denne, slik at menyen for Setup->Reports ikke vises.
// NB! Route er fortsatt tilgjengelig, da fjerning av den gjør også at annen rapportfunksjonalitet da ville forsvunnet.
```

**Note:** Route remains accessible; only menu item is hidden

---

## New Profit Center Management Feature

### 16. Profit Center Interface (NEW)
**Location:** `imxweb/projects/qer/src/lib/sp-multipleprofitcenters-dialog/sp-profit-center-object.ts`

```typescript
export interface SPProfitCenterObject {
    UID_Person: string;
    UID_ProfitCenter: string;
    ShortName: string;
    Display: string;
}
```

### 17. Profit Center Service (NEW)
**Location:** `imxweb/projects/qer/src/lib/sp-multipleprofitcenters-dialog/sp-multipleprofitcenters.service.ts`

**Features:**
- `selectProfitCenter()` - Opens dialog if multiple profit centers exist for user
- `updatePWOProfitCenter()` - Updates profit center for purchase requests
- `ProfitCenters()` - Retrieves available profit centers for a person

**API Integration:** Uses new `imx-api-ccc` module with endpoints:
- `portal_spcustom_personwantsorg_profitcenterchange_post`

### 18. Profit Center Dialog Component (NEW)
**Location:** `imxweb/projects/qer/src/lib/sp-multipleprofitcenters-dialog/sp-multipleprofitcenters-dialog.component.ts`

**Features:**
- Material dialog with profit center dropdown selector
- Displays person name and product name in title
- OK/Cancel buttons with translation support

**Template:** `sp-multipleprofitcenters-dialog.component.html`
**Styles:** `sp-multipleprofitcenters-dialog.component.scss`
**Module:** `sp-multipleprofitcenters-dialog.module.ts`

### 19. Extended Requestable Product Interface (NEW)
**Location:** `imxweb/projects/qer/src/lib/sp-multipleprofitcenters-dialog/sp-requestable-product.ts`

```typescript
export interface SPRequestableProduct extends RequestableProduct {
    UidProfitCenter?: string;
}
```

Extends the base `RequestableProduct` interface to include profit center selection.

---

## Shopping Cart Enhancement

### 20. Cart Items Service Modified (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/shopping-cart/cart-items.service.ts`

**Changes:**
- Injected `SpMultipleprofitcentersService` dependency
- Modified `createAndPost()` to accept `SPRequestableProduct` instead of `RequestableProduct`
- Set `cartItem.UID_ProfitCenter.value` from selected profit center
- Modified `addItems()` to prompt for profit center selection before adding items
- Calls `selectProfitCenter()` for each item added to cart

### 21. Request History Service Modified (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/request-history/request-history.service.ts`

**Changes:**
- Injected `SpMultipleprofitcentersService` dependency
- Modified `prolongate()` method:
  - Prompts user to select profit center
  - Updates profit center if different from current
  - Uses new endpoint `updatePWOProfitCenter()`
  
- Modified `copyFromPreviousRequest()` method:
  - Commented out `UID_PwoSource` assignment (causes issues with profit center requests)
  - Prompts for profit center selection
  - Sets `UID_ITShopOrg`, `UID_ProfitCenter`, and `OrderReason` from original request

---

## Related Applications Menu Feature

### 22. App Component Enhanced (MODIFIED)
**Location:** `imxweb/projects/qer-app-portal/src/app/app.component.ts`

**Changes:**
- Added `RelatedApplication` import
- Added `EuiTopNavigationItemType` import
- Added code to fetch related applications via API: `portal_relatedapplications_get()`
- Recursively maps `RelatedApplication` objects to `EuiTopNavigationItem` menu items
- Creates new menu section: "Other Web Applications" (translation key: `#LDS#Heading Other Web Applications`)
- Supports hierarchical menu structure with child applications

### 23. Related Application Interface Extended (MODIFIED)
**Location:** `imxweb/projects/qbm/src/lib/menu/menu-item/related-application.interface.ts`

**Added Properties:**
```typescript
ChildApps: any;    // Child applications for hierarchical menu
Display: any;      // Display text for menu item
Url: any;          // URL for external link navigation
```

---

## New Request History Tile Component

### 24. Request History Tile Component (NEW)
**Location:** `imxweb/projects/qer/src/lib/sp-requesthistory-tile/`

**Files:**
- `sp-requesthistory-tile.component.ts` - Component logic
- `sp-requesthistory-tile.component.html` - Template with icon tile and explore button
- `sp-requesthistory-tile.component.scss` - Styling with uppercase button and icon spacing

**Features:**
- Dashboard tile displaying "Request history" caption
- "Explore" button that navigates to `/requesthistory` route
- Uses imx-icon-tile component

### 25. QER Module Updated (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/qer.module.ts`

**Changes:**
- Added `SpRequesthistoryTileComponent` to declarations
- Added export for `SpRequesthistoryTileComponent`
- Registered component with extension service for "Dashboard-MediumTiles"

### 26. QER Service Updated (MODIFIED)
**Location:** `imxweb/projects/qer/src/lib/qer.service.ts`

**Change:**
- Imported `SpRequesthistoryTileComponent`
- Registered component with extension service:
  ```typescript
  this.extService.register("Dashboard-MediumTiles", {instance: SpRequesthistoryTileComponent})
  ```

### 27. Public API Exports (MODIFIED)
**Location:** `imxweb/projects/qer/src/public_api.ts`

**Added Exports:**
```typescript
export { SpMultipleprofitcentersDialogModule } from './lib/sp-multipleprofitcenters-dialog/sp-multipleprofitcenters-dialog.module'
export { SpMultipleprofitcentersDialogComponent } from './lib/sp-multipleprofitcenters-dialog/sp-multipleprofitcenters-dialog.component'
export { SpRequesthistoryTileComponent } from './lib/sp-requesthistory-tile/sp-requesthistory-tile.component'
```

---

## File Ending Fixes (MODIFIED)

### 28. TypeScript Files (MODIFIED)
**Locations:**
- `imxweb/projects/qer/src/lib/new-request/new-request-content/new-request-content.component.ts`
- `imxweb/projects/qer/src/lib/new-request/new-request.module.ts`

**Change:** Removed newline at end of file (now ends with no newline character)

---

## Summary of Modifications by Type

### NEW Files (10)
1. `.gitignore`
2. `imxweb/build_all.ps1`
3. `imxweb/build_all_production.ps1`
4. `imxweb/imx-modules/imx-api-ccc.tgz` (binary)
5. `imxweb/shared/assets/favicon-sor-ost.svg`
6. `imxweb/shared/assets/logo-sykehuspartner.svg`
7. `sp-multipleprofitcenters-dialog.component.html`
8. `sp-multipleprofitcenters-dialog.component.scss`
9. `sp-multipleprofitcenters-dialog.component.ts`
10. `sp-multipleprofitcenters-dialog.module.ts`
11. `sp-multipleprofitcenters.service.ts`
12. `sp-multipleprofitcenters.service.spec.ts`
13. `sp-profit-center-object.ts`
14. `sp-requestable-product.ts`
15. `sp-requesthistory-tile.component.html`
16. `sp-requesthistory-tile.component.scss`
17. `sp-requesthistory-tile.component.ts`

### MODIFIED Files (13)
1. `imxweb/.vscode/launch.json`
2. `imxweb/package.json`
3. `imxweb/package-lock.json`
4. `imxweb/projects/qbm/src/lib/mast-head/mast-head.component.html`
5. `imxweb/projects/qbm/src/lib/menu/menu-item/related-application.interface.ts`
6. `imxweb/projects/qbm/src/lib/sidenav-tree/sidenav-tree.component.html`
7. `imxweb/projects/qer-app-portal/src/app/app.component.ts`
8. `imxweb/projects/qer-app-portal/src/environments/environment.ts`
9. `imxweb/projects/qer-app-portal/src/index.html`
10. `imxweb/projects/qer-app-portal/src/styles.scss`
11. `imxweb/projects/qer/src/lib/identities/identity-sidesheet/identity-sidesheet.component.html`
12. `imxweb/projects/qer/src/lib/product-selection/service-item-edit/service-item-edit.component.html`
13. `imxweb/projects/qer/src/lib/qer.module.ts`
14. `imxweb/projects/qer/src/lib/qer.service.ts`
15. `imxweb/projects/qer/src/lib/request-history/itshop-request.ts`
16. `imxweb/projects/qer/src/lib/request-history/request-history.service.ts`
17. `imxweb/projects/qer/src/lib/shopping-cart/cart-items.service.ts`
18. `imxweb/projects/qer/src/public_api.ts`
19. `imxweb/projects/rmb/src/lib/team-role/team-role.component.ts`
20. `imxweb/projects/rps/src/lib/reports/edit-report.module.ts`
21. `imxweb/projects/qer/src/lib/new-request/new-request-content/new-request-content.component.ts`
22. `imxweb/projects/qer/src/lib/new-request/new-request.module.ts`

---

## Configuration Notes

- **Profit Center Module:** Requires `imx-api-ccc` (v9.2.387)
- **Build Environment:** Points to `https://idm01.lab.local/apiserver`
- **Translation Keys Used:**
  - `#LDS#Select profitcenter`
  - `#LDS#Heading Other Web Applications`
  - `#LDS#Request history`
  - `#LDS#View request history`
  - `#LDS#Explore`
  - `#LDS#Add to cart`

## Customization Comments

Throughout the code, customizations are marked with Norwegian comments:
- **Start marker:** `//Egen kode - start` (Own code - start)
- **End marker:** `//Egen kode - slutt` (Own code - end)
- **UI modifications:** `<!-- Egen kode - Start: ... -->` and `<!-- Egen kode - Slutt: ... -->`

This convention helps identify custom code vs. upstream code for future maintenance.

