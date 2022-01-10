document.getElementById("secure").addEventListener("click", secure);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log("onDeviceReady");
    document.getElementById('deviceready').classList.add('ready');
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

function secure() {
    console.log("le programme demarre");
    var number = '0676163872';
    var message = "je suis en securité";
    console.log(number + ": " + message);
    sms.send(number, message);
}