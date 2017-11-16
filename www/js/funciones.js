$(document).ready(function() {
	$('.mainmenu-item .linkMen').hover(function() {
		if($(this).data('sub')!=undefined) {
			$($(this).data('sub')).show();
		}
	}, function() {
		if($(this).data('sub')!=undefined) {
			$($(this).data('sub')).hide();
		}
	});
	
    
	$('.linkModalSponsor').click(function(e) {
		e.preventDefault();
		var nid = $(this).data('sid');
		$('#modalSponsor  #tituloSponsor').html($(this).data('nombre'));
		$.ajax({
			method: "POST",
			url: "ajax/getSponsor.php",
			data: { nid: nid },
			success: function(res){
				$('#modalSponsor .modal-body').html(res);
				$('#modalSponsor').modal('show'); 
			}
		});
	});
	
    
	$('.colOraSel').click(function(e) {
		e.preventDefault();
		var oid = $(this).data('oid'); 
		$.ajax({
			method: "POST",
			url: "ajax/getOrador.php",
			data: { oid: oid },
			success: function(res){
				$('#modalNota .modal-body').html(res);
				$('#modalNota').modal('show'); 
			}
		});
	});
	
    
	$('#modalPrensa').on('click', '.btnSeguirLeyendo',function(e) {
		e.preventDefault();
		var nid = $(this).data('nid');
		$('#modalPrensa').modal('hide'); 
		$.ajax({
			method: "POST",
			url: "ajax/getNota.php",
			data: { nid: nid },
			success: function(res){
				$('#modalNota .modal-body').html(res);
				$('#modalNota').modal('show');
			}
		});
	});
	
	$('.firstBloq').next().waypoint(function(direction) {
		if (direction ==='down') {
			$('.navbar').addClass('barragris');
		} else {
			$('.navbar').removeClass('barragris');        
		}
	},{
		offset: 300
    });
	
	
	$('.carousel[data-type="multi"] .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));

		for (var i=0;i<2;i++) {
			next=next.next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}

			next.children(':first-child').clone().appendTo($(this));
		}
	});
	
	owl = $('#carousel-prensa').owlCarousel({
		itemsDesktop : [1600,4],
		itemsDesktopSmall : [980,4],
		itemsTablet: [768,3],
		itemsTabletSmall: false,
		itemsMobile : [479,1]
	}).data('owlCarousel');
	$('#carousel-prensa').css('width',$(window).width());
	$( '.agendaLinko').click(function () {
		var quien = $(this).parent().find('.agendaTextC');
		if ( quien.is( ":hidden" ) ) {
			quien.slideDown( "slow" );
		} else {
			quien.slideUp();
		}
	});
	$('.aniosCont .btnAnio').click(function(e) {
		e.preventDefault();
		var data = $(this).data('val');
		var datos = { tipo: "anio", valor: data};
		$.ajax({
			method: "POST",
			url: "ajax/getNotas.php",
			data: datos,
			success: function(res){
				if($("#carousel-prensa").data('owlCarousel')!=undefined)
					$("#carousel-prensa").data('owlCarousel').destroy();
				if(res!="") {
					$("#carousel-prensa").html(res);
					owl = $('#carousel-prensa').owlCarousel({
						itemsDesktop : [1600,4],
						itemsDesktopSmall : [980,4],
						itemsTablet: [768,3],
						itemsTabletSmall: false,
						itemsMobile : [479,1]
					}).data('owlCarousel');
					$('#carousel-prensa').css('width',$(window).width());
				} else {
					$("#carousel-prensa").attr('style','opacity: 1; display: block; width: 1920px;');
					$("#carousel-prensa").html('<div class="itemNone">No hay notas para el periodo seleccionado.</div>');
				}
			}
		});
	});
	
	$('#formCont').submit(function( event ) {
		var error = 0;
		var campos = new Array();
		if ( $( "#nombre" ).val() == "" ) { error++; campos.push('Nombre');}
		if ( $( "#apellido" ).val() == "" ) { error++; campos.push('Apellido');}
		if ( $( "#email" ).val() == "" ) { error++; campos.push('Email');}
		if ( $( "#comentarios" ).val() == "" ) { error++; campos.push('Comentarios');}
		
		if(error == 0) {
			return;
		}
 
		alert("Debe completar todos los campos. Faltaron: "+campos.join(', '));
		event.preventDefault();
	});
	
	$('#modalPrensa').on('click', '.btnMes',function(e) {
		e.preventDefault();
		var data = $(this).data('val');
		var datos = { tipo: "mes", valor: data};
		$.ajax({
			method: "POST",
			url: "ajax/getNotas.php",
			data: datos,
			success: function(res){
				if($("#carousel-prensa").data('owlCarousel')!=undefined)
					$("#carousel-prensa").data('owlCarousel').destroy();
				if(res!="") {
					$("#carousel-prensa").html(res);
					owl = $('#carousel-prensa').owlCarousel({
						itemsDesktop : [1600,4],
						itemsDesktopSmall : [980,4],
						itemsTablet: [768,3],
						itemsTabletSmall: false,
						itemsMobile : [479,1]
					}).data('owlCarousel');
					$('#carousel-prensa').css('width',$(window).width());
				} else {
					$("#carousel-prensa").attr('style','opacity: 1; display: block; width: 1920px;');
					$("#carousel-prensa").html('<div class="itemNone">No hay notas para el periodo seleccionado.</div>');
				}
			}
		});
	});
});

var owl;
var owl2;
var opened = false;
var totalItems = Array();
var currentIndex = Array();

function compartirNota(e, quien) {
	e.preventDefault();
	var url = $(quien).data('url');
	var title = $(quien).data('title');
	var sharer = $(quien).data('sharer');
	if(sharer=="facebook") {
		window.open('https://www.facebook.com/sharer/sharer.php?u='+url,"", "height=570,width=570,status=yes,toolbar=no,menubar=no,location=no");
	}
	if(sharer=="twitter") {
		window.open('https://twitter.com/intent/tweet/?text='+title+'&url='+url,"", "height=570,width=570,status=yes,toolbar=no,menubar=no,location=no");
	}
	if(sharer=="email") {
		window.location.href = 'mailto:?subject='+title+'&body='+title+'%0A'+url;
	}
}
var waypoint = new Waypoint({
  element: document.getElementById('homeCont'),
  handler: function(direction) {
    console.log('I am 20px from the top of the window');
    $('.navbar').addClass('barragris');
  },
  offset: -20 
})
var waypoint = new Waypoint({
  element: document.getElementById('homeCont'),
  handler: function(direction) {
    console.log('chauindow');
    $('.navbar').removeClass('barragris');
  },
  offset: -10 
})


$('#homeCont').waypoint(function(direction) {
  if (direction === 'up') {
    $('.navbar').removeClass('barragris');
  }
}, {
  offset: '1%'
});
