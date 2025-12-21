self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("Rally Sync", {
      body: "출발 시간입니다",
      vibrate: [200, 100, 200],
    })
  );
});
