// Render / toggle sections
var sections = {
  toggle: function(route) {
    // zet startpagina als default
    if (route == "") {
      route = "#start"
    }
    // als pagina == djKhaled, laat audio afspelen
    if (route == "#djKhaled") {
      var audio = new Audio('jewerly.mp3');
      audio.play();
    }
    // laat alle pagina's verdwijnen
    for (var i = 0; i < document.querySelectorAll("section").length; i++) {
      document.querySelectorAll("section")[i].classList.add("none")
    }
    // open gevraagde pagina
    document.querySelector(route).classList.remove("none")
  }
}
export default sections
