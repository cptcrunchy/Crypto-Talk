/*
JS: Modal.js
Description: Launches a centered modal onto the screen
Author: Christine Estrada
Author URI: http://www.grepgirl.com
Usage:

  Modal can launch an external file:
  -------------------------------------------------
  $.get('success.html', function(data){
    modal.open({content: data});
  });

  Modal can launch specific content:
  -------------------------------------------------
  modal.open({content: "<h1>Testing content</h1><p>Hey there!</p>"});


  A link assigned the class modal will launch an external link into the modal
  -------------------------------------------------
  <a href="test.html" class="modal"......</a>


  A link assigned the class modal will launch an inline element specified by 
  corresponding anchor/ID into the modal
  -------------------------------------------------
  <a href="#inline" class="modal"......</a>
  
  <div id="inline" class="modal-content">......</div>
*/

function openSimpleModal(modalWorkspaceId) {
    // Load content from DOM
	var modalData = $(modalWorkspaceId).html();

	modal.open({
		content: modalData
	});
}

var modal = (function() {
    var method = {}, $overlay, $modal, $content, $inlineTarget, $close;

    // Center the modal in the viewport
    method.center = function() {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(true), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(true), 0) / 2;

        $modal.css({
            top : top + $(window).scrollTop(),
            left : left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function(settings) {
        $content.empty().append(settings.content);

        $modal.css({
            width : settings.width || 'auto',
            height : settings.height || 'auto',
            overflow : settings.overflow || 'visible'
        });

        method.center();
        $(window).bind('resize.modal', method.center);
        $("body").addClass("modal-open");
        $modal.show();
        $overlay.show();
        return $content;
    };

    // Close the modal
    method.close = function() {
    	if ($inlineTarget) {
			  $inlineTarget.hide();
			  $('body').append($inlineTarget);
			  $inlineTarget = null;
		}
		$("body").removeClass("modal-open");
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal-container"></div>');
    $content = $('<div id="content"></div>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content);

    $(document).ready(function() {
        $('body').append($overlay, $modal);
        $('.modal-content').hide();
        
        $('.modal-markup-holder').each(function() {
            var markup = $(this).html();
            $(this).empty();
            $(this).data('markup', markup);
        });
        $('.modal').click(function(e) {
            e.preventDefault();
            if ($(this).attr("href").indexOf("#") != -1) {
      	      obj = $(this).attr("href").split("#")[1];
      	      $inlineTarget = $("#" + obj);
      	      $inlineTarget.show();
      	      modal.open({content: $inlineTarget});
      	    }
      	    else {
      	      $.get($(this).attr("href"), function(data) {
      	        modal.open({content: data});
      	      });
      	    }
        });
    });

    $overlay.click(function(e) {
        e.preventDefault();
        method.close();
    });

    return method;
}());