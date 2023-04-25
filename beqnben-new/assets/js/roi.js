$(document).ready(function() {

    const MIN_FIELD_MONTHLY_CALL_VOLUME = 6000;

    function addFormatter (input, formatFn, callback) {
        let oldValue = input.value;

        const handleInput = event => {
            const result = formatFn(input.value, oldValue, event);
            if (typeof result === 'string') {
                input.value = result;
            }

            oldValue = input.value;

            if (callback !== undefined) {
                callback(input, result)
            }
        }

        handleInput();
        input.addEventListener("input", handleInput);
    }

    function createRegexFormatter (regex, defaultValue) {
        return (newValue, oldValue) => regex.test(newValue)
            ? newValue
            : (newValue ? oldValue : defaultValue);
    }

    const formatNumber = (number) => {
        let numberString = number.toString().replace('.', '');
        if (numberString.length > 3) {
            const parts = [];
            const length = numberString.length;
            let count = 0;
            let part = '';
            for (let i = length - 1; i >= 0 ; i--){
                if (count < 3 && i >= 0) {
                    part += numberString[i]
                    count++;
                } else {
                    parts.push(part);
                    part = numberString[i];
                    count = 1;
                }
            }
            if (part.length >  0) parts.push(part);
            const reversed = parts.join('.');
            let normal = '';
            for (let i = reversed.length - 1; i >=0; i--) {
                normal += reversed[i];
            }
            return normal;
        } else {
            return numberString;
        }
    }

    class Roi {
        constructor() {
            this.step = 1;
            this.steps = $('.roi-step');
            this.stepsProgress = $('.steps-wrap .steps li');
            this.modalError = $('#roi-modal');
            //fields step 1
            this.fieldMonthlyCallVolume = $('#field-monthly_call_volume');
            //fields step 2
            this.fieldAssumptions = $('#field-assumptions');
            this.fieldCostPerCall = $('#field-cost_per_call');
            this.fieldCostPerCallAHT = $('#field-cost_per_call_aht');
            this.fieldAgentSalary = $('#field-agent_salary');
            this.fieldTimeOnPhone = $('#field-time_on_phone');
            // fields step 3
            this.fieldFirstName = $('#field-first_name');
            this.fieldLastName = $('#field-last_name');
            this.fieldPhoneNumber = $('#field-phone_number');
            this.fieldWorkEmail = $('#field-work_email');
            this.fieldComapnyName = $('#field-company_name');

            this.buttonNextStep2 = $('#btn-step-2');
            this.buttonSubmit = $('#btn-submit');
            this.completedSteps = [false, false, false, false];
            this.stepNames = ['Call Volume', 'Operation Cost', 'Contact Info / Submit'];
            this.range();
            this.initInput();
            this.initEvents();
        }

        initEvents() {
            $('[data-step]').on('click', (e) => {
                e.preventDefault;
                const nextStep = parseInt(e.target.dataset.step);
                if(typeof nextStep !== 'undefined' && nextStep > 0) {
                    this.updateStep(nextStep);
                }
            })

            $('[data-assumptions]').on('click', (e) => {
                const value = e.target.dataset.assumptions;
                if(typeof value !== 'undefined') {
                    this.fieldAssumptions.val(value);
                    this.buttonNextStep2.removeClass('disabled');
                }
            });

            this.buttonSubmit.on('click', (e) => {
                e.preventDefault();
                this.submitForm();
            })
        }

        initInput() {
            addFormatter(this.fieldCostPerCallAHT[0], createRegexFormatter(/ min$/, ' min'), input => {
                const pos = Math.max(0, input.value.length - 4)
                input.setSelectionRange(pos, pos);
            });

            addFormatter(this.fieldTimeOnPhone[0], createRegexFormatter(/%$/, '%'), input => {
                const pos = Math.max(0, input.value.length - 1)
                input.setSelectionRange(pos, pos);
            });

            this.fieldMonthlyCallVolume.on('keyup', (event) => {
                let currentValue = event.target.value.replace(/\./g, '').replace(/\D/g, "");
                if(currentValue === '') {
                    currentValue = 0;
                }
                currentValue = Number.parseInt(currentValue).toLocaleString('en-US');
                event.target.value = currentValue;
            }).trigger('keyup');
        }

        errorShow(el) {
            el[0].reportValidity();
            el.addClass('error');
        }

        errorHide(el) {
            el.removeClass('error');
        }

        validateRequiredString(el) {
            if(el.val().length === 0) {
                this.validated = false;
                this.errorShow(el);
            } else {
                this.errorHide(el);
            }
        }

        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        validateRequiredEmail(el) {
            if(!this.validateEmail(el.val())) {
                this.validated = false;
                this.errorShow(el);
            } else {
                this.errorHide(el);
            }
        }

        validateRequiredFloat(el) {
            const value = parseFloat(el.val());
            if(value <= 0 || isNaN(value)) {
                this.validated = false;
                this.errorShow(el);
            } else {
                this.errorHide(el);
            }
        }

        submitForm() {
            this.validated = true;
            this.validateRequiredString(this.fieldComapnyName);
            this.validateRequiredEmail(this.fieldWorkEmail);
            this.validateRequiredString(this.fieldPhoneNumber);
            this.validateRequiredString(this.fieldLastName);
            this.validateRequiredString(this.fieldFirstName);

            if(! this.validated) {
                return false;
            }
            const submitButtonLabel = this.buttonSubmit.text();
            this.buttonSubmit.addClass('disabled').text('Submitting...');

            const form = $('#roi-form');
            const formData = new FormData(form[0]);
            this.trackStep();
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData,
                processData: false,
                contentType: false,
                success: data => {
                    this.buttonSubmit
                        .text(submitButtonLabel)
                        .removeClass('disabled');
                    if(data.status === 'success') {
                        // console.log(data);
                        window.location = data.url;
                    }

                    if(data.status == 'error') {
                        form.prepend(`<div class="error-message">${data.message}</div>`)
                        setTimeout(() => {
                            form.find('.error').fadeOut();
                        }, 3200);
                    }
                }
            });

        }

        trackStep() {
            const step = this.step - 1;

            if(this.completedSteps[step])
                return;

            this.completedSteps[step] = true;

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'ROI Calculator',
                'ROI Step Completed': this.stepNames[step]
            });
        }

        updateStep(newStep) {
            this.validated = true;
            if(this.step === 1) {
                const field_monthly_call_volume = parseInt(document.getElementById('field-monthly_call_volume')
                    .value.toString().replace('.', '').replace(',', ''));

                if(field_monthly_call_volume <= MIN_FIELD_MONTHLY_CALL_VOLUME) {
                    $('#roiModal').foundation('open');
                    // $('body').addClass('modal-active');
                    // $('.modal').removeClass('show');
                    // this.modalError.addClass('show');
                    return false;
                }
            }

            if(this.step === 2 && newStep === 3) {
                if(this.fieldAssumptions.val() === 'cpc') {

                    this.validateRequiredFloat(this.fieldCostPerCall);

                } else if(this.fieldAssumptions.val() === 'aas') {

                    this.validateRequiredFloat(this.fieldAgentSalary);
                    this.validateRequiredFloat(this.fieldTimeOnPhone);

                } else {
                    return false;
                }
            }

            if(! this.validated) {
                return false;
            }

            this.trackStep();

            this.step = newStep;

            this.steps.css({
                'display' : 'none'
            });

            this.steps.eq(newStep - 1).css({
                'display' : 'block'
            });

            this.stepsProgress.removeClass('progress');
            for(let i = 0; i < newStep; i++) {
                this.stepsProgress.eq(i).addClass('progress');
            }
            window.location.hash = newStep;
        }

        range () {
            var $document = $(document);
            var selector = '[data-rangeslider]';
            var $elements = $(selector);

            $elements.parent().find('.info-popup').hide();

            function change_val(e, el) {
                const $inputRange = $(selector, e.target.parentNode);
                let value = $($(el), e.target.parentNode)[0].value;

                value = value.toString().replace('.', '').replace(',', '');

                if($(el).hasClass('expand-max') && value > parseInt($inputRange[0].max)) {
                    $inputRange.attr('max', value);
                    $inputRange.rangeslider('update',true);
                }

                $inputRange.val(value).change();
            }

            $('.info-popup .close').click(function(e) {
                e.preventDefault();
                $(this).parent().hide();
            })

            function valueOutput(element) {
                const value = element.value;
                const input = element.parentNode.querySelectorAll('.range-input')[0];
                input.value = value;
                input.dispatchEvent(new Event('keyup'));
            }

            $document.on('input', 'input[type="range"], ' + selector, function(e) {
                valueOutput(e.target);
            });

            $document.on('keydown', '.range-value .range-input', function(e) {
                if(e.which == 13) {
                    change_val(e, this);
                }
            });

            $document.on('blur', '.range-value .range-input', function (e) {
                change_val(e, this);
            });

            $document.on('keyup', '.range-value .range-input', function(e) {
                $(this).parent().find('.info-popup').hide();
            });

            $elements.each((index, element) => {
                const $element = $(element);
                const popupMin = $element.parent().find('.info-popup-min');
                const popupMax = $element.parent().find('.info-popup-max');
                $element.rangeslider({

                    // Deactivate the feature detection
                    polyfill: false,

                    // Callback function
                    onInit: function() {
                        valueOutput(this.$element[0]);
                    },

                    // Callback function
                    onSlide: function(position, value) {
                        if(popupMin.length) {
                            if( value === this.min) {
                                popupMin.css({
                                    'display' : 'block'
                                })
                            } else {
                                popupMin.css({
                                    'display' : 'none'
                                })
                            }
                        }

                        if(popupMax.length) {
                            if( value >= this.max) {
                                popupMax.css({
                                    'display' : 'block'
                                })
                            } else {
                                popupMax.css({
                                    'display' : 'none'
                                })
                            }
                        }
                        valueOutput(this.$element[0]);
                    },

                    // Callback function
                    onSlideEnd: function(position, value) {
                        // console.log('onSlideEnd');
                        // console.log('position: ' + position, 'value: ' + value);
                    }
                });
            });
        }
    }


    const calculatorEl = document.getElementById('roi-calculator');
    if(calculatorEl) {
        const calculator = new Roi(calculatorEl);

    }
        
});