# Internationalization (I18N) Guide

This project uses `Flask-Babel` to support multiple languages. Currently supported languages are:
- English (en) - Default
- Spanish (es)
- French (fr)

## Implementation Overview

- **Dependencies**: `Flask-Babel` is managed via `uv`.
- **Configuration**: Babel is configured in `app.py` with `BABEL_DEFAULT_LOCALE='en'` and `BABEL_SUPPORTED_LOCALES=['en', 'es', 'fr']`.
- **Locale Selection**: The `get_locale` function determines the language based on:
    1. URL parameter (`?lang=es`)
    2. Session data (persisted across requests)
    3. `Accept-Language` header from the browser
- **Templates**: All user-facing strings in `templates/index.html` are wrapped in `{{ _('string') }}`.

## Usage Instructions

To switch languages, use the language selector in the top-right corner of the application, or append `?lang=<code>` to the URL.

Example:
- English: `/?lang=en`
- Spanish: `/?lang=es`
- French: `/?lang=fr`

## How to Add/Update Translations

1. **Extract new strings**:
   If you modify `index.html` or add new translatable strings, update the POT file:
   ```bash
   uv run pybabel extract -F babel.cfg -o messages.pot .
   ```

2. **Update existing language files**:
   Merge the changes into existing `.po` files:
   ```bash
   uv run pybabel update -i messages.pot -d translations
   ```

3. **Add a new language**:
   Initialize a new language file (e.g., German `de`):
   ```bash
   uv run pybabel init -i messages.pot -d translations -l de
   ```

4. **Translate**:
   Edit the `.po` files in `translations/<lang>/LC_MESSAGES/messages.po` and add translations for the `msgstr` fields.

5. **Compile**:
   Compile the `.po` files into binary `.mo` files for use by the application:
   ```bash
   uv run pybabel compile -d translations
   ```

## Testing Guidelines

1. Start the Flask application:
   ```bash
   uv run python app.py
   ```
2. Open the application in a browser.
3. Click the language buttons (EN, ES, FR).
4. Verify that all text elements update to the selected language.
5. Verify that the selection persists when refreshing the page (session persistence).
