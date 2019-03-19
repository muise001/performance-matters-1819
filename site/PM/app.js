const PORT = process.env.port || 2000
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express()
const parser = bodyParser.urlencoded({extended: false})
const fetch = require("node-fetch");
const compression = require("compression")
let data = ""
let zoekGeschiedenis = []
let dataName = ""

app.set('view engine', 'ejs');
app.use(compression())
app.use(express.static('public'))

app.get("/", (req, res) => {
  if (res.locals.q) {
    res.render('index', {data, q})
  } else {
    res.render('index', {data})
  }
})

app.get('/history', (req, res) => {
  res.render("history", {data, zoekGeschiedenis})
})

app.get('/khaled', (req, res) => {
  res.render("khaled", {data})
})

app.post("/", parser, (req, res) => {
  res.redirect(`/search?q=${req.body.searchValue}`)
})

app.get("/search", (req,res) => {
  if (req.query.q && req.query.detail) {
    if (req.query.q !== dataName) {
      dataName = req.query.q
      getData(dataName, req, res, req.query.detail, true)
    } else {
      console.log("detail");
      res.render('detail', {data, num: req.query.detail, q: req.query.q})
    }
  } else if (req.query.q){
      if (req.query.q === dataName){
        res.render('index', {data, q: req.query.q})
      } else {
        dataName = req.query.q
        getData(req.query.q, req, res)
      }
      dataName = req.query.q
  } else {
    res.render("index", {data})
  }
})


function getData(searchValue, req, res, num, detail) {
  zoekGeschiedenis.push(searchValue)
  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=bMIPWUm5uWlqwJDmZPxDw4dKGzDZfGdd&limit=8`)
    .then(resp => resp.json())
    .then(resp => {
      data = resp
      if(detail) {
        res.render('detail', {data: resp, num, q: searchValue})
      }
      else {
        res.render('index', {data: resp, q: searchValue})
      }
    })
    .catch(err => console.log(err))
}

var server = app.listen(PORT, function() {
  console.log('port 2000')
})
