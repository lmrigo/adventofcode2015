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
  puzzleInput
]

var quantumEntanglement = function(arr) {
  return arr.reduce(function(acc, val) {
    return acc * val
  })
}

var s = function (x,y) {
  return x === y ? 0 : (x > y ? 1 : -1)
}

Array.prototype.insertSorted = function (x) {
  var e = 0
  for (e = 0; e < this.length; e++) {
    if (this[e] > x) {
      break
    }
  }
  this.splice(e, 0, x)
  return e
}

function Node (val, ch, sum) {
  this.val = val
  this.ch = ch
  this.sum = sum
  this.toString = function () {
    return `${this.val} (${this.sum})> ${this.ch.length}`
  }
}

var ht = { // history tree
  root: new Node(0, [], 0),
  includes: function (node, arr, ai) {
    var e = arr[ai]
    if (e) {
      var n = -1
      for (n = 0; n < node.ch.length; n++) {
        if (node.ch[n].val === e) {
          break
        }
      }
      if (-1 < n && n < node.ch.length) {
        return this.includes(node.ch[n], arr, (ai+1) )
      } else {
        return false
      }
    } else {
      return true
    }
  },
  insert: function (node, arr) {
    var e = arr.shift()
    if (e) {
      var n = 0
      for (n = 0; n < node.ch.length; n++) {
        if (node.ch[n].val === e) {
          break
        }
      }
      if (n === node.ch.length || node.ch.length === 0) {
        node.ch.push(new Node(e, [], (node.sum + e)))
      }
      return this.insert(node.ch[n], arr)
    } else {
      return true
    }
  },
  toString: function(node, depth) {
    if (!node) {
      node = this.root
    }
    if (!depth) {
      depth = 0
    }
    var str = node.val
    if (node.ch.length) {
      for (var n = 0; n < node.ch.length; n++) {
        if (n !== 0 || depth === 0)  {
          str += '\n'
          for (var t = 0; t<depth; t++) {str += '\t'}
        } else {
          str += '\t'
        }
        str += this.toString(node.ch[n], (depth+1))
      }
    } else {
      str += ' ('+ node.sum +')'
    }
    return str
  }
}

// not needed, but useful to see some results
var findTheOther2 = function (g1, thirdWeight) {
  var remn = weights.filter((x) => {
    return !g1.includes(x)
  })
  var q = remn.map(function(val) {
    return [val]
  })
  while (q.length > 0) {
    var g2 = q.pop()
    var sum2 = g2.reduce(function(acc, val) {
      return acc + val
    })
    if (sum2 > thirdWeight) {
      continue
    } else if (sum2 === thirdWeight) {
      g2.sort(s)
      var g3 = remn.filter((x) => {
        return !g2.includes(x)
      })
      var sum3 = g3.reduce(function(acc, val) {
        return acc + val
      })
      if (sum2 === thirdWeight) {
        var g1l = g1.length
        var g2l = g2.length
        var g3l = g3.length
        if ((g1l < g2l && g1l < g3l)
          || (g2l < g1l && g2l < g3l)
          || (g3l < g1l && g3l < g2l)) {
          var str = ''
          str += 'var a = [' + g1.join(',') + ']\n'
          str += 'var b = [' + g2.join(',') + ']\n'
          str += 'var c = [' + g3.join(',') + ']\n'
          console.log(str)
        }
      }
    } else {
      for (var w = 0; w < remn.length; w++) {
        if (!g2.includes(remn[w])) {
          var cpy = g2.slice()
          cpy.push(remn[w])
          q.push(cpy)
        }
      }
    }
  }

}

