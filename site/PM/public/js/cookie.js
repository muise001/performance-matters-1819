import app from "./app.js"

var cookie = {
  bake: function(zoekOpdracht, data, titelNaam) {
    console.log("bake")
    // zet data-elementen in localStorage
    localStorage.setItem('oudeZoekopdracht', zoekOpdracht)
    localStorage.setItem('gifSearchHistory',JSON.stringify(data))
    localStorage.setItem('userNames', titelNaam)
    this.addToIntestinalFlora()

  },
  eat: function() {
    // als je Zoekgeschiedenis niet leeg is, ga naar de volgende functie
    if (JSON.parse(localStorage.getItem("gifSearchHistory")) != null) {
      this.addToIntestinalFlora()
    }
    else {
      console.log("geen bestaande cookie");
    }
  },
  addToIntestinalFlora: function() {
    // vraag data-elementen op uit local storage.
    var savedSearch = localStorage.getItem("oudeZoekopdracht")
    var users = localStorage.getItem("userNames")
    users = users.split(",")
    var savedData = JSON.parse(localStorage.getItem("gifSearchHistory"))
    // zet de oude zoekopdracht in de Zoekgeschiedenis pagina
    document.getElementById("oudeZoekOpdracht").innerHTML = savedSearch
    document.querySelector("#history ul").innerHTML = ""
    for (var i = 0; i < users.length; i++) {
      document.querySelector("#history ul").innerHTML += `<li>${users[i]}</li>`
    }
    // als je klikt op de oude zoekopdracht, vul dan de oude (opgeslagen-)data in
    document.getElementById("oudeZoekOpdracht").addEventListener("click", function(){
      app.fillHome(savedData)
    })
  }
}

export default cookie
