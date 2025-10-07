// i18n.js - Internationalization module
let currentLanguage = 'en';
let translations = {};

// Load translation file
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/static/translations/${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        return translations;
    } catch (error) {
        console.error(`Error loading translations for ${lang}:`, error);
        // Fallback to English
        if (lang !== 'en') {
            return loadTranslations('en');
        }
    }
}

// Get nested translation value
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Translate a key
function t(key) {
    return getNestedValue(translations, key) || key;
}

// Apply translations to the page
function applyTranslations() {
    // Update page title
    document.title = t('title');
    
    // Update header
    document.querySelector('header h1').textContent = t('header.title');
    document.querySelector('header p').textContent = t('header.subtitle');
    
    // Update section titles
    const sectionHeadings = document.querySelectorAll('.section h2');
    const sectionKeys = ['projectInfo', 'securityReq', 'technicalReq', 'compliance'];
    sectionHeadings.forEach((section, index) => {
        if (sectionKeys[index]) {
            section.textContent = t(`sections.${sectionKeys[index]}`);
        }
    });
    
    // Update form labels
    updateElement('label[for="project-name"]', 'form.projectName');
    updateElement('label[for="project-type"]', 'form.projectType');
    updateElement('label[for="company-size"]', 'form.companySize');
    
    // Update all standalone labels that don't have a 'for' attribute
    const sections = document.querySelectorAll('.section');
    
    // Security Requirements section - first label (without 'for' attribute)
    if (sections[1]) {
        const formGroups = sections[1].querySelectorAll('.form-group');
        if (formGroups[0]) {
            const labels = formGroups[0].querySelectorAll('label');
            // The first label without a 'for' attribute
            for (let label of labels) {
                if (!label.hasAttribute('for')) {
                    label.textContent = t('form.assessmentTypes');
                    break;
                }
            }
        }
    }
    
    updateElement('label[for="security-priority"]', 'form.securityPriority');
    updateElement('label[for="budget-range"]', 'form.budgetRange');
    updateElement('label[for="timeline"]', 'form.timeline');
    
    // Technical Requirements section - first label (without 'for' attribute)
    if (sections[2]) {
        const formGroups = sections[2].querySelectorAll('.form-group');
        if (formGroups[0]) {
            const labels = formGroups[0].querySelectorAll('label');
            // The first label without a 'for' attribute
            for (let label of labels) {
                if (!label.hasAttribute('for')) {
                    label.textContent = t('form.techStack');
                    break;
                }
            }
        }
    }
    
    updateElement('label[for="complexity"]', 'form.codeComplexity');
    updateElement('label[for="codebase-size"]', 'form.codebaseSize');
    
    // Update compliance section labels
    if (sections[3]) {
        const formGroups = sections[3].querySelectorAll('.form-group');
        if (formGroups[0]) {
            const industryLabel = formGroups[0].querySelector('label');
            if (industryLabel && !industryLabel.getAttribute('for')) {
                industryLabel.textContent = t('form.industry');
            }
        }
        if (formGroups[1]) {
            const complianceLabel = formGroups[1].querySelector('label');
            if (complianceLabel && !complianceLabel.getAttribute('for')) {
                complianceLabel.textContent = t('form.complianceReq');
            }
        }
        
        updateElement('label[for="data-sensitivity"]', 'form.dataSensitivity');
    }
    
    // Update project type options
    updateOption('#project-type option[value="web"]', 'projectTypes.web');
    updateOption('#project-type option[value="mobile"]', 'projectTypes.mobile');
    updateOption('#project-type option[value="desktop"]', 'projectTypes.desktop');
    updateOption('#project-type option[value="api"]', 'projectTypes.api');
    updateOption('#project-type option[value="blockchain"]', 'projectTypes.blockchain');
    updateOption('#project-type option[value="iot"]', 'projectTypes.iot');
    
    // Update company size labels
    updateElement('label[for="startup"]', 'companySizes.startup');
    updateElement('label[for="medium"]', 'companySizes.medium');
    updateElement('label[for="enterprise"]', 'companySizes.enterprise');
    
    // Update assessment type labels
    updateElement('label[for="penetration-testing"]', 'assessmentTypes.penetrationTesting');
    updateElement('label[for="code-review"]', 'assessmentTypes.codeReview');
    updateElement('label[for="architecture-review"]', 'assessmentTypes.architectureReview');
    updateElement('label[for="compliance-audit"]', 'assessmentTypes.complianceAudit');
    updateElement('label[for="threat-modeling"]', 'assessmentTypes.threatModeling');
    updateElement('label[for="incident-response"]', 'assessmentTypes.incidentResponse');
    
    // Update slider labels
    const priorityLabels = document.querySelector('#security-priority').parentElement.querySelectorAll('.slider-labels span');
    if (priorityLabels.length >= 3) {
        priorityLabels[0].textContent = `${t('sliderLabels.low')} (1)`;
        priorityLabels[2].textContent = `${t('sliderLabels.critical')} (10)`;
    }
    
    const complexityLabels = document.querySelector('#complexity').parentElement.querySelectorAll('.slider-labels span');
    if (complexityLabels.length >= 3) {
        complexityLabels[0].textContent = `${t('sliderLabels.simple')} (1)`;
        complexityLabels[2].textContent = `${t('sliderLabels.highlyComplex')} (10)`;
    }
    
    const sensitivityLabels = document.querySelector('#data-sensitivity').parentElement.querySelectorAll('.slider-labels span');
    if (sensitivityLabels.length >= 3) {
        sensitivityLabels[0].textContent = `${t('sliderLabels.public')} (1)`;
        sensitivityLabels[2].textContent = `${t('sliderLabels.topSecret')} (5)`;
    }
    
    // Update timeline options
    updateOption('#timeline option[value="urgent"]', 'timelines.urgent');
    updateOption('#timeline option[value="fast"]', 'timelines.fast');
    updateOption('#timeline option[value="normal"]', 'timelines.normal');
    updateOption('#timeline option[value="flexible"]', 'timelines.flexible');
    
    // Update industry labels
    updateElement('label[for="fintech"]', 'industries.fintech');
    updateElement('label[for="healthcare"]', 'industries.healthcare');
    updateElement('label[for="ecommerce"]', 'industries.ecommerce');
    updateElement('label[for="saas"]', 'industries.saas');
    updateElement('label[for="gaming"]', 'industries.gaming');
    updateElement('label[for="other"]', 'industries.other');
    
    // Update compliance labels (keep acronyms but translate GDPR for French)
    updateElement('label[for="pci-dss"]', 'compliance.pciDss');
    updateElement('label[for="hipaa"]', 'compliance.hipaa');
    updateElement('label[for="gdpr"]', 'compliance.gdpr');
    updateElement('label[for="soc2"]', 'compliance.soc2');
    updateElement('label[for="iso27001"]', 'compliance.iso27001');
    updateElement('label[for="nist"]', 'compliance.nist');
    
    // Update buttons
    updateElement('#submit-btn', 'buttons.submit');
    updateElement('#new-analysis', 'buttons.newAnalysis');
    
    // Update progress container
    updateElement('#progress-container h2', 'progress.title');
    
    // Update results container
    updateElement('#result-container h2', 'results.title');
    updateElement('#result-container .vendor-card p', 'results.description');
}

function updateElement(selector, key) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = t(key);
    }
}

function updateOption(selector, key) {
    const option = document.querySelector(selector);
    if (option) {
        option.textContent = t(key);
    }
}

// Get progress step translation
function getProgressStep(stepNumber) {
    return t(`progress.step${stepNumber}`);
}

// Get error translation
function getError(errorKey) {
    return t(`errors.${errorKey}`);
}

// Initialize with saved language or default
async function initializeLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    await loadTranslations(savedLang);
    applyTranslations();
    updateLanguageSelector(savedLang);
}

// Update language selector UI
function updateLanguageSelector(lang) {
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

// Change language
async function changeLanguage(lang) {
    await loadTranslations(lang);
    applyTranslations();
    updateLanguageSelector(lang);
}

// Export functions
window.i18n = {
    t,
    loadTranslations,
    applyTranslations,
    changeLanguage,
    initializeLanguage,
    getProgressStep,
    getError,
    getCurrentLanguage: () => currentLanguage
};
