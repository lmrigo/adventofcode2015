var puzzleInput = 29000000
var input = [
  150,
  puzzleInput
]


var day20 = function() {

  for (var i = 0; i < input.length; i++) {
    var house = 1
    var calc = calcHouseValue(house)
    while (calc < input[i]) {
      // if (house % 10000 === 0) {
      //   console.log(house, calc)
      // }
      house++
      calc = calcHouseValue(house)
    }

    $('#day20').append(input[i])
      .append('<br>&emsp;')
      .append(house)
      .append('<br>')
  }
}

var calcHouseValue = function (h) {
  var val = 0
  for (var n = h; n > 0; n--) {
    if (h % n === 0) {
      val += (h/n)*10
    }
  }
  return val
}

var day20part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var house = 1
    var calc = calcHouseValue2(house)
    while (calc < input[i]) {
      // if (house % 10000 === 0) {
      //   console.log(house, calc)
      // }
      house++
      calc = calcHouseValue2(house)
    }

    $('#day20part2').append(input[i])
      .append('<br>&emsp;')
      .append(house)
      .append('<br>')
  }

}

var calcHouseValue2 = function (h) {
  var val = 0
  for (var n = 50; n > 0; n--) {
    if (h % n === 0) {
      val += (h/n)*11
    }
  }
  return val
}

$(function (){
  $('#main').append('<div id="day20"><h2>day #20</h2></div>')
  day20()
  $('#main').append('<br><div id="day20part2"><h2>day #20 part 2</h2></div>')
  day20part2()
  $('#main').append('<br>')
})

