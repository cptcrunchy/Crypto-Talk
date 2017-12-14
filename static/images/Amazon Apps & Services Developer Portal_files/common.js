// Adding trim() to the built-in String object.
String.prototype.ltrim = function() {
	return this.replace(/^\s*/, '');
};

String.prototype.rtrim = function() {
	return this.replace(/\s*$/, '');
};

String.prototype.trim = function() {
	return this.ltrim().rtrim();
};

String.prototype.unescapeHTML = function() {
	var t = document.createElement('div');
	t.innerHTML = this;
	var r = t.childNodes[0].nodeValue;
	t.removeChild(t.firstChild);
	return r;
};

function trim(s, label, maxlength, alert) {
	if (s.value.length > maxlength) {
		if (alert) {
			alert(label + ' exceeds the maximum of ' + maxlength
					+ ' characters. Trimming to compensate.');
		}
		s.value = s.value.substring(0, maxlength);
	}
}

/**
 * Shows or hides the given element based on the select condition of a select
 * element.
 * 
 * @param selectId
 *            The id of the select element.
 * @param elementId
 *            The id of the element that should be shown or hidden based on the
 *            select condition.
 * @param condition
 *            The select condition that must be true in order for the element to
 *            be visible.
 */
function showHideOnSelect(selectId, elementId, condition) {
	var selected = $('#' + selectId + ' option:selected').val();
	if (selected == condition) {
		$('#' + elementId).show();
	} else {
		$('#' + elementId).hide();
	}
}

function getLocale() {
	var lang = navigator.language; // Firefox: browser localization

	// Assuming that the user is working on their localized OS and not
	// setting the region to a different country (via settings).

	if (!lang) { // IE: browser localization
		lang = navigator.browserLanguage;
	}

	if (!lang) { // IE: Windows OS-localized language
		lang = navigator.systemLanguage;
	}

	if (!lang) { // IE: Windows OS-regional settings
		lang = navigator.userLanguage;
	}

	if (!lang) { // degrade gracefully
		lang = 'en-US';
	}

	return lang;
}

function isLocaleUS() {
	return getLocale().toLowerCase() == 'en-us';
}

/**
 * Returns the number of characters remaining based on an input string and a max
 * length.
 * 
 * @param inputString
 *            The input string.
 * @param maxLength
 *            The max length allowed.
 * @return The number of characters left.
 */
function charactersRemaining(inputString, maxLength) {

    /**
     * TT - https://tt.amazon.com/0045455011
     * Browsers send \r\n for new-lines and this does not happen until the form is submitted,
     * which causes the string length to be determined differently before and after the form submission which is the cause of the bug.
     * In order to avoid this we will count each new-line as 2 characters while displaying the remaining characters.
     */
    if (inputString != null) {
        var normalizedInputString = normalizeNewLineCharacters(inputString.value);
        var numNewLines = getNumberOfNewlines(normalizedInputString);
        return maxLength - (normalizedInputString.length + numNewLines);
    }
    return maxLength;
}

/**
 * Given an inputString, returns a string with all the newline characters(\r\n, \n) replaced with \n.
 * @param inputString - input string to normalize.
 * @returns - normalized string
 */
function normalizeNewLineCharacters(inputString) {
    return inputString.replace(/\r\n|\r/g, '\n');
}

/**
 * Given an inputString returns the number of new lines(\n) in it.
 * @param inputString - String for which the number of new lines should be calculated.
 * @returns number of new lines in the inputString
 */
function getNumberOfNewlines(inputString) {
    var newLines = inputString.match(/\n/g);
    return newLines == null ? 0 : newLines.length;
}

/**
 * Uses the given element to display a characters left message based on the
 * given input string and max length allowed.
 * 
 * @param elementId
 * @param inputString
 * @param maxLength
 */
function updateCharactersRemainingMessage(element, inputString, maxLength,
        maxCharString, remainingCharString) {
    var remaining = charactersRemaining(inputString, maxLength);
    element.text(maxCharString + ' ' + maxLength + ', ' + remainingCharString
            + ' ' + remaining);
}

/**
 * Highlights the form field's value.
 * 
 * @param element
 *            The element whose value should be hightlighted.
 */
function highlightFormField(element) {
	element.select();
}

