var input = [
  '2x3x4',
  '1x1x10',
`2x3x4
1x1x10
7x1x4`,
  puzzleInput
]

var min = function (a, b, c) {
  if (a < b) {
    if (a < c) {
      return a
    } else {
      return c
    }
  } else if (b < c) {
    return b
  } else {
    return c
  }
}

var day2 = function() {

  for (var i = 0; i < input.length; i++) {
    var presents = input[i].split(/\s/)
    var totalSqFt = 0
    for (var j = 0; j < presents.length; j++) {
      var prst = presents[j].split('x')
      var l = prst[0]
      var w = prst[1]
      var h = prst[2]
      var dim1 = l*w
      var dim2 = w*h
      var dim3 = h*l
      var smallestDim = min(dim1, dim2, dim3)
      var sqFeet = 2*l*w + 2*w*h + 2*h*l + smallestDim
      totalSqFt += sqFeet
    }

    $('#day2').append(input[i])
      .append('<br>&emsp;')
      .append(totalSqFt)
      .append('<br>')
  }
}

var day2Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var presents = input[i].split(/\s/)
    var totalLengthFt = 0
    for (var j = 0; j < presents.length; j++) {
      var prst = presents[j].split('x')
      var l = Number(prst[0])
      var w = Number(prst[1])
      var h = Number(prst[2])
      var smallestPerim = 2 * min(l+w, w+h, h+l)
      var cubFt = l*w*h
      var ribbonLength = smallestPerim + cubFt
      totalLengthFt += ribbonLength
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(totalLengthFt)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day2"><h2>day #2</h2></div>')
  day2()
  $('#main').append('<br><div id="part2"><h2>day #2 part 2</h2></div>')
  day2Part2()
  $('#main').append('<br>')
})
