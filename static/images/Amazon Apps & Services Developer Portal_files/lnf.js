// a placeholder for look and feel js.


// Application General Info Page

$(document).ready(function() {	
    $('#website, #privacyPolicyUrl').blur(function() {
        defaultSchemelessUrlFieldsToHttp($(this));
    });

	// Show or Hide contact support info
	if($('#itemsection_general').length > 0) {
		var email =  $('.unique #defaultEmail').val();
		var phone =  $('.unique #defaultPhone').val();
		var website = $('.unique #defaultWebsite').val();
		var email2 =  email;
		var phone2 =  phone;
		var website2 = website;
		if($('#same').is(':checked')) {
			$('.unique input').attr("disabled", "disabled");
			$('.unique #email').val(email);
			$('.unique #phone').val(phone);
			$('.unique #website').val(website);
		}
		$('#same').change(function() {
			if($(this).is(':checked')) {
				$('.unique input').attr("disabled", "disabled");
				email2 =  $('.unique #email').val();
				phone2 =  $('.unique #phone').val();
				website2 = $('.unique #website').val();
				$('.unique #email').val(email);
				$('.unique #phone').val(phone);
				$('.unique #website').val(website);
				
			}else{
				$('.unique input').removeAttr("disabled");
				$('.unique #email').val(email2);
				$('.unique #phone').val(phone2);
				$('.unique #website').val(website2);
			};
		});
		
	}
});

function disableInput() {
	$('#sdList input').each(function() {
        var id = $(this).attr('id');
        $('#'+id).removeAttr("disabled");
    });

}

function sanitizeManifestURL(){
         
	var sample= $("#sampleManifest").val();

	if($("#manifestURL").val() == sample) {
		$("#manifestURL").val('');
	}
}

function disableOneClickSubmits() {
	$(".one-click-submit").each(function() {
		$(this).addClass('disabled'); // Make the button disable
		$(this).removeClass('primary'); // remove the primary lnf from the button.
		$(this).prop('disabled', true); // Make the button not work
		$(this).unbind('click'); // remove all click binding to this button, including this one.
	});
	
	$(".one-click-disable").each(function() {
		$(this).addClass('disabled'); // Make the button disable
		$(this).removeClass('primary'); // remove the primary lnf from the button.
		$(this).prop('disabled', true); // Make the button not work
		$(this).unbind('click'); // remove all click binding to this button, including this one.
	});
}

function enableOneClickSubmits() {
	$(".one-click-submit").each(function() {
		$(this).removeClass('disabled');
		$(this).addClass('primary');
		$(this).prop('disabled', false);
		$(this).bind('click');
	});
	
	$(".one-click-disable").each(function() {
		$(this).removeClass('disabled');
		$(this).addClass('primary');
		$(this).prop('disabled', false);
		$(this).bind('click');
	});
}

function disableAssetSubmits() {
	$(".asset-one-click-submit").each(function() {
		$(this).closest('.asset').addClass('disabled');
		
		if (!$.support.opacity) {
			// For IE7 and IE8 disabled doesn't work correctly so
			// the readonly property instead		
			$(this).prop('readonly', true); // Make the button not work
		}
		else {
			$(this).prop('disabled', true); // Make the button not work
		}
		$(this).unbind('click'); // remove all click binding to this button, including this one.
	});
}

function setAssetFormPropsAndSubmit(field, changeForm){
	var form = $(field).closest('form');
	if (typeof changeForm !== 'undefined') {
		form = changeForm;
	}

	var submitType = $(field).prop('name');
	
	if(submitType) {
		
		var submitTypeHidden = $('#assetSubmitTypeHidden');
		if (submitTypeHidden.length > 0){
			submitTypeHidden.attr({
				name: submitType
			});
		} else {
			// create hidden element for the type of name on the form
			$('<input id="assetSubmitTypeHidden" type = "hidden">').attr({
				name: submitType
			}).appendTo(form);
		}
	}

	var actionId = $(field).attr('actionid');
	if(actionId) {
		var actionIdHidden = $('#assetActionIdHidden');
		if (actionIdHidden.length > 0){
			actionIdHidden.attr({
				name: 'actionId',
				value: actionId
			});
		} else {
			// create hidden element for the type of submission on the form
			$('<input id="assetActionIdHidden" type = "hidden">').attr({
				name: 'actionId',
				value: actionId
			}).appendTo(form);
		}
	}

	var actionType = $(field).attr('actiontype');
	if(actionType) {
		var actionTypeHidden = $('#assetActionTypeHidden');
		if (actionTypeHidden.length > 0){
			actionTypeHidden.attr({
				name: 'actionType',
				value: actionType
			});
		} else {
			// create hidden element for the type of submission on the form
			$('<input id="assetActionTypeHidden" type = "hidden">').attr({
				name: 'actionType',
				value: actionType
			}).appendTo(form);
		}
	}
	
	form.submit();
}

function resetAssetFormProps(form){

	var submitTypeHidden = form.find('#assetSubmitTypeHidden');
	if (submitTypeHidden.length > 0){
		submitTypeHidden.attr({
			name: ''
		});
	}

	var actionIdHidden = form.find('#assetActionIdHidden');
	if (actionIdHidden.length > 0){
		actionIdHidden.attr({
			name: 'actionId',
			value: ''
		});
	}

	var actionTypeHidden = form.find('#assetActionTypeHidden');
	if (actionTypeHidden.length > 0){
		actionTypeHidden.attr({
			name: 'actionType',
			value: ''
		});
	}
}

