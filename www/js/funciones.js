$(document).ready(function() {
    
	$('.btnMenu').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "0"},500 );
	});
    
	$('.botoneraHome a').click(function(e) {
		e.preventDefault();
		abrirSeccion($(this).attr('href'));
	});
    
	$('#btnGalerias').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		abrirSeccion('galeria.html');
	});
    
    
	$('.contenidos').on('click', '.btnToursInt',function(e) {
		e.preventDefault();
		abrirSeccion2($(this).attr('href'), $(this).data('tour'));
	});
    
	$('.contenidos').on('click', '.btnVerMas.backPromo',function(e) {
		e.preventDefault();
		abrirSeccion2('promociones_interna.html', $(this).data('promo'));
	});
    
	$('.contenidos').on('click', '.itemGalGen',function(e) {
		e.preventDefault();
		var cual = $(this).data('itemgal');
		iniciarGaleria(cual);
	});
    
	$('.btnMenuUser').click(function(e) {
		e.preventDefault();
		$( "#right-panel" ).animate( {right: "0"},500 );
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
			$( "#left-panel" ).animate( {left: "-100%"},500 );
		} else {
			$( "#right-panel" ).animate( {right: "-100%"},500 );
		}
	});
	
	$( document ).on( "swipeleft swiperight", "#elcontenido", function( e ) {
		if ( e.type === "swipeleft"  ) {
			$( "#right-panel" ).animate( {right: "0"},500 );
		} else if ( e.type === "swiperight" ) {
			$( "#left-panel" ).animate( {left: "0"},500 );
		}
	});
	
	$( document ).on( "swiperight", "#right-panel", function( e ) {
		$( "#right-panel" ).animate( {right: "-100%"},500 );
	});
	
	$( document ).on( "swipeleft", "#left-panel", function( e ) {
		$( "#left-panel" ).animate( {left: "-100%"},500 );
	});
	
	$('.ui-loader').remove();
	$('.ui-btn-inner').remove();
});

function cerrarconte() {
	$( "#contenedor" ).animate( {right: "-100%"},500 );
}

function cerrarconte2() {
	$( "#contenedor2" ).animate( {right: "-100%"},500 );
}

function abrirSeccion(seccion) {
	$.ajax({
		type: 'GET',
		url: seccion,
		success: function (data) {
			$( "#contenedor" ).html(data);
			$( "#contenedor" ).animate( {right: "0"},500 );
			if(seccion=='promociones.html') {
				configurarPromos();
			}
			if(seccion=='tours.html') {
				configurarTours();
			}
			if(seccion=='galeria.html') {
				getGaleria();
			}
		}
	});
}
var promosciones;
function configurarPromos() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getPromociones',
		success: function (data) {
			if(data.res==true) {
				$('#contenidoPromos').html('');
				promosciones = data.data;
				for(var x= 0; x<promosciones.length;x++) {
					var item = ''+
					'<div class="itemPromo">'+
					'	<div class="col-xs-5"><img src="http://www.granhotelverona.com.ar/appContent/timthumb.php?w=150&h=150&src='+promosciones[x].imagen+'" class="imgPromoSm"></div>'+
					'	<div class="col-xs-7">'+
					'		<div class="titPromo">'+promosciones[x].titulo+'</div>'+
					'		<div class="txtPromo">'+promosciones[x].descripcion+'</div>'+
					'		<div class="btnVerMas backPromo" data-promo="'+x+'">MÁS INFO</div>'+
					'	</div>'+
					'	<div class="clear"></div>'+
					'</div>';
					$('#contenidoPromos').append(item);
				}
				$('#contenidoPromos').append('<div class="clear"></div>');
			} else {
				$('#contenidoPromos').html('No hay promociones.');
			}
		}
	});
}

var fotoGaleria;
function getGaleria() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getGaleria',
		success: function (data) {
			if(data.res==true) {
				$('#imgGaleria').html('');
				fotoGaleria = data.data;
				for(var x= 0; x<fotoGaleria.length;x++) {
					var item = ''+
					'<div class="itemGalGen" data-itemgal="'+x+'">'+
					'	<img src="http://www.granhotelverona.com.ar/appContent/timthumb.php?w=150&h=150&src='+fotoGaleria[x].foto+'" class="imgPromoSm"></div>'+
					'</div>';
					$('#imgGaleria').append(item);
				}
				$('#imgGaleria').append('<div class="clear"></div>');
			} else {
				$('#imgGaleria').html('No hay fotos.');
			}
		}
	});
}

var tours;
function configurarTours() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getTours',
		success: function (data) {
			if(data.res==true) {
				$('#contTours').html('');
				tours = data.data;
				for(var x= 0; x<tours.length;x++) {
					var item = ''+
					'<a href="tours_interna.html" data-tour="'+x+'" class="btnComun backTours btnToursInt">'+
					'	<img src="images/iconMapa.png"><br>'+
					'	'+tours[x].titulo+''+
					'</a>';
					$('#contTours').append(item);
				}
				$('#contTours').append('<div class="clear"></div>');
			} else {
				$('#contTours').html('No hay Tours.');
			}
		}
	});
}

function abrirSeccion2(plantilla, elemento) {
	$.ajax({
		type: 'GET',
		url: plantilla,
		success: function (data) {
			$( "#contenedor2" ).html(data);
			$( "#contenedor2" ).animate( {right: "0"},500 );
			if(plantilla=='promociones_interna.html') {
				$('#promoContInt').html('<img src="http://www.granhotelverona.com.ar/appContent/'+promosciones[elemento].imagen+'" class="imagenPromoB">');
			}
			if(plantilla=='tours_interna.html') {
				$('#tourImg').attr('style','background-image: url(http://www.granhotelverona.com.ar/appContent/'+tours[elemento].foto+');');
				$('#tourLink').attr('href','javascript:openMap(\''+tours[elemento].mapa+'\',\''+tours[elemento].titulo+'\');');
				$('#tourTit').html(tours[elemento].titulo);
				$('#tourTxt').html(tours[elemento].texto+'<div class="clear"></div>');
			}
		}
	});
}

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

function openMap(geocoords, texto) {
	if (device.platform=="iOS") {
		window.open('maps://?q=' + geocoords, '_system');
	} else {
		var label = encodeURI(texto); // encode the label!
		window.open('geo:0,0?q=' + geocoords + '(' + label + ')', '_system');
	}
}

function iniciarGaleria(cual) {
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var itemU;
	var items = [];
	for(var x= 0; x<fotoGaleria.length;x++) {
		itemU = {
			src: 'http://www.granhotelverona.com.ar/appContent/'+fotoGaleria[x].foto,
			w: fotoGaleria[x].ancho,
			h: fotoGaleria[x].alto
		};
		items.push(itemU);
	}
	

	// define options (if needed)
	var options = {
		// optionName: 'option value'
		// for example:
		index: cual // start at first slide
	};

	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}
