//Payment Info Page
$(document).ready(function() {

    if ($('#paymentFormCN').length > 0) {
        initializePaymentForm(pt5CountryChange);
    } else if ($('#paymentFormCA').length > 0) {
        initializePaymentForm(pt6CountryChange);
    } else if ($('#paymentFormBR').length > 0) {
        initializePaymentForm(pt7CountryChange);
    } else if ($('#paymentFormIN').length > 0) {
        initializePaymentForm(pt8CountryChange);
    } else if ($('#paymentFormAU').length > 0) {
        initializePaymentForm(pt9CountryChange);
    } else if ($('#paymentFormJP').length > 0) {
        initializePaymentForm(pt4CountryChange);
    } else if ($('#paymentFormBbanBic').length > 0) {
        initializePaymentForm(pt10CountryChange);
    } else if ($('#paymentFormHK').length > 0) {
        initializePaymentForm(pt11CountryChange);
    } else if ($('#paymentFormDefault').length > 0) {
        initializePaymentForm(pt0CountryChange);
    }

    //============================================================
    //
    //  Shared functions
    //
    //============================================================

    function initializePaymentForm(countryChangeHandler) {
        // Hide all fields
        $('.individual, .var, .unique').hide();

        // Show/Hide based on monetizing options
        $('input[name=monetizeApps], input[name=monetizeByAds]').change(function() {
            var monetizeApps = $('input[name=monetizeApps]:checked').val();
            var monetizeByAds = $('input[name=monetizeByAds]').length ? $('input[name=monetizeByAds]:checked').val() : 'false';
            if (monetizeApps == 'true' || monetizeByAds == 'true') {
                $('#deferMonetizationMsg').hide();
                $('#bankingCountry').trigger('change');
            } else {
                $('#deferMonetizationMsg').show();
                $('.var').hide();
            }
        });

        // Clear tokenized fields
        resetTokenizedFields();

        // country change
        $('#bankingCountry').bind('change', countryChangeHandler);

        // Load proper view state on page load.
        var monetizeApps = $('input[name=monetizeApps]:checked').val();
        var monetizeByAds = $('input[name=monetizeByAds]').length ? $('input[name=monetizeByAds]:checked').val() : 'false';
        if (monetizeApps == 'true' || monetizeByAds == 'true') {
            $('#bankingCountry').trigger('change');
        }
    }

    function resetInput(name) {
        $('input[name=' + name + ']').each(function(){
            $(this).val('');
        });
    }

    function resetTokenizedFields() {
        $('.tokenized').each(function(){
            $(this).val('');
        });
    }

    function isBlank(value) {
        return !value || value.trim().length === 0;
    }

    function ptCountryChange(initializer, paymentMethod) {
        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var homeCurrency = $(country).attr('homeCurrency');
        var countryName = $(country).attr('countryName');
        var countryCode = $(country).attr('code');
        var rdt = $(country).attr('rdt');
        var rdc = $(country).attr('rdc');

        var isMonetizeApp = $('input[name=monetizeApps]:checked').val();
        var isMonetizeAppByAds = $('input[name=monetizeByAds]').length ? $('input[name=monetizeByAds]:checked').val() : 'false';

        if (rdc === paymentMethod) {
            initializer(homeCurrency, countryName);
        } else {
            $('.var').hide();
            $('.transition').show();
            $('#bankingCountry').prop("disabled",true);
            var redirect = "/" + rdt;
            if (!isBlank(rdc)) {
                redirect += "/" + rdc;
            }
            redirect += "/payment.html?edit=true&vc=" + countryCode + "&monetizeApps=" + isMonetizeApp + "&monetizeByAds=" + isMonetizeAppByAds;
            window.location.href = redirect;
        }
    }

    function ptUpdateBankInfoList(paymentType,countryCode,currentBankNameElement,currentBankCodeElement,bankInfoList) {
        bankInfoList.children().remove();

        var regType = $('#regType').attr('registration');
        var authExpirationRedirect;
        var isMonetizeApp = $('input[name=monetizeApps]:checked').val();
        var isMonetizeAppByAds = $('input[name=monetizeByAds]').length ? $('input[name=monetizeByAds]:checked').val() : 'false';
        if (regType=='registration') {
            authExpirationRedirect = '/registration';
        } else {
            authExpirationRedirect = '/settings';
        }

        if (!isBlank(paymentType)) {
            authExpirationRedirect += '/' + paymentType;
        }

        authExpirationRedirect += '/payment.html?monetizeApps=' + isMonetizeApp + '&monetizeByAds=' + isMonetizeAppByAds + '&edit=true';

        $.ajax({
            url : '/bankInfo/'+countryCode+'/list.json',
            async : false,
            dataType : 'json',
            type: 'GET',
            success : function(data, tstatus, xhr) {
                if (xhr.getResponseHeader("X-Authentication-Timed-Out")=='true') {
                    var redirect = xhr.getResponseHeader("X-Redirect-To") + authExpirationRedirect;
                    $(location).attr('href',redirect);
                } else {
                    bankInfoList.children().remove();

                    var currentBankCode = currentBankCodeElement.val();
                    var currentBankName = currentBankNameElement.val();
                    var existing = false;

                   $(data.data).each(function(idx, val) {
                       bankInfoList.append($('<option/>').val(val.value).attr('code',val.code).html(val.name));
                       if ((currentBankCode==val.value) && (currentBankName==val.name)) {
                           existing = true;
                       }
                   });

                   if (currentBankCode!='') {
                       if (existing) {
                           bankInfoList.val(currentBankCode);
                       } else {
                           bankInfoList.val('_other');
                       }
                   }
                }
            },
            error : function(xhr, tstatus, err) {
                // Any errors, hide the list and allow only manual entries
                $('.ptBankList').hide();
                $('.ptOtherBank').show();

            }
        });
        bankInfoList.show();
    }

    //============================================================
    //
    //  PT0 functions
    //  (All payment types that aren't handled by a specialized
    //  controller, e.g. JPEFT)
    //
    //============================================================

    function pt0CountryChange() {
        $('#routing').bind('blur',trimRoutingNumber);
        $('#bic').bind('blur',updateBic);
        ptCountryChange(pt0InitializeState, '');

        $('#paymentMethod').change(paymentMethodChangeHandler);

        $('#same').change(function() {
            if ($(this).is(':checked')) {
                $('.unique').hide();
            } else {
                $('.unique').show();
            }
        });
    }

    function pt0InitializeState(homeCurrency, countryName) {
        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var countryCode = $(country).attr('code');
        var countryPaymentType = $(country).attr('ct');
        var bankList = $(country).attr('hasBankList');

        $('#bankAccountType').unbind('change', bankAccountTypeChange);
        $('#taxPayerIdLabel').addClass('optional');
        $('#bankNameCode').unbind('change', bankListChange);

        var msgCheck = DpMessages.paymentsCheck;
        var msgEft = DpMessages.paymentsElectronicFundsTransfer;
        var msgWireTransfer = DpMessages.paymentsWireTransfer;
        var msgElectronicPayment = DpMessages.paymentsElectronicPayment;

        switch(countryPaymentType) {

        case '1':
            $('.var').hide();
            $('.r1:not(".individual")').show();
            // changing the selected account type DOES change the view state.
            $('#bankAccountType').bind('change', bankAccountTypeChange);
            $('#taxPayerIdLabel').removeClass('optional');
            var paymentMethodOptions = {};
            paymentMethodOptions[msgEft] = 'EFT';
            setPaymentMethodOptions(paymentMethodOptions);
            break;
        case '12':
            $('.var').hide();
            $('.r12').show();
            var paymentMethodOptions = {};
            paymentMethodOptions[msgEft] = 'EFT';
            paymentMethodOptions[msgCheck] = 'CHECK';
            setPaymentMethodOptions(paymentMethodOptions);
            break;
        case '100':
            $('.var').hide();
            $('.r100').show();
            // changing the selected account type does NOT change the view state.
            $('.business').hide();
            $('.individual').hide();
            resetInput('taxPayerId');
            resetInput('ssn');
            var paymentMethodOptions = {};
            paymentMethodOptions[msgWireTransfer] = 'WIRE';
            paymentMethodOptions[msgCheck] = 'CHECK';
            setPaymentMethodOptions(paymentMethodOptions);
            break;
        case '999':
            $('.var').hide();
            $('.r999').show();
            resetInput('taxPayerId');
            var paymentMethodOptions = {};
            paymentMethodOptions[msgCheck] = 'CHECK';
            setPaymentMethodOptions(paymentMethodOptions);
            break;
        default :
            throw new Error('IllegalState');
            //break;
        }

        $('.currency:visible').each(function() {
            $(this).html(homeCurrency);
        });

        // show or hide the address fields when the state of the form changes.
        $('#paymentAddressCountry').val($('#bankingCountry').val());
        if($('#same:visible').length > 0) {
            $('#same').trigger('change');
        }
        else {
            $('.unique').hide();
        }

        // sync bank account type when the state of the form changes.
        if($('#bankAccountType:visible').length > 0) {
            $('#bankAccountType').trigger('change');
        }

        // sync payment type when the state of the form changes.
        if($('#paymentMethod:visible').length > 0) {
            $('#paymentMethod').trigger('change');
        }

        // sync address when the state of the form changes.
        if($('#same:visible').length > 0) {
            $('#same').trigger('change');
        }
        else {
            $('#same').prop('checked', true);
        }

        // Enable / Disable fields
        resetInput('addBankAccountNumber');
        resetInput('addBankAccountRoutingNumber');
        resetInput('addCheckAccountNumber');
        updateBic();

        if (bankList=='1') {
            updateBankInfoList(countryCode,$('#bankNameCode'));
        }

        $('#bankingCountry').prop("disabled", false);
        $('.country_list').show();
    }


    function setPaymentMethodOptions(optionArray) {
        $('#paymentMethod').unbind('change', paymentMethodChangeHandler);
        $('#paymentMethod').children().each(function() {
            $(this).remove();
        });

        var defPaymentType = $('#defPaymentMethod').attr('method');

        for( key in optionArray) {
            var value = optionArray[key];
            if (value==defPaymentType) {
                $('#paymentMethod').append('<option value="'+ value +'" selected>' + key + '</option>');
            } else {
                $('#paymentMethod').append('<option value="'+ value +'">' + key + '</option>');
            }
        }
        $('#paymentMethod').bind('change', paymentMethodChangeHandler);
    }

    // reset overloaded fields
    function resetInput(name) {
        $('input[name=' + name + ']').each(function(){
            $(this).val('');
            var disabled = !$(this).is(':visible');
            $(this).prop('disabled', disabled); // prevent this field from being sent as part of the form.
        })
    }

    function bankAccountTypeChange() {
        if ($('#bankAccountType option:selected').first().attr('business') == 'true') {
            $('.business').show();
            $('.individual').hide();
            $('.domestic_business').show();

        } else {
            $('.business').hide();
            $('.individual').show();
            $('.domestic_business').hide();
        }
        resetInput('taxPayerId');
        resetInput('ssn');
    }

    function paymentMethodChangeHandler() {
        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var countryPaymentType = $(country).attr('ct');
        var homeCurrency = $(country).attr('homeCurrency');
        var wireCurrency = $(country).attr('wireCurrency');

        if (countryPaymentType == '12') {
            if ($(this).val() == 'EFT') {
                $('.r12check').hide();
                $('.r12eft').show();
                resetInput('addBankAccountNumber');
                resetInput('addBankAccountRoutingNumber');
                resetInput('addCheckAccountNumber');
                useProfileAddress();
            } else {
                $('.r12eft').hide();
                $('.r12check').show();
            }
            $('.currency').each(function() {
                $(this).html(wireCurrency);
            });
        }
        else if (countryPaymentType == '100') {
            if ($(this).val() == 'WIRE') {
                $('.r100check').hide();
                $('.r100wire').show();
                resetInput('addBankAccountNumber');
                resetInput('addBankAccountRoutingNumber');
                resetInput('addCheckAccountNumber');
                useProfileAddress();
            } else {
                $('.r100wire').hide();
                $('.r100check').show();
            }
            $('.currency').each(function() {
                $(this).html(wireCurrency);
            });
        }


        // sync state backup with the selected account type.
        if($('#bankAccountType:visible').length > 0) {
            $('#bankAccountType').trigger('change');
        }
        // If intl bank account is visible, then hide the individual tax
        if($('#intlBankAccountType').length > 0) {
            $('.individual').hide();
        } else {
            $('.business').hide();
            resetInput('taxPayerId');
            resetInput('ssn');
        }
    }

    function useProfileAddress() {
        $('#same').prop("checked", true);
        $('#same').trigger('change');
    }


    function trimRoutingNumber() {
        var routingNumber = $('#routing').val();
        var routingNumberTrimmed = $.trim(routingNumber);
        $('#routing').val(routingNumberTrimmed);
    }

    function updateBic() {
        var bic =  $('#bic').val();
        $('#routing').prop("disabled", false);
        $('#routing').val($.trim(bic));

        $('#bic2').val($.trim(bic));
    }

    function bankListChange() {
        if ($('#bankNameCode option:selected').first().val() == '_other') {
            $('.r4OtherBank').show();
        } else {
            var bankName = $('#bankNameCode option:selected').first().html();
            var code = $('#bankNameCode option:selected').first().attr('code');
            $('.r4OtherBank').hide();
            $('#bankCode').val($.trim(code));
            $('#bankname').val($.trim(bankName));
        }
    }

    function updateBankInfoList(countryCode, bankInfoList) {
        bankInfoList.children().remove();

        $('#bankNameCode').unbind('change', bankListChange);

        var regType = $('#regType').attr('registration');
        var authExpirationRedirect;
        if (regType=='registration') {
            authExpirationRedirect = '/registration/payment.html?edit=true';
        } else {
            authExpirationRedirect = '/settings/payment.html?edit=true';
        }

        $.ajax({
            url : '/bankInfo/' + countryCode + '/list.json',
            async : false,
            dataType : 'json',
            type: 'GET',
            success : function(data, tstatus, xhr) {
                if (xhr.getResponseHeader("X-Authentication-Timed-Out")=='true') {
                    var redirect = xhr.getResponseHeader("X-Redirect-To") + authExpirationRedirect;
                    $(location).attr('href',redirect);
                } else {
                    bankInfoList.children().remove();

                    var currentBankCode = $('#bankCode').val();
                    var existing = false;

                   $(data.data).each(function(idx, val) {
                       bankInfoList.append($('<option/>').val(val.value).attr('code',val.code).html(val.name));
                       if (currentBankCode==val.value) {
                           existing = true;
                       }
                   });

                   if (currentBankCode!='') {
                       if (existing) {
                           bankInfoList.val(currentBankCode);
                       } else {
                           bankInfoList.val('_other');
                       }
                   }

                   $('#bankNameCode').bind('change',bankListChange);
                   bankListChange();
                }
            },
            error : function(xhr, tstatus, err) {
                // Any errors, hide the list and allow only manual entries
                $('.r4BankList').hide();
                $('.r4OtherBank').show();

            }
        });
        bankInfoList.show();
    }

    //============================================================
    //
    //  PT5 functions
    //
    //============================================================

    function pt5CountryChange() {

        var cnProfileComplete = $('#cnProfileCompleteDiv').attr('complete');
        if (cnProfileComplete == "true") {
            ptCountryChange(pt5InitializeState,'CNEFT');
        } else {
            ptCountryChange(pt5CNProfileIncompleteState,'CNEFT');
        }
    }

    function pt5InitializeState(homeCurrency, countryName) {

        $('#taxPayerIdLabel').addClass('optional');
        $('#pt5_taxType').unbind('change', pt5TaxTypeChange);
        $('#pt5_bankName').bind('blur',pt5UpdateBankName);
        $('#pt5_businessType').unbind('change', pt5BusTypeChange);

        $('.var').hide();
        $('.country_list').show();
        $('.pt5').show();
        $('.pt5_hidden').hide();

        $('#bankingCountry').prop("disabled",false);
        $('#pt5_taxType').bind('change', pt5TaxTypeChange);
        $('#pt5_taxType').trigger('change');
        $('#pt5_businessType').bind('change', pt5BusTypeChange);
        $('#pt5_businessType').trigger('change');

        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });

        var fixBizType = $('#fixedBizType').attr('biztype');
        if (fixBizType=='CORPORATION') {
            $('.pt5_business_type_corp').show();
            $('.pt5_business_type_individ').hide();
        } else if (fixBizType=='INDIVIDUAL') {
            $('.pt5_business_type_individ').show();
            $('.pt5_business_type_corp').hide();
        }
        pt5UpdateBankName();
        pt5TaxTypeChange();

    }

    function pt5CNProfileIncompleteState(homeCurrency,countryName) {
        $('.var').hide();
        $('.country_list').show();
        $('.pt5').show();
        $('#submit_button').hide();
        $('#cancel').hide();
    }

    function pt5BusTypeChange() {
        if ($('#pt5_businessType option:selected').first().attr('value') == 'CORPORATION') {
            $('.pt5_business_type_corp').show();
            $('.pt5_business_type_individ').hide();
        } else {
            $('.pt5_business_type_individ').show();
            $('.pt5_business_type_corp').hide();
        }
    }

    function pt5TaxTypeChange() {
        if ($('#pt5_taxType option:selected').first().attr('value') == 'BUSINESS_TAX') {
            $('.pt5_corporation_biz_tax').show();
            $('.pt5_corporation_vat').hide();
        } else {
            $('.pt5_corporation_vat').show();
            $('.pt5_corporation_biz_tax').hide();
        }
    }

    function pt5UpdateBankName() {
        var bankName = $('#pt5_bankName').val();
        $('#pt5_bank_name_hidden').prop("disabled",false);
        $('#pt5_bank_name_hidden').val($.trim(bankName));
    }

    //============================================================
    //
    //  PT6 functions
    //
    //============================================================

    function pt6CountryChange() {
        ptCountryChange(pt6InitializeState,'CAEFT');
    }

    function pt6InitializeState(homeCurrency,countryName) {

        $('#taxPayerIdLabel').addClass('optional');
        $('#pt6_paymentMethod').unbind('change', pt6PaymentTypeChange);

        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt6').show();
        $('.pt6_eft_hidden').hide();
        $('#pt6_bankNumber').bind('blur',pt6UpdateBankNumber);
        $('#pt6_branchCode').bind('blur',pt6UpdateBankNumber);


        $('#pt6_paymentMethod').bind('change', pt6PaymentTypeChange);
        $('#pt6_paymentMethod').trigger('change');
        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });
        pt6UpdateBankNumber();
        $('#pt6_paymentMethod').val('');

        var defPaymentType = $('#defPaymentMethod').attr('method');
        if (defPaymentType!='') {
            $('#pt6_paymentMethod').val(defPaymentType);
        }
        pt6PaymentTypeChange();
    }

    function pt6PaymentTypeChange() {
        if ($('#pt6_paymentMethod option:selected').first().attr('value') == 'CA_EFT_WIRE') {
            $('.pt6_eft_wire').show();
            $('.pt6_check').hide();
        } else {
            $('.pt6_eft_wire').hide();
            $('.pt6_check').show();
        }
        $('.pt6_eft_hidden').hide();
    }

    function pt6UpdateBankNumber() {
        var bankNumber = $('#pt6_bankNumber').val();
        var branchCode = $('#pt6_branchCode').val();
        var routingNumber = '0' + bankNumber + branchCode;
        $('#pt6_routing').prop("disabled",false);
        $('#pt6_routing').val($.trim(routingNumber));
    }

    //============================================================
    //
    //  PT7 functions
    //
    //============================================================

    function pt7CountryChange() {
        ptCountryChange(pt7InitializeState,'BREFT');
    }

    function pt7InitializeState(homeCurrency,countryName) {
        $('#taxPayerIdLabel').addClass('optional');
        $('#pt7_businessType').unbind('change', pt7BusinessTypeChange);
        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt7').show();
        $('.pt7_eft_hidden').hide();
        $('#pt7_bankNumber').bind('blur',pt7UpdateBankNumber);
        $('#pt7_branchCode').bind('blur',pt7UpdateBankNumber);
        $('#pt7_businessType').bind('change', pt7BusinessTypeChange);
        $('#pt7_businessType').trigger('change');

        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });
        $('#pt7bankNameCode').unbind('change', pt7BankListChange);
        ptUpdateBankInfoList('BREFT','BR',$('#pt7_bankName'),$('#pt7_bankNumber'),$('#pt7bankNameCode'));
        $('#pt7bankNameCode').bind('change',pt7BankListChange);

        pt7BankListChange();

        pt7UpdateBankNumber();
    }

    function leadingZeros(number,minwidth) {
        var padded = number;
        while (padded.length<minwidth) {
            padded = "0" + padded;
        }
        return padded;
    }

    function pt7UpdateBankNumber() {
        var bankNumber = $('#pt7_bankNumber').val();
        var branchCode = $('#pt7_branchCode').val();
        var routingNumber = bankNumber + leadingZeros(branchCode,5);
        $('#pt7_routing').prop("disabled",false);
        $('#pt7_routing').val($.trim(routingNumber));
    }

    function pt7BusinessTypeChange() {
        if ($('#pt7_businessType option:selected').first().attr('value') == 'CORPORATION') {
            $('.pt7_business_type_corporation').show();
            $('.pt7_business_type_individual').hide();
        } else {
            $('.pt7_business_type_corporation').hide();
            $('.pt7_business_type_individual').show();
        }
    }

    function pt7BankListChange() {
        if ($('#pt7bankNameCode option:selected').first().val() == '_other') {
            $('.ptOtherBank').show();
        } else {
            var bankName = $('#pt7bankNameCode option:selected').first().html();
            var code = $('#pt7bankNameCode option:selected').first().attr('code');
            $('.ptOtherBank').hide();
            $('#pt7_bankNumber').val($.trim(code));
            $('#pt7_bankName').val($.trim(bankName));
        }

        //Need to update back the routing number
        pt7UpdateBankNumber();
    }

    //============================================================
    //
    //  PT8 functions
    //
    //============================================================

    function pt8UpdateBankNumber() {
        var routingNumber = $('#pt8_ifsc_code').val().toUpperCase();
        $('#pt8_routing').prop("disabled",false);
        $('#pt8_routing').val($.trim(routingNumber));
    }

    function pt8CountryChange() {
        ptCountryChange(pt8InitializeState,'INEFT');
    }

    function pt8InitializeState(homeCurrency,countryName) {

        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt8').show();

        $('.pt8_eft_hidden').hide();
        $('#pt8_ifsc_code').bind('blur',pt8UpdateBankNumber);

        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });

        pt8UpdateBankNumber();
    }

    //============================================================
    //
    //  PT9 functions
    //
    //============================================================

    function pt9CountryChange() {
        ptCountryChange(pt9InitializeState,'AUEFT');
    }

    function pt9_enableEditAddress() {
        $('.pt9_address_ro').hide();
        $('.pt9_address_edit').show();
        $('#state_edit_acct_addr').attr('state','true');
    }

    function pt9_enableEditCheckAddress() {
        $('.pt9_check_address_ro').hide();
        $('.pt9_check_address_edit').show();
        $('#state_edit_check_addr').attr('state','true');
    }

    function pt9_enableEditAccountHolder() {
        $('.pt9_eft_account_holder_ro').hide();
        $('.pt9_eft_account_holder_edit').show();
        $('#state_edit_acct_holder').attr('state','true');
    }

    function pt9InitializeState(homeCurrency,countryName) {

        $('#pt9_paymentMethod').unbind('change', pt6PaymentTypeChange);

        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt9').show();

        $('.pt9_eft_account_holder_ro').hide();
        $('.pt9_eft_account_holder_edit').hide();
        $('.pt9_address_ro').hide();
        $('.pt9_address_edit').hide();
        $('.pt9_check_address_ro').hide();
        $('.pt9_check_address_edit').hide();

        $('#pt9_edit_address').bind('click',pt9_enableEditAddress);
        $('#pt9_edit_bank_account_holder').bind('click',pt9_enableEditAccountHolder);

        $('#pt9_edit_check_address').bind('click',pt9_enableEditCheckAddress);

        $('#pt9_swiftCode').bind('blur',pt9UpdateSwiftInput);

        $('#pt9_paymentMethod').bind('change', pt9PaymentTypeChange);
        $('#pt9_paymentMethod').trigger('change');
        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });
        pt6UpdateBankNumber();
        $('#pt9_paymentMethod').val('');

        var defPaymentType = $('#defPaymentMethod').attr('method');
        if (defPaymentType!='') {
            $('#pt9_paymentMethod').val(defPaymentType);
        }
        pt9PaymentTypeChange();
        pt9UpdateSwiftInput();
    }

    function pt9UpdateSwiftInput() {
        var swiftCode = $('#pt9_swiftCode').val();
        $('#pt9_swiftCodeInput').prop("disabled",false);
        $('#pt9_swiftCodeInput').val($.trim(swiftCode));
    }

    function pt9PaymentTypeChange() {

        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var countryCode = $(country).attr('code');

        if ($('#pt9_paymentMethod option:selected').first().attr('value') == 'AU_EFT_WIRE') {
            $('.pt9_eft_wire').show();
            $('.pt9_check').hide();

            if ($('#state_edit_acct_addr').attr('state')=='true') {
                $('.pt9_address_ro').hide();
                $('.pt9_address_edit').show();
            } else {
                $('.pt9_address_ro').show();
                $('.pt9_address_edit').hide();
            }
            if ($('#state_edit_acct_holder').attr('state')=='true') {
                $('.pt9_eft_account_holder_ro').hide();
                $('.pt9_eft_account_holder_edit').show();
            } else {
                $('.pt9_eft_account_holder_ro').show();
                $('.pt9_eft_account_holder_edit').hide();
            }
            $('.pt9_check_address_ro').hide();
            $('.pt9_check_address_edit').hide();

            // Clear tokenized fields
            resetTokenizedFields();

            if (countryCode=='AU') {
                $('#pt9_bsbNumber').val('');
                $('.pt9_eft_wire_au').show();
            } else {
                $('.pt9_eft_wire_au').hide();
                $('#pt9_bsbNumber').val('123456');
            }
        } else {
            $('.pt9_eft_wire').hide();
            $('.pt9_eft_wire_au').hide();
            $('.pt9_check').show();

            if ($('#state_edit_check_addr').attr('state')=='true') {
                $('.pt9_check_address_ro').hide();
                $('.pt9_check_address_edit').show();
            } else {
                $('.pt9_check_address_ro').show();
                $('.pt9_check_address_edit').hide();
            }
            $('.pt9_eft_account_holder_ro').hide();
            $('.pt9_eft_account_holder_edit').hide();
        }
        $('.pt9_eft_hidden').hide();
    }

    //============================================================
    //
    //  PT10 functions
    //
    //============================================================

    function pt10CountryChange() {
        ptCountryChange(pt10InitializeState,'BbanBicEFTWire');
    }

    function pt10_enableEditAddress() {
        $('.pt10_address_ro').hide();
        $('.pt10_address_edit').show();
        $('#state_edit_acct_addr').attr('state','true');
    }

    function pt10_enableEditCheckAddress() {
        $('.pt10_check_address_ro').hide();
        $('.pt10_check_address_edit').show();
        $('#state_edit_check_addr').attr('state','true');
    }

    function pt10_enableEditAccountHolder() {
        $('.pt10_eft_account_holder_ro').hide();
        $('.pt10_eft_account_holder_edit').show();
        $('#state_edit_acct_holder').attr('state','true');
    }

    function pt10InitializeState(homeCurrency,countryName) {

        // Using pt6 (CA) here to keep parity with the AU code path.
        $('#pt10_paymentMethod').unbind('change', pt6PaymentTypeChange);

        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt10').show();

        $('.pt10_eft_account_holder_ro').hide();
        $('.pt10_eft_account_holder_edit').hide();
        $('.pt10_address_ro').hide();
        $('.pt10_address_edit').hide();
        $('.pt10_check_address_ro').hide();
        $('.pt10_check_address_edit').hide();

        $('#pt10_edit_address').bind('click',pt10_enableEditAddress);
        $('#pt10_edit_bank_account_holder').bind('click',pt10_enableEditAccountHolder);

        $('#pt10_edit_check_address').bind('click',pt10_enableEditCheckAddress);

        $('#pt10_swiftCode').bind('blur',pt10UpdateSwiftInput);

        $('#pt10_paymentMethod').bind('change', pt10PaymentTypeChange);
        $('#pt10_paymentMethod').trigger('change');
        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });
        pt6UpdateBankNumber();
        $('#pt10_paymentMethod').val('');

        var defPaymentType = $('#defPaymentMethod').attr('method');
        if (defPaymentType!='') {
            $('#pt10_paymentMethod').val(defPaymentType);
        }
        pt10PaymentTypeChange();
        pt10UpdateSwiftInput();
    }

    function pt10UpdateSwiftInput() {
        var swiftCode = $('#pt10_swiftCode').val();
        $('#pt10_swiftCodeInput').prop("disabled",false);
        $('#pt10_swiftCodeInput').val($.trim(swiftCode));
    }

    function pt10PaymentTypeChange() {

        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var countryCode = $(country).attr('code');

        if ($('#pt10_paymentMethod option:selected').first().attr('value') == 'BBAN_BIC_EFT_WIRE') {
            $('.pt10_eft_wire').show();
            $('.pt10_check').hide();

            if ($('#state_edit_acct_addr').attr('state')=='true') {
                $('.pt10_address_ro').hide();
                $('.pt10_address_edit').show();
            } else {
                $('.pt10_address_ro').show();
                $('.pt10_address_edit').hide();
            }
            if ($('#state_edit_acct_holder').attr('state')=='true') {
                $('.pt10_eft_account_holder_ro').hide();
                $('.pt10_eft_account_holder_edit').show();
            } else {
                $('.pt10_eft_account_holder_ro').show();
                $('.pt10_eft_account_holder_edit').hide();
            }
            $('.pt10_check_address_ro').hide();
            $('.pt10_check_address_edit').hide();

            $('.pt10_eft_wire_hide').hide();
            $('#pt10_routingNumber').val('12345678');

            // Clear tokenized fields
            resetTokenizedFields();
        } else {
            $('.pt10_eft_wire').hide();
            $('.pt10_eft_wire_au').hide();
            $('.pt10_check').show();

            if ($('#state_edit_check_addr').attr('state')=='true') {
                $('.pt10_check_address_ro').hide();
                $('.pt10_check_address_edit').show();
            } else {
                $('.pt10_check_address_ro').show();
                $('.pt10_check_address_edit').hide();
            }
            $('.pt10_eft_account_holder_ro').hide();
            $('.pt10_eft_account_holder_edit').hide();

            $('.pt10_eft_wire_hide').hide();
            $('#pt10_routingNumber').val('12345678');
        }
        $('.pt10_eft_hidden').hide();
    }

    //============================================================
    //
    //  PT11 functions
    //
    //============================================================

    function pt11CountryChange() {
        ptCountryChange(pt11InitializeState,'HKEFT');
    }

    function pt11_enableEditAddress() {
        $('.pt11_address_ro').hide();
        $('.pt11_address_edit').show();
        $('#state_edit_acct_addr').attr('state','true');
    }

    function pt11_enableEditCheckAddress() {
        $('.pt11_check_address_ro').hide();
        $('.pt11_check_address_edit').show();
        $('#state_edit_check_addr').attr('state','true');
    }

    function pt11_enableEditAccountHolder() {
        $('.pt11_eft_account_holder_ro').hide();
        $('.pt11_eft_account_holder_edit').show();
        $('#state_edit_acct_holder').attr('state','true');
    }

    function pt11InitializeState(homeCurrency,countryName) {

        // Using pt6 (CA) here to keep parity with the AU code path.
        $('#pt11_paymentMethod').unbind('change', pt6PaymentTypeChange);

        $('.var').hide();
        $('#bankingCountry').prop("disabled",false);
        $('.country_list').show();
        $('.pt11').show();

        $('.pt11_eft_account_holder_ro').hide();
        $('.pt11_eft_account_holder_edit').hide();
        $('.pt11_address_ro').hide();
        $('.pt11_address_edit').hide();
        $('.pt11_check_address_ro').hide();
        $('.pt11_check_address_edit').hide();

        $('#pt11_edit_address').bind('click',pt11_enableEditAddress);
        $('#pt11_edit_bank_account_holder').bind('click',pt11_enableEditAccountHolder);

        $('#pt11_edit_check_address').bind('click',pt11_enableEditCheckAddress);

        $('#pt11_addBankAccountRoutingNumber').bind('blur',pt11UpdateBankInput);

        $('#pt11_paymentMethod').bind('change', pt11PaymentTypeChange);
        $('#pt11_paymentMethod').trigger('change');
        $('.currency').each(function() {
            $(this).html(homeCurrency);
        });
        $('.country_label').each(function() {
            $(this).html(countryName);
        });
        pt6UpdateBankNumber();
        $('#pt11_paymentMethod').val('');

        var defPaymentType = $('#defPaymentMethod').attr('method');
        if (defPaymentType!='') {
            $('#pt11_paymentMethod').val(defPaymentType);
        }
        pt11PaymentTypeChange();
        pt11UpdateBankInput();
    }

    function pt11UpdateBankInput() {
        var bankAccountRoutingNumber = $('#pt11_addBankAccountRoutingNumber').val();
        $('#pt11_addBankAccountRoutingNumberInput').prop("disabled",false);
        $('#pt11_addBankAccountRoutingNumberInput').val($.trim(bankAccountRoutingNumber));
    }


    function pt11PaymentTypeChange() {

        var selected = $('#bankingCountry').find("option[value='" + $('#bankingCountry').val() + "']");
        var country = selected[0];
        var countryCode = $(country).attr('code');

        if ($('#pt11_paymentMethod option:selected').first().attr('value') == 'HK_EFT') {
            $('.pt11_eft_wire').show();
            $('.pt11_check').hide();

            if ($('#state_edit_acct_addr').attr('state')=='true') {
                $('.pt11_address_ro').hide();
                $('.pt11_address_edit').show();
            } else {
                $('.pt11_address_ro').show();
                $('.pt11_address_edit').hide();
            }
            if ($('#state_edit_acct_holder').attr('state')=='true') {
                $('.pt11_eft_account_holder_ro').hide();
                $('.pt11_eft_account_holder_edit').show();
            } else {
                $('.pt11_eft_account_holder_ro').show();
                $('.pt11_eft_account_holder_edit').hide();
            }
            $('.pt11_check_address_ro').hide();
            $('.pt11_check_address_edit').hide();

            // Clear tokenized fields
            resetTokenizedFields();
        } else {
            $('.pt11_eft_wire').hide();
            $('.pt11_eft_wire_au').hide();
            $('.pt11_check').show();

            if ($('#state_edit_check_addr').attr('state')=='true') {
                $('.pt11_check_address_ro').hide();
                $('.pt11_check_address_edit').show();
            } else {
                $('.pt11_check_address_ro').show();
                $('.pt11_check_address_edit').hide();
            }
            $('.pt11_eft_account_holder_ro').hide();
            $('.pt11_eft_account_holder_edit').hide();
        }
        $('.pt11_eft_hidden').hide();
    }

    //============================================================
    //
    //  PT4 functions - JAPAN EFT
    //
    //============================================================

    function pt4CountryChange() {
        ptCountryChange(pt4InitializeState,'JPEFT');
    }

    //============================================================
    // Automatically trim text values
    //============================================================
    function autoTrimTextInput() {
        $('input[type=text], textarea').blur(function() {
            var value = $.trim($(this).val());
            $(this).val(value);
        });
    }

    function pt4InitializeState(homeCurrency,countryName) {
        $('.var').hide();

        autoTrimTextInput();

        //TODO: No idea. Ask Steve
        //$('#taxPayerIdLabel').addClass('optional');

        //Show country list
        $('.country_list').show();
        $('#bankingCountry').prop("disabled",false);

        // Handle Payment method change
        $('.pt4').show();
        // Set default method if it exists. Otherwise, get the first available option
        var defPaymentType = $('#defPaymentMethod').attr('method');
        var firstPaymentMethodOption = $('#pt4_paymentMethod option').first().attr('value');
        $('#pt4_paymentMethod').val(defPaymentType!=''? defPaymentType : firstPaymentMethodOption);
        $('#pt4_paymentMethod').unbind('change', pt4PaymentTypeChange);
        $('#pt4_paymentMethod').bind('change', pt4PaymentTypeChange);
        pt4PaymentTypeChange();

        // Handle bank code list dropdown list
        $('#pt4bankNameCode').unbind('change', pt4BankListChange);
        $('#pt4bankNameCode').bind('change',pt4BankListChange);
        pt4BankListChange();

        // Pre-select the first bank
        $('#pt4bankNameCode option').first().attr("selected", true);

        // Handle mailing checkbox
        $('#same').unbind('change', pt4UseDefaultAddressChange);
        $('#same').bind('change', pt4UseDefaultAddressChange);

        // Handle combine routing number
        $('#pt4_bankCode').bind('blur',pt4UpdateBankNumber);
        $('#pt4_branchCode').bind('blur',pt4UpdateBankNumber);

        // Handle update computed account number from user-input account number
        $('#pt4_addCheckAccountNumber').bind('blur',updateJPBankAccountNumber);
        $('#pt4_jpBankAccountType').bind('change',updateJPBankAccountNumber);
    }

    // Function to switch between eft wire and mailing check mode
    function pt4PaymentTypeChange() {
        if ($('#pt4_paymentMethod option:selected').first().attr('value') == 'JP_EFT_WIRE') {
            $('.pt4_eft_wire').show();
            $('.pt4_check').hide();
        } else {
            $('.pt4_eft_wire').hide();
            $('.pt4_check').show();
            // When switching to check, always set default mailing address
            useProfileAddress();
        }
        $('.pt4_hidden').hide();
    }

    // Update the hidden computed routing field
    // Logic: routing number = bankCode+branchCode
    function pt4UpdateBankNumber() {
        var bankNumber = $('#pt4_bankCode').val();
        var branchCode = $('#pt4_branchCode').val();
        var routingNumber = bankNumber + branchCode;
        $('#pt4_routing').prop("disabled",false);
        $('#pt4_routing').val($.trim(routingNumber));
    }

    // Bank selection handler
    function pt4BankListChange() {

        var selectedBankNameCode = $('#pt4bankNameCode option:selected').first();
        if (selectedBankNameCode.val() == '_other') {
            $('.pt4OtherBank').show();
        } else {
            var bankName = selectedBankNameCode.html();
            var code = selectedBankNameCode.attr('code');
            $('.pt4OtherBank').hide();
            $('#pt4_bankCode').val($.trim(code));
            $('#pt4_bankName').val($.trim(bankName));
        }

        pt4UpdateBankNumber();
    }

    function useProfileAddress() {
        $('#same').prop("checked", true);
        pt4UseDefaultAddressChange();
    }

    // Handle use default address checkbox
    function pt4UseDefaultAddressChange() {
        if ($('#same').is(':checked')) {
            $('.unique').hide();
        } else {
            $('.unique').show();
        }
    }

    // Function to update computed account number
    // Logic: base on account type, there will be a different prefix value in addtional to the user-input account number
    function updateJPBankAccountNumber() {
        var userAccountNumber = $('#pt4_addCheckAccountNumber').val();
        var jpSelectedAccountTypeCode = $('#pt4_jpBankAccountType option:selected').first().attr('accountTypeCode');
        var accountNumber = jpSelectedAccountTypeCode + userAccountNumber;
        $('#account').prop("disabled",false);
        $('#account').val($.trim(accountNumber));
    }
});
