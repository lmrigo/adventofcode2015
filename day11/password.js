var puzzleInput = 'vzbxkghb'
var input = [
  'abcdefgh', //abcdffaa
  'ghijklmn', //ghjaabcc
  puzzleInput
]

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var nextLetter = function (letter) {
  return alphabet[(alphabet.indexOf(letter) + 1) % alphabet.length]
}

var increment = function (s) {
  var inc = s.split('')
  var incIdx = inc.length-1
  var done = false
  while (!done) {
    var ch = nextLetter(inc[incIdx])
    inc[incIdx] = ch
    if (ch === 'a') {
      incIdx--
      if (incIdx < 0) {
        done = true
      }
    } else {
      done = true
    }
  }
  return inc.join('')
}

var hasIncreasingTriplet = function (s) {
  var triplet = false
  for (var i = 0; i < s.length-2; i++) {
    var c0 = s.charAt(i)
    var c1 = s.charAt(i+1)
    var c2 = s.charAt(i+2)
    if (nextLetter(c0) === c1
      && nextLetter(c1) === c2
      && c1 !== 'a' && c2 !== 'a') { // wrap around not allowed
      triplet = true
      break
    }
  }
  return triplet
}

var hasForbiddenLetters = function (s) {
  return s.match(/i|l|o/) !== null
}

var hasTwoNonOverlappingPairs = function (s) {
  var first
  var i
  for (i = 0; i < s.length-3; i++) {
    if (s.charAt(i) === s.charAt(i+1)) {
      first = s.charAt(i) + s.charAt(i+1)
      i++
      i++
      break
    }
  }
  var second
  for (i = i; i < s.length-1; i++) {
    if (s.charAt(i) === s.charAt(i+1)) {
      second = s.charAt(i) + s.charAt(i+1)
      break
    }
  }
  return first !== undefined && second !== undefined
}

var isNice = function (s) {
  return hasIncreasingTriplet(s) && !hasForbiddenLetters(s) && hasTwoNonOverlappingPairs(s)
}

var day11 = function() {

  for (var i = 0; i < input.length; i++) {

    var password = input[i]
    // var nice = isNice(password)
    // console.log(nice)
    while (!isNice(password)) password = increment(password)

    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(password)
      .append('<br>')
  }
}

var day11part2 = function() {

  var input2 = 'vzbxxyzz' // part 1 solution, part 2 input
  var password = increment(input2)
  while (!isNice(password)) password = increment(password)
  $('#day11part2').append(input2)
    .append('<br>&emsp;')
    .append(password)
    .append('<br>')

}

$(function (){
  $('#main').append('<div id="day11"><h2>day #11</h2></div>')
  day11()
  $('#main').append('<br><div id="day11part2"><h2>day #11 part 2</h2></div>')
  day11part2()
  $('#main').append('<br>')
})

