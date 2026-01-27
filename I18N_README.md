# I18N Implementation

This project now supports Internationalization (I18N) using Flask-Babel.

## Supported Languages
- English (default)
- Spanish (es)
- French (fr)

## Implementation Details
- **Dependency Management**: Handled via `uv`.
- **Framework**: `Flask-Babel` for managing translations.
- **Locale Selection**:
  1. URL parameter: `?lang=es` or `?lang=fr`
  2. Session persistence
  3. Browser preference fallback
- **UI**: Added a language switcher in the top-right corner of the interface.

## How to Add/Update Translations

1.  **Extract new strings**:
    ```bash
    uv run pybabel extract -F babel.cfg -k _ -o messages.pot .
    ```
2.  **Update existing catalogs**:
    ```bash
    uv run pybabel update -i messages.pot -d translations
    ```
3.  **Edit the `.po` files** in `translations/<lang>/LC_MESSAGES/messages.po`.
4.  **Compile translations**:
    ```bash
    uv run pybabel compile -d translations
    ```

## Testing Guidelines
- Visit the application and use the language buttons to switch between EN, ES, and FR.
- Verify that the selection persists when navigating or refreshing (via session).
- Test URL parameters directly: `/?lang=fr`.
- Ensure all form labels, buttons, and messages are translated correctly.
