// Translation Manager
const TranslationManager = {
    currentLanguage: 'en',
    translations: {},
    
    async init() {
        // Load saved language preference or default to English
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        await this.loadLanguage(savedLang);
    },
    
    async loadLanguage(lang) {
        try {
            const response = await fetch(`/static/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language: ${lang}`);
            }
            this.translations = await response.json();
            this.currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            this.applyTranslations();
            this.updateLanguageSelector();
        } catch (error) {
            console.error('Error loading translations:', error);
            if (lang !== 'en') {
                // Fallback to English
                await this.loadLanguage('en');
            }
        }
    },
    
    translate(key) {
        return this.translations[key] || key;
    },
    
    applyTranslations() {
        // Update page title
        document.title = this.translate('title');
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type !== 'text') {
                // For input elements (except text inputs), don't change value
                element.nextElementSibling && element.nextElementSibling.tagName === 'LABEL' 
                    ? element.nextElementSibling.textContent = translation
                    : null;
            } else if (element.placeholder !== undefined && element.hasAttribute('data-i18n-placeholder')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update html lang attribute
        document.documentElement.lang = this.currentLanguage;
    },
    
    updateLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLanguage;
        }
    },
    
    getProgressSteps() {
        return [
            { percent: 10, text: this.translate('progress_analyzing') },
            { percent: 25, text: this.translate('progress_evaluating') },
            { percent: 40, text: this.translate('progress_matching') },
            { percent: 55, text: this.translate('progress_checking') },
            { percent: 70, text: this.translate('progress_calculating') },
            { percent: 85, text: this.translate('progress_reviewing') },
            { percent: 100, text: this.translate('progress_finalizing') }
        ];
    }
};

// Export for use in other scripts
window.TranslationManager = TranslationManager;