function doBundleFormPost(field){
	setAssetFormPropsAndSubmit(field);
	var form = $(field).closest('form');
	resetAssetFormProps(form);
}

function downloadBinaryOnLoad(form){
	
	$('<input id="assetActionTypeHidden" type = "hidden">').attr({
        name: 'actionType',
        value: 'initiateDownload'
    }).appendTo(form);
	$('<input id="assetSubmitTypeHidden" type = "hidden">').attr({
        name: 'binaryDownload'
    }).appendTo(form);
	
	form.submit();
	
	resetAssetFormProps(form);
}

function showUnacknowledgedWarningError() {

    $('#unacknowledged_warning_error').show();
    $('html,body').animate(
            {scrollTop: $('#unacknowledged_warning_error').offset().top },
            { duration: 'slow', easing: 'swing'}
    );
}

$(document).ready(function() {
        $('#popover_submit').click(function() {

	    var warningAcknowledgementRequired = $(this).hasClass('warning-not-acknowledged');
	    if(!warningAcknowledgementRequired) {
	    	// Don't show a confirmation dialog
	    	preventBrowserConfirmationDialog();
	    	
	    	
		/**
		 * Prevent a double submit.
		 */
		setAssetFormPropsAndSubmit(this);

		$(this).addClass('disabled'); // Make the button disable
		$(this).removeClass('primary'); // remove the primary lnf from the button.
		$(this).prop('disabled', true); // Make the button not work
		$(this).unbind('click'); // remove all click binding to this button, including this one.

		/**
		 * Prevent file submits.
		 */
		disableAssetSubmits();
	    }
	    else {
		$('.fireTvModal').hide();
		showUnacknowledgedWarningError();
	    }
	
	    return false;
	});

        $('.firetv_message_close').click(function() {
	    $('.fireTvModal').hide();
	});

        $('#popover_cancel').click(function() {
	    $('.fireTvModal').hide();
	});

	$('.one-click-submit').click(function() {
            var targetedFireTvInBinary = $('.amazon-fire-tv-devices-section').find('.fire-tv-first-party-device-switch.a-active');
            var showErrorMsg = $('#fire_tv_reminder_message');
            var targetedFireTvInWebApp = $("#MT1E2D23FPM2R95").is(':checked') || $("#MTN6SDXI7TSP6U").is(':checked') || $("#MT2UXKMZJ7SOQTN").is(':checked') || $("#M1F98H1O2SH9KD").is(':checked') || $("#M39HCWOPZP2N6R").is(':checked') || $("#M3SF0KNLJUFQ5B").is(':checked') || $("#MKU73ZQ9J5KTN").is(':checked');

	    if ((targetedFireTvInWebApp || targetedFireTvInBinary.length > 0) && showErrorMsg.length > 0 && this.id == "submit_button") {
		 $('.fireTvModal').show();
                 return false;
	    }
		
	    var warningAcknowledgementRequired = $(this).hasClass('warning-not-acknowledged');
	    if(!warningAcknowledgementRequired) {
	    	// Don't show a confirmation dialog
	    	preventBrowserConfirmationDialog();
	    	
	    	
		/**
		 * Prevent a double submit.
		 */
		setAssetFormPropsAndSubmit(this);

		disableOneClickSubmits();

		/**
		 * Prevent file submits.
		 */
		disableAssetSubmits();
	    }
	    else {
		$('.fireTvModal').hide();
		showUnacknowledgedWarningError();
	    }
	
	    return false;
	});
	
	/** Forms that use tables for layout that have errors,
	 *  Make the <td> in a table have the class error
	 */
	$(".error-row").each(function() {
		$(this).closest('tr').addClass('error');
	});

	/** Add the error class to the closest label.
	 *  Used to put error on the individual marketplace list prices.
	 */
	$(".error-label").each(function() {
		$(this).closest('label').addClass('error');
	});
});

/**
 * Manage remaining characters.
 */
$(document).ready(function() {
    if($('.limitText').length > 0) {
        function updateRemChars(element) {
            var id = element.attr('id');
            var maxLength = element.attr('maxlength');
            var maxMsg =  element.attr('maxmsg');
            var remainingMsg =  element.attr('remainingmsg');

            // Restrict users from entering text with length more than maxLength after counting a newline as 2 characters.
            var numNewlines = getNumberOfNewlines(element[0].value);
            var currentLength = element[0].value.length + numNewlines;
            if (currentLength > maxLength) {
                element[0].value = element[0].value.substring(0, maxLength - numNewlines);
            }

            trim(element[0], id, maxLength, false);
            updateCharactersRemainingMessage(element.parents('.limitTextParent').find('.remainingCharacters'), element[0], maxLength, maxMsg, remainingMsg);
        }

        $(".limitText").keyup(function(event) {
            updateRemChars($(this));
        });
    
        $(".limitText").mouseup(function() {
            updateRemChars($(this));
        });
    
        $(".limitText").change(function() {
            updateRemChars($(this));
        });
        
        $(".limitText").each(function() {
            updateRemChars($(this));
        });
    }
    
    if($('.bulleted').length > 0) {
        $(".bulleted").keyup(function(event) {
            ensureBulleted($(this)[0], event);
        });
    }
});

