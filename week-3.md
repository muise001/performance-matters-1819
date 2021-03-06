# Opdrachten Week 3
Minor Web Development - Performance Matters

### Opdracht 1: Implementeer een Service Worker
Met de applicatie die ik gemaakt heb, kan je online grappige plaatjes vinden. Maar wat nou als je bij je oma langsgaat op Schiermonnikoog (waar geen internet is) en je wilt aan je oom - die daar toevallig ook is - een plaatje laten zien die je een paar dagen geleden had gevonden. Hoe doe je dat zonder internet?? ***s*** ***e*** ***r*** ***v*** ***i*** ***c*** ***e*** ***w*** ***o*** ***r*** ***k*** ***e*** ***r***


### De Service Worker
Als eerste heb ik een service worker [van internet geplukt](https://googlechrome.github.io/samples/service-worker/basic/). Dit werkte erg goed. Alleen vond ik het vervelend dat ik niet precies begreep wat er gebeurde. Ik ben meer onderzoek gaan doen en ben Service-workers beter gaan begrijpen. Een service worker heeft 3 "events".
  - **Install**
      - Hier cache je voor het eerst de bestanden van de website
  - **Activate**
      - Hier kijk je of er nog andere bestanden in de cache staan. Zo ja, dan overschrijf je die. 
  - **Fetch**
      - De Fetch elke keer getriggerd als de url verandert.
      
De fetch functie kan je zo schrijven dat elke pagina waar je op komt, opslaat. Dit is ook precies hoe ik het gedaan heb. Er was alleen een probleem waar ik niet uitkwam


### Offline Feedback
Als online feedback heb ik drie features toegevoegd.
    - De Popup
        - De popup toont een gifje waaruit moet blijken dat je geen internet hebt. Daarnaast geeft deze pop-up je een linkje naar de "history" pagina. Deze pagina laat een aantal al eerder gedane zoekopdrachten zien die hij heeft opgeslagen.
    - Het Icoon
        - Linksboven in het scherm geef ik een icoon weer die het ook duidelijk maakt dat je geen internet meer hebt
    - Onbereikbaar Form
        - Het is niet meer mogelijk om iets te submitten vanuit het zoekformulier. De value van je zoekopdracht wordt dan verandert naar "Geen internet connectie"
        
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/offline%20feedback.png" />
<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/offline%20feedback2.png" alt="offline"/>


## Bronnen
1. [Intro to service worken and chache](https://www.youtube.com/watch?v=ksXwaWHCW6k&t=1520s)
2. [Cache update & Refresh](https://serviceworke.rs/strategy-cache-update-and-refresh_service-worker_doc.html)


### Opdracht 2: Installeer jou app op een online webserver

[Check de site hier!](https://performancematters-qexlascrix.now.sh/)


## Overal performance week 3

<img src="https://github.com/muise001/performance-matters-1819/blob/master/images/performance%20week%203.png" />
