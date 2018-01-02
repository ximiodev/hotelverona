$(document).ready(function() {
    
	$('.btnMenu').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "0"},500 );
		secTipo = 99;
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
    
	$('.btnUserEntrar').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		var archivo = $(this).data('archivo');
		if(loginUser) {
			abrirSeccion(archivo);
		} else {
			extraLogin = {'seccion':archivo};
			abrirSeccion('login.html');
		}
	});
    
	$('#btnProgramaViaje').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		abrirSeccion('programa_viajeros.html');
	});
    
	$('#turismodereuniones').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		abrirSeccion('turismo_reuniones.html');
	});
    
	$('#btnHabitaciones').click(function(e) {
		e.preventDefault();
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		abrirSeccion('habitaciones.html');
	});
    
    
	$('.contenidos').on('click', '.btnToursInt',function(e) {
		e.preventDefault();
		abrirSeccion2($(this).attr('href'), $(this).data('tour'));
	});
    
	$('.contenidos').on('click', '#btnLogin',function(e) {
		e.preventDefault();
		doLogin();
	});
    
	$('.contenidos').on('click', '.btnProgramas',function(e) {
		e.preventDefault();
		abrirSeccion2('programas.html', 0);
	});
    
	$('.contenidos').on('click', '.btnRecreaciones',function(e) {
		e.preventDefault();
		abrirSeccion3('recreacion_interna.html',  $(this).data('recreacion'));
	});
    
	$('.contenidos').on('click', '.btnRecreacion',function(e) {
		e.preventDefault();
		abrirSeccion2('recreacion.html', 0);
	});
    
	$('.contenidos').on('click', '.btnVerMas.backPromo',function(e) {
		e.preventDefault();
		abrirSeccion2('promociones_interna.html', $(this).data('promo'));
	});
    
	$('.contenidos').on('click', '.itemHabitacion',function(e) {
		e.preventDefault();
		abrirSeccion2('habitaciones_interna.html', $(this).data('itemhabita'));
	});
    
	$('.contenidos').on('click', '.itemGalGen',function(e) {
		e.preventDefault();
		var cual = $(this).data('itemgal');
		iniciarGaleria(cual);
	});
    
	$('.contenidos').on('click', '.btnPedirRegalo',function(e) {
		e.preventDefault();
		var cual = $(this).data('regaid');
		pedidoRegalo = cual;
		if(loginUser) {
			abrirSeccion('form_regalo.html');
		} else {
			extraLogin = {'seccion':'form_regalo.html','item':cual};
			abrirSeccion('login.html');
		}
	});
    
	$('.contenidos').on('click', '#btnConfirmarRegalo',function(e) {
		e.preventDefault();
		if(loginUser) {
			confirmarRegalo();
		} else {
			extraLogin = {'seccion':'form_regalo.html','item':cual};
			abrirSeccion('login.html');
		}
	});
    
	$('.contenidos').on('click', '.itemGalGen2',function(e) {
		e.preventDefault();
		var cual = $(this).data('itemgal');
		iniciarGaleria2(cual);
	});
    
	$('.btnMenuUser').click(function(e) {
		e.preventDefault();
		$( "#right-panel" ).animate( {right: "0"},500 );
		secTipo = 98;
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
		secTipo = 0;
	});
	
	$( document ).on( "swipeleft swiperight", "#elcontenido", function( e ) {
		if ( e.type === "swipeleft"  ) {
			$( "#right-panel" ).animate( {right: "0"},500 );
			secTipo = 98;
		} else if ( e.type === "swiperight" ) {
			$( "#left-panel" ).animate( {left: "0"},500 );
			secTipo = 99;
		}
	});
	
	$( document ).on( "swiperight", "#right-panel", function( e ) {
		$( "#right-panel" ).animate( {right: "-100%"},500 );
		secTipo = 0;
	});
	
	$( document ).on( "swipeleft", "#left-panel", function( e ) {
		$( "#left-panel" ).animate( {left: "-100%"},500 );
		secTipo = 0;
	});
	
	$('.ui-loader').remove();
	$('.ui-btn-inner').remove();
});

function cerrarconte() {
	$( "#contenedor" ).animate( {right: "-100%"},500 );
	secTipo = 0;
}

