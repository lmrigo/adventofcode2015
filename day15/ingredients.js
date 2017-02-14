var puzzleInput =
`Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8`
// 21 5 31 43

var input = [
// 0             1       2        3     4     5   6   7      8   9       10
`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`,
  puzzleInput
]

var day15 = function() {

  for (var i = 0; i < input.length; i++) {
    var ingredients = []

    var inLines = input[i].split(/\n/)
    for (var j = 0; j < inLines.length; j++) {
      var ing = inLines[j].split(/\s/)
      var ingredient = {
        name: ing[0].replace(':',''),
        capacity: Number(ing[2].replace(',','')),
        durability: Number(ing[4].replace(',','')),
        flavor: Number(ing[6].replace(',','')),
        texture: Number(ing[8].replace(',','')),
        calories: Number(ing[10])
      }
      ingredients.push(ingredient)
    }
    // console.log(ingredients)

    var initialSpoons = {}
    for (var j = 0; j < ingredients.length; j++) {
      initialSpoons[ingredients[j].name] = 0
    }

    // initialSpoons.Butterscotch = 44
    // initialSpoons.Cinnamon = 56
    initialSpoons[ingredients[0].name] = 100
    initialSpoons.score = score(ingredients, initialSpoons)

    previousCombos = []
    var maxScore = Number.MIN_SAFE_INTEGER
    var nextSpoons = [initialSpoons]
    while (nextSpoons.length > 0) {
      // var teaspoons = nextSpoons.shift()
      var teaspoons = nextSpoons.pop()
      if (teaspoons.score > maxScore) {
        maxScore = teaspoons.score
        console.log(teaspoons)
      }
      if (Math.random()*100 > 99) {
        console.log(nextSpoons.length, teaspoons, maxScore)
      }
      nextSpoons.push(...nextCombos(ingredients, teaspoons))
    }

    $('#day15').append(input[i])
      .append('<br>&emsp;')
      .append(maxScore)
      .append('<br>')
  }
}

var score = function(ingredients, teaspoons) {
  var capacity = 0
  var durability = 0
  var flavor = 0
  var texture = 0
  $.each(ingredients, function(idx, val) {
    capacity += teaspoons[val.name] * val.capacity
    durability += teaspoons[val.name] * val.durability
    flavor += teaspoons[val.name] * val.flavor
    texture += teaspoons[val.name] * val.texture
  })
  if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
    return 0
  } else {
    return capacity * durability * flavor * texture
  }
}

var previousCombos = []
var nextCombos = function(ingredients, teaspoons) {
  var newSpoons = []
  $.each(ingredients, function(idxA, a) {
    $.each(ingredients, function(idxB, b) {
      if (a.name !== b.name
        && teaspoons[a.name] > 0
        && teaspoons[b.name] < 100) {
        var newSpoon = cloneSpoons(teaspoons)
        newSpoon[a.name]--
        newSpoon[b.name]++

        var sig = signature(newSpoon)
        if (!previousCombos.includes(sig)) {
          previousCombos.push(sig)
          newSpoon.score = score(ingredients, newSpoon)
          newSpoons.push(newSpoon)
        }
      }
    })
  })
  return newSpoons
}

var cloneSpoons = function (ts) {
  var newTs = {}
  $.each(Object.keys(ts), function(idx, key) {
    newTs[key] = ts[key]
  })
  newTs.score = -1
  return newTs
}

var signature = function (ts) {
  var str = '|'
  $.each(Object.keys(ts), function(idx, key) {
    str += key.substr(2) + ts[key] + ','
  })
  return str
}


var day15part2 = function() {


  for (var i = 0; i < input.length; i++) {

    $('#day15part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day15"><h2>day #15</h2></div>')
  day15()
  $('#main').append('<br><div id="day15part2"><h2>day #15 part 2</h2></div>')
  day15part2()
  $('#main').append('<br>')
})

