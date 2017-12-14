/**
 * 
 */

function submitTaxSettings() {
	document.forms["taxSettingsForm"].submit();
}

// For tax nexus settings, if any jurisdiction is checked for a state, the "State" jurisdiction must also be checked.
// If "State" jurisdiction is unchecked, uncheck all other jurisdictions for that state. 
$(document).ready(function() {
    $('#all').change(function() {
    	$(this).is(':checked') ? $('#nexus input').attr('checked', 'checked') : $('#nexus input').removeAttr('checked');
    });

    $('#nexus input').each(function() {
        if($(this).is('.statetax:not(:checked)')) {
        	$(this).closest('tr').find('.short').attr('readonly', 'true');
        }
    });
    
    $('#nexus input').change(function() {
        if($(this).is(':checked')) { 
            $(this).closest('tr').find('.statetax').attr('checked', 'checked');
            $(this).closest('tr').find('.short').removeAttr('readonly');
        }
        if($(this).is('.statetax:not(:checked)')) {
            $(this).closest('tr').find('input').removeAttr('checked');
            $(this).closest('tr').find('.short').attr('readonly', 'true');
        }
    });
});