function cerrarconte2() {
	$( "#contenedor2" ).animate( {right: "-100%"},500 );
	secTipo = 1;
}

function cerrarconte3() {
	$( "#contenedor3" ).animate( {right: "-100%"},500 );
	secTipo = 2;
}

function abrirSeccion(seccion) {
	$.ajax({
		type: 'GET',
		url: seccion,
		success: function (data) {
			secTipo = 1;
			$( "#contenedor" ).html(data);
			$( "#contenedor" ).animate( {right: "0"},500 );
			if(seccion=='promociones.html') {
				configurarPromos();
			}
			if(seccion=='tours.html') {
				configurarTours();
			}
			if(seccion=='regalos.html') {
				getRegalos();
			}
			if(seccion=='galeria.html') {
				getGaleria();
			}
			if(seccion=='turismo_reuniones.html') {
				getGaleria2();
			}
			if(seccion=='habitaciones.html') {
				getHabitaciones();
			}
			if(seccion=='programa_viajeros.html') {
				getProgramaViajeros();
			}
			if(seccion=='solicitudes.html') {
				getSolicitudes();
			}
			if(seccion=='novedades.html') {
				getNovedades();
			}
			if(seccion=='agenda.html') {
				getAgenda();
			}
			if(seccion=='form_regalo.html') {
				armarPedidoRegalo();
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

var fotoGaleriatur;
function getGaleria2() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getGaleria2',
		success: function (data) {
			if(data.res==true) {
				$('#imgGaleria2').html('');
				fotoGaleriatur = data.data;
				for(var x= 0; x<fotoGaleriatur.length;x++) {
					var item = ''+
					'<div class="itemGalGen2" data-itemgal="'+x+'">'+
					'	<img src="http://www.granhotelverona.com.ar/appContent/timthumb.php?w=150&h=150&src='+fotoGaleriatur[x].foto+'" class="imgPromoSm"></div>'+
					'</div>';
					$('#imgGaleria2').append(item);
				}
				$('#imgGaleria2').append('<div class="clear"></div>');
			} else {
				$('#imgGaleria2').html('No hay fotos.');
			}
		}
	});
}

var habitacionesAr;
function getHabitaciones() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getHabitaciones',
		success: function (data) {
			if(data.res==true) {
				$('#itemsHabitaciones').html('');
				habitacionesAr = data.data;
				for(var x= 0; x<habitacionesAr.length;x++) {
					var item = ''+
					'<div class="itemHabitacion" data-itemhabita="'+x+'">'+habitacionesAr[x].titlo+'<i class="fa fa-angle-right" aria-hidden="true"></i></div>';
					$('#itemsHabitaciones').append(item);
				}
				$('#itemsHabitaciones').append('<div class="clear"></div>');
			} else {
				$('#itemsHabitaciones').html('No hay habitaciones.');
			}
		}
	});
}

var programaViajeros;
function getProgramaViajeros() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getProgramaViajeros',
		success: function (data) {
			if(data.res==true) {
				$('#itemsViajeros').html('');
				programaViajeros = data.data;
				for(var x= 0; x<programaViajeros.length;x++) {
					var item = ''+
					'<div class="itemPrograma">'+
					'	<div class="descuentoRojo"><span>'+programaViajeros[x].descuento+'%</span>DESCUENTO</div>'+
					'	<div class="titulodesc">'+programaViajeros[x].titulo+'</div>'+
					'	<div class="direccdesc">'+programaViajeros[x].direccion+'</div>'+
					'	<div class="textdesc">'+programaViajeros[x].texto+'</div>'+
					'</div>';
					$('#itemsViajeros').append(item);
				}
				$('#itemsViajeros').append('<div class="clear"></div>');
			} else {
				$('#itemsViajeros').html('No hay promociones.');
			}
		}
	});
}

var solicitudesArr;
function getSolicitudes() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getSolicitudes&user_ID='+userData.ID,
		success: function (data) {
			if(data.res==true) {
				$('#itemsSolicitudes').html('');
				solicitudesArr = data.data;
				for(var x= 0; x<solicitudesArr.length;x++) {
					var item = ''+
					'<div class="itemPrograma">'+
					'	<div class="titulodesc">'+solicitudesArr[x].titulo+'</div>'+
					'	<div class="textdesc">'+fechaNormal(sqlToJsDate(solicitudesArr[x].fecha))+'</div>'+
					'</div>';
					$('#itemsSolicitudes').append(item);
				}
				$('#itemsSolicitudes').append('<div class="clear"></div>');
			} else {
				$('#itemsSolicitudes').html('No hay solicitudes.');
			}
		}
	});
}

