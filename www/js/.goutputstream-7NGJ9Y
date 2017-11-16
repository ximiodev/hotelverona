var push;
var user_platform = device.platform;
var baseURL = 'http://www.granhotelverona.com.ar/appContent/apiContenidos.php';
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.setupPush();
    },
    setPushIn0: function() {
		
		var push = PushNotification.init({ 
			"android": { "senderID": "898486557686"}
		});
		push.setApplicationIconBadgeNumber(() => {
			console.log('success');
		}, () => {
			console.log('error');
		}, 0);
    },
    setupPush: function() {
        app.setPushIn0();
		document.getElementById("gcm_id").innerHTML = ("sadasd");
		var push = PushNotification.init({ 
			"android": { "senderID": "898486557686"}
		});
		push.on('registration', function(data) {
			var datos = {
				'accion':'registrarDev',
				'user_platform': user_platform,
				'registrationId': data.registrationId
			}
			document.getElementById("gcm_id").innerHTML = ("Registrado");
			 
			 $.ajax({
				type: 'POST',
				data: datos,
				dataType: 'json',
				url: baseURL,
				success: function (data) {
					document.getElementById("gcm_id").innerHTML = ("Res: "+data.res);
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
			document.getElementById("gcm_id").innerHTML = "<b>"+data.title+"</b>"+data.message;
		});

		push.on('error', function(e) {
			document.getElementById("gcm_id").innerHTML = e;
		});
    }
};