var weights = []
var day24 = function() {

  for (var i = 0; i < input.length; i++) {
    ht.root = new Node(0, [], 0)

    var inputs = input[i].split(/\n/)
    weights = []
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

    // weights.reverse(s) // goes slower reversed as the algorithm "pops". If it "shifted" it would be better.

    var finalGroups = []
    var minLength = 1000
    var initial = {'wrem': thirdWeight, 'lst': []}
    var queue = [initial]
    // var counter = 1, treeCounter = 0
    while (queue.length > 0) {
      // var grp = queue.shift()
      var grp = queue.pop()
      if (grp.lst.length < minLength) {
        $.each(weights, (idx, w) => {
          if (!grp.lst.includes(w)) {
            // if ((counter++ % 100000000) === 0) {
            //   counter = 1
            //   console.log(grp.lst.join(','))
            // }
            var newGrp = {'wrem': (grp.wrem - w), 'lst': []}
            if (newGrp.wrem >= 0) {
              newGrp.lst.push(...grp.lst)
              newGrp.lst.insertSorted(w)
              if (newGrp.wrem === 0 && newGrp.lst.length <= minLength) {
                if (newGrp.lst.length < minLength) {
                  minLength = newGrp.lst.length
                }
                if (!ht.includes(ht.root, newGrp.lst, 0)) {
                  // findTheOther2(newGrp.lst, thirdWeight)
                  finalGroups.push(newGrp.lst.slice())
                  ht.insert(ht.root, newGrp.lst)
                  // if (treeCounter++ % 100 === 0) {
                  //   console.log(ht.toString())
                  // }
                }
              } else {
                queue.push(newGrp)
              }
            }
          }
        })
      }
    }

    var shorts = finalGroups.filter((val) => {
      return val.length <= minLength
    })
    var smallestQE = shorts.reduce((acc, val) => {
      return quantumEntanglement(acc) < quantumEntanglement(val) ? acc : val
    })
    console.log(smallestQE, quantumEntanglement(smallestQE))


    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(quantumEntanglement(smallestQE))
      .append('<br>')
  }
}

var day24part2 = function() {
  for (var i = 0; i < input.length; i++) {
    ht.root = new Node(0, [], 0)

    var inputs = input[i].split(/\n/)
    weights = []
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
    var fourthWeight = totalWeight / 4
    // console.log(fourthWeight)
    // 15, 384

    // weights.reverse(s) // goes slower reversed as the algorithm "pops". If it "shifted" it would be better.

    var finalGroups = []
    var minLength = 1000
    var initial = {'wrem': fourthWeight, 'lst': []}
    var queue = [initial]
    // var counter = 1, treeCounter = 0
    while (queue.length > 0) {
      // var grp = queue.shift()
      var grp = queue.pop()
      if (grp.lst.length < minLength) {
        $.each(weights, (idx, w) => {
          if (!grp.lst.includes(w)) {
            // if ((counter++ % 100000000) === 0) {
            //   counter = 1
            //   console.log(grp.lst.join(','))
            // }
            var newGrp = {'wrem': (grp.wrem - w), 'lst': []}
            if (newGrp.wrem >= 0) {
              newGrp.lst.push(...grp.lst)
              newGrp.lst.insertSorted(w)
              if (newGrp.wrem === 0 && newGrp.lst.length <= minLength) {
                if (newGrp.lst.length < minLength) {
                  minLength = newGrp.lst.length
                }
                if (!ht.includes(ht.root, newGrp.lst, 0)) {
                  // findTheOther2(newGrp.lst, fourthWeight)
                  finalGroups.push(newGrp.lst.slice())
                  ht.insert(ht.root, newGrp.lst)
                  // if (treeCounter++ % 100 === 0) {
                  //   console.log(ht.toString())
                  // }
                }
              } else {
                queue.push(newGrp)
              }
            }
          }
        })
      }
    }

    var shorts = finalGroups.filter((val) => {
      return val.length <= minLength
    })
    var smallestQE = shorts.reduce((acc, val) => {
      return quantumEntanglement(acc) < quantumEntanglement(val) ? acc : val
    })
    console.log(smallestQE, quantumEntanglement(smallestQE))


    $('#day24part2').append(input[i])
      .append('<br>&emsp;')
      .append(quantumEntanglement(smallestQE))
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
