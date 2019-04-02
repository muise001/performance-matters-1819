let showOffline = document.cookie

if(!navigator.onLine){
  document.querySelector("#connectionStatus").classList.remove("none")
  if (!showOffline) {
    document.cookie="showOffline=read"
    if (document.querySelector(".error")) {
      document.querySelector(".error").innerHTML = `
        <div class="error">
          <img src="img/noconnection.gif" />
          <p>U gebruikt de offline versie van de site. Klik</p>
          <a href="/history">Hier</a>
          <p>Om eerder bezochte gifjes te bekijken</p>
        </div>
      `
    }
  }
}