var agendaArr;
function getAgenda() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getAgenda',
		success: function (data) {
			if(data.res==true) {
				$('#itemsAgenda').html('');
				agendaArr = data.data;
				for(var x= 0; x<agendaArr.length;x++) {
					var item = ''+
					'<div class="itemPrograma">'+
					'	<div class="titulodesc">'+agendaArr[x].titulo+'</div>'+
					'	<div class="textdesc">'+fechaNormal(sqlToJsDate(agendaArr[x].fecha))+'</div>'+
					'	<div class="descripciontxt">'+novedadesArr[x].texto+'</div>'+
					'</div>';
					$('#itemsAgenda').append(item);
				}
				$('#itemsAgenda').append('<div class="clear"></div>');
			} else {
				$('#itemsAgenda').html('No hay eventos en la agenda.');
			}
		}
	});
}

var novedadesArr;
function getNovedades() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getNovedades',
		success: function (data) {
			if(data.res==true) {
				$('#itemsNovedades').html('');
				novedadesArr = data.data;
				for(var x= 0; x<novedadesArr.length;x++) {
					var item = ''+
					'<div class="itemPrograma">'+
					'	<div class="titulodesc">'+novedadesArr[x].titulo+'</div>'+
					'	<div class="textdesc">'+fechaNormal(sqlToJsDate(novedadesArr[x].fecha))+'</div>'+
					'	<div class="descripciontxt">'+novedadesArr[x].texto+'</div>'+
					'</div>';
					$('#itemsNovedades').append(item);
				}
				$('#itemsNovedades').append('<div class="clear"></div>');
			} else {
				$('#itemsNovedades').html('No hay novedades.');
			}
		}
	});
}

var regalosArr;
function getRegalos() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getRegalos',
		success: function (data) {
			if(data.res==true) {
				$('#contenidoRegalos').html('');
				regalosArr = data.data;
				for(var x= 0; x<regalosArr.length;x++) {
					var item = ''+
					'<div class="itemPrograma">'+
					'	<div class="titulodesc">'+regalosArr[x].titulo+'</div>'+
					'	<div class="direccdesc">'+regalosArr[x].precio+'</div>'+
					'	<button class="btnUserEntrar btnPedirRegalo" data-regaid="'+x+'">Solicitar</button>'+
					'</div>';
					$('#contenidoRegalos').append(item);
				}
				$('#contenidoRegalos').append('<div class="clear"></div>');
			} else {
				$('#contenidoRegalos').html('No hay regalos.');
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

var pedidoRegalo;
function armarPedidoRegalo() {
	var regalo = regalosArr[pedidoRegalo];
	
	$('#descPedido').html('<strong>Nombre:</strong> '+userData.nombre+'<br><strong>Habitacion:</strong> '+userData.habitacion+'<br><strong>Regalo:</strong> '+regalo.titulo+' ('+regalo.precio+')<br>');
}

var recreacionAr;
function getRecreacion() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getRecreaciones',
		success: function (data) {
			if(data.res==true) {
				$('#itemsRecreacion').html('');
				recreacionAr = data.data;
				for(var x= 0; x<recreacionAr.length;x++) {
					var item = ''+
					'<a href="recreacion_interna.html" data-recreacion="'+x+'" class="btnComun backAct btnRecreaciones fndActHorz">'+
					'	'+recreacionAr[x].titulo+'<i class="fa fa-angle-right" aria-hidden="true"></i>'+
					'</a>';
					$('#itemsRecreacion').append(item);
				}
				$('#itemsRecreacion').append('<div class="clear"></div>');
			} else {
				$('#itemsRecreacion').html('No hay Recreaciones.');
			}
		}
	});
}