/**
 * Removes the default text from a form field.
 * 
 * @param element
 *            The element to remove the default text from.
 * @param defaultText
 *            The default text that should be removed.
 */
function removeDTFromFormField(element, defaultText) {
	focusFormFieldWithDT(element, defaultText, false);
}

/**
 * This method can be used to hide or highlight the default text in a form
 * field.
 * 
 * @param element
 *            The element to focus on.
 * @param defaultText
 *            The default text that should be hidden or highlighted.
 * @param highlightText
 *            true if the default text should be highlighted and false if it
 *            should be hidden.
 */
function focusFormFieldWithDT(element, defaultText, highlightText) {
	var text = element.val();
	if (text == defaultText) {
		if (highlightText) {
			element.select();
		} else {
			element.val('');
		}
		element.removeClass('defaultTextPrompt');
	}
}

/**
 * This method can be used to show the default text in a form field if the form
 * field value is empty.
 * 
 * @param element
 *            The element to blur on.
 * @param defaultText
 *            The default text that should be shown if the form field's value is
 *            empty.
 */
function blurFormFieldWithDT(element, defaultText) {
	var text = element.val();
	if (text == undefined || text == '' || text == defaultText) {
		element.val(defaultText);
		element.addClass('defaultTextPrompt');
	}
}

function isKeyNewLine(e) {
	var code;

	if (!e)
		var e = window.event;

	if (e.keyCode)
		code = e.keyCode;
	else if (e.which)
		code = e.which;

	if (code == 10 || code == 13) {
		return true;
	} else {
		return false;
	}
}

function ensureBulleted(inputString, event) {
	var correctBeginRegex = /^•\s/;

	var doubleNewLineRegExEnd = /\n\n$/;
	var doubleNewLineRegEx = /\n\n/;

	var middleLineBreakRegEx = /\n[0-9\sa-zA-Z]*\n/;
	var middleLineBreakGroupingRegEx = /\n([0-9\sa-zA-Z]*\n)/;

	if (isKeyNewLine(event) != true) {
		return;
	}

	// the bullet character can be typed by typing alt-8 on the mac (the
	// asterix) and
	// then copied and pasted. alternatively, the unicode character for the
	// bullet
	// \u2022 can be used.

	if (!correctBeginRegex.test(inputString.value)) {
		inputString.value = '• ' + inputString.value;
	}

	/* match newline entered at the end */
	if (doubleNewLineRegExEnd.test(inputString.value)) {
		inputString.value = inputString.value.replace(doubleNewLineRegExEnd,
				'\n\u2022 \n');

		// scroll to bottom if scroll bar exists.
		inputString.scrollTop = inputString.scrollHeight;

		return;
	}

	/* match any double newlines entered at the end of any line */
	if (doubleNewLineRegEx.test(inputString.value)) {
		var matchIdx = inputString.value.match(doubleNewLineRegEx).index;

		var scrollTop = inputString.scrollTop; // save scroll pos
		inputString.value = inputString.value.replace(doubleNewLineRegEx,
				'\n\u2022 \n');

		setCursorPosForTextArea(inputString, matchIdx - 1);

		inputString.scrollTop = scrollTop; // restore scroll pos

		return;
	}

	/* any break in the middle except at the end of a line */
	/* only search and replace one instance since this is a special case */
	if (middleLineBreakRegEx.test(inputString.value)) {
		var matchIdx = inputString.value.match(middleLineBreakRegEx).index;

		var scrollTop = inputString.scrollTop; // save scroll pos
		inputString.value = inputString.value.replace(
				middleLineBreakGroupingRegEx, '\n\u2022 $1');

		setCursorPosForTextArea(inputString, matchIdx - 1);

		inputString.scrollTop = scrollTop; // restore scroll pos

		return;
	}

	/*
	 * the global is needed, if it doesn't exist, the addition of bullets stops
	 * in some cases
	 */
	inputString.value = inputString.value.replace(/[\n]$/g, '\n• ');

	/*
	 * this particular regex is for one special case - if the last line doesn't
	 * have a newline at the end of it and is then broken in the middle.
	 */
	inputString.value = inputString.value.replace(/\n([0-9\sa-zA-Z]*)$/mg,
			'\n• $1');

	// scroll to bottom if scroll bar exists.
	inputString.scrollTop = inputString.scrollHeight;
}