/**
 * Manage prompted input.
 */
$(document).ready(function() {
	$('.promptedInputContainer > .promptedInput').each(function( index, element ) {
		$(element).focus(function(event){
				$(element).parent().children('.promptedLabel').hide();
		});
		$(element).blur(function(event){
			if($(element).val()) {
				$(element).parent().children('.promptedLabel').hide();
			}
			else {
				$(element).parent().children('.promptedLabel').show();
			}    		
		});
		$(element).blur();
	});
});

/**
 * Question mark tooltip.
 */
$(document).ready(function() {
	$('.tooltip').before("<a class='tip-trigger dp-tooltip-trigger'><img src='https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/devportal2/res/images/icon-tooltip.png'></a>");
	$('.tooltip.empty').hide();
	$('.dp-tooltip-trigger').hover(
	  function() {
		var content = "<span class='tip dp-tooltip-content'>" + $(this).next('.tooltip').data('tip') + "</span>";
		$(this).prepend(content).fadeIn();
	  },
	  function() {
		$('.dp-tooltip-content').remove();
	  }
	);
});

/**
 * Manages the confirmation sections.
 */
$(document).ready(function() {
	confirmHelper('confirm', 'STANDARD');
	confirmHelper('top-confirm', 'STANDARD');
});

$(document).ready(function() {
	confirmHelper('floatingconfirm', 'FLOATING');
});

/**
 * Used to display warning message on multi entry remove button click.
 * @param confirmPrefix - Postion of the button. top or bottom.
 * @param type - Type of the button. FLOATING or STANDARD.
 */
function confirmHelper(confirmPrefix, type) {
	if ($('#' + confirmPrefix + '-section').length > 0) {
		var duration = 300;
		
		$('.' + confirmPrefix + 'able').click(function(e) {
			e.preventDefault();
			var msg = $(this).attr('confirmMessage');
			var action = $(this).attr('confirmAction');
			var actionId = $(this).attr('confirmActionId');
			var actionType = $(this).attr('confirmActionType');
			var actionImage = $(this).attr('confirmActionImage');
			$('#' + confirmPrefix + '-section').children('span').hide();
			
			// Container for warning message.
			var warningMsgContainer;
			// Use the existing container if exists, else create a new one.
			if($('.warning-msg-outer').length > 0) {
				warningMsgContainer = $('.warning-msg-outer');
			} else {
				warningMsgContainer = $('<div></div>').addClass("warning-msg-outer");
			}
			warningMsgContainer.html(msg);
			$('#' + confirmPrefix + '-section').prepend(warningMsgContainer);

			$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-ok').attr('name', action);
			$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-ok').attr('actionid', actionId);
			$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-ok').attr('actiontype', actionType);
			if (actionImage) {				
				$('#' + confirmPrefix + '-section').find('img').attr('src', actionImage);
				$('#' + confirmPrefix + '-section').find('img').show();
			}
			else {
				$('#' + confirmPrefix + '-section').find('img').removeAttr('src');
				$('#' + confirmPrefix + '-section').find('img').hide();
			}
			
			if (type == 'FLOATING') {
				$('#' + confirmPrefix + '-section').hide();
				
				// If there is something hidden already, then make it visible again
				var floatingHiddenId = $('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-cancel').attr('floatingHiddenId');
				if (floatingHiddenId) {
					$('#' + floatingHiddenId).fadeIn(duration);
					$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-cancel').removeAttr('floatinghiddenid', floatingHideId);
				}
				
				// If we will be hiding an element, the hide it now.
				var floatingHideId = $(this).attr('floatingHideId');
				if (floatingHideId) {
					$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-cancel').attr('floatinghiddenid', floatingHideId);
					$('#' + floatingHideId).hide();
				}

				// If we are floating to an element, then append the confirmation to it now.  Otherwise, float using the mouse position.
				var floatingDestId = $(this).attr('floatingDestId');
				if (floatingDestId) {
					$('#' + confirmPrefix + '-section').appendTo($('#' + floatingDestId));
				}
				else {					
					$('#' + confirmPrefix + '-section').attr('style', 'left: ' + e.pageX + 'px; top: ' + e.pageY + 'px; position: absolute;');
				}
			}
			
			$('#' + confirmPrefix + '-section').fadeIn(duration);
			
			adjustHeightIfInIFrame(false);			
		});
		
		$('#' + confirmPrefix + '-cancel').click(function(e) {
			e.preventDefault();
			
			$('#' + confirmPrefix + '-section').hide(duration, function() {
				adjustHeightIfInIFrame(false);
			});

			// the name should be removed upon cancel. look into what other attributes should be removed.
			$('#' + confirmPrefix + '-section').find('#' + confirmPrefix + '-ok').removeAttr('name');
			
			// If there is something hidden already, then make it visible again
			var floatingHiddenId = $(this).attr('floatingHiddenId');
			if (floatingHiddenId) {
				$('#' + floatingHiddenId).fadeIn(duration);
				$(this).removeAttr('floatingHiddenId');
			}
		});
	}	
}