function abrirSeccion2(plantilla, elemento) {
	$.ajax({
		type: 'GET',
		url: plantilla,
		success: function (data) {
			secTipo = 2;
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
			if(plantilla=='habitaciones_interna.html') {
				$('.habitaHead').attr('style','background-image: url(http://www.granhotelverona.com.ar/appContent/'+habitacionesAr[elemento].foto+');');
				$('.seccionTit').html(habitacionesAr[elemento].titlo);
				$('#descHabita').html(habitacionesAr[elemento].descripcion+'<div class="clear"></div>');
			}
			if(plantilla=='recreacion.html') {
				getRecreacion();
			}
			if(plantilla=='programas.html') {
			}
		}
	});
}

function abrirSeccion3(plantilla, elemento) {
	$.ajax({
		type: 'GET',
		url: plantilla,
		success: function (data) {
			secTipo = 3;
			$( "#contenedor3" ).html(data);
			$( "#contenedor3" ).animate( {right: "0"},500 );
			if(plantilla=='recreacion_interna.html') {
				console.log(elemento);
				$('#imgActInt').attr('style','background-image: url(http://www.granhotelverona.com.ar/appContent/'+recreacionAr[elemento].foto+');');
				$('#titActInt').html(recreacionAr[elemento].titulo);
				var descRec = recreacionAr[elemento].texto.replace("[[separador]]", '<div class="separadorRec"></div>');
				$('#txtActInt').html(descRec+'<div class="clear"></div>');
			}
		}
	});
}

var userData
function doLogin() {
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		data: "user="+$('#user').val()+"&pass="+$('#pass').val()+"",
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=getLogin',
		success: function (data) {
			if(data.res==true) {
				//alert("SI");
				loginUser = true;
				userData = data.data[0];
				abrirSeccion(extraLogin.seccion);
			} else {
				alert(data.msj);
			}
		}
	});
}

function confirmarRegalo() {
	console.log(regalosArr);
	console.log(pedidoRegalo);
	$.ajax({
		type: 'POST',
		dataType: 'JSON',
		data: "user_ID="+userData.ID+"&regalo_ID="+regalosArr[pedidoRegalo].ID+"&comentarios="+$('#aclaraciones').val(),
		url: 'http://www.granhotelverona.com.ar/appContent/apiInfo.php?accion=confirmarRegalo',
		success: function (data) {
			if(data.res==true) {
				abrirSeccion('gracias_regalo.html');
			} else {
				alert(data.msj);
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

function iniciarGaleria2(cual) {
	var pswpElement = document.querySelectorAll('.galer2')[0];
	var itemU;
	var items = [];
	for(var x= 0; x<fotoGaleriatur.length;x++) {
		itemU = {
			src: 'http://www.granhotelverona.com.ar/appContent/'+fotoGaleriatur[x].foto,
			w: fotoGaleriatur[x].ancho,
			h: fotoGaleriatur[x].alto
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
	var gallery2 = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery2.init();
}

var secTipo = 0;
document.addEventListener("backbutton", function(e){
    if(secTipo==0) {
		//navigator.app.exitApp();
	}
    if(secTipo==1) {
		cerrarconte();
	}
    if(secTipo==2) {
		cerrarconte2();
	}
    if(secTipo==3) {
		cerrarconte3();
	}
    if(secTipo==99) {
		$( "#left-panel" ).animate( {left: "-100%"},500 );
	}
    if(secTipo==98) {
		$( "#right-panel" ).animate( {right: "-100%"},500 );
	}
}, false);

var extraLogin;
var loginUser = false;
function sqlToJsDate(sqlDate){
    var sqlDateArr1 = sqlDate.split(" ");
    
    var sqlDateArr2 = sqlDateArr1[0].split("-");
    var sDay = parseInt(sqlDateArr2[2]);
    var sMonth = parseInt(sqlDateArr2[1]);
    var sYear = parseInt(sqlDateArr2[0]);
    var sqlDateArr3 = sqlDateArr1[1].split(":");
    var sHour = parseInt(sqlDateArr3[0]);
    var sMinute = parseInt(sqlDateArr3[1]);
    var sSecond = parseInt(sqlDateArr3[2]);
    
    return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,0);
}

function fechaNormal(quien) {
  var mm = quien.getMonth() + 1; // getMonth() is zero-based
  var dd = quien.getDate();
  console.log(quien);
  console.log(mm);

  return [
          (dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
          quien.getFullYear()
         ].join('/');
};
