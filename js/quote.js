// Quote page functionality

document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quote-form');
    const successOverlay = document.getElementById('success-overlay');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
            message: 'يرجى إدخال اسم صحيح'
        },
        phone: {
            required: true,
            pattern: /^(01)[0-9]{9}$/,
            message: 'يرجى إدخال رقم هاتف صحيح (01xxxxxxxxx)'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'يرجى إدخال بريد إلكتروني صحيح'
        },
        category: {
            required: true,
            message: 'يرجى اختيار القسم المطلوب'
        },
        products: {
            required: true,
            minLength: 10,
            message: 'يرجى وصف المنتجات المطلوبة بالتفصيل'
        },
        terms: {
            required: true,
            message: 'يجب الموافقة على الشروط والأحكام'
        }
    };

    // Form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const formData = new FormData(quoteForm);
        
        // Clear previous errors
        clearErrors();
        
        // Validate each field
        for (const [fieldName, rules] of Object.entries(validationRules)) {
            const field = quoteForm.querySelector(`[name="${fieldName}"]`);
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
        const errorGroups = quoteForm.querySelectorAll('.form-group.error, .form-group.success');
        errorGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

    function submitForm() {
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
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
            quoteForm.reset();
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

    // Send via WhatsApp
    window.sendViaWhatsApp = function() {
        const formData = new FormData(quoteForm);
        const phone = '201012006376';
        
        let message = 'السلام عليكم، أريد طلب عرض سعر:\n\n';
        message += `الاسم: ${formData.get('name') || 'غير محدد'}\n`;
        message += `الهاتف: ${formData.get('phone') || 'غير محدد'}\n`;
        message += `البريد الإلكتروني: ${formData.get('email') || 'غير محدد'}\n`;
        message += `الشركة: ${formData.get('company') || 'غير محدد'}\n`;
        message += `القسم: ${formData.get('category') || 'غير محدد'}\n`;
        message += `المنتجات: ${formData.get('products') || 'غير محدد'}\n`;
        message += `الكمية: ${formData.get('quantity') || 'غير محدد'}\n`;
        message += `موعد التسليم: ${formData.get('delivery') || 'غير محدد'}\n`;
        message += `الميزانية: ${formData.get('budget') || 'غير محدد'}\n`;
        
        if (formData.get('notes')) {
            message += `ملاحظات: ${formData.get('notes')}\n`;
        }
        
        message += '\nشكراً لكم';
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    // Real-time validation
    const formFields = quoteForm.querySelectorAll('input, select, textarea');
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

    // Auto-fill from URL parameters
    function autoFillFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const product = urlParams.get('product');
        const category = urlParams.get('category');
        
        if (product) {
            const productsField = quoteForm.querySelector('[name="products"]');
            if (productsField) {
                productsField.value = product;
            }
        }
        
        if (category) {
            const categoryField = quoteForm.querySelector('[name="category"]');
            if (categoryField) {
                categoryField.value = category;
            }
        }
    }

    // Character counter for textarea
    const textareas = quoteForm.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: left; font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;';
            
            const updateCounter = () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${remaining} حرف متبقي`;
                
                if (remaining < 50) {
                    counter.style.color = 'var(--accent-color)';
                } else {
                    counter.style.color = 'var(--text-light)';
                }
            };
            
            textarea.addEventListener('input', updateCounter);
            textarea.parentNode.appendChild(counter);
            updateCounter();
        }
    });

    // Initialize
    autoFillFromURL();

    console.log('Quote page loaded successfully!');
});

