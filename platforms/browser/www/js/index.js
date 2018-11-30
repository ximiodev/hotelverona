try {
	var user_platform ;
	var baseURL = 'http://www.granhotelverona.com.ar/appContent/apiContenidos.php';
	var app = {
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function() {
			user_platform = device.platform;
			app.setupPush();
		},
		setPushIn0: function() {
		},
		setupPush: function() {
			app.setPushIn0();
			var push = PushNotification.init({ 
				"android": { "senderID": "898486557686"}
			});
			push.on('registration', function(data) {
				var datos = {
					'accion':'registrarDev',
					'user_platform': user_platform,
					'registrationId': data.registrationId
				}
				 
				push.setApplicationIconBadgeNumber(() => {
					console.log('success');
				}, () => {
					console.log('error');
				}, 0);
				 $.ajax({
					type: 'POST',
					data: datos,
					dataType: 'json',
					url: baseURL,
					success: function (data) {
						//~ document.getElementById("gcm_id").innerHTML = ("Res: "+data.res);
						if(data.res) {
							console.log(data.res);
						}
					}
				  });
			});

			push.on('notification', function(data) {
				//~ console.log(data.title+" Message: " +data.message);
				navigator.notification.alert(
					data.message,         // message
					null,                 // callback
					data.title,           // title
					'Ok'                  // buttonName
				);
				$( "#right-panel" ).animate( {right: "0"},500 );
				secTipo = 98;
				$('.btnMenuUserLink').removeClass('activo');
				$('.seccoinMenuUser').removeClass('secActiva');
				$('#menuNovedades').parent().addClass('activo');
				$('#menuNovedades').addClass('secActiva');
				//~ document.getElementById("gcm_id").innerHTML = "<b>"+data.title+"</b>"+data.message;
			});

			push.on('error', function(e) {
				//~ document.getElementById("gcm_id").innerHTML = e;
			});
		}
	};
} catch(err) {
    //~ document.getElementById("gcm_id").innerHTML = err.message;
}
