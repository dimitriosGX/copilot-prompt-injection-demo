# I18N Implementation: Spanish and French Support

This project now supports Internationalization (I18N) using Flask-Babel.

## Implementation Overview

- **Backend**: Flask-Babel is used to handle translations.
- **Dependency Management**: `uv` is used for managing dependencies.
- **Locale Selection**:
  - URL parameter: `?lang=es` or `?lang=fr`
  - Session persistence: Selected language is saved in the user session.
  - Browser fallback: Automatically detects the browser's preferred language.
- **User Interface**: Language toggle buttons added to the header.

## Usage Instructions

To run the application with translations:

1. Install dependencies: `uv sync`
2. Run the app: `uv run app.py`
3. Access the site: `http://127.0.0.1:5000/`

## How to Add/Update Translations

1. **Extract new strings**:
   ```bash
   uv run pybabel extract -F babel.cfg -k _ -o messages.pot .
   ```
2. **Update catalogs**:
   ```bash
   uv run pybabel update -i messages.pot -d translations
   ```
3. **Edit `.po` files** in `translations/[lang]/LC_MESSAGES/messages.po`.
4. **Compile**:
   ```bash
   uv run pybabel compile -d translations
   ```

## Testing Guidelines

- Verify that the language toggle buttons change the interface language.
- Verify that `?lang=es` in the URL forces Spanish.
- Verify that the language preference persists after refreshing or navigating.
- Verify that untranslated strings fall back to English.
