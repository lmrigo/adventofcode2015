var input = [
// 0    1   2  3   4   5   6   7       8   9    10   11   12  13  14
`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,
  puzzleInput
]



var day14 = function() {

  for (var i = 0; i < input.length; i++) {
    var reindeers = []

    var inLines = input[i].split(/\n/)
    for (var j = 0; j < inLines.length; j++) {
      var inDeer = inLines[j].split(/\s/)
      var deer = {
        name: inDeer[0],
        speed: Number(inDeer[3]),
        stamina: Number(inDeer[6]),
        rest: Number(inDeer[13]),
        position: 0,
        state: 'awake',
        timer: Number(inDeer[6]) // stamina
      }
      reindeers.push(deer)
    }
    // console.log(reindeers)

    // race
    var seconds = 2503
    while (seconds--) {
      for (var d = 0; d < reindeers.length; d++) {
        var deer = reindeers[d]
        if (deer.state === 'awake') {
          deer.position += deer.speed
          if (!(--deer.timer)) {
            deer.state = 'sleep'
            deer.timer = deer.rest
          }
        } else {
          if (!(--deer.timer)) {
            deer.state = 'awake'
            deer.timer = deer.stamina
          }
        }
      }
    }

    var winner = reindeers.reduce(function(acc, val) {
      return (acc.position > val.position ? acc : val)
    })
    // console.log(winner)

    $('#day14').append(input[i])
      .append('<br>&emsp;')
      .append(winner.position)
      .append('<br>')
  }
}

var day14part2 = function() {


  for (var i = 0; i < input.length; i++) {
    var reindeers = []

    var inLines = input[i].split(/\n/)
    for (var j = 0; j < inLines.length; j++) {
      var inDeer = inLines[j].split(/\s/)
      var deer = {
        name: inDeer[0],
        speed: Number(inDeer[3]),
        stamina: Number(inDeer[6]),
        rest: Number(inDeer[13]),
        position: 0,
        state: 'awake',
        timer: Number(inDeer[6]) // stamina
      }
      reindeers.push(deer)
    }
    // console.log(reindeers)


    var points = {}
    for (var d = 0; d < reindeers.length; d++) {
      points[reindeers[d].name] = 0
    }

    // race
    var seconds = 2503
    while (seconds--) {
      for (var d = 0; d < reindeers.length; d++) {
        var deer = reindeers[d]
        if (deer.state === 'awake') {
          deer.position += deer.speed
          if (!(--deer.timer)) {
            deer.state = 'sleep'
            deer.timer = deer.rest
          }
        } else {
          if (!(--deer.timer)) {
            deer.state = 'awake'
            deer.timer = deer.stamina
          }
        }
      }
      // find winning position
      var maxPos = reindeers.reduce(function(acc, val) {
        return (acc > val.position ? acc : val.position)
      }, 0)
      // assign points
      for (var d = 0; d < reindeers.length; d++) {
        if (reindeers[d].position === maxPos) {
          points[reindeers[d].name]++
        }
      }
    }

    var winner = Object.keys(points).reduce(function(acc, val) {
      return (acc > points[val] ? acc : points[val])
    }, 0)
    // console.log(winner)

    $('#day14part2').append(input[i])
      .append('<br>&emsp;')
      .append(winner)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day14"><h2>day #14</h2></div>')
  day14()
  $('#main').append('<br><div id="day14part2"><h2>day #14 part 2</h2></div>')
  day14part2()
  $('#main').append('<br>')
})