function adjustHeightIfInIFrame(navigation) {
	var inIFrame = (window.location != window.parent.location) ? true : false;
	
	if (inIFrame == true) {
		// the line below is to shorten the height, and then go back to the original height. need to figure out how to reset the height after closing a confirmation without this hack.
		if (navigation != true) {
			window.parent.document.getElementById('content_frame').height = (window.parent.document.getElementById('content_frame').contentWindow.document.documentElement.scrollHeight - 50) + 'px'; // reset the height always
		}
		window.parent.document.getElementById('content_frame').height = window.parent.document.getElementById('content_frame').contentWindow.document.documentElement.scrollHeight + 'px';
	}
}

function setIFrameSize(id) {
    document.getElementById(id).height = 0; // reset the height always, otherwise the iframe doesn't shrink from a larger to a smaller height
    document.getElementById(id).height = document.getElementById(id).contentWindow.document.documentElement.scrollHeight + 'px';
}

function saveIFrameScroll() {
	
	var left, top;
	if (window.parent.document.documentElement && window.parent.document.documentElement.scrollLeft !== undefined) {
        left = window.parent.document.documentElement.scrollLeft;
        top = window.parent.document.documentElement.scrollTop;
    } else {
        left = document.body.scrollLeft;
        top = document.body.scrollTop;
    }

    if (left || top) {
    	var expireDate = new Date();
    	expireDate.setTime(expireDate.getTime() + (1000 * 60));
	    $.cookie("scrollIFramePosition", left + ',' + top, {path: '/', expires: expireDate});
    }
}

/** Loads the last scroll position */
function loadIFrameScroll() {

	var hasErrors = false;
	if ($('.global_errors').size() > 0) {
		hasErrors = true;
		var div = $($('.global_errors')[0]);
		var top = Math.max(0, div.offset().top - 100);
//		$(document).animate({ scrollTop: top }, { duration: 'slow', easing: 'swing'});
		$(document).scrollTop(top);
	}

	var cookie = $.cookie("scrollIFramePosition");
	if (cookie) {
		if (!hasErrors) {				
			var values = cookie.split(',');
			window.parent.scrollTo(values[0], values[1]);
		}
		// delete cookie
		$.cookie("scrollIFramePosition", null, {path: '/'});
	}
}

$(document).ready(function() {	
	if($('#parentCategory').length > 0) {
		var parentId   = $('#parentCategory').val();
	    var secondaryCategoryId = $('#secondaryCategory').val();
		var selectedId = $('#selectedCategory').val();
	
		// Set parent id to --select-- for webkit when parentId is not set
		if (parentId == '') {
			parentId = NULL_CAT_ID;
		}
		
		// The ID of the root node in the category tree.
		$('#parentCategoryList').val(parentId == ROOT_CAT_ID ? selectedId : parentId);
		
		if (parentId != ROOT_CAT_ID) {
			childCategoryId = selectedId;
			$('#parentCategoryList').change();
		}
		else {
	//		childCategoryId = UNSELECTED_CHILD_CAT_ID;
			childCategoryId = selectedId; // initialize to 'Other' which will be the same id as 1st level category.
		}
	
		$('#tertiaryCategoryList').change(function() {
			var id = $('#tertiaryCategoryList option:selected').val();
			$('#selectedCategory').val(id);
		});
	
		$('#childCategoryList').change(function() {
			var id = $('#childCategoryList option:selected').val();
			$('#selectedCategory').val(id);
			
		    var parentId = $('#childCategoryList option:selected').val();
		    var isLeaf   = $('#childCategoryList option:selected').attr('leaf');
		    if (isLeaf == 'true') {
		    	$('#selectedCategory').val(parentId);
		    	$('#tertiaryCategoryList').hide();
		    }
		    else {
		    	handleParentCategoryChange(parentId, secondaryCategoryId, $('#tertiaryCategoryList'));	    	
		    }
		});
	
		$('#parentCategoryList').change(function() {
		    var parentId = $('#parentCategoryList option:selected').val();
		    var isLeaf   = $('#parentCategoryList option:selected').attr('leaf');
		    if (parentId == '' || isLeaf == 'true') {
		    	$('#selectedCategory').val(parentId);
		    	$('#childCategoryList').hide();
		    	$('#tertiaryCategoryList').hide();
		    }
		    else {
		    	handleParentCategoryChange(parentId, secondaryCategoryId, $('#childCategoryList'));	    	
		    }
		});
		
		// Loading of child categories on document load.
		$('#parentCategoryList').change();
	}
});


// Locale javascript
$(document).ready(function() {	
	if($('#locale').length > 0) {
		$('#locale').change(function(){
			if($(this).val() != "") {
				$('form .link-list .current').removeClass('unknown').text($('#locale').children(':selected').text());
			} else {
				$('form .link-list .current').addClass('unknown').text('New Language');
			}
			
			// Reset pronunciation fields
		  	$('#displayTitlePronunciation').val('');
		
		  	var selectedLocale =  $("#locale option:selected");
		  	var defaultLocale = selectedLocale.attr('dl');
		  	var preferredLocale = selectedLocale.attr('pl');
		    	
		    //Show/hide default translations message
		    $('#defaultLanguageNote').css('display', defaultLocale ? 'inline' : 'none');
		
		    // Show/hide preferred locale radio section
		    $("#caDevIntent").css('display', preferredLocale ? '' : 'none' );
		
		    //Show required Long Description
		    if (defaultLocale) {
		    	$('#longDescriptionLabel').removeClass('optional');
		    	$('#bulletLabel').removeClass('optional');
		    }
		    else {
		    	$('#longDescriptionLabel').addClass('optional');
		    	$('#bulletLabel').addClass('optional');
		    }
		});
	};
});

