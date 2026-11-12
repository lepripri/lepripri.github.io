// compatibilité anciens navigateurs
if (typeof Promise === 'undefined') {
  // Implémentation alternative minimale d'une Promise
  window.Promise = (function() {
    function SimplePromise(executor) {
      var self = this;
      self.status = 'PENDING';
      self.value = undefined;
      self.reason = undefined;
      self.onFulfilledCallbacks = [];
      self.onRejectedCallbacks = [];

      function resolve(value) {
        if (self.status === 'PENDING') {
          self.status = 'FULFILLED';
          self.value = value;
          self.onFulfilledCallbacks.forEach(function(fn) {
            fn(self.value);
          });
        }
      }

      function reject(reason) {
        if (self.status === 'PENDING') {
          self.status = 'REJECTED';
          self.reason = reason;
          self.onRejectedCallbacks.forEach(function(fn) {
            fn(self.reason);
          });
        }
      }

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    SimplePromise.prototype.then = function(onFulfilled, onRejected) {
      var self = this;
      
      // Gestion par défaut si les callbacks ne sont pas fournis
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v; };
      onRejected = typeof onRejected === 'function' ? onRejected : function(err) { throw err; };

      return new SimplePromise(function(resolve, reject) {
        function handleFulfilled(value) {
          try {
            var result = onFulfilled(value);
            if (result instanceof SimplePromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }

        function handleRejected(reason) {
          try {
            var result = onRejected(reason);
            if (result instanceof SimplePromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }

        if (self.status === 'FULFILLED') {
          // Utilisation d'un setTimeout pour simuler l'asynchronisme (microtâches)
          setTimeout(function() { handleFulfilled(self.value); }, 0);
        } else if (self.status === 'REJECTED') {
          setTimeout(function() { handleRejected(self.reason); }, 0);
        } else if (self.status === 'PENDING') {
          self.onFulfilledCallbacks.push(function(value) {
            setTimeout(function() { handleFulfilled(value); }, 0);
          });
          self.onRejectedCallbacks.push(function(reason) {
            setTimeout(function() { handleRejected(reason); }, 0);
          });
        }
      });
    };

    SimplePromise.prototype.catch = function(onRejected) {
      return this.then(null, onRejected);
    };

    SimplePromise.resolve = function(value) {
      return new SimplePromise(function(resolve) {
        resolve(value);
      });
    };

    SimplePromise.reject = function(reason) {
      return new SimplePromise(function(resolve, reject) {
        reject(reason);
      });
    };

    return SimplePromise;
  })();
}
function fetchCompatible(url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Détermination de la méthode (GET par défaut)
      const method = options.method || 'GET';
      xhr.open(method, url, true);

      // Gestion des en-têtes (headers)
      if (options.headers) {
        // Si c'est un objet simple
        for (const [key, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      // Gestion du type de réponse si nécessaire
      // (Par défaut, on gère le texte brut pour le transformer ensuite)
      
      xhr.onload = function() {
        // Création d'un objet Response similaire à l'API Fetch native
        const response = {
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: {
            get: function(headerName) {
              return xhr.getResponseHeader(headerName);
            }
          },
          // Méthode pour parser en texte
          text: function() {
            return Promise.resolve(xhr.responseText);
          },
          // Méthode pour parser en JSON
          json: function() {
            try {
              return Promise.resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              return Promise.reject(new Error("Erreur lors du parsing JSON de la réponse"));
            }
          }
        };

        resolve(response);
      };

      xhr.onerror = function() {
        reject(new TypeError('Erreur réseau (Network request failed)'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Délai d\'attente dépassé (Timeout)'));
      };

      // Gestion du corps de la requête (body) pour POST, PUT, etc.
      let body = options.body || null;
      
      // Si le body est un objet et qu'aucun content-type n'est spécifié, on peut l'auto-sérialiser (optionnel)
      if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {
        // Si vous souhaitez un comportement automatique (attention, fetch natif n'impose pas toujours cela selon le type)
      }

      xhr.send(body);
    });
  };
if (typeof fetch === 'undefined') {
  globalThis.fetch = fetchCompatible;
}
// ##################### script principale #################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
// #########################################################################################
localStorage.lang = navigator.language;
function calculInconnu(a, b, c, x, y, z, multiplicateur) {
    var returning = 0;
    [a, b, c, x, y, z].forEach(function (items) {
        if (items == 0 || !items || items == 'undefined') {
            returning++
        }
    })
    if (returning > 5) return 0;
    return ((((x ^ 9 + 98 - 6 + 6 + 8*b + 8*y)/(a - c*b + b*z)*(9^y))/(10^(x^2))) + (a * b  *c * x * y * z)/(a - c - x - y - z) - z*a*(10^y))*multiplicateur;
}
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
function importPageCreator () {
    function itemListGetPageProposition (bodyHTML, headHTML, title, description, contentArray) {
    var generatedStyle = '', generatedButtons = '';
    contentArray.forEach(function (elementArray) {
      (function () {
        if (!elementArray.img) return;
        if (!elementArray.img.x && !elementArray.img.y) {
            generatedStyle += '[img="' + elementArray.id + '"] {background-image: url("' + elementArray.img.url + '");}';
        } else if (!elementArray.img.x && elementArray.img.y) {
            generatedStyle += '[img="' + elementArray.id + '"] {background-image: url("' + elementArray.img.url + '");background-position-y: ' + elementArray.img.y +'}';
        } else if (elementArray.img.x && !elementArray.img.y) {
            generatedStyle += '[img="' + elementArray.id + '"] {background-image: url("' + elementArray.img.url + '");background-position-x: ' + elementArray.img.x +'}';
        } else if (elementArray.img.x && elementArray.img.y) {
            generatedStyle += '[img="' + elementArray.id + '"] {background-image: url("' + elementArray.img.url + '");background-position-x: ' + elementArray.img.x +';background-position-y: ' + elementArray.img.y +'}';
        }
      })();
        if (elementArray.href) {
            generatedButtons += '<a href="' + elementArray.href +'" id="' + elementArray.id + '"><div img="' + elementArray.id + '"></div>' + elementArray.text + '</a>';
        } else {
            generatedButtons += '<a id="' + elementArray.id + '"><div img="' + elementArray.id + '"></div>' + elementArray.text + '</a>';
        }
    });
    return '<head><style>* {font-family: arial} h1 {text-align: center; display: block; margin: 0px; width: -webkit-fill-available; font-size: 40px;} p {font-size: 20px;} button, a{margin: 2px; background-color: #ffffff;border-color: #FF0000;border-style: solid;border-width: 3px;padding-inline: 7px;padding-block: 5px;font-family: arial;font-size: 20px;font-weight: bold;cursor: pointer;outline: none !important;text-decoration: none;color: #000000;}button[not-button] {border-style: none;background: none;font-family: revert;cursor: revert;font-size: revert;translate: revert;} [copyright], [copyright]::after {font-size: 15px;content: "©2025 le pripri • tout droits réservé"} a [img], button [img] {width: 250px; height: 150px;background-repeat: no-repeat; background-size: 250px;} a, button {display: flex; flex-direction: column; width: 250px; font-size: 15px; word-break: break-all;} ' + generatedStyle + 'div.all.buttons {display: grid;grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;} @media (max-width: 2080px) {div.all.buttons {grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;}} @media (max-width: 1700px) {div.all.buttons {grid-template-columns: 1fr 1fr 1fr 1fr;}} @media (max-width: 1150px) {div.all.buttons {grid-template-columns: 1fr 1fr 1fr;}} @media (max-width: 847px) {div.all.buttons {grid-template-columns: 1fr 1fr;}} @media (max-width: 563px) {div.all.buttons {grid-template-columns: 1fr;}}</style><title>' + title + '</title>' + headHTML + '</head><body><section><article><h1>' + title + '</h1><p>' + description + '</p></article><div class="all buttons">' + generatedButtons + '</div></section>' + bodyHTML + '</body>';
}
function presetLppPage(type, mode, title, parametters) {
    if (type == "itemlist" && mode == "big") {
        var HTML = itemListGetPageProposition(parametters.body, parametters.head, title, parametters.description, parametters.content.list[0]);
        document.querySelector("html").innerHTML = HTML;
    }
}
window.lepripriAPI.imported.API.currentPage = {
    change: {
        pressetType: {
            itemList: {
                PRESETTYPE: "itemlist",
                MODE: {
                    BIG: "big"
                },
                generateItem: function (id, text, href, imgURL, imgX, imgY) {
                    return {id, text, href, img: {urlURL, imgX, imgY}};
                },
                parrametters: function (body, head, description, item) {
                    return {body, head, description, content: {list: [item]}};
                }
            }
        },
        presetLppPage
    }
}
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
        pageCreatorEditor: importPageCreator,
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
