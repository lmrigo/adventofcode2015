var input = [
  puzzleInput
]

var aunts = []
var children = 3
var cats = 7
var samoyeds = 2
var pomeranians = 3
var akitas = 0
var vizslas = 0
var goldfish = 5
var trees = 3
var cars = 2
var perfumes = 1
function Aunt(num) {
  this.num = num
  this.children = undefined
  this.cats = undefined
  this.samoyeds = undefined
  this.pomeranians = undefined
  this.akitas = undefined
  this.vizslas = undefined
  this.goldfish = undefined
  this.trees = undefined
  this.cars = undefined
  this.perfumes = undefined
}

var day16 = function() {

  for (var i = 0; i < input.length; i++) {
    aunts = []

    var inLines = input[i].split(/\n/)
    for (var j = 0; j < inLines.length; j++) {
      var sue = inLines[j].split(/\s/)
      //0   1  2     3  4     5  6     7
      //Sue #: obj1: #, obj2: #, obj3: #
      var num = Number(sue[1].replace(':',''))
      var aunt = new Aunt(num)
      aunt[sue[2].replace(':','')] = Number(sue[3].replace(',',''))
      aunt[sue[4].replace(':','')] = Number(sue[5].replace(',',''))
      aunt[sue[6].replace(':','')] = Number(sue[7])
      aunts[num] = aunt
    }
    // console.log(aunts)

    var childrenFilter = function(aunt) {
      return aunt.children === children || aunt.children === undefined
    }
    var catsFilter = function(aunt) {
      return aunt.cats === cats || aunt.cats === undefined
    }
    var samoyedsFilter = function(aunt) {
      return aunt.samoyeds === samoyeds || aunt.samoyeds === undefined
    }
    var pomeraniansFilter = function(aunt) {
      return aunt.pomeranians === pomeranians || aunt.pomeranians === undefined
    }
    var akitasFilter = function(aunt) {
      return aunt.akitas === akitas || aunt.akitas === undefined
    }
    var vizslasFilter = function(aunt) {
      return aunt.vizslas === vizslas || aunt.vizslas === undefined
    }
    var goldfishFilter = function(aunt) {
      return aunt.goldfish === goldfish || aunt.goldfish === undefined
    }
    var treesFilter = function(aunt) {
      return aunt.trees === trees || aunt.trees === undefined
    }
    var carsFilter = function(aunt) {
      return aunt.cars === cars || aunt.cars === undefined
    }
    var perfumesFilter = function(aunt) {
      return aunt.perfumes === perfumes || aunt.perfumes === undefined
    }

    var filtered = aunts.filter(childrenFilter)
    filtered = filtered.filter(catsFilter)
    filtered = filtered.filter(samoyedsFilter)
    filtered = filtered.filter(pomeraniansFilter)
    filtered = filtered.filter(akitasFilter)
    filtered = filtered.filter(vizslasFilter)
    filtered = filtered.filter(goldfishFilter)
    filtered = filtered.filter(treesFilter)
    filtered = filtered.filter(carsFilter)
    filtered = filtered.filter(perfumesFilter)

    // console.log(filtered.length)

    var auntNumber = filtered[0].num

    $('#day16').append(input[i])
      .append('<br>&emsp;')
      .append(auntNumber)
      .append('<br>')
  }
}

var day16part2 = function() {


  for (var i = 0; i < input.length; i++) {
    aunts = []

    var inLines = input[i].split(/\n/)
    for (var j = 0; j < inLines.length; j++) {
      var sue = inLines[j].split(/\s/)
      //0   1  2     3  4     5  6     7
      //Sue #: obj1: #, obj2: #, obj3: #
      var num = Number(sue[1].replace(':',''))
      var aunt = new Aunt(num)
      aunt[sue[2].replace(':','')] = Number(sue[3].replace(',',''))
      aunt[sue[4].replace(':','')] = Number(sue[5].replace(',',''))
      aunt[sue[6].replace(':','')] = Number(sue[7])
      aunts[num] = aunt
    }
    // console.log(aunts)

    var childrenFilter = function(aunt) {
      return aunt.children === children || aunt.children === undefined
    }
    var catsFilter = function(aunt) {
      return aunt.cats > cats || aunt.cats === undefined
    }
    var samoyedsFilter = function(aunt) {
      return aunt.samoyeds === samoyeds || aunt.samoyeds === undefined
    }
    var pomeraniansFilter = function(aunt) {
      return aunt.pomeranians < pomeranians || aunt.pomeranians === undefined
    }
    var akitasFilter = function(aunt) {
      return aunt.akitas === akitas || aunt.akitas === undefined
    }
    var vizslasFilter = function(aunt) {
      return aunt.vizslas === vizslas || aunt.vizslas === undefined
    }
    var goldfishFilter = function(aunt) {
      return aunt.goldfish < goldfish || aunt.goldfish === undefined
    }
    var treesFilter = function(aunt) {
      return aunt.trees > trees || aunt.trees === undefined
    }
    var carsFilter = function(aunt) {
      return aunt.cars === cars || aunt.cars === undefined
    }
    var perfumesFilter = function(aunt) {
      return aunt.perfumes === perfumes || aunt.perfumes === undefined
    }

    var filtered = aunts.filter(childrenFilter)
    filtered = filtered.filter(catsFilter)
    filtered = filtered.filter(samoyedsFilter)
    filtered = filtered.filter(pomeraniansFilter)
    filtered = filtered.filter(akitasFilter)
    filtered = filtered.filter(vizslasFilter)
    filtered = filtered.filter(goldfishFilter)
    filtered = filtered.filter(treesFilter)
    filtered = filtered.filter(carsFilter)
    filtered = filtered.filter(perfumesFilter)
    // console.log(filtered.length)

    var auntNumber = filtered[0].num

    $('#day16part2').append(input[i])
      .append('<br>&emsp;')
      .append(auntNumber)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day16"><h2>day #16</h2></div>')
  day16()
  $('#main').append('<br><div id="day16part2"><h2>day #16 part 2</h2></div>')
  day16part2()
  $('#main').append('<br>')
})

