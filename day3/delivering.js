var input = [
  '>',
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

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