// this is almost an exact copy of the above. look into combining both. srinath.
$(document).ready(function() {	
	if($('#period').length > 0) {
		$('#period').change(function(){
			if($(this).val() != "") {
				$('form .link-list .current').removeClass('unknown').text($('#period').children(':selected').text());
			} else {
				$('form .link-list .current').addClass('unknown').text('New Time Interval');
			}
		});
	};
});

// Nickname javascript
$(document).ready(function() {	
	if($('#nickName').length > 0) {
		$('#nickName').keyup(function(){
			updateSelectedBinaryHeader($(this).val());
		});
		
		updateSelectedBinaryHeader($('#nickName').val());
	};
});

function updateSelectedBinaryHeader(nickName) {
	if(nickName != "") {
		$('form .link-list .current').removeClass('unknown').text(nickName);
	} else {
		$('form .link-list .current').addClass('unknown').text('New Binary');
	}
	
}

// Asset event listeners.
$(document).ready(function() {

    // Check that the asset is not marked as requiring acknowledgement of a warning.
    $('.asset .assetInputBox input').click(function(e) {

        var warningAcknowledgementRequired = $(this).hasClass('warning-not-acknowledged');
        if(warningAcknowledgementRequired) {

            showUnacknowledgedWarningError();

            // Prevent further handling of the click.
            // (Prevent the file chooser dialog from coming up).
            return false;
        }
    });

    // Load upload spinner image before hand otherwise spinner doesn't show up in Chrome.
    (new Image()).src = 'https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/devportal2/res/images/ajax-loader.gif';

    // Upload spinner
    $('.asset').change(function(e) {

	    var warningAcknowledgementRequired = $(this).find('div input').hasClass('warning-not-acknowledged');
	    var uploadFileSizeExceeded = $('#uploadFileSizeExceededSpan').length;
	    if(!warningAcknowledgementRequired && !uploadFileSizeExceeded) {
            e.preventDefault();

            $(this).addClass('uploading');
            $(this).children('span').hide();
        }
    });
});

// Binary show/hide manifest
$(document).ready(function() {
	$('#manifest a').click(function(e) {
		e.preventDefault();
		
		var showText = $('#manifest a').attr('label_show');
		var hideText = $('#manifest a').attr('label_hide');
		
		$(this).text()==hideText ? $(this).text(showText) : $(this).text(hideText);
		$('#manifest table .more-manifest-rows').toggle();
	});	
});

// Uploading asset files
function upload(element, formId){
    if (acceptableFileSize(element)) {
        $(element).closest("tr").removeClass("error");
        $("#uploadFileSizeExceededSpan").remove();

        $("form#" + formId).attr("encoding", "multipart/form-data");
        $("form#" + formId).attr("enctype", "multipart/form-data");
        $("#assetType").val($(element).prop('name'));
        $("#tagLabel").val($(element).data('taglabel'));
        $("#tagKind").val($(element).data('tagkind'));

        // Don't show confirmation dialog when leaving the page
        preventBrowserConfirmationDialog();

        element.form.submit();
        disableOneClickSubmits();
        disableAssetSubmits();
    }
    else {
        $(element).closest("tr").addClass("error");
        $(element).closest("td").append('<span id="uploadFileSizeExceededSpan" class="error-row">' + DpMessages.uploadFileSizeExceededMessage + '</span>');
    }
}

function acceptableFileSize(fileElement) {
    // Check file size using HTML5 File API
    if (typeof FileReader !== "undefined" && fileElement.files[0]) {
        var size = fileElement.files[0].size;
        if (size <= 0 || size > DpConfig.maxFileSizeForAssetUploads) {
            return false;
        }
    }
    return true;
}

// Creates listeners on asset remove to set the tagLabel and tagKind parameters
// When the 'x' button is clicked, this is triggered.
$(document).ready(function() {
	$("a.remove").click(function() {
            $("#tagLabel").val($(this).data('taglabel'));
            $("#tagKind").val($(this).data('tagkind'));
	});
	
	$("#itemsection_multimedia #floatingconfirm-cancel").click(function() {
            $("#tagLabel").val("");
            $("#tagKind").val("");
	});
});

// Initializes hidden 'assetType' input to 'none'
$(document).ready(function() {

    if ($('#itemsection_multimedia').length > 0 || $('#itemsection_binary').length > 0) {
        $('input:hidden#assetType').val('none');
    }
});

// FTP Account Page
$(document).ready(function() {
	if ($('#ftpAppSelect').length > 0) {
		$('#ftpAppSelect').change(function() {
			var idpname = $(this).val();
			changeAssetNames(idpname);
		});

		var idpname = $('select.#ftpAppSelect').val();
		changeAssetNames(idpname);
	};
});

function showNewAppVersionCreationConfirmation(confirmationMessage, newVersionUrl){
    $('#create_new_app_version_confirmation_form').prop("action", newVersionUrl);
    $('#create_new_app_version_confirmation_msg').html(confirmationMessage);
    $('#create_new_app_version_confirmation').show();
}

