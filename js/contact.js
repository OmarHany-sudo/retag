// Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-overlay');
    const faqItems = document.querySelectorAll('.faq-item');

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
            message: 'يرجى إدخال الاسم الأول صحيح'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
            message: 'يرجى إدخال الاسم الأخير صحيح'
        },
        phone: {
            required: true,
            pattern: /^(01)[0-9]{9}$/,
            message: 'يرجى إدخال رقم هاتف صحيح (01xxxxxxxxx)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'يرجى إدخال بريد إلكتروني صحيح'
        },
        subject: {
            required: true,
            message: 'يرجى اختيار موضوع الرسالة'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'يرجى كتابة رسالة مفصلة (10 أحرف على الأقل)'
        },
        privacy: {
            required: true,
            message: 'يجب الموافقة على سياسة الخصوصية'
        }
    };

    // FAQ functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Clear previous errors
        clearErrors();
        
        // Validate each field
        for (const [fieldName, rules] of Object.entries(validationRules)) {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            const value = formData.get(fieldName);
            
            if (!field) continue;
            
            const fieldGroup = field.closest('.form-group');
            const errorElement = fieldGroup.querySelector('.error-message');
            
            // Required validation
            if (rules.required && (!value || value.trim() === '')) {
                showError(fieldGroup, errorElement, rules.message || 'هذا الحقل مطلوب');
                isValid = false;
                continue;
            }
            
            // Skip other validations if field is empty and not required
            if (!value || value.trim() === '') continue;
            
            // Pattern validation
            if (rules.pattern && !rules.pattern.test(value)) {
                showError(fieldGroup, errorElement, rules.message);
                isValid = false;
                continue;
            }
            
            // Min length validation
            if (rules.minLength && value.length < rules.minLength) {
                showError(fieldGroup, errorElement, `يجب أن يكون ${rules.minLength} أحرف على الأقل`);
                isValid = false;
                continue;
            }
            
            // Checkbox validation
            if (field.type === 'checkbox' && rules.required && !field.checked) {
                showError(fieldGroup, errorElement, rules.message);
                isValid = false;
                continue;
            }
            
            // Mark as valid
            fieldGroup.classList.add('success');
        }
        
        return isValid;
    }

    function showError(fieldGroup, errorElement, message) {
        fieldGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errorGroups = contactForm.querySelectorAll('.form-group.error, .form-group.success');
        errorGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Show success message
            showSuccessModal();
            
            // Reset form
            contactForm.reset();
            clearErrors();
            
        }, 2000);
    }

    function showSuccessModal() {
        if (successOverlay) {
            successOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close success modal
    window.closeSuccessModal = function() {
        if (successOverlay) {
            successOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            const fieldName = this.name;
            const rules = validationRules[fieldName];
            
            if (!rules) return;
            
            const fieldGroup = this.closest('.form-group');
            const errorElement = fieldGroup.querySelector('.error-message');
            const value = this.value;
            
            // Clear previous state
            fieldGroup.classList.remove('error', 'success');
            if (errorElement) errorElement.textContent = '';
            
            // Required validation
            if (rules.required && (!value || value.trim() === '')) {
                showError(fieldGroup, errorElement, rules.message || 'هذا الحقل مطلوب');
                return;
            }
            
            // Skip other validations if field is empty and not required
            if (!value || value.trim() === '') return;
            
            // Pattern validation
            if (rules.pattern && !rules.pattern.test(value)) {
                showError(fieldGroup, errorElement, rules.message);
                return;
            }
            
            // Min length validation
            if (rules.minLength && value.length < rules.minLength) {
                showError(fieldGroup, errorElement, `يجب أن يكون ${rules.minLength} أحرف على الأقل`);
                return;
            }
            
            // Checkbox validation
            if (this.type === 'checkbox' && rules.required && !this.checked) {
                showError(fieldGroup, errorElement, rules.message);
                return;
            }
            
            // Mark as valid
            fieldGroup.classList.add('success');
        });
    });

    // Animate contact methods on scroll
    const contactMethods = document.querySelectorAll('.contact-method');
    const methodObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        methodObserver.observe(method);
    });

    // Add click tracking for contact methods
    const trackableElements = document.querySelectorAll('.contact-method, .action-btn, .faq-question');
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.classList.contains('contact-method') ? 'contact-method' :
                               this.classList.contains('action-btn') ? 'action-button' : 'faq-question';
            const elementText = this.querySelector('h3')?.textContent || 
                               this.querySelector('span')?.textContent || 
                               this.textContent;
            
            console.log(`Contact page interaction: ${elementType} - ${elementText}`);
        });
    });

    // Auto-expand first FAQ item
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // Add typing effect for form placeholders
    const textareaField = contactForm.querySelector('textarea[name="message"]');
    if (textareaField) {
        const placeholderTexts = [
            'اكتب رسالتك هنا...',
            'أخبرنا كيف يمكننا مساعدتك...',
            'شاركنا استفسارك أو طلبك...',
            'نحن هنا للإجابة على جميع أسئلتك...'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            textareaField.placeholder = placeholderTexts[currentIndex];
            currentIndex = (currentIndex + 1) % placeholderTexts.length;
        }, 3000);
    }

    // Add character counter for message field
    const messageField = contactForm.querySelector('textarea[name="message"]');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: left; font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;';
        
        const updateCounter = () => {
            const length = messageField.value.length;
            const minLength = 10;
            const remaining = Math.max(0, minLength - length);
            
            if (remaining > 0) {
                counter.textContent = `يجب كتابة ${remaining} حرف إضافي على الأقل`;
                counter.style.color = 'var(--accent-color)';
            } else {
                counter.textContent = `${length} حرف`;
                counter.style.color = 'var(--text-light)';
            }
        };
        
        messageField.addEventListener('input', updateCounter);
        messageField.parentNode.appendChild(counter);
        updateCounter();
    }

    // Add smooth scrolling to contact methods when clicked
    const quickActionBtns = document.querySelectorAll('.action-btn');
    quickActionBtns.forEach(btn => {
        if (btn.getAttribute('href') === '#contact-form') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                contactForm.scrollIntoView({ behavior: 'smooth' });
                contactForm.querySelector('input').focus();
            });
        }
    });

    console.log('Contact page loaded successfully!');
});

