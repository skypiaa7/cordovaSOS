/**************************************/
/** Event Listeners                   */
/**************************************/

document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);
document.addEventListener("deviceready", onDeviceReady, false);
document.getElementById("agression").addEventListener("click", agression);
document.getElementById("perdu").addEventListener("click", perdu);
document.getElementById("police").addEventListener("click", police);
document.getElementById("pompier").addEventListener("click", pompier);
document.getElementById("samu").addEventListener("click", samu);
document.getElementById("option").addEventListener("click", option);
console.log("test")

/*******************************************/
/* création de la variable de localstorage */
/*******************************************/
var storage = window.localStorage;


/**************************************/
/** Functions                         */
/**************************************/

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log("onDeviceReady");
    requestSMSPermission();
    fingerprintPermission();
    console.log("navigator.geolocation works well");
    document.getElementById('deviceready').classList.add('ready');
    // vérifie si un num a été renté // 
    var value = storage.getItem("num")
    if (value == null) {
        alert("renseigner un numéro de télephone de secours");
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onPause() {
    console.log("onPause");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onResume() {
    console.log("onResume");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onBackButton() {
    console.log("onBackButton");
}

/**************************************/

// demande de permisson pour acceder au lecteur biométrique //
function fingerprintPermission() {
    Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

    function isAvailableSuccess(result) {
        /*
        result depends on device and os. 
        iPhone X will return 'face' other Android or iOS devices will return 'finger' Android P+ will return 'biometric'
        */
        console.log("Fingerprint available");
    }

    function isAvailableError(error) {
        // 'error' will be an object with an error code and message
        alert(error.message);
    }
}

// demande la permission pour acceder aux messages //
function requestSMSPermission() {
    var success = function (hasPermission) {
        if (!hasPermission) {
            sms.requestPermission(function () {
                console.log('[OK] Permission accepted')
            }, function (error) {
                console.info('[WARN] Permission not accepted')
                // Handle permission not accepted
            })
        }
    };
    var error = function (e) {
        alert('Something went wrong:' + e);
    };
    sms.hasPermission(success, error);
}

// fonction anti-agression //
function agression() {
    var value = storage.getItem("num");
    // récupération du num de tel de secours //
    if (value == null) {
        alert("renseigner un numéro de télephone de secours");
    }
    else {
        // lampe torche //
        window.plugins.flashlight.available(function (isAvailable) {
            if (isAvailable) {
                var n = 0;
                while (n <= 100) { // 
                    // switch on
                    window.plugins.flashlight.switchOn(
                        function () { }, // optional success callback
                        function () { }, // optional error callback
                        { intensity: 0.3 } // optional as well
                    );

                    // switch off after 3 seconds
                    setTimeout(function () {
                        window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
                    }, 50 + n * 100);

                    setTimeout(function () {
                        window.plugins.flashlight.switchOn();
                    }, 100 + n * 100)

                    setTimeout(function () {
                        window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
                    }, 150 + n * 100);

                    n++;
                }
            } else {
                alert("Flashlight not available on this device");
            }
        });

        // enregistrement audio //
        var date = new Date();
        var Vnom = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var src = (Vnom + ".mp3");
        console.log(Vnom);
        var mediaRec = new Media(src,
            // success callback
            function () {
                console.log("recordAudio():Audio Success");
            },

            // error callback
            function (err) {
                console.log("recordAudio():Audio Error: " + err.code);
            }
        );

        // démare le record //
        mediaRec.startRecord();

        // Stop le record après 10s //
        setTimeout(function () {
            mediaRec.stopRecord();
            console.log("enregistrement terminee");
        }, 10000);

        // recupération de la position actuelle //
        navigator.geolocation.getCurrentPosition(function onSuccess(pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            console.log(lat + "," + lng)
            googlemaplink = "https://maps.google.com/?q=" + lat + "," + lng;

            // envoie un message avec les coordonées dans un google map //
            var number = value;
            var message = "je suis en danger je me trouve ici :" + googlemaplink;

            console.log(number + ": " + message);
            sms.send(number, message);
        },
            function onError(error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }
        );
    }
}

// fin agression //

// fonction pour 
function perdu() {
    navigator.geolocation.getCurrentPosition(function onSuccess(pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        console.log(lat + "," + lng);
        window.open("https://maps.google.com/?q=" + lat + "," + lng);
    });
}
// fonctions appel de num fixe (police, pompier, samu) //
function onSuccess() {
    console.log("appel fonctionel");
}

function onError() {
    console.log("appel non fonctionel")
}

function police() {
    var numero = '1811111111'
    window.plugins.CallNumber.callNumber(onSuccess, onError, numero, true);
}

function pompier() {
    var numero = '1511111111'
    window.plugins.CallNumber.callNumber(onSuccess, onError, numero, true);
}

function samu() {
    var numero = '1711111111'
    window.plugins.CallNumber.callNumber(onSuccess, onError, numero, true);
}

// fonction accès à la page option si l'empreinte est vérifié //
function option() {
    Fingerprint.show({
        description: "Some biometric description"
    }, successCallback, errorCallback);

    function successCallback() {
        console.log("marche bien");
        alert("vous êtes bien authentifié");
        window.location.href = "option.html";
    }

    function errorCallback(error) {
        alert("Authentication invalid " + error.message);
    }
}
