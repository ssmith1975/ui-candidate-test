$(document).ready(function(){

	// Initialize JQuery effect
	init();

	// Events

	// Navigation links
	$('#left-sidebar .panel-body li').click(function(evt) {
		

		// Remove selected CSS from old selected LI
		$(this).siblings('#left-sidebar .panel-body li')
			.removeClass('selected');
			

		// Add selected CSS to new selected LI
		$(this).addClass('selected');
	});

	// Pulse panel toggle
	$("#pulse .imh-panel").click(function() {
		if ($(this).hasClass('imh-panel-small')) {

			// replace medium panel CSS with small
			$(this).siblings('#pulse .imh-panel-med')
				.removeClass('imh-panel-med')
				.addClass('imh-panel-small');

			// Replace small panel with medium panel CSS	
			$(this).removeClass('imh-panel-small')
				.addClass('imh-panel-med');

			// Attach drop shadow to medium panel
			addDropShadow();
		}
		
	});

	// Help link modal
	$('#help').click(function(){

		$.getJSON( "data/help.json", function( data ) {
			var content = '';
			$.each( data.help, function( i, item ) {
				//alert('title: ' + item.title + ' url: ' + item.URL);
				content += '<h3>' + item.title + '</h3>';
				content += '<p><a href="'+item.URL + '" target="_blank" title"'+ item.title+ '">'
				 + item.URL + '</a></p>';
		     });

			$('#helpModal .modal-body').html(content);

			$('#helpModal').modal('toggle');
		}).fail(function( jqxhr, textStatus, error) {

			var content = 'Request Failed: ' + textStatus + ', ' + error;

			$('#helpModal .modal-body').html(content);

			// Invoke help modal
			$('#helpModal').modal('toggle');
  });
	});


	// Window resize
	$( window ).resize(function() {
	  addDropShadow();
	});

	// Initialization
	function init(){
		addNavigationEffects();

			addDropShadow();
	}


	// Left sidebar navigation
	function addNavigationEffects(){
		
		

		$('#left-sidebar .panel-body li:not(.divider)').hover(function (evt) {
			//alert('test');
			if(! $(this).hasClass('selected') ){
				$(this).addClass('hovered');
			}
			
		}, function(evt) {
			
				$(this).removeClass('hovered');
			
		});
	}


	// Pulse panels

	function addDropShadow(){
		
		// Remove any previous added shadows
		$('.imh-panel-med-shadow').remove();

		// Append shadow div after medium panel
		$('#pulse .imh-panel-med').after('<div class="imh-panel-med-shadow"></div>');

		// Reference medium panel
		var $medPanel = $('#pulse .imh-panel-med'); 

		// Medium panel top, left coordinations
		var medPanelCoords = $medPanel.offset(); 

		// Medium panel width
		var medPanelWidth =  $medPanel.outerWidth(); 

		// Mediuam panel height
		var medPanelHeight =  $medPanel.outerHeight(); 

		// Top coordinate adjustment of shadow 
		var nudgeTop = -5; 

		// Left coordinate adjustment of shadow
		var nudgeLeft = -11; 

		// Set shadow coordinates
		$('.imh-panel-med-shadow').offset({left: medPanelCoords.left + nudgeLeft, 
			top: medPanelCoords.top + medPanelHeight + nudgeTop});
	}

}); // end document ready