function showArchiveWarning(warningMessage, newVersionUrl){
    $('#version_archive_warning_form').prop("action", newVersionUrl);
    $('#version_archive_warning_msg').html(warningMessage);
	$('#version_archive_warning').show();
}

function changeAssetNames(idpname){
	var duration = 300;

	if (idpname && idpname != 'UNDEFINED') {
		var app = idpname.split(":");
		$('#ncTable').fadeIn(duration);
        $('.appid').text(app[0]);
        if ($('#resetPassword').length > 0) {
        	$('#resetPassword').attr('actionId', app[0]);		        		
        }
	    if ($('#createAccount').length > 0) {
	      	$('#createAccount').attr('actionId', app[0]);
	    }
        if (app[1]) {
            $('.pname').text("-" + app[1]);
        } else {
        	$('.pname').text("");
        }
        if (app[2]=="U") {
        	$('.uduEnabledNames').show();
        } else {
        	$('.uduEnabledNames').hide();
        }
	}
	else {
    	if ($('#resetPassword').length > 0) {
    		$('#resetPassword').removeAttr('actionId');
    	}
        if ($('#createAccount').length > 0) {
        	$('#createAccount').removeAttr('actionId');
        }
		$('#ncTable').fadeOut(duration);
	}
}

// Contact us
$(document).ready(function() {
	if ($('#subjectCategorySelect').length > 0) {
		$('#subjectCategorySelect').change(function() {
			updateOptionalSubjectMessage();
		});
		$('#subjectCategorySelect').keyup(function() {
			updateOptionalSubjectMessage();
		});

		updateOptionalSubjectMessage();
	};
});

function updateOptionalSubjectMessage() {
	showHideOnSelect('subjectCategorySelect', 'freeFormSubject', 'OTHER');
}

$(document).ready(function() {
	if ($('#captcha_try_other_image').length > 0) {
        $('#captcha_try_other_image').click(loadCaptcha);
	    loadCaptcha();
	}
});

loadCaptcha = function() {
	$.ajax({
        url: '/captcha/getClassicImageCaptcha.json',
        dataType: 'jsonp',
        beforeSend: function() {
            $('#captchaImg').hide();
        },
        success: function(data) {
            $('#captchaToken').val(data['captchaToken']);
            $('#captchaImg').attr('src', data['captchaUrl']);
            $('#captchaImg').show();
            $('#customerSolution').val('');
        }
    });
};
// End Contact us

// Multimedia - Sortable Screenshots
$(document).ready(function() {

    $('.sortables-container').sortable({
        handle : '.drag',
        stop : function(e, ui) {
            $('.drag', ui.item).click();  // This is workaround to a jQuery / sortable() bug
                                          // that ignores the next click after dragging.
        }
    });
    $('.sortables-container').disableSelection();	
});
// End Multimedia - Sortable Screenshots

// Hash Triggered Warnings
$(document).ready(function() {

    // Show the warning that indicates the user's last action was no longer valid by
    // the time they executed it.  This can happen when creating an upgrade version.
    showHashTriggeredElement('newVersionNotAllowed', '#new_app_version_creation_not_allowed_warning');
});
// End Hash Triggered Warnings

function showHashTriggeredElement(triggerValue, selectorOfElementToShow) {

    var fullHash = document.location.hash;
    if(fullHash.length > 0) {

        var hashValues = fullHash.substr(1).split('&');
        var indexOfTriggerValue = hashValues.indexOf(triggerValue);
        var containsTriggerValue = indexOfTriggerValue != -1;

        // If the triggerValue was found...
        if(containsTriggerValue) {

            // Show the element.
            $(selectorOfElementToShow).show();

            // Remove triggerValue from the hash.
            hashValues.splice(indexOfTriggerValue, 1);
            var newHash = '';
            for(var i = 0; i < hashValues.length; i++) {

                newHash += hashValues[i] + ((i == hashValues.length-1) ? '' : '&');
            }
            document.location.hash = newHash;
        }
    }
}



// Toggles (could hide all or switch) the pronunciation fields
function togglePronunciationElements(pronunciation) {
	var elements = jQuery("." + pronunciation);
	$(".conditionalPronunciation").hide();
	$(".conditionalPronunciationElement").hide();
	$("#dpShortDescription").attr("maxlength",1200);
    $("#publisherDescription").attr("maxlength",4000);
    $(".limitText").change();

	if(typeof pronunciation != "undefined" && pronunciation.length > 0) {
		if (elements.length > 0) {
		    $("#dpShortDescription").attr("maxlength",400);
            $("#publisherDescription").attr("maxlength",1200);
			$(elements).show();
			$(".conditionalPronunciation").show();
			$(".limitText").change();
			return;
		}
	}
	// Clear old values
	$("#developer_pronunciation").val("");
}

function updatePronunciationField() {
	
	var lastLanguageElement = jQuery(".lastLanguageInput");
	var countryField = jQuery(".pronunciationController");
	var pronunciation = "";
	
	if(typeof lastLanguageElement != "undefined" && lastLanguageElement.length > 0) {
		pronunciation = lastLanguageElement.attr("pr");
		togglePronunciationElements(pronunciation);
		return;
	}
	
	var developerNamePronunciation = function() {
		pronunciation = countryField.children(":selected").attr("pr");
		togglePronunciationElements(pronunciation);
	};
	
    countryField.change(developerNamePronunciation);
    developerNamePronunciation();
}

