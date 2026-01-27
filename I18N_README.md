# I18N Implementation: Multi-language Support (EN, ES, FR)

This document outlines the implementation of internationalization (I18N) for the Security Vendor Selection Tool.

## Implementation Overview

- **Backend**: Integrated `Flask-Babel` for translation management.
- **Dependency Management**: Used `uv` for package installation and virtual environment handling.
- **Language Detection**:
  1. URL parameter (`?lang=es`, `?lang=fr`, `?lang=en`) - highest priority.
  2. Session persistence - remembers choice across clicks.
  3. Browser preference - automatic fallback based on `Accept-Language` header.
- **Translations**: Added full coverage for English (default), Spanish, and French.

## Usage Instructions

- To switch languages manually, use the buttons in the top-right corner of the interface.
- Alternatively, append the `lang` parameter to the URL:
  - Spanish: `/?lang=es`
  - French: `/?lang=fr`
  - English: `/?lang=en`

## Adding/Updating Translations

1. **Extract strings**:
   ```bash
   uv run pybabel extract -F babel.cfg -k _ -o messages.pot .
   ```
2. **Update catalogs**:
   ```bash
   uv run pybabel update -i messages.pot -d translations
   ```
3. **Edit `.po` files** in `translations/<lang>/LC_MESSAGES/messages.po`.
4. **Compile**:
   ```bash
   uv run pybabel compile -d translations
   ```

## Testing Guidelines

- Verify that switching languages updates all UI text, including form labels, placeholders, and buttons.
- Confirm that the language choice persists after a page refresh (session check).
- Test browser fallback by changing your browser's language settings and visiting the root URL without parameters.
- Ensure the API response remains functional and analysis progress text is correctly translated.
