# AGENTS.md - Developer Guide for luci-theme-fluent

## Project Overview

**luci-theme-fluent** is a FluentUI 2 theme for OpenWrt LuCI, part of the `luci-theme-argon` monorepo. Built with SCSS, ucode templates, and CSS custom properties for full theming support (light/dark/auto).

**Repo**: `LazuliKao/luci-theme-argon` · **Branch**: `openwrt-24.10`  
**Targets**: OpenWrt 24.10.7 (opkg/ipk), OpenWrt 25.12.4 (apk)

## Monorepo Structure

```
luci-theme-argon/
├── luci-theme-argon/           # Original Argon theme (Lua templates)
├── luci-theme-fluent/          # FluentUI theme (ucode templates) ← YOU ARE HERE
├── luci-app-argon-config/      # Argon config app
├── luci-app-fluent-config/     # Fluent config app (UCI-based)
├── .github/workflows/          # CI/CD pipeline
│   ├── ci.yml                  # SCSS build + lint + matrix SDK builds
│   ├── release.yml             # Release workflow
│   └── build.sh                # SDK download + compile script
└── prompts.md                  # FluentUI design specs & implementation notes
```

## Development Setup

### Prerequisites
- Node.js >= 18
- pnpm 10+ (`npm i -g pnpm`)

### Quick Start
```bash
cd luci-theme-fluent
pnpm install          # Install deps (sass, sass-lint)
pnpm run build        # Compile SCSS → fluent.css
pnpm run watch        # Auto-rebuild on changes
pnpm run lint         # SCSS lint check
```

### Build Commands
| Command              | Action                                                                  |
| -------------------- | ----------------------------------------------------------------------- |
| `pnpm run build`     | Compile `scss/fluent.scss` → `htdocs/luci-static/fluent/css/fluent.css` |
| `pnpm run build:min` | Minified build (compressed)                                             |
| `pnpm run watch`     | Watch mode with auto-rebuild                                            |
| `pnpm run lint`      | Run sass-lint                                                           |

## Project Structure (luci-theme-fluent)

```
luci-theme-fluent/
├── scss/
│   ├── fluent.scss              # Entry point (27 @use imports)
│   ├── _variables.scss          # CSS custom properties / design tokens
│   ├── _mixins.scss             # Reusable SCSS mixins
│   ├── _base.scss               # Reset, typography, animations
│   ├── components/              # 20 component partials
│   │   ├── _buttons.scss        # FluentUI button variants
│   │   ├── _inputs.scss         # Text/number/email inputs
│   │   ├── _textarea.scss       # Textarea
│   │   ├── _select.scss         # Select dropdowns
│   │   ├── _checkboxes.scss     # Switch + checkbox (FluentUI style)
│   │   ├── _tables.scss         # Data tables with row styling
│   │   ├── _cards.scss          # Card surfaces
│   │   ├── _tabs.scss           # Tab navigation (.cbi-tabmenu, .tabs)
│   │   ├── _navigation.scss     # Main nav
│   │   ├── _dropdown.scss       # Dropdown menus (.cbi-dropdown)
│   │   ├── _dynlist.scss        # Dynamic list inputs
│   │   ├── _password.scss       # Password toggle groups
│   │   ├── _modals.scss         # Modal dialogs
│   │   ├── _progress.scss       # Progress bars
│   │   ├── _scrollbars.scss     # Custom scrollbars
│   │   ├── _errors.scss         # Error/alert messages
│   │   ├── _cbi-forms.scss      # CBI section/value/map layouts
│   │   ├── _cbi-dialogs.scss    # UCI dialog/change-list
│   │   ├── _cbi-network.scss    # Network badges/status tables
│   │   └── _cbi-widgets.scss    # Tooltip/progressbar/validation/file-upload
│   ├── layouts/
│   │   ├── _login.scss          # Login page layout
│   │   ├── _sidebar.scss        # Sidebar navigation
│   │   └── _header.scss         # Top header bar
│   └── themes/
│       ├── _light.scss          # Light theme variables
│       └── _dark.scss           # Dark theme variables
├── htdocs/luci-static/fluent/   # Compiled output + static assets
│   ├── css/fluent.css           # Compiled CSS (~176 KB)
│   ├── background/              # User-uploaded backgrounds
│   ├── fonts/                   # Self-contained fonts
│   ├── icon/                    # Favicons & app icons
│   └── img/                     # Logo & placeholder images
├── ucode/template/themes/fluent/ # ucode templates (6 files)
│   ├── header.ut                # Main page header
│   ├── footer.ut                # Main page footer
│   ├── header_login.ut          # Login page header
│   ├── footer_login.ut          # Login page footer
│   ├── out_header_login.ut      # Login header wrapper
│   └── sysauth.ut               # Login/auth page
├── root/etc/uci-defaults/
│   └── luci-fluent              # Theme registration script
├── Makefile                     # OpenWrt package definition
├── package.json                 # Build tooling
├── DESIGN.md                    # Architecture docs
└── AGENTS.md                    # This file
```

## Coding Standards

### SCSS Rules
1. **All colors/spacing via CSS custom properties** — defined in `_variables.scss`, never hardcoded
2. **Component-based** — one partial per component in `scss/components/`
3. **No `!important`** — unless overriding `cascade.css` (then document why)
4. **BEM naming** — `.block__element--modifier`
5. **Max 3 levels nesting**
6. **Mobile-first** — `min-width` media queries
7. **Dark mode via variables** — themes switch CSS vars, not separate files