updatePronunciationField();


function toggleStateSelectionField() {
    var countryField = jQuery("#country");
    countryField.change(toggleStateSelectionField);
    if (countryField.children(":selected").attr("cc") === "US"){
        $("#stateText").hide();
        $("#stateSelection").show();
        $("#stateText").attr('value', '');

        $("#stateRegionLabel").hide();
        $("#stateLabel").show();

    } else {
        $("#stateText").show();
        $("#stateSelection").hide();

        $("#stateRegionLabel").show();
        $("#stateLabel").hide();
    }
}

toggleStateSelectionField();


//BusinessId javascript
var businessIdRow = jQuery(".conditionalBusinessId");
if (typeof businessIdRow != "undefined" && businessIdRow.length > 0) {
    var countryField = jQuery(".pronunciationController");
    var businessIdChange = function() {
        if (countryField.children(":selected").attr("bid") === "true") {
        	businessIdRow.show();
        } else {
        	businessIdRow.hide();
        }
        $(".limitText").change(); // take affect
    };
    countryField.change(businessIdChange);
    businessIdChange();
}


$(document).ready(function(){
	$("#close-limited-access-banner").click(function(){
		$(".limited-access-banner").slideUp("fast", function(){
			$("#open-limited-access-banner").show();
		});
		$.cookie("limited-access-banner-state", "closed",  { path: '/' });
	});
	$("#open-limited-access-banner").click(function(){
		$("#open-limited-access-banner").hide();
		$(".limited-access-banner").slideDown("fast");
		$.cookie("limited-access-banner-state", "opened",  { path: '/' });
	});
	
	var bannerState = $.cookie("limited-access-banner-state");
	if(bannerState==="closed"){
		$(".limited-access-banner").hide();
		$("#open-limited-access-banner").show();
	}
	else{
		$(".limited-access-banner").show();
	}
	
	$(".limited-access-disable-link").mouseenter(function(e){
   	   	var topPos = $(this).offset().top;
        var leftPos = $(this).offset().left;
     	
        var elementWidth = $(this).outerWidth();
        var tooltipWidth = $("#limited-access-tooltip").outerWidth();
        var adjustmentLeft = (elementWidth - tooltipWidth)/2;

        var tooltipHeight = $(this).outerHeight();
	
        $("#limited-access-tooltip").css("top", topPos + tooltipHeight + 10);
		$("#limited-access-tooltip").css("left", leftPos + adjustmentLeft);
		$("#limited-access-tooltip").show();
	});
	$(".limited-access-disable-link").mouseleave(function(){
		$("#limited-access-tooltip").hide();
	});
	
});

//Show Device Warning Checkbox for required devices (Bueller/Montoya)
//This code should work for any number of devices with a warning checkbox
$(document).ready(function() {
   $(".device-warning-checkbox").click(function() {
	   //This grabs the warning div and it's child checkbox
	   var warningCheckbox = getWarningCheckboxFromDeviceCheckbox(this);
	   var warningDiv = getWarningDivFromDeviceCheckbox(this);
       if ($(this).prop('checked')) {
            $(this).prop('checked', false);
            $(this).prop('disabled', true);
            $(warningCheckbox).prop('checked', false);
            $(warningDiv).show();
       } else {
    	   $(warningCheckbox).prop('checked', false);
    	   $(warningDiv).hide();
       }
    });
    $(".i_understand_device_change").click(function() {
    	var linkedDeviceCheckbox = getDeviceFromWarningCheckbox(this);
        if ($(this).prop('checked')) {
        	$(linkedDeviceCheckbox).prop('disabled', false);
        	$(linkedDeviceCheckbox).prop('checked', true);
        } else {
        	$(linkedDeviceCheckbox).prop('disabled', true);
        	$(linkedDeviceCheckbox).prop('checked', false);
        }
    });
});

function getWarningCheckboxFromDeviceCheckbox(deviceChecbox) {
	return $(deviceChecbox).closest('.device-container').find('.i_understand_device_change');	
}

function getDeviceFromWarningCheckbox(warningCheckbox) {
	return $(warningCheckbox).closest('.device-container').find('.device-checkbox');
}

function getWarningDivFromDeviceCheckbox(deviceChecbox) {
	return $(getWarningCheckboxFromDeviceCheckbox(deviceChecbox)).parent();
}

$(document).ready(function() {
    var messageHash = "message=";
    var messageHashIndex = window.location.hash.indexOf(messageHash);
    var messageLookupIdentifier = window.location.hash.substr(messageHashIndex + messageHash.length);

    if (messageHashIndex > -1) {
        var origModalClose = modal.close;

        modal.close = function () {
            origModalClose.call(modal);
            window.location.hash = "";
        };

        var messageOptions = {
            webAppSubmission : '<div id="webapp-submitted-msg-modal">'+$("#webapp-submitted-msg").html()+'</div>'
        };

        messageOption = messageOptions[messageLookupIdentifier];
        if (messageOption != undefined) {
            modal.open({content : messageOption});
        }
    }
});

