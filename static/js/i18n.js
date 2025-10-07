// i18n.js - Internationalization support
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = 'en';
        this.defaultLang = 'en';
    }

    async init() {
        // Load saved language preference or default to 'en'
        this.currentLang = localStorage.getItem('language') || this.defaultLang;
        await this.loadLanguage(this.currentLang);
        this.applyTranslations();
    }

    async loadLanguage(lang) {
        try {
            const response = await fetch(`/static/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language: ${lang}`);
            }
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            return true;
        } catch (error) {
            console.error('Error loading language:', error);
            // Fallback to default language
            if (lang !== this.defaultLang) {
                await this.loadLanguage(this.defaultLang);
            }
            return false;
        }
    }

    async changeLanguage(lang) {
        await this.loadLanguage(lang);
        this.applyTranslations();
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    translate(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return value;
    }

    applyTranslations() {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    getProgressSteps() {
        return [
            { percent: 10, text: this.translate('progress.analyzingProject') },
            { percent: 25, text: this.translate('progress.evaluatingSecurity') },
            { percent: 40, text: this.translate('progress.matchingTech') },
            { percent: 55, text: this.translate('progress.checkingCompliance') },
            { percent: 70, text: this.translate('progress.calculatingBudget') },
            { percent: 85, text: this.translate('progress.reviewingVendor') },
            { percent: 100, text: this.translate('progress.finalizing') }
        ];
    }

    getErrorMessage() {
        return this.translate('errors.requestError');
    }
}

// Export as global variable
window.i18n = new I18n();
