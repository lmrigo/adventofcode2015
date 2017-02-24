var puzzleInput =
`Hit Points: 103
Damage: 9
Armor: 2`
var input = [
`Hit Points: 12
Damage: 7
Armor: 2`,
  puzzleInput
]

var armory = {
  weapons: [
    {name:'',           gil:0,  dmg: 0, ar: 0},
    {name:'Dagger',     gil:8,  dmg: 4, ar: 0},
    {name:'Shortsword', gil:10, dmg: 5, ar: 0},
    {name:'Warhammer',  gil:25, dmg: 6, ar: 0},
    {name:'Longsword',  gil:40, dmg: 7, ar: 0},
    {name:'Greataxe',   gil:74, dmg: 8, ar: 0}
  ], armors: [
    {name:'',           gil:0,   dmg: 0, ar: 0},
    {name:'Leather',    gil:13,  dmg: 0, ar: 1},
    {name:'Chainmail',  gil:31,  dmg: 0, ar: 2},
    {name:'Splintmail', gil:53,  dmg: 0, ar: 3},
    {name:'Bandedmail', gil:75,  dmg: 0, ar: 4},
    {name:'Platemail',  gil:102, dmg: 0, ar: 5}
  ], rings: [
    {name:'Damage + 1',  gil:25,  dmg: 1, ar: 0},
    {name:'Damage + 2',  gil:50,  dmg: 2, ar: 0},
    {name:'Damage + 3',  gil:100, dmg: 3, ar: 0},
    {name:'Defense + 1', gil:20,  dmg: 0, ar: 1},
    {name:'Defense + 2', gil:40,  dmg: 0, ar: 2},
    {name:'Defense + 3', gil:80,  dmg: 0, ar: 3}
  ]
}

var generatePlayers = function (base) {
  var players = []
  $.each(armory.weapons, function(idxw, wpn) {
    $.each(armory.armors, function(idxa, amr) {
      // 0 rings
      var hp = base.hp
      var dmg = base.dmg + wpn.dmg
      var ar = base.ar + amr.ar
      var gil = base.gil + wpn.gil + ar.gil
      players.push(Player(hp, dmg, ar, gil))
      // 1 rings
      // 2 rings
    })
  })
  return players
}

var Player = function (hp, dmg, ar, gil = 0) {
  this.hp = hp
  this.dmg = dmg
  this.ar = ar
  this.gil = gil
}

var day21 = function() {

  for (var i = 0; i < input.length; i++) {
    var example = i === 0
    var player = {
      hp: example ? 8 : 100,
      dmg: example ? 5 : 0,
      ar: example ? 5 : 0
    }

    var inputs = input[i].split(/\n/)
    var boss = {
      hp: Number(inputs[0].split(/\s/)[2]),
      dmg: Number(inputs[1].split(/\s/)[1]),
      ar: Number(inputs[2].split(/\s/)[1])
    }

    var playerTurn = true
    while (player.hp > 0 && boss.hp > 0) {
      if (playerTurn) {
        var damage = player.dmg - boss.ar
        boss.hp -= damage > 1 ? damage : 1
      } else {
        var damage = boss.dmg - player.ar
        player.hp -= damage > 1 ? damage : 1
      }
      playerTurn = !playerTurn
    }
    console.log(player, boss)

    $('#day21').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

var day21part2 = function() {

  for (var i = 0; i < input.length; i++) {

    $('#day21part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day21"><h2>day #21</h2></div>')
  day21()
  $('#main').append('<br><div id="day21part2"><h2>day #21 part 2</h2></div>')
  day21part2()
  $('#main').append('<br>')
})

