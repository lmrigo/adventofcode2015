var puzzleInput = '1113222113'
var input = [
  '1',
  puzzleInput
]

var lookAndSay = function (n) {
  var str = ''
  var counter = 1
  var c = 0
  do {
    var prev = n.charAt(c)
    var next = n.charAt(c+1)
    if (prev === next) {
      counter++
    } else {
      str += counter + '' + prev
      counter = 1
    }
    c++
  } while (c < n.length)
  return str
}

var day10 = function() {

  for (var i = 0; i < input.length; i++) {
    var iterations = 40
    var look = input[i]
    var say = ''
    while (iterations--) {
      say = lookAndSay(look)
      // console.log(look, say)
      look = say
    }

    $('#day10').append(input[i])
      .append('<br>&emsp;')
      .append(say.length)
      .append('<br>')
  }
}

var day10part2 = function() {

  for (var i = 0; i < input.length; i++) {
    $('#day10part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day10"><h2>day #10</h2></div>')
  day10()
  $('#main').append('<br><div id="day10part2"><h2>day #10 part 2</h2></div>')
  day10part2()
  $('#main').append('<br>')
})

