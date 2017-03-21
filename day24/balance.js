var input = [
`1
2
3
4
5
7
8
9
10
11`,
  // puzzleInput
]

var quantumEntanglement = function(arr) {
  return arr.reduce(function(acc, val) {
    return acc * val
  })
}

var day24 = function() {

  for (var i = 0; i < input.length; i++) {

    var inputs = input[i].split(/\n/)
    var weights = []
    for (var j = 0; j < inputs.length; j++) {
      weights.push(Number(inputs[j]))
    }
    var numWeights = weights.length
    // console.log(numWeights)
    // 10 29
    var totalWeight = weights.reduce(function(acc, val) {
      return acc + val
    })
    // console.log(totalWeight)
    // 60, 1536
    var thirdWeight = totalWeight / 3
    // console.log(thirdWeight)
    // 20, 512

    var thirdGroups = []
    function s(x,y){
      return x === y ? 0 : (x > y ? 1 : -1)
    }
    var arrEquals = function (a, b) {
      if (a.length !== b.length) {
        return false
      } else {
        var equal = true
        for (var j = 0; j < a.length; j++) {
          if (a[j] !== b[j]) {
            equal = false
          }
        }
        return equal
      }
    }
    var isNewGroup = function (newGrp) {
      var isNew = true
      for (var g = 0; g < thirdGroups.length; g++) {
        if (arrEquals(thirdGroups[g], newGrp)) {
          isNew = false
          break
        }
      }
      return isNew
    }
    var thirdGroupsToString = function () {
      var str = '[ '
      $.each(thirdGroups, function(idx, val) {
        str += '[' + val + '], '
      })
      str += ']'
      return str
    }
    //divide the weights in three groups of same weight

    var queue = weights.map(function(val) {
      return [val]
    })
    var counter = 0
    while (queue.length > 0) {
      if (counter++ % 100000000 === 0) {
        console.log('q: '+queue.length, thirdGroups.length)
      }
      // var grp = queue.shift()
      var grp = queue.pop()
      var sum = grp.reduce(function(acc, val) {
        return acc + val
      })
      if (sum > thirdWeight) {
        continue
      } else if (sum === thirdWeight) {
        grp.sort(s)
        if (isNewGroup(grp)) {
          thirdGroups.push(grp)
          if (thirdGroups.length % 100 === 0) {
            console.log(thirdGroupsToString() + thirdGroups.length)
          }
        }
      } else {
        for (var w = 0; w < weights.length; w++) {
          if (!grp.includes(weights[w])) {
            var cpy = grp.slice()
            cpy.push(weights[w])
            queue.push(cpy)
          }
        }
      }
    }
    // console.log(thirdGroups)
    console.log(thirdGroupsToString() + thirdGroups.length)


    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

var day24part2 = function() {
  for (var i = 0; i < input.length; i++) {


    $('#day24part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day24"><h2>day #24</h2></div>')
  day24()
  $('#main').append('<br><div id="day24part2"><h2>day #24 part 2</h2></div>')
  day24part2()
  $('#main').append('<br>')
})