// Display a browser confirmation message if app submission form is not equal to the original form
function displayBrowserConfirmationMessage(originalForm, e) {
	  var confirmationMessage = $("#warning_leave_page_before_saving").length ? $("#warning_leave_page_before_saving").text() : "You have unsaved changes.";

	  var dirtyForm = $("form[id^='itemsection_']").serialize();
	
	  if (dirtyForm != originalForm) {
		  (e || window.event).returnValue = confirmationMessage;  //Gecko + IE
		  return confirmationMessage;  //Gecko + Webkit, Safari, Chrome etc.
	  }
}

function preventBrowserConfirmationDialog() {
	$(window).unbind('beforeunload');
}

// Show confirmation dialogs on all submission pages if user edits the form.
// Will not show dialog if user clicks on the cancel, submit, save, or remove buttons, is removing or upload assets,
// or if the form has not actually changed.
$(document).ready(function() {
	var submissionForm = $("form[id^='itemsection_']");
	var originalForm = submissionForm.serialize();
	var listener = function(e) {
		displayBrowserConfirmationMessage(originalForm, e);
	};
	
	// Only ask user to confirm leaving the page for submission tabs
	if (submissionForm.length) {
		$(window).bind('beforeunload', listener);
	}
	
	// Don't display the confirmation message if the submit, cancel, save, or remove buttons is clicked.
	// Also don't block when removing or upload assets.
	// Use mousedown instead of click because we need an event that fires before 'beforeunload'.
	var selectorsToNotBlock = ["#submit_button", "#cancel_button", "input[id$='remove_collectable_button']", "input[id$='save_and_add_button']",
	                           "input[id$='save_and_add_button']", ".one-click-submit", ".asset .assetInputBox input"];
	var jquerySelector = selectorsToNotBlock.join(',');

	$(jquerySelector).bind('mousedown keypress', function() {
		preventBrowserConfirmationDialog();
	});
	
function confirmAndSubmitDeleteUpcoming(confirmMessage, Id) {
    if (window.confirm(confirmMessage)) {
        var submissionForm = document.getElementById("submit_item");
        submissionForm.action = "/application/" + Id + "/deleteupcoming.html";
        submissionForm.submit();
    }
}
if(document.getElementById("delete_upcoming_version_button") != null) {	
    var confirmMessage = document.getElementById("confirm_delete_upcoming_version_string").value;
    var Id = document.getElementById("encryptedId").value;
    document.getElementById("delete_upcoming_version_button").addEventListener("click", function(){confirmAndSubmitDeleteUpcoming(confirmMessage, Id);});
}
});

// Track app submissions for DevMarketing
$(document).ready(function() {
	// Generate the pixel URL, as per DevMarketing's instructions
	var getAppSubmissionsTrackingPixelUrl = function() {
		var protocol = document.location.protocol + "//";
		var a = Math.random() * 1000000000000000000;
		var pix = protocol + "fls-na.amazon.com/1/4167132/1/OP/?id=5aa1e966-c7dd-4efa-b37c-81f0b91f8120&type=32" + "&cb=" + a;
		return pix;
	};

	var submitButton = $("#submit_app_button");

	if (submitButton.length) {
		var submitItemType = submitButton.data("itemtype");

		// If this is an Android app, add a handler that gets the pixel when the submit button is clicked
		if (submitItemType === 'APPLICATION_TITLE') {
			submitButton.click(function() {
				$.ajax({
					url: getAppSubmissionsTrackingPixelUrl(),
					async: false
				});				
			});
		}
	}
});

// Track app submissions for DevMarketing
$(document).ready(function() {
	// Generate the pixel URL, as per DevMarketing's instructions
	var getAppSubmissionsTrackingPixelUrl = function() {
		var protocol = document.location.protocol + "//";
		var a = Math.random() * 1000000000000000000;
		var pix = protocol + "fls-na.amazon.com/1/4167132/1/OP/?id=5aa1e966-c7dd-4efa-b37c-81f0b91f8120&type=32" + "&cb=" + a;
		return pix;
	};

	var submitButton = $("#submit_app_button");

	if (submitButton.length) {
		var submitItemType = submitButton.data("itemtype");

		// If this is an Android app, add a handler that gets the pixel when the submit button is clicked
		if (submitItemType === 'APPLICATION_TITLE') {
			submitButton.click(function() {
				$.ajax({
					url: getAppSubmissionsTrackingPixelUrl(),
					async: false
				});				
			});
		}
	}
});


function updateMetadata() {

    var conf = confirm('<fmt:message key="label_confirm_metadata_publish" />');
    if(conf == true )
    {
        $("#submit_item").attr("action","/${itemSectionItemType.requestPathSegment}/metadataupdate.html");
        $("#submit_item").submit();
        return true;
    }
}

$(document).ready(updateProgressbarStatus);

//Updating nav header progress bar
function updateProgressbarStatus() {
    var total = $('.nav_item span').length;
    var completeItems = $('.nav_item span.complete').length;
    var optionalItems = $('.nav_item span.optional').length;
    completeItems = completeItems + optionalItems;
    $('#totalItems').text(completeItems + '/' + total + ' ');
    if(completeItems == total) {
        $("#complete_status_in_progress").hide();
        $("#complete_status_ready_to_submit").show();
    } else {
        $("#complete_status_in_progress").show();
        $("#complete_status_ready_to_submit").hide();
    }
    $("#app_nav_header_progress").attr('max', total);
    $("#app_nav_header_progress").attr('value', completeItems);   
}
    

