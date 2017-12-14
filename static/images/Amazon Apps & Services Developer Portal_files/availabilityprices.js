$(document).ready(function() {
        /* begin price calculate */
        var priceInputFields = $("#currencies input[type!='hidden']");

        $('#pricing_auto').click(function(){
            var chargingOptionSelected = ($("input[name=charge]:checked").val() === 'yes');
            var fxRateAvailable = ($('#isFxRateAvailable').val() === 'true');
            priceInputFields.attr('readonly', 'readonly');
            if (!fxRateAvailable && chargingOptionSelected) {
                disableSaveButton();
                $('#noFxRate_Error_Banner').show();
                $('#price').attr('readonly', 'readonly');
                $('#base_currency').attr('disabled', 'disabled');
            } else {
                enableSaveButton();
                $('#noFxRate_Error_Banner').hide();
                $('#price').removeAttr('readonly');
                $('#base_currency').removeAttr('disabled');
            }
        });

        $('#pricing_custom').click(function(){
            priceInputFields.removeAttr('readonly');
            enableSaveButton();
            $('#noFxRate_Error_Banner').hide();
            $('#price').removeAttr('readonly');
            $('#base_currency').removeAttr('disabled');
        });

        // think of a better way of disabling this. srinath.
        var calculateListPricesChecked = $('#pricing_auto').attr('checked');
        if (calculateListPricesChecked != undefined && calculateListPricesChecked == 'checked') {
            priceInputFields.attr('readonly', 'readonly');
        }
        /* end price calculate */

        /* begin previous release */

        $('input[name=previousReleaseDateSet]').change(function(){
            if($(this).val() == 'true') {
                $('#released').show();
                $('#released input').prop('disabled', false);
            }else{
                $('#released').hide();
                $('#released input').prop('disabled', true);
            };
        });

        /* end previous release */

        $('#base_currency').change(function(){
            if($(this).val() != "") {
                recalcPrices($(this).val(), $('#price').val());
            }
        });

        $('#price').blur(function(){
            var curCode = $('#base_currency').val();
            var sourceAmt = removeSpaces($(this).val());
            $(this).val(sourceAmt);
            if(sourceAmt != "" && curCode != "") {
                recalcPrices(curCode, sourceAmt);
            }
        });

        $('#pricing_auto').change(function(){
            if ($(this).is(':checked')) {
                var curCode = $('#base_currency').val();
                var sourceAmt = $('#price').val();
                if(sourceAmt != "" && curCode != "") {
                    recalcPrices(curCode, sourceAmt);
                }
            }
        });

        /**
         * VAT free or not VAT free?
        $('#currencies input').change(function(){
            updatePricesWithVAT($(this).attr('id'), $(this).val());
        });
        */

        /**
         * Makes an AJAX call to calculate marketplace prices given a source currency and amount
         *
         * @param sourceCurrency  source currency code
         * @param amount  source currency amount
         */
        function recalcPrices(sourceCurrency, amount) {

            // check for i18n (e.g. 2.99 vs. 2,99)
            amount = unlocalizeNumber(amount);

            if(isNaN(amount)) {
                amount = 0.0;
            }

            if (sourceCurrency && $('#pricing_auto').is(':checked')) {
                /* AJAX call temporarily disabled in favor of pure client-side solution
                $.ajax({
                    url : '/application/er.json',
                    async : false,
                    data: "cur=" + sourceCurrency + "&amt=" + parseFloat(amount),
                    dataType : 'json',
                    type: 'GET',
                    success : function(data, tstatus, xhr) {
                        if (data) {
                          $(data.mktpPrices).each(function(idx, val) {
                            $(idEscape(val.marketplace)).val(val.price); 
                          });
                        }
                    },
                    error : function(xhr, tstatus, err) {
                        // TODO: change this to something better
                        alert(err.message);
                    }
                });
                */

                $("#currencies input[type!='hidden']").each(function(index) {

                    var targetCurrency = $(this).attr('currencyCode');
                    
                    var chargingOptionSelected = ($("input[name=charge]:checked").val() === 'yes');
                    var fxRateAvailable = ($('#isFxRateAvailable').val() === 'true');
                    
                    var adjustedPrice = 0.0;

                    if (fxRateAvailable) {
                        var rate = exchangerates[sourceCurrency][targetCurrency];

                        if (amount != 0) {
                            var rawPrice = rate * amount;
                            adjustedPrice = rawPrice;
                        }
                        if (adjustedPrice > 0) {

                            // Min.
                            var minPrice = $(this).attr('marketplaceCurrencyMin');
                            adjustedPrice = Math.max(adjustedPrice, minPrice);

                            // Max.
                            var maxPrice = $(this).attr('marketplaceCurrencyMax');
                            adjustedPrice = Math.min(adjustedPrice, maxPrice);
                        }
                        
                        // Precision.
                        var precision = $(this).attr('marketplaceCurrencyPrecision');
                        $(this).val(localizeNumber(adjustedPrice.toFixed(precision)));
                    } else if (chargingOptionSelected == false) {
                        $(this).val(localizeNumber('0.0'));
                    } else {
                        $(this).val(localizeNumber(''));
                    }
                });
            }
        }

        function unlocalizeNumber(localizedNumber) {
            var unlocalized = localizedNumber;
            if (DpConfig.decimalFormatLocalizedPattern) {
                /*
                 * Given a standard Java DecimalFormat pattern the grouping character
                 * is the character at the 1st index and the decimal character is at
                 * the 5th index. (e.g. #,##0.##).
                 */

                var groupingCharacter = DpConfig.decimalFormatLocalizedPattern.charAt(1);
                var decimalCharacter = DpConfig.decimalFormatLocalizedPattern.charAt(5);
                if (decimalCharacter && groupingCharacter) {
                    var amountReplaced = localizedNumber.replace(groupingCharacter, '').replace(decimalCharacter, '.');

                    if (!isNaN(amountReplaced)) {
                        unlocalized = amountReplaced;
                    }
                }
            }
            return unlocalized;
        }

        function localizeNumber(unlocalizedNumber) {
            var localizedNumber = unlocalizedNumber;
            if (DpConfig.decimalFormatLocalizedPattern) {
                var decimalCharacter = DpConfig.decimalFormatLocalizedPattern.charAt(5);
                if (decimalCharacter) {
                    localizedNumber = unlocalizedNumber.replace(".", decimalCharacter);
                }
            }
            return localizedNumber;
        }

        function updatePricesWithVAT(marketplace, price) {
            var el = $('#currencies span[id="vated_price_' + marketplace + '"]');
            var vatRate = vatrates[marketplace];
            var vprice = parseFloat(price) * (1+vatRate);
            if (!isNaN(vprice)) {
                el.text(vprice.toFixed(2));
            }
            else {
                el.text("0.00");
            }
        }

        /**
         * Removes all spaces from a string.
         */
        function removeSpaces(str) {
            var spacesRemoved = str.replace(/\s+/g, '');
            return spacesRemoved;
        }

        /**
         takes care of escaping '.' and ':' characters in an ID string and places a "#" at the beginning of the string
        */
        function idEscape(myid) {
            return '#' + myid.replace(/(:|\.)/g,'\\$1');
        }

        /* begin "Are you charging" */
        var chargingOptionSelected = ($("input[name=charge]:checked").val() === 'yes');
        if(chargingOptionSelected) {
            chargingSelected();
        } else {
            freeSelected();
        }

        $('input[name=charge]').change(function(){
            if($(this).val() == 'yes') {
                $('#price').val('');

                if($('#base_currency_label_not_dropdown').val() == undefined) {
                    $('#base_currency').val('');
                }

                chargingSelected();
            }
            else {
                freeSelected();
            };
            $(this).trigger('chargingOption:toggle');
        });

        function freeSelected() {
            // Hide the elements.
            $('#charging, #non-us, span[id$="baseListprice\\.errors"]').hide();

            // Set the values.
            $('#price').val('0');
            if($('#base_currency_label_not_dropdown').val() == undefined) {
                $('#base_currency').val('USD');
            }

            // Trigger the element's onChange event (so that #non-us prices are recalculated).
            $('#pricing_auto').click();
            $('#base_currency').change();
        }

        function chargingSelected() {
            // Trigger the element's onChange event (so that #non-us prices are recalculated).
            $('#base_currency').change();

            var fxRateAvailable = ($('#isFxRateAvailable').val() === 'true');
            // Show the elements.
            $('#charging, #non-us, span[id$="baseListprice\\.errors"]').show();
            if (!fxRateAvailable) {
                disableSaveButton();
                $('#noFxRate_Error_Banner').show();
                $('#price').attr('readonly', 'readonly');
                $('#base_currency').attr('disabled', 'disabled');
            } else {
                enableSaveButton();
                $('#price').removeAttr('readonly');
                $('#base_currency').removeAttr('disabled');
            }
        }
        /* end "Are you charging" */
});
