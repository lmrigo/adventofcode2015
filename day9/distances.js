var input = [
`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,
  puzzleInput
]

var generateNextPaths = function (p, pairs, cities) {
  var newPaths = []
  for (var c = 0; c < cities.length; c++) {
    var np = copyPath(p)
    if (!np.path.includes(cities[c])) {
      np.sum += getEdge(np.path[np.path.length-1], cities[c], pairs)
      np.path.push(cities[c])
      newPaths.push(np)
    }
  }
  return newPaths
}

var copyPath = function (p) {
  var newP = {
    'path': [],
    'sum': p.sum
  }
  $.each(p.path, function(idx, num) {
    newP.path.push(num)
  })
  return newP
}

var getEdge = function(v1, v2, pairs) {
  var val = Number.MAX_SAFE_INTEGER
  for (var p = 0; p < pairs.length; p++) {
    if ((pairs[p][0] === v1 && pairs[p][1] === v2)
        || (pairs[p][0] === v2 && pairs[p][1] === v1)) {
      val = pairs[p][2]
      break
    }
  }
  return val
}

var day9 = function() {

  for (var i = 0; i < input.length; i++) {

    var pairs = []
    var cities = [] // different cities

    var routes = input[i].split(/\n/)
    for (var j = 0; j < routes.length; j++) {
      var route = routes[j].split(/\s/)
      var a = route[0]
      var b = route[2]
      var dist = Number(route[4])
      pairs.push([a, b, dist])
      if (!cities.includes(a)) {
        cities.push(a)
      }
      if (!cities.includes(b)) {
        cities.push(b)
      }
    }
    // console.log(cities, pairs)

    var minPathSum = Number.MAX_SAFE_INTEGER

    var initialPaths = []
    for (var c = 0; c < cities.length; c++) {
      initialPaths.push({'path': [cities[c]], 'sum': 0})
    }
    var nextPaths = initialPaths
    while (nextPaths.length > 0) {
      var path = nextPaths.shift()
      if (path.sum >= minPathSum) {
        continue
      }
      if (path.path.length === cities.length) {
        // var str = ''
        // for (var x = 0; x < path.path.length; x++) {
        //   str += path.path[x]
        // }
        if(path.sum < minPathSum) {
          minPathSum = path.sum < minPathSum ? path.sum : minPathSum
          // console.log(str, path.sum)
        }
      } else {
        nextPaths.push(...generateNextPaths(path, pairs, cities))
      }
    }


    $('#day9').append(input[i])
      .append('<br>&emsp;')
      .append(minPathSum)
      .append('<br>')
  }
}

var day9part2 = function() {

  for (var i = 0; i < input.length; i++) {
    $('#day9part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day9"><h2>day #9</h2></div>')
  day9()
  $('#main').append('<br><div id="day9part2"><h2>day #9 part 2</h2></div>')
  day9part2()
  $('#main').append('<br>')
})

