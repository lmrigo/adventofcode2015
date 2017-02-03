var puzzleInput = 'ckczppom'
var input = [
  'abcdef',
  'pqrstuv',
  puzzleInput
]
var day4 = function() {

  for (var i = 0; i < input.length; i++) {
    var prefix = input[i]
    var index = 0
    var hash = ''
    while (!hash.startsWith('00000')) hash = md5(prefix + index++)

    $('#day4').append(input[i])
      .append('<br>&emsp;')
      .append(index-1)
      .append('<br>')
  }
}

var day4part2 = function() {
  for (var i = 0; i < input.length; i++) {
    var password = '        '
    var prefix = input[i]
    var index = 0
    var replaceChar = function (str, ch, pos) {
      var arr = str.split('')
      arr[pos] = ch
      str = arr.join('')
      return str
    }
    while (password.replace(/\s/g, '').length < 8) {
      var hash = ''
      while (!hash.startsWith('00000')) hash = md5(prefix + index++)
      var pos = Number(hash.charAt(5))
      if (isNaN(pos) || pos > 7 || password.charAt(pos) != ' ') continue;
      var letter = hash.charAt(6)
      password = replaceChar(password, letter, pos)
      // console.log(password, index-1, hash)
    }
    $('#day4part2').append(input[i])
      .append('<br>&emsp;')
      .append(password)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day4"><h2>day #4</h2></div>')
  day4()
  $('#main').append('<br><div id="day4part2"><h2>day #4 part 2</h2></div>')
  // day4part2()
  $('#main').append('<br>')
})