function setCursorPosForTextArea(text, pos) {
	if (text.setSelectionRange) {
		text.setSelectionRange(pos + 4, pos + 4);
	} else if (text.createTextRange) {
		var range = text.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

/**
 * Makes an AJAX call to load the parent's child categories.
 * 
 * @param parentId
 *            The parent id whose children should loaded.
 * @param secondaryCategoryId
 *            The secondary category id, if any.
 * @param childCategoryList
 *            The child category list where the children will be loaded.
 */
var UNSELECTED_CHILD_CAT_ID = -1;
function handleParentCategoryChange(parentId, secondaryCategoryId,
		childCategoryList) {
	childCategoryList.children().remove();

	if (parentId) {
		$.ajax({
			url : '/category/' + parentId + '/list.json',
			async : false,
			dataType : 'json',
			type : 'GET',
			success : function(data, tstatus, xhr) {
				childCategoryList.children().remove();
				$(data.data).each(
						function(idx, val) {
							childCategoryList.append($('<option/>').attr(
									'leaf', val.leaf).val(val.value).html(
									val.name));
						});

				if (secondaryCategoryId != UNSELECTED_CHILD_CAT_ID
						&& secondaryCategoryId != childCategoryId) {
					childCategoryList.val(secondaryCategoryId);
					secondaryCategoryId = UNSELECTED_CHILD_CAT_ID;
					childCategoryList.change();
				} else {
					childCategoryList.val(childCategoryId);
					childCategoryId = UNSELECTED_CHILD_CAT_ID;
					childCategoryList.change();
				}
			},
			error : function(xhr, tstatus, err) {
				alert(err.message);
			}
		});
		childCategoryList.show();
	}
}

(function() {

	/** Save the scroll position for 1 minute */
	function saveScroll() {

		var left, top;
		if (window.pageXOffset !== undefined) {
			left = window.pageXOffset;
			top = window.pageYOffset;
		} else if (document.documentElement
				&& document.documentElement.scrollLeft !== undefined) {
			left = document.documentElement.scrollLeft;
			top = document.documentElement.scrollTop;
		} else {
			left = document.body.scrollLeft;
			top = document.body.scrollTop;
		}

		if (left || top) {
			var expireDate = new Date();
			expireDate.setTime(expireDate.getTime() + (1000 * 60));
			$.cookie("scrollPosition", left + ',' + top, {
				path : '/',
				expires : expireDate
			});
		}
	}

	// Move saveScroll out to Global name-space.
	persistScrollPosition = saveScroll;

	/** Loads the last scroll position */
	function loadScroll() {

		var hasErrors = false;
		if ($('.global_errors').size() > 0) {
			hasErrors = true;
			var div = $($('.global_errors')[0]);
			var top = Math.max(0, div.offset().top - 100);
			// $(document).animate({ scrollTop: top }, { duration: 'slow',
			// easing: 'swing'});
			$(document).scrollTop(top);
		}

		var cookie = $.cookie("scrollPosition");
		if (cookie) {
			if (!hasErrors) {
				var values = cookie.split(',');
				window.scrollTo(values[0], values[1]);
			}
			// delete cookie
			$.cookie("scrollPosition", null, {
				path : '/'
			});
		}
	}

	$(document).ready(function() {
		loadScroll();
		$(".saveScroll").click(saveScroll);
	});

})();

/**
 * Initialize a modal dialog window. The initialized window does not come with
 * any preconfigured buttons. You have to add the buttons yourself, using the
 * initDialogBoxButton() function. A working application example:
 * initDialogBox("myWarningBox", "Warning!", "Are you sure you want to
 * proceed?"); initDialogBoxButton("myWarningBox", "Proceed", "button primary",
 * proceedFunction); initDialogBoxButton("myWarningBox", "Cancel", "button",
 * hideThisModalDialog); bindDialogBoxToButton("myWarningBox",
 * "button_which_opens_window");
 * 
 * Where hideThisModalDialog() is provided below for general purpose
 * cancel/close buttons.
 * 
 * 
 * @param id
 *            the identifier of the window (html id)
 * @param titleText
 *            the title of the window
 * @param bodyText
 *            the body
 */
function initDialogBox(id, titleText, bodyText) {
	var dialogBox = '                                                          \
                   <div class="dialog_background" id="'
			+ id
			+ '">          \
                       <div class="dialog_body" id="body_'
			+ id
			+ '">        \
                           <header>'
			+ titleText
			+ '</header>                \
                           <div class="dialog_body_text">                    \
                                  '
			+ bodyText
			+ '                           \
                           </div>                                            \
                           <div class="dialog_body_buttons">                 \
                              <ul id="btn_'
			+ id
			+ '" class="action-list">   \
                              </ul>                                          \
                           </div>                                            \
                       </div>                                                \
                   </div>';
	$("body").append(dialogBox);
	$("#" + id).hide();

}

/**
 * Function which can be passed in the initDialogBoxButton() call to close the
 * dialog.
 * 
 * @param hideDialog
 */
function hideThisModalDialog(hideDialog) {
	hideDialog();
}

/**
 * Internal function which closes the dialog window given the button pressed
 * 
 * @param obj
 *            the pressed button
 */
function hideModalDialog(obj) {
	var id = $(obj).attr("id");
	var regex = /^btn[0-9]+_(.*)/;
	var matches = regex.exec(id);
	$("#" + matches[1]).hide();
}

/**
 * Initialize a button in the dialog window. When the button is clicked, the
 * callback function is called. The signature for the function is
 * callback(hideFunction). When the callback is complete, the function can elect
 * whether to hide the modal dialog or not using the hideFunction.
 * 
 * 
 * @param id
 *            The id of the window to the add the button to.
 * @param title
 *            The title of the button
 * @param attribs
 *            The class attributes of the button
 * @param func
 *            Callback function when the button is clicked the signature is
 *            func(hideFunction);
 */
function initDialogBoxButton(id, title, attribs, func) {
	var numButtons = $("#btn_" + id).children().length;
	var buttonId = "btn" + numButtons + "_" + id;
	var link = $("<a></a>");
	link.attr({
		"class" : attribs,
		"id" : buttonId
	});
	link.text(title);

	var funcCallback = function() {
		hideModalDialog("#" + buttonId);
	};
	var funcOnClick = function() {
		func(funcCallback);
	};
	link.click(funcOnClick);
	var button = $("<li></li>").html(link);

	$("#btn_" + id).append(button);
}

/**
 * Opens the dialog box with no effect when the specified object is clicked.
 * 
 * @param dialogId
 *            the id of the dialog
 * @param buttonId
 *            the id of the object which triggers the opening of the window
 */
function bindDialogBoxToButton(dialogId, buttonId) {
	$("#" + buttonId).click(function() {
		if (!$(this).hasClass("disabled")) {
			$("#" + dialogId).show();
		}
	});
}

/**
 * Fancy way to open the window. Specify an effect.
 * 
 * @param dialogId
 * @param buttonId
 * @param effect
 */
function bindDialogBoxToButtonWithEffect(dialogId, buttonId, effect) {
	$("#" + buttonId).click(function() {
		if (!$(this).hasClass("disabled")) {
			$("#body_" + dialogId).hide();
			$("#" + dialogId).show();
			$("#body_" + dialogId).show(effect);
		}
	});
}

function escapeQuotes(s) {
    return s.replace(/'/g, "\\\\'").replace(/"/g, "&quot");
}

function isUrlValid(url) {
    // Reference : https://gist.github.com/dperini/729294
    var urlRegex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    return urlRegex.test(url);
}

function defaultSchemelessUrlFieldsToHttp(textField) {
    var url = textField.val();
    if(url.trim().length > 0) {
        var http = 'http://';
        if(url.indexOf('://') === -1) {
            textField.val(http + url);
        }
    }
}

function disableSaveButton() {
    $('#submit_button').attr('disabled', 'disabled');
    $('#submit_button').addClass('disabled');
}

function enableSaveButton() {
    $('#submit_button').removeAttr('disabled');
    $('#submit_button').removeClass('disabled');
}

function openPostModalUpcomingVersion(contentId, title, message, postUrl) { 
    var content = modal.open({ content : $(contentId).data('markup') }); 
    content.find("#title").html(title); 
    content.find("#message").html(message); 
    content.find("#post_confirm_form").attr("action", postUrl); 
    return true; 
}

