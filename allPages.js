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
// script principale
