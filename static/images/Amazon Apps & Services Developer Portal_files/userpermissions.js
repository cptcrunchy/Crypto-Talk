$(document).ready(function() {
	$('#matrix').hide();
	$('#matrix-toggle').click(
		function(e) {
			e.preventDefault();
			var showMatrixText = $('#show_matrix_label').val();
			var hideMatrixText = $('#hide_matrix_label').val();
			
			$(this).text() == hideMatrixText ? $(this)
					.text(showMatrixText) : $(this)
					.text(hideMatrixText);
			$('#matrix').toggle();
	});
});