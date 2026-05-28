# AGENTS.md - Developer Guide for Luci-Theme-Fluent

## Project Overview

**Luci-Theme-Fluent** is an independent FluentUI theme for OpenWrt LuCI, built with modern tooling (SCSS, ucode templates) and designed for maintainability and performance.

## Development Setup

### Prerequisites

- Node.js >= 18
- pnpm (package manager)
- OpenWrt SDK (for building packages)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/luci-theme-fluent.git
cd luci-theme-fluent

# Install dependencies
pnpm install

# Build CSS
pnpm run build

# Watch for changes
pnpm run watch
```

### Build Commands

```bash
# Build CSS
pnpm run build

# Build minified CSS
pnpm run build:min

# Watch mode (auto-rebuild on changes)
pnpm run watch

# Lint SCSS
pnpm run lint

# Run tests
pnpm test
```

## Project Structure

```
luci-theme-fluent/
├── scss/                       # SCSS source files
│   ├── _variables.scss         # Design tokens
│   ├── _mixins.scss            # Reusable mixins
│   ├── _base.scss              # Base styles
│   ├── components/             # Component partials
│   ├── layouts/                # Layout styles
│   ├── themes/                 # Theme variations
│   └── fluent.scss             # Main entry point
├── htdocs/luci-static/fluent/  # Compiled output
├── ucode/template/themes/fluent/ # ucode templates
├── root/                       # OpenWrt package files
├── package.json                # Build tooling
├── Makefile                    # OpenWrt build
├── DESIGN.md                   # Architecture docs
└── AGENTS.md                   # This file
```

## Coding Standards

### SCSS Guidelines

1. **Use Variables**: All colors, spacing, and typography should use variables from `_variables.scss`
2. **Component-Based**: Each component gets its own partial file
3. **No `!important`**: Self-contained styles, no override layer
4. **BEM Naming**: Use Block-Element-Modifier naming convention
5. **Nesting Limit**: Max 3 levels of nesting
6. **Mobile-First**: Use `min-width` media queries

```scss
// Good
.card {
  &__header {
    background: var(--fluent-bg);
  }
  
  &__title {
    font-size: 1.25rem;
  }
  
  &--highlighted {
    border-left: 3px solid var(--fluent-primary);
  }
}

// Bad
.card .card-header .card-title {
  font-size: 1.25rem !important;
}
```

### ucode Template Guidelines

1. **Use Auto-Available Globals**: `theme`, `media`, `resource`, `node`, `dispatcher`, `version`, `ctx`
2. **Import Only When Needed**: Use `import { ... } from 'module';`
3. **Escape Output**: Use `entityencode()` for user content
4. **Comment Blocks**: Use `{# ... #}` for comments

```ut
{# Good #}
{% 
  import { cursor } from 'uci';
  let cfg = cursor();
  let primary = cfg.get_first('fluent', 'global', 'primary') || '#0078d4';
%}
<link rel="stylesheet" href="{{ media }}/css/fluent.css">

{# Bad #}
<%
  local uci = require('luci.model.uci').cursor()
  local primary = uci:get_first('fluent', 'global', 'primary') or '#0078d4'
%>
<link rel="stylesheet" href="<%=media%>/css/fluent.css">
```

### JavaScript Guidelines

1. **LuCI Module System**: Use `baseclass.extend` or `view.extend`
2. **Minimal Dependencies**: Only sidebar navigation (menu-fluent.js)
3. **ES6+ Syntax**: Use modern JavaScript features
4. **JSDoc Comments**: Document all functions and classes

```javascript
// Good
'use strict';
'require baseclass';

return baseclass.extend({
  title: _('Fluent Navigation'),
  
  load: function() {
    // Implementation
  }
});
```

## Component Development

### Adding a New Component

1. Create a new partial in `scss/components/`
2. Import it in `scss/fluent.scss`
3. Add variables to `_variables.scss` if needed
4. Create corresponding ucode template if needed
5. Update documentation

```scss
// scss/components/_new-component.scss
.new-component {
  background: var(--fluent-bg);
  padding: 1rem;
  
  &__element {
    color: var(--fluent-text);
  }
}
```

### Modifying Existing Components

1. Find the component partial in `scss/components/`
2. Make changes following coding standards
3. Test in both light and dark modes
4. Update documentation if behavior changes

## Theming

### CSS Custom Properties

All theming uses CSS custom properties defined in `_variables.scss`:

```scss
:root {
  // Primary
  --fluent-primary: #0078d4;
  --fluent-primary-hover: #106ebe;
  
  // Background
  --fluent-bg: #ffffff;
  --fluent-bg-hover: #f3f2f1;
  
  // Text
  --fluent-text: #323130;
  --fluent-text-secondary: #605e5c;
}
```

### Dark Mode

Dark mode uses media query override:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --fluent-bg: #1b1b1b;
    --fluent-text: #f3f2f1;
  }
}
```

### UCI Configuration

Theme options are configured via UCI:

```bash
# Set primary color
uci set fluent.global.primary='#0078d4'

# Set dark mode
uci set fluent.global.mode='dark'

# Apply changes
uci commit fluent
```

## Testing

### Manual Testing

1. Build the theme: `pnpm run build`
2. Install on OpenWrt device
3. Test in LuCI web interface
4. Verify light and dark modes
5. Test responsive design

### Visual Regression Testing

```bash
# Take screenshots of key pages
# Compare with baseline images
# Flag any visual changes
```

## Deployment

### Building Package

```bash
# In OpenWrt SDK
make package/luci-theme-fluent/compile
make package/luci-theme-fluent/install
```

### Installation

```bash
# On OpenWrt device
opkg install luci-theme-fluent_1.0.0_all.ipk
```

## Troubleshooting

### Common Issues

1. **CSS not loading**: Check `htdocs/luci-static/fluent/css/` exists
2. **Dark mode not working**: Verify CSS custom properties are defined
3. **Build errors**: Check SCSS syntax and imports
4. **Template errors**: Verify ucode syntax and imports

### Debug Mode

```bash
# Enable debug logging
uci set fluent.global.debug='1'
uci commit fluent
```

## Contributing

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make changes following coding standards
4. Test thoroughly
5. Update documentation
6. Submit PR with clear description

### Code Review Checklist

- [ ] Follows SCSS coding standards
- [ ] No `!important` declarations
- [ ] Uses CSS custom properties for theming
- [ ] Works in light and dark modes
- [ ] Responsive design tested
- [ ] Documentation updated
- [ ] No breaking changes

## Resources

- [FluentUI Design System](https://developer.microsoft.com/en-us/fluentui)
- [OpenWrt LuCI Documentation](https://openwrt.org/docs/guide-user/luci/luci)
- [ucode Template Syntax](https://openwrt.org/docs/techref/ucode)
- [SCSS Documentation](https://sass-lang.com/documentation)
