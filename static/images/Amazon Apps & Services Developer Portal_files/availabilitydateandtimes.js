$(document).ready(function() {
    $('#availabilityDate[type!="hidden"], #previousReleaseDate[type!="hidden"]').datepicker({
        showOn         : 'button',
        buttonImage    : 'https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/devportal2/res/images/icon-calendar.png',
        buttonImageOnly: true,
        constrainInput: false
    });
    
    var previousAvailabilityDate = $('#availabilityDate[type!="hidden"]');
    if (previousAvailabilityDate.length) {
        previousAvailabilityDateTime = previousAvailabilityDate.val().trim();
        $('#availabilityDate[type!="hidden"]').change(maintainTime);
    }

    /**
     *	Maintains the time after changes to the date 
     *  through the datepicker.
     *
     *  - If the field was originally blank, will add default of 
     *  "12:00 AM" after a date is selected.
     *  
     *  - If a time was previously added, will maintain the time after the
     *  developer changes the date.  Updated to allow more variability in
     *  the time format due to locale differences.
     *
     */
    function maintainTime(event) {
        var availabilityDate = $(this);
        var newInput = availabilityDate.val();
        
        var time = getRemainder(previousAvailabilityDateTime);
        if (time === "" || previousAvailabilityDateTime === time)
            time = availabilityDateTimeTimeFormat;

        if (isDate(newInput))
            newInput = newInput + " " + time;

        availabilityDate.val(newInput);
        previousAvailabilityDateTime = newInput;
    }

    /**
    * Checks if the input is a date by checking if it follows any of the 
    * common date formats such as :
    * mm/dd/yy
    * yy-mm-dd
    * yy/mm/dd
    * yyyy/mm/dd
    * 
    */
    function isDate(date) {
        var regex = /^(\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4})$/gm;
        return regex.test(date);
    }

    /**
     * Retrieves the date from the input.
     * 
     * The date should follow any of the common formats described in isDate.
     */
    function getDate(date) {
        var regex = /(\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4})/gm;
        return date.match(regex);
    }

    /**
     * Removes the date from the input leaving behind the time.
     */
    function getRemainder(datetime) {
        var date = getDate(datetime);
        return datetime.replace(date, "").trim();
    }
});

