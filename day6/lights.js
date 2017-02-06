var input = [
  'turn on 0,0 through 2,2',
  'turn on 0,0 through 999,999',
  'toggle 0,0 through 999,0',
  'turn off 499,499 through 500,500',
`turn on 0,0 through 999,999
turn on 0,0 through 999,999
turn off 499,499 through 500,500`,
`toggle 0,0 through 999,999
turn off 499,499 through 500,500`,
`turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`,
`turn on 0,0 through 2,2
toggle 1,1 through 3,3
turn off 3,0 through 3,4`,
  puzzleInput
]

var grid

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

var day6 = function() {

  for (var i = 0; i < input.length; i++) {
    //reset grid
    grid = []
    for (var gi = 0; gi < 1000; gi++) {
      grid[gi] = []
      for (var gj = 0; gj < 1000; gj++) {
        grid[gi][gj] = false
      }
    }
    var litLights = 0

    var instrs = input[i].split(/\n/)
    for (var j = 0; j < instrs.length; j++) {
      var instr = instrs[j].split(/\s/)
      var action
      var tl
      var bd
      if (instr[0] === 'toggle') {
        action = toggle
        tl = instr[1].split(',')
        bd = instr[3].split(',')
      } else if (instr[1] === 'on') {
        action = turnOn
        tl = instr[2].split(',')
        bd = instr[4].split(',')
      } else { //off
        action = turnOff
        tl = instr[2].split(',')
        bd = instr[4].split(',')
      }
      action(Number(tl[0]), Number(tl[1]), Number(bd[0]), Number(bd[1]))
    }

    litLights = grid.reduce(function(accum1, row) {
      return accum1 + row.reduce(function(accum2, val) {
        return accum2 + (val ? 1 : 0)
      }, 0)
    }, 0)

    $('#day6').append(input[i])
      .append('<br>&emsp;')
      .append(litLights)
      .append('<br>')
      // .append(printGrid())
      // .append('<br>')
  }
}

var toggle2 = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      grid[gi][gj] += 2
    }
  }
}

var turnOn2 = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      grid[gi][gj]++
    }
  }
}

var turnOff2 = function (tlX, tlY, bdX, bdY) {
  for (var gi = tlX; gi <= bdX; gi++) {
    for (var gj = tlY; gj <= bdY; gj++) {
      if (grid[gi][gj] > 0) {
        grid[gi][gj]--
      }
    }
  }
}

var day6part2 = function() {

  for (var i = 0; i < input.length; i++) {
    //reset grid
    grid = []
    for (var gi = 0; gi < 1000; gi++) {
      grid[gi] = []
      for (var gj = 0; gj < 1000; gj++) {
        grid[gi][gj] = 0
      }
    }
    var totalBrightness = 0

    var instrs = input[i].split(/\n/)
    for (var j = 0; j < instrs.length; j++) {
      var instr = instrs[j].split(/\s/)
      var action
      var tl
      var bd
      if (instr[0] === 'toggle') {
        action = toggle2
        tl = instr[1].split(',')
        bd = instr[3].split(',')
      } else if (instr[1] === 'on') {
        action = turnOn2
        tl = instr[2].split(',')
        bd = instr[4].split(',')
      } else { //off
        action = turnOff2
        tl = instr[2].split(',')
        bd = instr[4].split(',')
      }
      action(Number(tl[0]), Number(tl[1]), Number(bd[0]), Number(bd[1]))
    }

    totalBrightness = grid.reduce(function(accum1, row) {
      return accum1 + row.reduce(function(accum2, val) {
        return accum2 + val
      }, 0)
    }, 0)

    $('#day6part2').append(input[i])
      .append('<br>&emsp;')
      .append(totalBrightness)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day6"><h2>day #6</h2></div>')
  day6()
  $('#main').append('<br><div id="day6part2"><h2>day #6 part 2</h2></div>')
  day6part2()
  $('#main').append('<br>')
})

