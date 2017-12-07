$(document).ready(function() {
    
	$('.btnMenu').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "0"},300 );
	});
    
	$('.btnSpa').click(function(e) {
		e.preventDefault();
		$( "#contenedor" ).animate( {right: "0"},300 );
	});
    
	$('.btnMenuUser').click(function(e) {
		e.preventDefault();
		$( "#right-panel" ).animate( {right: "0"},300 );
	});
    
	$('.btnMenuUserLink a').click(function(e) {
		e.preventDefault();
		$('.btnMenuUserLink').removeClass('activo');
		$('.seccoinMenuUser').removeClass('secActiva');
		$(this).parent().addClass('activo');
		$('#'+$(this).data('secc')).addClass('secActiva');
	});
    
	$('.btnCerrarM a').click(function(e) {
		e.preventDefault();
		var quien = $(this).data('quien');
		if ( quien == "menu"  ) {
			$( "#left-panel" ).animate( {left: "-100%"},100 );
		} else {
			$( "#right-panel" ).animate( {right: "-100%"},100 );
		}
	});
	
	$( document ).on( "swipeleft swiperight", "#elcontenido", function( e ) {
		if ( e.type === "swipeleft"  ) {
			$( "#right-panel" ).animate( {right: "0"},300 );
		} else if ( e.type === "swiperight" ) {
			$( "#left-panel" ).animate( {left: "0"},300 );
		}
	});
	
	$( document ).on( "swiperight", "#right-panel", function( e ) {
		$( "#right-panel" ).animate( {right: "-100%"},300 );
	});
	
	$( document ).on( "swipeleft", "#left-panel", function( e ) {
		$( "#left-panel" ).animate( {left: "-100%"},300 );
	});
	
	$('.ui-loader').remove();
	$('.ui-btn-inner').remove();
});




var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}

function compartirEnlace(enlace) {
	var options = {
	  message: 'Gran Verona Hotel', // not supported on some apps (Facebook, Instagram)
	  subject: 'Gran Verona Hotel', // fi. for email
	  url: enlace,
	  chooserTitle: 'Gran Verona Hotel' // Android only, you can override the default share sheet title
	}
	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}
