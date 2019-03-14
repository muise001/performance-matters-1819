// import routes from "./routes.js"
import cookie from "./cookie.js"
import loader from "./loader.js"
import error from "./errorafhandeling.js"

// IIFE
const app = (function() {

  // Initialize App
  var app = {
    init: function() {
      // routes.init()
      // Kijk of er al een file in localstorage zit
      cookie.eat()

      // document.querySelector("form").addEventListener("submit", function(e){
      //   //preventDefault zodat de pagina niet refreshed
      //   // e.preventDefault()
      //   var zoekOpdracht = document.querySelector("input").value;
      //   // geef value van input mee als zoekOpdracht
      //   app.request(zoekOpdracht)
      //   loader.show()
      // })
    },
    request: function(zoekOpdracht) {
      //vraag giphy api op met zoekOpdracht
      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.giphy.com/v1/gifs/search?q= '+ zoekOpdracht +' &api_key=bMIPWUm5uWlqwJDmZPxDw4dKGzDZfGdd&limit=30', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          console.log(data)
          //data wordt gefiltert. Hij kijkt of er een user zit achter de data
          data.data = data.data.filter(data => data.user)
          //data wordt gesorteerd op datum
          data.data = data.data.sort((a, b) => (a.import_datetime > b.import_datetime ?-1 : 1))
          //voeg titel samen met naam, zodat het voor de gebruiker duidelijk is welke naam bij de titel hoort.
          var titelNaam = data.data.map(data => `${data.title} (${data.user.twitter})`)
          if (data.data.length != 0) {
            //zet alle data in de localStorage
            cookie.bake(zoekOpdracht, data, titelNaam)
            //geef data aan fillHome, zodat hij zichtbaar wordt in de site
            app.fillHome(data)
            document.getElementById("error").classList.add("none")
          }
          else {
            error.afhandeling(1)
          }
        }
        else {
          error.afhandeling(2)
          }
      };

      request.onerror = function() {
        error.afhandeling(3)
      }
      request.send();
    },
    fillHome : function(data){
      var oneDay = 24*60*60*1000;
      var first = data.data[0].import_datetime.split(" ")
      var last = data.data[data.data.length-1].import_datetime.split(" ")
      first = first[0].replace(/"-"/g, ",")
      last = last[0].replace(/"-"/g, ",")
      var firstLast = [{time: "first", end: new Date(first), start: new Date(last)}];
      var daysBetween = firstLast.reduce((total, firstLast) => total + (Math.abs(firstLast.end.getTime() - firstLast.start.getTime())) / oneDay, 0)

      document.getElementById("daysBetween").innerHTML = `Hoeveelheid dagen tussen eerste en laatste upload = ${daysBetween}`

      // Gebruik handlebars template tool om data in pagina te zetten
      var rawTemplate = document.getElementById("gifTemplate").innerHTML
      var compiledTemplate = Handlebars.compile(rawTemplate)
      var ourGeneratedHTML = compiledTemplate(data)

      var resultContainer = document.getElementById("results")
      resultContainer.innerHTML = ourGeneratedHTML

      this.fillDetail(data)
    },
    fillDetail : function(data){
      // Gebruik handlebars template tool om data in pagina te zetten
      var rawDetailTemplate = document.getElementById("gifDetailTemplate").innerHTML
      var compiledDetailTemplate = Handlebars.compile(rawDetailTemplate)
      var ourGeneratedDetailHTML = compiledDetailTemplate(data)

      var resultDetailContainer = document.getElementById("chosenOnes")
      resultDetailContainer.innerHTML = ourGeneratedDetailHTML

      loader.hide()
    }
  }
  // Start App
  app.init();

  return app
})()

export default app
