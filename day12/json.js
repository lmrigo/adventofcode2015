var input = [
  '[1,2,3]',
  '{"a":2,"b":4}',
  '[[[3]]]',
  '{"a":{"b":4},"c":-1}',
  '{"a":[-1,1]}',
  '[-1,{"a":1}]',
  '[]{}',
  '[1,{"c":"red","b":2},3]',
  '{"d":"red","e":[1,2,3,4],"f":5}',
  '[1,"red",5]',
  '{"a":1,"b":[2,3,"red"]}[1]',
  '{"a":1,"b":{"c":3,"red":"4"}}',
  '[{"a":1},{{"b":2},"c":"red","d":4},["red",3,3]]',
  puzzleInput
]

var day12 = function() {

  for (var i = 0; i < input.length; i++) {

    var numbers = input[i].match(/-?\d+/g)
    var sum = 0
    if (numbers != null) {
      sum = numbers.reduce(function(accum, val) {
        return accum + Number(val)
      }, 0)
    }

    $('#day12').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }
}

var buildTree = function (json) {
  var rootNode = []
  var stack = [rootNode]
  var top = rootNode
  var c = 0
  while (c < json.length) {
    var ch = json.charAt(c)
    if (ch === '{') {
      var node = ['o', '']
      stack.push(node)
      top = node
    } else if (ch === '}') {
      var node = stack.pop()
      var top = stack[stack.length-1]
      top.push(node)
    } else if (ch === '[') {
      var node = ['a', '']
      stack.push(node)
      top = node
    } else if (ch === ']') {
      var node = stack.pop()
      var top = stack[stack.length-1]
      top.push(node)
    } else {
      top[1] += ch
    }
    c++
  }
  // console.log(top)
  return top
}

var removeReds = function (n) {
  if (n[0] === 'o') {
    if (n.length > 2) {
      for (var child = 2; child < n.length; child++) {
        n[1] += removeReds(n[child])
      }
    }
    if (n[1].includes(':"red"')) {
      return ''
    } else {
      return n[1]
    }
  } else if (n[0] === 'a') {
    if (n.length > 2) {
      for (var child = 2; child < n.length; child++) {
        n[1] += removeReds(n[child])
      }
    }
    return n[1]
  } else {
    var str = ''
    for (var child = 0; child < n.length; child++) {
      str += removeReds(n[child])
    }
    return str
  }
}

var day12part2 = function() {


  for (var i = 0; i < input.length; i++) {

    var tree = input[i]
    tree = buildTree(tree)
    var aux = removeReds(tree)

    var numbers = aux.match(/-?\d+/g)
    var sum = 0
    if (numbers != null) {
      sum = numbers.reduce(function(accum, val) {
        return accum + Number(val)
      }, 0)
    }

    // 11782053 too high
    $('#day12part2').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day12"><h2>day #12</h2></div>')
  day12()
  $('#main').append('<br><div id="day12part2"><h2>day #12 part 2</h2></div>')
  day12part2()
  $('#main').append('<br>')
})

