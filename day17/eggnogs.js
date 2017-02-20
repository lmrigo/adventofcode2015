var input = [
`5
10
5
20
15`,
  puzzleInput
]


var day17 = function() {

  for (var i = 0; i < input.length; i++) {
    var liters = i === 0 ? 25 : 150

    var containers = input[i].split(/\n/)
    $.each(containers, function(idx, con) {
      containers[idx] = Number(con)
    })
    containers.sort(function (a,b) {
      return a - b
    })
    // console.log(containers)

    // store complete states so they don't repeat
    var completeStates = []
    // start with each input container as an initial state
    var initialCombos = []
    for (var c = 0; c < containers.length; c++) {
      var remCons = containers.slice(c+1)
      initialCombos.push({'combo': [containers[c]], 'sum': containers[c], 'remContainers': remCons})
    }
    // console.log(initialCombos)

    // for each state, generate new (unused containers #) states until the state is complete
    var nextCombos = initialCombos
    while (nextCombos.length > 0) {
      var combo = nextCombos.shift()
      if (combo.sum > liters) {
        continue
      } else if (combo.sum === liters) {
        // when the state is complete, store it
        completeStates.push(combo.combo)
      } else {
        nextCombos.push(...generateNextCombos(combo))
      }
    }

    // once all combos are done, solution is completeStates.length
    var containersCombos = completeStates.length
    // console.log(completeStates)

    $('#day17').append(input[i])
      .append('<br>&emsp;')
      .append(containersCombos)
      .append('<br>')
  }
}

var generateNextCombos = function(combo) {
  var newCombos = []
  $.each(combo.remContainers, function(contIdx, cont) {
    var newCb = copyCombo(combo)
    newCb.remContainers = newCb.remContainers.slice(contIdx)
    var nextCont = newCb.remContainers.splice(0, 1)[0]
    newCb.combo.push(nextCont)
    newCb.sum += nextCont
    newCombos.push(newCb)
  })
  return newCombos
}

var copyCombo = function (original) {
  var copy = {
    'combo': original.combo.slice(),
    'sum': original.sum,
    'remContainers': original.remContainers.slice()
  }
  return copy
}

var day17part2 = function() {


  for (var i = 0; i < input.length; i++) {
    var liters = i === 0 ? 25 : 150

    var containers = input[i].split(/\n/)
    $.each(containers, function(idx, con) {
      containers[idx] = Number(con)
    })
    containers.sort(function (a,b) {
      return a - b
    })
    // console.log(containers)

    // store complete states so they don't repeat
    var completeStates = []
    // start with each input container as an initial state
    var initialCombos = []
    for (var c = 0; c < containers.length; c++) {
      var remCons = containers.slice(c+1)
      initialCombos.push({'combo': [containers[c]], 'sum': containers[c], 'remContainers': remCons})
    }
    // console.log(initialCombos)

    // for each state, generate new (unused containers #) states until the state is complete
    var nextCombos = initialCombos
    while (nextCombos.length > 0) {
      var combo = nextCombos.shift()
      if (combo.sum > liters) {
        continue
      } else if (combo.sum === liters) {
        // when the state is complete, store it
        completeStates.push(combo.combo)
      } else {
        nextCombos.push(...generateNextCombos(combo))
      }
    }

    // once all combos are done, find the min num of containers combos
    var minContsLength = completeStates.reduce(function(accum, state) {
      return accum < state.length ? accum : state.length
    }, Number.MAX_SAFE_INTEGER)
    // console.log(minContsLength)
    var containersMinCombos = 0
    $.each(completeStates, function(idx, state) {
      if (state.length === minContsLength) {
        containersMinCombos++
      }
    })

    $('#day17part2').append(input[i])
      .append('<br>&emsp;')
      .append(containersMinCombos)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day17"><h2>day #17</h2></div>')
  day17()
  $('#main').append('<br><div id="day17part2"><h2>day #17 part 2</h2></div>')
  day17part2()
  $('#main').append('<br>')
})

