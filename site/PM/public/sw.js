fetch("./rev-manifest.JSON")
.then(res => res.json())
.then(data => {

  const sw = data["sw_cache.js"]

  if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
      .register(sw)
      .then(reg => console.log("sw registered"))
      .catch(err => console.log("hallo"))
    })
  }
})
