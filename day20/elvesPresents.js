var puzzleInput = 29000000
var input = [
  150,
  puzzleInput
]


var day20 = function() {

  for (var i = 0; i < input.length; i++) {
    // too slow, too much memory, and wrong! I added a 10 steps limit for no reason!
    /*
    var elves = input[i] / 10
    var houses = {}

    var presentsTarget = input[i]
    var targetHouse = Number.MAX_SAFE_INTEGER

    var elf = i === 0 ? 1 : 2500 * 1000
    while (elf <= elves) {
      var h = elf
      var oldKeys = Object.keys(houses).filter(function(val) {
        return Number(val) < h
      })
      $.each(oldKeys, function(idx, val) {
        delete houses[val]
      })

      var steps = 10
      while (steps--) {
        if (houses[h] === undefined) {
          houses[h] = 0
        }
        houses[h] += elf * 10
        if (houses[h] >= presentsTarget && h < targetHouse) {
          targetHouse = h
        }
        h += elf
      }
      if (elf % 1000 === 0) {
        console.log(elf, targetHouse, houses[elf])
      }
      elf++
    }
    console.log(houses)
    */
    var house = i === 0 ? 1 : 600000
    var calc = calcHouseValue(house)
    while (calc < input[i]) {
      if (house % 10000 === 0) {
        console.log(house, calc)
      }
      house++
      calc = calcHouseValue(house)
    }
    //990360 too high
    // it's 665280

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

    $('#day20part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day20"><h2>day #20</h2></div>')
  day20()
  $('#main').append('<br><div id="day20part2"><h2>day #20 part 2</h2></div>')
  day20part2()
  $('#main').append('<br>')
})

