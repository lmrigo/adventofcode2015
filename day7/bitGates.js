var input = [
`123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`,
`a -> b
b AND c -> d
d OR e -> f
c LSHIFT 1 -> e
b RSHIFT 1 -> c
123 -> a`,
`5 -> c
h -> a
f AND g -> h
d OR e -> g
c RSHIFT 2 -> e
b RSHIFT 2 -> d
NOT b -> f
123 -> b`,
  puzzleInput
]

var day7 = function() {

  for (var i = 2; i < input.length; i++) {

    var wires = {}
    var operations = {
      NOT: function (x) {
        return (~x >>> 0) & 65535
      },
      AND: function (x, y) {
        return x & y
      },
      OR: function (x, y) {
        return x | y
      },
      RSHIFT: function (x, y) {
        return (x & 65535) >>> y
      },
      LSHIFT: function (x, y) {
        return (x << y) & 65535
      }
    }

    var instrs = input[i].split(/\n/)
    for (var j = 0; j < instrs.length; j++) {
      var ins = instrs[j].split(/\s/)
      if (ins[1] === '->') { //signal
        var val = ins[0]
        var n = ins[2]
        wires[n] = {'val': val}
      } else if (ins[0] === 'NOT') { // NOT
        var x = ins[1]
        var n = ins[3]
        var op = 'NOT'
        wires[n] = {'op': op, 'x': x}
      } else { // AND OR RSHIFT LSHIFT
        var a = ins[0]
        var b = ins[2]
        var n = ins[4]
        var op = ins[1]
        wires[n] = {'op': op, 'a': a, 'b': b}
      }
    }
    // console.log(wires)

    var nextNodes = ['a']
    var maxiters = 100000
    while (isNaN(wires.a.val) && --maxiters) {
      var node = nextNodes.pop()
      var next = wires[node]
      if (next.val !== undefined) {
        var nv = Number(next.val)
        if (isNaN(nv)) {
          nextNodes.push(node)
          var nwv = Number(wires[next.val].val)
          if (isNaN(nwv)) {
            nextNodes.push(next.val)
          } else {
            next.val = nwv
          }
        } else {
          next.val = nv
        }
      } else if (next.x !== undefined) {
        var nx = Number(next.x)
        if (isNaN(nx)) {
          nextNodes.push(node)
          var nwx = Number(wires[next.x].val)
          if (isNaN(nwx)) {
            nextNodes.push(next.x)
          } else {
            next.x = nwx
          }
        } else {
          next.val = operations[next.op](nx)
        }
      } else {
        var na = Number(next.a)
        if (isNaN(na)) {
          nextNodes.push(node)
          var nwa = Number(wires[next.a].val)
          if (isNaN(nwa)) {
            nextNodes.push(next.a)
          } else {
            next.a = nwa
          }
        } else {
          var nb = Number(next.b)
          if (isNaN(nb)) {
            nextNodes.push(node)
            var nwb = Number(wires[next.b].val)
            if (isNaN(nwb)) {
              nextNodes.push(next.b)
            } else {
              next.b = nwb
            }
          } else {
            next.val = operations[next.op](na, nb)
          }
        }
      }
    }
    if (!maxiters) {
      console.log('timeouted')
    }
    // console.log(wires)

    $('#day7').append(input[i])
      .append('<br>&emsp;')
      .append(wires.a.val)
      .append('<br>')
  }
}

var day7part2 = function() {

  for (var i = 2; i < input.length; i++) {

    var wires = {}
    var operations = {
      NOT: function (x) {
        return (~x >>> 0) & 65535
      },
      AND: function (x, y) {
        return x & y
      },
      OR: function (x, y) {
        return x | y
      },
      RSHIFT: function (x, y) {
        return (x & 65535) >>> y
      },
      LSHIFT: function (x, y) {
        return (x << y) & 65535
      }
    }

    var instrs = input[i].split(/\n/)
    for (var j = 0; j < instrs.length; j++) {
      var ins = instrs[j].split(/\s/)
      if (ins[1] === '->') { //signal
        var val = ins[0]
        var n = ins[2]
        wires[n] = {'val': val}
      } else if (ins[0] === 'NOT') { // NOT
        var x = ins[1]
        var n = ins[3]
        var op = 'NOT'
        wires[n] = {'op': op, 'x': x}
      } else { // AND OR RSHIFT LSHIFT
        var a = ins[0]
        var b = ins[2]
        var n = ins[4]
        var op = ins[1]
        wires[n] = {'op': op, 'a': a, 'b': b}
      }
    }
    // console.log(wires)
    wires['b'].val = 3176 //part 2

    var nextNodes = ['a']
    var maxiters = 100000
    while (isNaN(wires.a.val) && --maxiters) {
      var node = nextNodes.pop()
      var next = wires[node]
      if (next.val !== undefined) {
        var nv = Number(next.val)
        if (isNaN(nv)) {
          nextNodes.push(node)
          var nwv = Number(wires[next.val].val)
          if (isNaN(nwv)) {
            nextNodes.push(next.val)
          } else {
            next.val = nwv
          }
        } else {
          next.val = nv
        }
      } else if (next.x !== undefined) {
        var nx = Number(next.x)
        if (isNaN(nx)) {
          nextNodes.push(node)
          var nwx = Number(wires[next.x].val)
          if (isNaN(nwx)) {
            nextNodes.push(next.x)
          } else {
            next.x = nwx
          }
        } else {
          next.val = operations[next.op](nx)
        }
      } else {
        var na = Number(next.a)
        if (isNaN(na)) {
          nextNodes.push(node)
          var nwa = Number(wires[next.a].val)
          if (isNaN(nwa)) {
            nextNodes.push(next.a)
          } else {
            next.a = nwa
          }
        } else {
          var nb = Number(next.b)
          if (isNaN(nb)) {
            nextNodes.push(node)
            var nwb = Number(wires[next.b].val)
            if (isNaN(nwb)) {
              nextNodes.push(next.b)
            } else {
              next.b = nwb
            }
          } else {
            next.val = operations[next.op](na, nb)
          }
        }
      }
    }
    if (!maxiters) {
      console.log('timeouted')
    }
    // console.log(wires)

    $('#day7part2').append(input[i])
      .append('<br>&emsp;')
      .append(wires.a.val)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day7"><h2>day #7</h2></div>')
  day7()
  $('#main').append('<br><div id="day7part2"><h2>day #7 part 2</h2></div>')
  day7part2()
  $('#main').append('<br>')
})

