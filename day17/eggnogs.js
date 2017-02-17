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
    // console.log(containers)

    // store complete states so they don't repeat
    var completeStates = []
    // start with each input container as an initial state
    // for each state, generate new (unused containers #) states until the state is complete
    // when the state is complete, store it
    // once all combos are done, solution is completeStates.length

    var containersCombos = completeStates.length
    $('#day17').append(input[i])
      .append('<br>&emsp;')
      .append(containersCombos)
      .append('<br>')
  }
}

var day17part2 = function() {


  for (var i = 0; i < input.length; i++) {

    $('#day17part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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

