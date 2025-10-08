document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vendor-form');
    const progressContainer = document.getElementById('progress-container');
    const resultContainer = document.getElementById('result-container');
    const submitBtn = document.getElementById('submit-btn');
    const newAnalysisBtn = document.getElementById('new-analysis');
    const languageSelect = document.getElementById('language-select');

    const prioritySlider = document.getElementById('security-priority');
    const priorityValue = document.getElementById('priority-value');
    
    const budgetSlider = document.getElementById('budget-range');
    const budgetValue = document.getElementById('budget-value');
    
    const complexitySlider = document.getElementById('complexity');
    const complexityValue = document.getElementById('complexity-value');
    
    const codebaseSlider = document.getElementById('codebase-size');
    const codebaseValue = document.getElementById('codebase-value');
    
    const sensitivitySlider = document.getElementById('data-sensitivity');
    const sensitivityValue = document.getElementById('sensitivity-value');

    // Language management
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    function updateLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Set initial language
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);
    
    languageSelect.addEventListener('change', function() {
        updateLanguage(this.value);
    });

    prioritySlider.addEventListener('input', function() {
        priorityValue.textContent = this.value;
    });

    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value >= 500000) {
            budgetValue.textContent = '$500K+';
        } else {
            budgetValue.textContent = '$' + (value / 1000) + 'K';
        }
    });

    complexitySlider.addEventListener('input', function() {
        complexityValue.textContent = this.value;
    });

    codebaseSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value >= 1000000) {
            codebaseValue.textContent = '1M+';
        } else if (value >= 1000) {
            codebaseValue.textContent = (value / 1000) + 'K';
        } else {
            codebaseValue.textContent = value;
        }
    });

    sensitivitySlider.addEventListener('input', function() {
        sensitivityValue.textContent = this.value;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        form.style.display = 'none';
        progressContainer.style.display = 'block';
        
        simulateProgress();
        
        const formData = new FormData(form);
        
        fetch('/api/recommend', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('vendor-name').textContent = data.vendor;
            progressContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
            form.style.display = 'block';
            progressContainer.style.display = 'none';
        });
    });

    newAnalysisBtn.addEventListener('click', function() {
        form.reset();
        priorityValue.textContent = '5';
        budgetValue.textContent = '$50K';
        complexityValue.textContent = '5';
        codebaseValue.textContent = '50K';
        sensitivityValue.textContent = '3';
        
        resultContainer.style.display = 'none';
        form.style.display = 'block';
    });

    function simulateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        const steps = [
            { percent: 10, key: 'analyzing_project' },
            { percent: 25, key: 'evaluating_security' },
            { percent: 40, key: 'matching_tech' },
            { percent: 55, key: 'checking_compliance' },
            { percent: 70, key: 'calculating_budget' },
            { percent: 85, key: 'reviewing_vendor' },
            { percent: 100, key: 'finalizing' }
        ];
        
        let currentStep = 0;
        
        const updateProgress = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progressFill.style.width = step.percent + '%';
                progressText.textContent = translations[currentLanguage][step.key];
                currentStep++;
                
                const delay = currentStep === steps.length ? 500 : 600 + Math.random() * 400;
                setTimeout(updateProgress, delay);
            }
        };
        
        updateProgress();
    }
});