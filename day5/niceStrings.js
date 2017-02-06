var input = [
  'ugknbfddgicrmopn',
  'aaa',
  'jchzalrnumimnmhp',
  'haegwjzuvuyypxyu',
  'dvszwmarrgswjxmb',
`ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`,
  puzzleInput
]


var hasThreeVowels = function (s) {
  var triplet = s.match(/[aeiou]/g)
  return triplet !== null && triplet.length >= 3
}

var hasTwiceLetter = function (s) {
  var doublet = false
  for (var i = 0; i < s.length-1; i++) {
    if (s.charAt(i) === s.charAt(i+1)) {
      doublet = true
      break
    }
  }
  return doublet
}

var hasForbiddenLetters = function (s) {
  return s.match(/ab|cd|pq|xy/) !== null
}

var isNice = function (s) {
  return hasThreeVowels(s) && hasTwiceLetter(s) && !hasForbiddenLetters(s)
}

var day5 = function() {

  for (var i = 0; i < input.length; i++) {
    var strings = input[i].split(/\n/)
    var niceStrings = 0
    for (var j = 0; j < strings.length; j++) {
      if (isNice(strings[j])) {
        niceStrings++
      }
    }

    $('#day5').append(input[i])
      .append('<br>&emsp;')
      .append(niceStrings)
      .append('<br>')
  }
}

var day5part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day5part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day5"><h2>day #5</h2></div>')
  day5()
  $('#main').append('<br><div id="day5part2"><h2>day #5 part 2</h2></div>')
  day5part2()
  $('#main').append('<br>')
})

