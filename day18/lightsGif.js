var input = [
`.#.#.#
...##.
#....#
..#...
#.#..#
####..`,
  puzzleInput
]

var grid

var copyGrid = function() {
  var newGrid = []
  for (var gi = 0; gi < grid.length; gi++) {
    newGrid[gi] = []
    for (var gj = 0; gj < grid[gi].length; gj++) {
      newGrid[gi][gj] = grid[gi][gj]
    }
  }
  return newGrid
}

var countLitNeighbours = function (gi, gj) {
  var neighbours = [grid[gi][gj-1], grid[gi][gj+1]]
  if (grid[gi-1] !== undefined) {
    neighbours.push(grid[gi-1][gj-1], grid[gi-1][gj], grid[gi-1][gj+1])
  }
  if (grid[gi+1] !== undefined) {
    neighbours.push(grid[gi+1][gj-1], grid[gi+1][gj], grid[gi+1][gj+1])
  }
  return neighbours.reduce(function (accum, val) {
    return accum + (val ? 1 : 0)
  }, 0)
}

var printGrid = function() {
  var str = ''
  for (var gi = 0; gi < grid.length; gi++) {
    for (var gj = 0; gj < grid[gi].length; gj++) {
      str += grid[gi][gj] ? '#' : '_'
    }
    // str += '\n'
    str += '<br>'
  }
  // console.log(str)
  return str
}

var toggle = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      grid[gi][gj] = !grid[gi][gj]
    }
  }
}

var turnOn = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      grid[gi][gj] = true
    }
  }
}

var turnOff = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      grid[gi][gj] = false
    }
  }
}

var gridSize = 100

var day18 = function() {

  for (var i = 0; i < input.length; i++) {
    var totalSteps = i === 0 ? 4 : 100
    gridSize = i === 0 ? 6 : 100

    //reset grid
    grid = []
    for (var gi = 0; gi < gridSize; gi++) {
      grid[gi] = []
      for (var gj = 0; gj < gridSize; gj++) {
        grid[gi][gj] = false
      }
    }

    // initialize grid with input
    var rows = input[i].split(/\n/)
    for (var r = 0; r < rows.length; r++) {
      var cols = rows[r].split('')
      for (var c = 0; c < cols.length; c++) {
        grid[r][c] = (cols[c] === '#')
      }
    }

    // run animation
    var steps = totalSteps
    while (steps--) {
      var newGrid = copyGrid()
      // generate next state
      for (var gi = 0; gi < grid.length; gi++) {
        for (var gj = 0; gj < grid[gi].length; gj++) {
          var on = newGrid[gi][gj]
          var nighbours = countLitNeighbours(gi, gj)
          if (on) {
            newGrid[gi][gj] = (nighbours === 2 || nighbours === 3) ? true : false
          } else {
            newGrid[gi][gj] = (nighbours === 3) ? true : false
          }
        }
      }
      grid = newGrid
    }

    var litLights = grid.reduce(function(accum1, row) {
      return accum1 + row.reduce(function(accum2, val) {
        return accum2 + (val ? 1 : 0)
      }, 0)
    }, 0)

    $('#day18').append(input[i])
      .append('<br>&emsp;')
      .append(litLights)
      .append('<br>')
      .append(printGrid())
      .append('<br>')
  }
}


var day18part2 = function() {

  for (var i = 0; i < input.length; i++) {
    //reset grid
    grid = []
    for (var gi = 0; gi < gridSize; gi++) {
      grid[gi] = []
      for (var gj = 0; gj < gridSize; gj++) {
        grid[gi][gj] = 0
      }
    }

    $('#day18part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day18"><h2>day #18</h2></div>')
  day18()
  $('#main').append('<br><div id="day18part2"><h2>day #18 part 2</h2></div>')
  day18part2()
  $('#main').append('<br>')
})

