export function register(config) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
  
            if (registration.waiting) {
              console.log('Nuevo contenido disponible.');
            }
  
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      console.log('Nuevo contenido está disponible.');
                    } else {
                      console.log('El contenido está en caché para uso sin conexión.');
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  
  