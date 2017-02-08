var input = [
String.raw`""
"abc"
"aaa\"aaa"
"\x27"`, // 2c0d 5c3d 10c7d 6c1d
String.raw`"\\\"\xd4"`, //10c3d
  puzzleInput //1096 too low, 1345 too high
]

var day8 = function() {

  for (var i = 0; i < input.length; i++) {
    var code = 0
    var data = 0

    var strs = input[i].split(/\n/)
    for (var j = 0; j < strs.length; j++) {
      var cs = strs[j]
      var ds = strs[j].substr(1,strs[j].length-2)
      var newDs = ''
      for (var c = 0; c < ds.length; c++) {
        var ch = ds.charAt(c)
        if (ch === '\\') {
          var ch1 = ds.charAt(++c)
          if (ch1 === '\\' || ch1 === '"') {
            newDs += ch1
          } else { // hex \xXX
            newDs += '*'
            c+= 2
          }
        } else {
          newDs += ch
        }
      }
      ds = newDs
      // console.log(cs, cs.length, ds, ds.length)
      code += cs.length
      data += ds.length
    }

    $('#day8').append(input[i])
      .append('<br>&emsp;')
      .append(code-data)
      .append('<br>')
  }
}

var day8part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var code = 0
    var encoded = 0

    var strs = input[i].split(/\n/)
    for (var j = 0; j < strs.length; j++) {
      var cs = strs[j]
      var es = cs
      es = es.replace(/\\/g, '\\\\')
      es = es.replace(/"/g, '\\"')
      es = '"'+es+'"'
      // console.log(cs, cs.length, es, es.length)
      code += cs.length
      encoded += es.length
    }
    $('#day8part2').append(input[i])
      .append('<br>&emsp;')
      .append(encoded - code)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day8"><h2>day #8</h2></div>')
  day8()
  $('#main').append('<br><div id="day8part2"><h2>day #8 part 2</h2></div>')
  day8part2()
  $('#main').append('<br>')
})

