var input = [
//0    1      2   3   4        5     6   7      8    9  10
`Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`,
  puzzleInput
]

var day13 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n/)
    var people = []
    var pairs = []
    for (var l = 0; l < lines.length; l++) {
      var line = lines[l].split(/\s/)
      var pair = []
      pair[0] = line[0]
      pair[1] = line[10].replace('.', '')
      pair[2] = Number(line[3]) * (line[2] === 'gain' ? 1 : -1)
      pairs.push(pair)
      if (!people.includes(pair[0])) {
        people.push(pair[0])
      }
      if (!people.includes(pair[1])) {
        people.push(pair[1])
      }
    }
    // console.log(people, pairs)

    var maxTableSum = Number.MIN_SAFE_INTEGER

    var initialTables = []
    for (var p = 0; p < people.length; p++) {
      initialTables.push({'table': [people[p]], 'sum': 0})
    }
    var nextTables = initialTables
    while (nextTables.length > 0) {
      var table = nextTables.shift()
      if (table.sum <= maxTableSum) {
        continue
      }
      if (table.table.length === people.length) {
        // sum the wraparound
        table.sum += getEdge(table.table[table.table.length-1], table.table[0], pairs)
        var str = ''
        for (var x = 0; x < table.table.length; x++) {
          str += table.table[x]
        }
        if(table.sum > maxTableSum) {
          maxTableSum = table.sum > maxTableSum ? table.sum : maxTableSum
          // console.log(str, table.sum)
        }
      } else {
        nextTables.push(...generateNextTables(table, pairs, people))
      }
    }


    $('#day13').append(input[i])
      .append('<br>&emsp;')
      .append(maxTableSum)
      .append('<br>')
  }
}


var generateNextTables = function (t, pairs, people) {
  var newPaths = []
  for (var p = 0; p < people.length; p++) {
    var nt = copyTable(t)
    if (!nt.table.includes(people[p])) {
      nt.sum += getEdge(nt.table[nt.table.length-1], people[p], pairs)
      nt.table.push(people[p])
      newPaths.push(nt)
    }
  }
  return newPaths
}

var copyTable = function (t) {
  var newT = {
    'table': [],
    'sum': t.sum
  }
  $.each(t.table, function(idx, person) {
    newT.table.push(person)
  })
  return newT
}

var getEdge = function(v1, v2, pairs) {
  var val = 0
  for (var p = 0; p < pairs.length; p++) {
    if (pairs[p][0] === v1 && pairs[p][1] === v2) {
      val += pairs[p][2]
      break
    }
  }
  for (var p = 0; p < pairs.length; p++) {
    if (pairs[p][0] === v2 && pairs[p][1] === v1) {
      val += pairs[p][2]
      break
    }
  }
  return val
}

var day13part2 = function() {


  for (var i = 0; i < input.length; i++) {
    $('#day13part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day13"><h2>day #13</h2></div>')
  day13()
  $('#main').append('<br><div id="day13part2"><h2>day #13 part 2</h2></div>')
  day13part2()
  $('#main').append('<br>')
})

