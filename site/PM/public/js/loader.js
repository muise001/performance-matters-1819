var loader = {
  show: function (){
    document.getElementById("loader").classList.remove("none")
  },
  hide: function(){
    document.getElementById("loader").classList.add("none")
  }
}

export default loader
