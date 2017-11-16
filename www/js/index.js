var pushC;
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
		
		pushC.setApplicationIconBadgeNumber(() => {
			console.log('success');
		}, () => {
			console.log('error');
		}, 0);
    },
    setupPush: function() {
        
					
		pushC = PushNotification.init({ 
			"android": { "senderID": "898486557686"}
		});
		pushC.on('registration', function(data) {
			var datos = {
				'accion':'registrarDev',
				'user_platform': user_platform,
				'registrationId': data.registrationId
			}
			 
			 $.ajax({
				type: 'POST',
				data: datos,
				dataType: 'json',
				url: baseURL,
				success: function (data) {
					if(data.res) {
						
					}
				}
			  });
		});

		pushC.on('notification', function(data) {
			//~ console.log(data.title+" Message: " +data.message);
			navigator.notification.alert(
				data.message,         // message
				null,                 // callback
				data.title,           // title
				'Ok'                  // buttonName
			);
			document.getElementById("gcm_id").innerHTML = "<b>"+data.title+"</b>"+data.message;
		});

		pushC.on('error', function(e) {
			document.getElementById("gcm_id").innerHTML = e;
		});
    }
};
