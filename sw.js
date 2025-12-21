self.addEventListener("push", (event) => {
  const data = (() => {
    try { return event.data ? event.data.json() : null; }
    catch (e) { return null; }
  })();

  const title = data?.title || "Rally Sync";
  const options = data?.options || {
    body: "출발 시간입니다",
    vibrate: [200, 100, 200],
    icon: "/icon-192.png",
    badge: "/badge-72.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) return c.focus();
      }
      return clients.openWindow("/");
    })
  );
});
