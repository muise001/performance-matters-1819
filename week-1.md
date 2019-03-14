# Opdrachten Week 1
Minor Web Development - Performance Matters

### Opdracht 1: Pas de OBA app aan naar een server side versie met Node.js & Express

Als App die ik om ging bouwen heb ik mijn oude WAFS-applicatie gebruikt. Deze maakt gebruik van de Giphy API. Ik heb alle Client-Side JS verwijderd en heb de HTML omgeschreven naar EJS. Daarna heb ik een node-server opgezet. Vanuit de server wordt nu de API aangeroepen en de EJS gegenereerd. 

Stappenplan - server aanzetten
  1. Ga naar [mijn Repository](https://github.com/muise001/performance-matters-1819/)
  2. Klik op clone
  3. Open de GitHub Client App
  4. Geef toestemming om deze repository te clonen
  6. Open Terminal en type `cd /Users/[.Mijn.Computer.Naam.]/Documents/GitHub/performance-matters-1819`
  7. Type dan `npm install`
  8. Als de install klaar is, type dan `npm start`
  
In mijn package.json stond helaas geen `npm start` command. Deze heb ik daarom zelf toegevoegd.

### Opdracht 2: Tooling

Voor de tooling van deze app heb ik devolgende npm packages gebruikt:
  - [node-fetch](https://www.npmjs.com/package/node-fetch)
    - node-fetch maakt het mogelijk om server side te fetchen
  - [compression](https://www.npmjs.com/package/compression)
    - Deze npm-package zorgt ervoor dat alles binnen de server ge-compressed wordt. Hierdoor wordt de response vanaf de server sneller. Ook heeft dit binnen de audit 3 punten toegevoegd aan ***Performance***
    - Voor Compression <img src="https://github.com/muise001/performance-matters-1819/blob/master/images/voor-compression.png">
    - Na Compression <img src="https://github.com/muise001/performance-matters-1819/blob/master/images/na-compression.png">

Installeer en implementeer de tooling voor je app. Je kan hierbij kiezen hierbij voor bijvoorbeeld een workflow met NPM scripts, CommonJS en Browserify.
