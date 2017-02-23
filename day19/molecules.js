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
[`e => H
e => O
H => HO
H => OH
O => HH`,'HOH'],
[`e => H
e => O
H => HO
H => OH
O => HH`,'HOHOHO'],
  puzzleInput
]

var rules

var day19 = function() {

  for (var i = 0; i < input.length; i++) {
    rules = {}

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

  for (var i = 3; i < input.length; i++) {
    rules = {}

    var inRules = input[i][0].split(/\n/)
    for (var r = 0; r < inRules.length; r++) {
      var inRule = inRules[r].split(/\s/)
      var src = inRule[2]
      var dst = inRule[0]
      if (rules[src] === undefined) {
        rules[src] = []
      }
      for (var c = 0; c < dst.length; c++) {
        var ch1 = dst.charAt(c)
        var ch2 = dst.charAt(c+1)
        if (ch2 == ch2.toLowerCase()) {
          rules[src].push(ch1+ch2)
          c++
        } else {
          rules[src].push(ch1)
        }
      }
    }
    // console.log(rules)

    var molecule = input[i][1]
    var arrMol = []
    for (var c = 0; c < molecule.length; c++) {
      var ch1 = molecule.charAt(c)
      var ch2 = molecule.charAt(c+1)
      if (ch2 == ch2.toLowerCase()) {
        arrMol.push(ch1+ch2)
        c++
      } else {
        arrMol.push(ch1)
      }
    }

// too slow, need to make the backwards path from target to 'e'
    // var minSteps = Number.MAX_SAFE_INTEGER
    // var targetMolecule = input[i][1]
    // var initialState = {'molecule': 'e', 'steps': 0}
    // var nextStates = [initialState]
    // var counter = 0
    // while (nextStates.length > 0) {
    //   // var state = nextStates.shift()
    //   var state = nextStates.pop()
    //   if (state.steps >= minSteps || state.molecule.length > targetMolecule.length) {
    //     continue
    //   } else if (state.molecule === targetMolecule) {
    //     minSteps = minSteps < state.steps ? minSteps : state.steps
    //   } else {
    //     nextStates.push(...generateNextStates(state))
    //   }
    //   if (counter++ % 100000 === 0) {
    //     console.log(nextStates.length, state.molecule)
    //   }
    // }

    var minSteps = Number.MAX_SAFE_INTEGER
    var targetMolecule = ['e']
    var initialState = {'molecule': arrMol, 'steps': 0}
    var nextStates = [initialState]
    var counter = 0
    while (nextStates.length > 0) {
      // var state = nextStates.shift()
      var state = nextStates.pop()
      if (state.steps >= minSteps) {
        continue
      } else if (state.molecule.length === targetMolecule.length) {
        console.log(state.molecule, state.steps)
        minSteps = minSteps < state.steps ? minSteps : state.steps
      } else {
        nextStates.push(...generateNextStates(state))
      }
      if (counter++ % 1000000 === 0) {
        console.log(nextStates.length, state.molecule)
      }
    }

    $('#day19part2').append(input[i][0] + ' - ' + input[i][1])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }

}

var generateNextStates = function (state) {
  var newStates = []
  for (var c = 0; c < state.molecule.length; c++) {
    var remnChars = state.molecule.length - c
    var subsLen = (10 < remnChars ? 10 : remnChars)
    for (var len = 1; len <= subsLen; len++) {
      var elems = state.molecule.slice(c, c+len).join('')
      if (rules[elems] !== undefined) {
        var newMolecule = state.molecule.slice()
        newMolecule.splice(c, len, ...rules[elems])
        newStates.push({
          'molecule': newMolecule,
          'steps': state.steps + 1
        })
      }
    }
  }
  return newStates
}

$(function (){
  $('#main').append('<div id="day19"><h2>day #19</h2></div>')
  day19()
  $('#main').append('<br><div id="day19part2"><h2>day #19 part 2</h2></div>')
  day19part2()
  $('#main').append('<br>')
})

