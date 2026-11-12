# Customization Documentation - v100 Branch

This document records the fork-specific customizations identified in the `v100` branch compared with the upstream One Identity `v100` branch. It focuses on the Sykehuspartner/Norwegian healthcare adaptations and the related profit-center workflow.

## Overview

The customizations add profit-center selection to shopping cart and request-history operations, provide a related-applications navigation menu and request-history dashboard tile, and adjust portal branding and selected UI elements.

## Branding and Portal Styling

### Custom favicon and logo

- Updated `imxweb/projects/qer-app-portal/src/index.html` to use `assets/favicon-sor-ost.svg` instead of the default favicon.
- Added `imxweb/shared/assets/favicon-sor-ost.svg`, using the Sykehuspartner/Sør-Øst color palette.
- Added `imxweb/shared/assets/logo-sykehuspartner.svg`, a Sykehuspartner-branded logo in light blue (`#6cace4`) and dark blue (`#003087`).

### Theme styling

**Location:** `imxweb/projects/qer-app-portal/src/styles.scss`

Added custom styles for dark, contrast, and light themes, including:
- Masthead background and foreground color adjustments.
- Light text on dark and contrast backgrounds, and dark text on the light theme.
- A grayscale/inverted logo filter in dark mode.

### Masthead title hidden

**Location:** `imxweb/projects/qbm/src/lib/mast-head/mast-head.component.html`

Commented out the masthead heading that normally displays the product and application title.

## Portal Navigation and UI Changes

### Related applications menu

**Locations:**
- `imxweb/projects/qer-app-portal/src/app/app.component.ts`
- `imxweb/projects/qbm/src/lib/menu/menu-item/spcustom-related-application.interface.ts`
- `imxweb/projects/qbm/src/public_api.ts`

Added support for loading related applications from `portal_relatedapplications_get()` and displaying them in a new top-navigation section, translated using `#LDS#Heading Other Web Applications`. Child applications are mapped recursively to menu entries, including external links. The custom `SPCustomRelatedApplication` interface adds the `ChildApps`, `Display`, and `Url` properties.

### Sidenav search controls hidden

**Location:** `imxweb/projects/qbm/src/lib/sidenav-tree/sidenav-tree.component.html`

Commented out the search button and associated data-source toolbar in the side navigation tree.

### Request number hidden

**Location:** `imxweb/projects/qer/src/lib/request-history/itshop-request.ts`

Commented out the request-number field in request-history details.

### Request history dashboard tile

**Locations:**
- `imxweb/projects/qer/src/lib/sp-requesthistory-tile/`
- `imxweb/projects/qer/src/lib/qer.module.ts`
- `imxweb/projects/qer/src/lib/qer.service.ts`
- `imxweb/projects/qer/src/public_api.ts`

Added and registered a dashboard medium tile for Request history. Its Explore action navigates to `/requesthistory`.

## Profit Center Management

### API dependency

**Locations:** `imxweb/package.json`, `imxweb/imx-modules/imx-api-ccc.tgz`

Added the local `imx-api-ccc` package dependency, including the package reference used by the application.

### Profit-center dialog and service

**Location:** `imxweb/projects/qer/src/lib/sp-multipleprofitcenters-dialog/`

Added a profit-center selection dialog, service, and supporting interfaces:
- `SPProfitCenterObject` represents a person's available profit centers.
- `SPRequestableProduct` extends the requestable-product type with an optional selected profit center.
- `SpMultipleprofitcentersService` retrieves profit centers, opens the selector when needed, and calls the profit-center-change API endpoint `portal_spcustom_personwantsorg_profitcenterchange_post`.
- The dialog presents the person/product context and a translated profit-center selector.

The service initializes its API clients from `AppConfigService`.

### Shopping cart integration

**Location:** `imxweb/projects/qer/src/lib/shopping-cart/cart-items.service.ts`

Integrated profit-center selection into cart-item creation. The selected profit center is assigned to `UID_ProfitCenter` before the cart item is posted. If the selection is cancelled, the item is not added.

### Request-history integration

**Location:** `imxweb/projects/qer/src/lib/request-history/request-history.service.ts`

- `prolongate()` prompts for a profit center and updates the request's profit center when the selection differs from the current value.
- Copying a prior request prompts for a profit center and carries over the organization and order reason.
- The source-request assignment is commented out because it does not work for requests with a profit center set.
- Cancelling the profit-center selection aborts the copy operation.

## Environment and Development Configuration

### Portal API endpoint

**Location:** `imxweb/projects/qer-app-portal/src/environments/environment.ts`

Changed the development `clientUrl` from localhost to `https://db100.lab.local/apiserver`.

### VS Code launch configurations

**Location:** `.vscode/launch.json`

Added launch configurations for the integrated browser and Microsoft Edge, targeting the local application at `http://localhost:4200`.

## Notes

- The API module `imx-api-ccc` is required for profit-center functionality.
- The configured development API endpoint points to the `db100.lab.local` lab environment and may need adjustment for other environments.
- This document describes the fork-specific changes found in the v100 branch; upstream v100 release changes are not listed as customizations.
