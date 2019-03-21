# Opdrachten Week 2
Minor Web Development - Performance Matters

### Opdracht 1: Optimaliseer de performance van jou applicatie

Voor deze opdracht heb ik me gefocussed op de twee dikgedrukte onderdelen in de lijst hieronder. Maar de "Time to first byte" en "Runtime performance" zijn hierdoor ook verbeterd

* First view  
* Repeat view  
* **Perceived performance**
* **Image loading**
* Runtime performance
* Time to first byte

### Percieved perfomance 

Voor percieved performance heb ik caching toegepast. Dit heb ik gedaan met drie regels simpele code

```javascript
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60); next();
});
```

Door deze code werden mijn bestanden ge-cached. Hierdoor werkt de wesbite heel snel nadat hij voor het eerst geladen werd. Het enige probleem wat ik hiermee ondervond, was dat als ik iets aanpaste in bijvoorbeeld de css, de css niet ingeladen werd op de pagina, omdat hij de css vanuit de cache serveerde.

Om dit probleem tegen te gaan ben ik `gulp-rev` gaan gebruiken. Dit zorgt ervoor dat (in mijn geval) de css en js na het opnieuw opstarten van de server in een aparte map werd geplaatst met een nieuwe naam (zoals: `css-ergoierh284.css`). Dit kwam netjes binnen in `/cache/css/`.

Het probleem dat ik nu had, was dat er heel leuk een nieuw bestand ontstond, maar hij nog niet geimplementeerd werd in mijn `.ejs` templates.

Eerst heb ik geprobeerd dit op te lossen met `gulp-rev-replace`. Na uren m'n tanden stukgebeten te hebben op deze tool. Heb ik besloten om het om anders te doen. 

Mijn denkwijze :
  1. Er is al een json-bestand met daarin `{ css/css.css : css/css-ergoierh284.css }` dankzij `gulp-rev`.
  2. Dit bestand moet ik uitlezen op mijn server. Dat deed ik met devolgende functie: 
  ```javascript
  function revUrl(url) {
    let fileName = JSON.parse(fs.readFileSync("cache/rev-manifest.json", 'utf8'))
    return fileName[url]
};
```
  3. Nu kon ik met de functie `const css = revUrl(css/css.css)` uitlezen wat de naam was die ik moest gebruiken voor het juiste css bestand.
  4. Ten slotte moest deze nog in mijn templating tool geimplementeerd worden. Dat deed ik met onderstaande functie
  ```javascript
  app.use(function (req, res, next) {
   res.locals = {
     css: revUrl("css/css.css"),
     js: revUrl("js/js.js")
   };
   next();
});
```
  5. Hierdoor kan ik in mijn `header.ejs` mijn link-tag veranderen naar `<link rel="stylesheet" href="<%=css%>">`.
  
  
Eindelijk het probleem opgelost :)
Maar ik wil meer.

De css was heel erg groot. Dat komt omdat ik in het css-bestand twee verschillende designs had staan voor dezelfde site. Maar ik gebruikte er maar eentje. De ander was volledig uit-ge-comment. Dat wilde ik niet meer, maar ik wilde wel beide designs behouden in dit het originele bestand. 

oplossing? **gulp-clean-css**

Ik wilde dat alleen het "nieuwe" css bestand veranderd werd. In mijn geval is dit `cache/css/css-ergoierh284.css`. 
Dit is mijn bijbehorende gulp-task

```javascript
let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.src('cache/css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest("cache/css"))
```

Nu zit nogsteeds het bestand (`css-ergoierh284.css`) in mijn cache map. Alleen is hij nu geminified!

***Door deze verandering is mijn css van `1.6K B` naar `886 B` gegaan!***

Maar... om zowel `gulp-rev` als `gulp-clean-css` uit te voeren moet ik in mijn console het volgende typen.
  ```
  npm run revision
  npm run minify
  npm start
  ```

Tijd om mijn `package.json` in te duiken.
Na een tijdje copy-pasten en google'en ben ik op hetvolgende uitgekomen
```
  "scripts": {
    "start": "npm run revision && nodemon app.js",
    "postbuild": "npm run revision",
    "revision": "node tasks/revision-hash.js && node tasks/revision-mincss.js",
    "mincss": "node tasks/revision-mincss.js"
  },
```    

Als ik nu `npm start` type, dan voert hij alles uit en ook nog in de goede volgoorde!!

Na al deze veranderingen is mijn page-render met meer dan `3s` sneller geworden op slow 3G :

Voor veranderingen
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/voor%20cache.png">

Na veranderingen
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/na%20cache.png">

### Image loading

Mijn app - een gif-loader - haalt een aantal afbeeldingen op na aanleiding van een zoekopdracht. Van elke "gif" die ik ophaalde, haalde ik altijd het grootste bestand op. Dit vond ik mooi. Maar qua performance is het niet de beste oplossing.

Dit was mijn code eerst.

```javascript
<% data.data.forEach((data, i) => { %>
  <div>
     <h3><%=data.title%></h3>
     <a href="/search?q=<%=q%>&detail=<%=i%>">
       <img alt='<%=data.title%>'; style='width:60%; min-width:8em;' src='<%=data.images.original.url%>'>
     </a>
  </div>
<% }) %>
```

Daarna ben ik het `<picture>` element gaan gebruiken. Mijn code is er wel wat groter opgeworden. Maar de performance is sterk verbeterd.

```javascript
<% data.data.forEach((data, i) => { %>
  <div>
    <h3><%=data.title%></h3>
    <a href="/search?q=<%=q%>&detail=<%=i%>">
      <picture>
        <source media="(min-width: 1024px)" srcset=<%=data.images.downsized_large.url%>>
        <source type="image/webp" media="(min-width: 600px)" srcset=<%=data.images.preview_webp.url%>>
        <source media="(min-width: 600px)" srcset=<%=data.images.downsized_medium.url%>>
        <source srcset="<%=data.images.fixed_width_small_still.url%>">
        <img alt='<%=data.title%>'; style='width:60%; min-width:8em;' src='<%=data.images.original.url%>'>
      </picture>
    </a>
  </div>
<% }) %>
```

Hieronder zie je afbeeldingen van "voor" en "na" deze verandering

Voor:
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/img%20voor.png">

Na:
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/image%20loadin%20on%20size.png">

