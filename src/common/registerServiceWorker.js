// service worker是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务。
// registerServiceWorker就是为react项目注册了一个service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。
// 而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。
// 注意，registerServiceWorker注册的service worker 只在生产环境中生效（process.env.NODE_ENV === 'production'）

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Navigator 对象包含有关浏览器的信息。
export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // 在支持SW的所有浏览器中都可以使用URL构造函数。
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // This is running on localhost. Lets check if a service worker still exists or not.
                checkValidServiceWorker(swUrl);

                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service ' +
                        'worker. To learn more, visit https://goo.gl/SC7cgQ'
                    );
                });
            } else {
                // Is not local host. Just register service worker
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the old content will have been purged and
                            // the fresh content will have been added to the cache.
                            // It's the perfect time to display a "New content is
                            // available; please refresh." message in your web app.
                            console.log('New content is available; please refresh.');
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
        .then(response => {
            // Ensure service worker exists, and that we really are getting a JS file.
            if (
                response.status === 404 ||
                response.headers.get('content-type').indexOf('javascript') === -1
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
