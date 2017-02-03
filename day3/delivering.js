var input = [
  '>',
  '^v',
  '^>v<',
  '^v^v^v^v^v',
   puzzleInput
]

var grid
var visit = function(x, y) {
  if (grid[x] === undefined) {
    grid[x] = []
  }
  if (grid[x][y] === undefined) {
    grid[x][y] = 1
    return true
  } else {
    grid[x][y]++
    return false
  }
}

var day3 = function() {

  for (var i = 0; i < input.length; i++) {
    var path = input[i]
    grid = []
    var x = 0
    var y = 0
    visit(x, y)
    var houses = 1
    for (var j = 0; j < path.length; j++) {
      var dir = path.charAt(j)
      if (dir === '^') {
        y--
      } else if (dir === '>') {
        x++
      } else if (dir === 'v') {
        y++
      } else { // <
        x--
      }
      if (visit(x, y)) {
        houses++
      }
    }

    $('#day3').append(input[i])
      .append('<br>&emsp;')
      .append(houses)
      .append('<br>')
  }
}

var day3Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var path = input[i]
    grid = []
    var xs = 0
    var ys = 0
    visit(xs, ys)
    var xr = 0
    var yr = 0
    visit(xr, yr)
    var houses = 1
    for (var j = 0; j < path.length; j++) {
      var santa = j % 2 === 0
      var dir = path.charAt(j)
      if (dir === '^') {
        santa ? ys-- : yr--
      } else if (dir === '>') {
        santa ? xs++ : xr++
      } else if (dir === 'v') {
        santa ? ys++ : yr++
      } else { // <
        santa ? xs-- : xr--
      }
      if (santa ? visit(xs, ys) : visit(xr, yr)) {
        houses++
      }
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(houses)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day3"><h2>day #3</h2></div>')
  day3()
  $('#main').append('<br><div id="part2"><h2>day #3 part 2</h2></div>')
  day3Part2()
  $('#main').append('<br>')
})
