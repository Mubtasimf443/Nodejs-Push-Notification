/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/

self.addEventListener('push', async function (event) {
  console.log('Push event received:', event);
  let data = await event.data.json();
  console.log(data);

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/favicon.ico'
  });
});

// self.addEventListener('sync', async function (event) {
//   let data = await event.data.json();
//   console.log(data);
//   event.waitUntil(() => {
//     self.registration.showNotification(data.title, {
//       body: data.body,
//       icon: '/favicon.ico'
//     });
//   });
// })

// Optional: Handle notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Customize behavior (e.g., open a URL) on click
  event.waitUntil(clients.openWindow('/'));
});
