# I18N Support Implementation

This project now supports English, Spanish, and French using Flask-Babel.

## Implementation Details

- **Dependency Management:** Managed via `uv`. Added `Flask-Babel`.
- **Locale Selection:** 
    1. URL parameter (e.g., `?lang=es`)
    2. Session persistence
    3. Browser's preferred language (Accept-Language header)
- **UI:** 
    - Added language selector buttons in the top-right.
    - Wrapped all user-facing strings in `_()` for translation.
    - Progress bar messages in `script.js` are also translated via a global `i18n` object passed from the template.
- **Translations:**
    - Full Spanish (`es`) translations.
    - Full French (`fr`) translations.

## How to Add/Update Translations

1.  **Extract new strings:**
    ```bash
    uv run pybabel extract -F babel.cfg -k _ -o messages.pot .
    ```
2.  **Update existing catalogs:**
    ```bash
    uv run pybabel update -i messages.pot -d translations
    ```
3.  **Translate** the new strings in `translations/[lang]/LC_MESSAGES/messages.po`.
4.  **Compile catalogs:**
    ```bash
    uv run pybabel compile -d translations
    ```

## Testing Guidelines

- Visit `/` and ensure English is the default.
- Click "ES" or "FR" buttons to switch languages.
- Verify that the language persists across page refreshes (session).
- Verify that `?lang=es` correctly sets the language.
- Run the application with different browser language settings to test automatic detection.

## Validation

The implementation was validated following the provided guidelines, including dependency security checks.