### ucode Template Rules
1. **Use modern ucode syntax** — `{% %}` for code, `{{ }}` for output, `{# #}` for comments
2. **Auto-available globals**: `theme`, `media`, `resource`, `node`, `dispatcher`, `version`, `ctx`
3. **UCI access via `import { cursor } from 'uci'`**
4. **Escape user content**: `entityencode()` or `pcdata()`
5. **System info via ubus**: `ubus.call('system', 'board')`
6. **File ops via `fs` module**: `import { access, glob } from 'fs'`

### Adding a New Component
1. Create `scss/components/_new.scss`
2. Add `@use 'components/new';` to `scss/fluent.scss`
3. Add CSS custom properties to `_variables.scss` if needed
4. Test in both light and dark modes
5. Run `pnpm run build` to verify compilation

## UCI Configuration

Theme settings are in `/etc/config/fluent`:

```bash
uci set fluent.global.mode='dark'           # normal|light|dark
uci set fluent.global.primary='#0078D4'     # Light accent color
uci set fluent.global.dark_primary='#4DA6FF' # Dark accent color
uci set fluent.global.font_weight='400'     # 300-700
uci set fluent.global.blur='15'             # Login blur radius (px)
uci set fluent.global.transparency='0.92'   # Login card opacity
uci commit fluent
```

Full config options: see `luci-app-fluent-config` (8 sections: mode, colors, typography, layout, cards, animations, login, advanced).

## CI/CD Pipeline

**Trigger**: Push/PR to `openwrt-24.10`

### Jobs (all must pass)
1. **SCSS Build Validation** — `pnpm install && pnpm run build`, verifies `fluent.css` exists
2. **SCSS Lint** — `pnpm run lint` (non-blocking)
3. **OpenWrt SDK Build (24.10.7)** — Downloads SDK, builds `.ipk` packages
4. **OpenWrt SDK Build (25.12.4)** — Downloads SDK, builds `.apk` packages

### Build Script (`build.sh`)
- Downloads SDK from `https://downloads.openwrt.org/releases/{version}/targets/x86/64/`
- Auto-discovers SDK tarball name (handles gcc version changes)
- HTTP 200 verification before download
- Builds all 4 packages: `luci-theme-fluent`, `luci-theme-argon`, `luci-app-fluent-config`, `luci-app-argon-config`
- Output: `${HOME}/builder/output/` (.ipk or .apk)

### Release Workflow
Push a tag → matrix build for both SDK versions → publish artifacts.

## Design Tokens (Key CSS Variables)

```scss
// Colors
--fluent-primary: #0078D4;       // Accent
--fluent-bg: #ffffff;            // Page background
--fluent-bg-card: #f9f9f9;      // Card surface
--fluent-text: #242424;          // Body text
--fluent-border: #e0e0e0;       // Borders

// Spacing (4px grid)
--fluent-spacing-xs: 4px;
--fluent-spacing-sm: 8px;
--fluent-spacing-md: 16px;
--fluent-spacing-lg: 24px;
--fluent-spacing-xl: 32px;

// Components
--fluent-radius-sm: 4px;        // Standard radius
--fluent-input-height: 32px;    // Input/button height
--fluent-font-size-md: 14px;    // Base font size
```

Full token list: `scss/_variables.scss` (249 lines)

## FluentUI 2 Component Specs

| Component        | Height   | Radius | Key Feature                            |
| ---------------- | -------- | ------ | -------------------------------------- |
| Button           | 32px     | 4px    | Subtle/Primary/Danger/Outline variants |
| Input            | 32px     | 4px    | Bottom focus line (2px blue)           |
| Textarea         | 52px min | 4px    | Same focus line                        |
| Checkbox (table) | 18×18    | 3px    | SVG checkmark animation                |
| Switch (form)    | 20×40    | 10px   | Slide toggle animation                 |
| Tab              | auto     | —      | 2px bottom indicator + scaleX ripple   |
| Dropdown         | 32px     | 4px    | Arrow rotation, custom input support   |

Reference: `prompts.md` has full FluentUI source links.

## Troubleshooting

| Issue           | Check                                                        |
| --------------- | ------------------------------------------------------------ |
| CSS not loading | `htdocs/luci-static/fluent/css/fluent.css` exists?           |
| Dark mode wrong | UCI `mode` set correctly? CSS vars injected?                 |
| Build fails     | `pnpm install` first, check SCSS syntax with `pnpm run lint` |
| Template error  | ucode syntax: `{% %}` not `<% %>`, `{{ }}` not `<%= %>`      |
| CI SDK fails    | Check `build.sh` — SDK URL returns HTTP 200?                 |

## Resources

- [FluentUI 2 Design System](https://developer.microsoft.com/en-us/fluentui)
- [FluentUI React Source](https://github.com/microsoft/fluentui/tree/master/packages/react-components)
- [OpenWrt LuCI Docs](https://openwrt.org/docs/guide-user/luci/luci)
- [ucode Template Syntax](https://openwrt.org/docs/techref/ucode)
- [SCSS Documentation](https://sass-lang.com/documentation)

## 额外注意事项
- ** 不扩散原则**：组件样式只影响自身或者给定区域，避免全局样式污染
- ** 一致性原则**：同一组件在不同页面/场景保持视觉和交互一致，避免过度添加padding或者margin来适应不同布局，容易导致多层padding叠加过大
- ** 非必要不添加额外布局**：有些组件OpenWrt有一些基础样式并且正常布局依赖这些样式，避免额外添加flex之类导致布局混乱
