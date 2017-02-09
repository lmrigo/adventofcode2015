var input = [
  '[1,2,3]',
  '{"a":2,"b":4}',
  '[[[3]]]',
  '{"a":{"b":4},"c":-1}',
  '{"a":[-1,1]}',
  '[-1,{"a":1}]',
  '[]{}',
  puzzleInput
]

var day12 = function() {

  for (var i = 0; i < input.length; i++) {

    var numbers = input[i].match(/-?\d+/g)
    var sum = 0
    if (numbers != null) {
      sum = numbers.reduce(function(accum, val) {
        return accum + Number(val)
      }, 0)
    }

    $('#day12').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }
}

var day12part2 = function() {

  $('#day12part2').append()
    .append('<br>&emsp;')
    .append()
    .append('<br>')

}

$(function (){
  $('#main').append('<div id="day12"><h2>day #12</h2></div>')
  day12()
  $('#main').append('<br><div id="day12part2"><h2>day #12 part 2</h2></div>')
  day12part2()
  $('#main').append('<br>')
})

