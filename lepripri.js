if (navigator.language) {
    localStorage.lang = navigator.language;
}
function rederect (url) {
    location.href = url;
}
function initStyle () {
var lppStyle = document.createElement('style');
lppStyle.textContent = 'html, body {\
        background-color: #fcb1e3;\
        margin: 0px;\
        min-height: 700px;\
        width: 100%;\
        height: 100%;\
        width: -webkit-fill-available;\
        height: -webkit-fill-available;\
      }\
      ::backdrop {\
        background: none\
      }\
      dialog {\
        background: #fcb1e3;\
        border-color: #ff0000;\
        border-style: solid;\
      }\
      dialog.message {\
        display: flex;\
        align-items: center;\
        justify-content: center;\
        flex-direction: column;\
        padding-block-start: 0px;\
      }\
      dialog > img.warn {\
        width: 1em; height: 1em; display: block\
      }\
      #fileName {\
        height: 20px;\
        border-radius: 30px;\
        border-width: 2px;\
        border-style: solid;\
        border-color: #ff0000;\
        margin: 4px;\
        padding-inline: 9px;\
        padding-block: 0px;\
      }\
      button[minus], input[type="files"][minus]::file-selector-button:hover, {\
        position: absolute;\
        font-size: 12px;\
        padding: 2px;\
        margin: 0px;\
        translate: 160px 0px;\
      }\
      button[minus]:hover, button[minus]:focus, input[type="files"][minus]::file-selector-button:hover, input[type="files"][minus]:focus{\
        font-size: 15px;\
        translate: 162px;\
      }\
      button, a, ::file-selector-button{\
        background-color: #fcb1e3;\
        border-color: #FF0000;\
        border-style: solid;\
        border-width: 3px;\
        padding-inline: 7px;\
        padding-block: 5px;\
        font-family: arial;\
        font-size: 20px;\
        font-weight: bold;\
        cursor: pointer;\
        outline: none !important;\
        text-decoration: none;\
        color: #000000;\
      }\
      button:hover, button:focus, a:hover, a:focus, ::file-selector-button:hover, input[type="files"]:focus{\
        font-size: 22px;\
        translate: -8px 0px;\
        margin-inline-end: -30px;\
      }\
      button[not-button] {\
        border-style: none;\
        background: none;\
        font-family: revert;\
        cursor: revert;\
        font-size: revert;\
        translate: revert;\
      }\
      ::selection {\
        background: linear-gradient(#000000, #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff, #00ffff, #ffffff), #ffff00;\
    color: #ff0000;\
}';
document.head.appendChild(lppStyle);
}
// --- SORTIR LES FONCTIONS DU INTERVAL POUR ÉVITER LES ERREURS ---
window.bigCodeShelter = []; // Variable globale pour stocker les codes de TOUS les blocs

function fallbackCopy(text, index) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
var importReturnValueStruct = {
    succes: true,
    error: "",
    API: {}
}
window.lepripriAPI = Object.assign({
    messages: {
        alert,
        prompt,
        confirm,
        wait: {
            start: function (data, id) {return},
            end: function (id) {return}
        },
        info: alert,
        warn: alert,
        error: alert
    },
    copy: function(textToCopy) {
        if (navigator.clipboard && navigator.clipboard.writeText && document.hasFocus()) {
            navigator.clipboard.writeText(textToCopy);
        } else {
            fallbackCopy(textToCopy);
        }
    },
    Fullscreen: {
        enabled: function () {
            if (typeof document.fullscreenElement !== "undefined") {
                return document.fullscreenElement !== null;
            }
            if (typeof document.webkitFullscreenElement !== "undefined") {
                return document.webkitFullscreenElement !== null;
            }
            return false;
        },
        enter: function () {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        },
        exit: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    },
    import: {
        video: function () {
            returnValue = importReturnValueStruct;
            returnValue.succes = false;
            returnValue.error = "API not ready";
            return returnValue;
        },
        markdown: function () {
            returnValue = importReturnValueStruct;
            returnValue.succes = false;
            returnValue.error = "API not ready";
            return returnValue;
        },
        style: initStyle,
        allPages: function () {
            returnValue = importReturnValueStruct;
            returnValue.succes = false;
            returnValue.error = "API not ready";
            return returnValue;
        },
        library: function (url) {
            returnValue = importReturnValueStruct;
            returnValue.succes = false;
            returnValue.error = "API not ready";
            return returnValue;
        },
        customObject: function (obj, objectName) {
            returnValue = importReturnValueStruct;
            try {
                window.lepripriAPI.imported.custom = Object.assign(
                    {[objectName]: obj},
                    window.lepripriAPI.imported.custom
                );
                returnValue.succes = true;
            } catch (e) {
                returnValue.succes = false;
                returnValue.error = e;
            }
            return returnValue;
        }
    },
    imported: {
        custom: {
        },
        library: {
        },
        API: {
        }
    }
}, window.lepripriAPI);