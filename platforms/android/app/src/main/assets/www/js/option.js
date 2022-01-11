
document.getElementById("secure").addEventListener("click", secure);
var storage = window.localStorage;
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
    var value = storage.getItem("num");
    if (value == null) {
        alert("renseigner un numéro de télephone de secours");
    }
    else {
        console.log("le programme demarre");
        var number = value;
        var message = "je suis en securité";
        console.log(number + ": " + message);
        sms.send(number, message);
    }
}

bouton.onclick = () => {
    storage.setItem("num", numero.value);
    alert("numéro enregistré");
}
