var input = [
[`H => HO
H => OH
O => HH`,'HOH'],
[`H => HO
H => OH
O => HH`,'HOHOHO'],
[`Na => NaCl
Cl => H2ONaCl
Cl => Na`,'NaClNaNa'],
  puzzleInput
]


var day19 = function() {

  for (var i = 0; i < input.length; i++) {
    var rules = {}

    var inRules = input[i][0].split(/\n/)
    for (var r = 0; r < inRules.length; r++) {
      var inRule = inRules[r].split(/\s/)
      var src = inRule[0]
      var dst = inRule[2]
      if (rules[src] === undefined) {
        rules[src] = [dst]
      } else {
        rules[src].push(dst)
      }
    }
    // console.log(rules)

    var molecule = input[i][1]
    var allMolecules = {}

    for (var c = 0; c < molecule.length; c++) {
      var ch1 = molecule.charAt(c)
      if (rules[ch1] !== undefined) {
        $.each(rules[ch1], function(idx, val) {
          var newMolec = molecule.substr(0, c) + val + molecule.substr(c+1)
          allMolecules[newMolec] =  true
        })
      }
      var ch2 = ch1 + molecule.charAt(c+1)
      if (rules[ch2] !== undefined) {
        $.each(rules[ch2], function(idx, val) {
          var newMolec = molecule.substr(0, c) + val + molecule.substr(c+2)
          allMolecules[newMolec] =  true
        })
      }
    }
    // console.log(allMolecules)

    var distinctMolecules = Object.keys(allMolecules).length

    $('#day19').append(input[i][0] + ' - ' + input[i][1])
      .append('<br>&emsp;')
      .append(distinctMolecules)
      .append('<br>')
  }
}


var day19part2 = function() {

  for (var i = 0; i < input.length; i++) {

    $('#day19part2').append(input[i][0] + ' - ' + input[i][1])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day19"><h2>day #19</h2></div>')
  day19()
  $('#main').append('<br><div id="day19part2"><h2>day #19 part 2</h2></div>')
  day19part2()
  $('#main').append('<br>')
})

