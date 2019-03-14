import loader from "./loader.js"

var error = {
  afhandeling: function(error) {
    if (error == 1) {
      // zoekOpdracht geeft geen resultaat. error afhandeling
      document.getElementById("error").classList.remove("none")
      document.getElementById("error").innerHTML = "Geen resultaat"
    } else if (error == 2) {
      // API reageert niet. error afhandeling
      document.getElementById("error").classList.remove("none")
      document.getElementById("error").innerHTML = "Er is een fout met Giphy. Probeer later opnieuw"
    } else {
      // Internet doet het niet. error afhandeling
      document.getElementById("error").classList.remove("none")
      document.getElementById("error").innerHTML = "Er is een fout met de internetverbinding"
    }
    loader.hide()
  }
}

export default error
