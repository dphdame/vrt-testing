# Visual Regression Testing

Centralized visual regression testing for Victoria's websites using Playwright.

## Tested Sites

| Site | Domain | Tests |
|------|--------|-------|
| Unstoppable Ink | unstoppable.ink | Homepage, Navbar, Hero, Footer |
| Beat Writers Block | beatwritersblock.com | Homepage, Navbar, Hero, Footer |
| Too Early To Say | tooearlytosay.com | Homepage, Navbar, Hero, Footer |
| CAPHE Group | caphegroup.org | Homepage, Navbar, Hero, Footer |

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run all tests
npm test

# Run tests for a specific site
npm run test:unstoppable
npm run test:beatwriters
npm run test:tooearly
npm run test:caphe

# Update baselines (after intentional UI changes)
npm run update-baselines

# View HTML report
npm run report
```

## Viewports Tested

- Desktop Full HD (1920x1080)
- Desktop Medium (1280x720)
- Tablet (768x1024)
- Mobile (375x667)

## What These Tests Catch

- **CSS Syntax Errors**: Missing closing braces that break subsequent rules
- **Layout Shifts**: Elements moving or misaligning
- **Responsive Failures**: Content overflowing or breaking at breakpoints
- **Missing Elements**: Navbar, hero, footer not rendering
- **Cross-viewport Issues**: Layout problems at specific screen sizes

## CI/CD

Tests run automatically:
- Daily at 8 AM UTC via GitHub Actions
- On-demand via workflow dispatch

Failed tests create an issue with links to diff artifacts.

## Updating Baselines

When UI changes are intentional:

```bash
# Update all baselines
npm run update-baselines

# Update for specific site
npm run update-baselines:unstoppable

# Commit new baselines
git add tests/*/baselines/
git commit -m "Update visual regression baselines"
```

## Related Skills

- `/visual-regression` - VRT skill for Claude Code
- `/visual-bug-fixing` - CSS debugging skill for Claude Code
