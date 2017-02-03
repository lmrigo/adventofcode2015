var input = [
  '(())',
  '()()',
  '(((',
  '(()(()(',
  '))(((((',
  '())',
  '))(',
  ')))',
  ')())())',
  puzzleInput
]

var day1 = function() {

  for (var i = 0; i < input.length; i++) {
    var floor = 0
    var ups = input[i].match(/\(/g)
    var downs = input[i].match(/\)/g)
    var up = ups === null ? 0 : ups.length
    var down = downs === null ? 0 : downs.length
    floor = up - down
    // console.log(floor)
    $('#day1').append(input[i])
      .append('<br>&emsp;')
      .append(floor)
      .append('<br>')
  }
}

var day1Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day1"><h2>day #1</h2></div>')
  day1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day1Part2()
  $('#main').append('<br>')
})
