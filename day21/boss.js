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
    // {name:'',           gil:0,  dmg: 0, ar: 0}, // weapon is not optional
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

var Player = function (hp, dmg, ar, gil) {
  this.hp = hp
  this.dmg = dmg
  this.ar = ar
  this.gil = gil
}

var generatePlayers = function (base) {
  var players = []
  $.each(armory.weapons, function(idxw, wpn) {
    $.each(armory.armors, function(idxa, amr) {
      var hp = base.hp
      var dmg = base.dmg + wpn.dmg
      var ar = base.ar + amr.ar
      var gil = base.gil + wpn.gil + amr.gil
      var p0 = new Player(hp, dmg, ar, gil)
      p0.wpn = wpn.name
      p0.amr = amr.name
      players.push(p0) // 0 rings
      for (var r1 = 0; r1 < armory.rings.length; r1++) {
        for (var r2 = r1; r2 < armory.rings.length; r2++) {
          var p1 = new Player(hp, dmg, ar, gil)
          var ring1 = armory.rings[r1]
          var ring2 = armory.rings[r2]
          var extraDmg
          var extraAr
          var extraGil
          if (r1 == r2) { // 1 rings
            extraDmg = ring1.dmg
            extraAr = ring1.ar
            extraGil = ring1.gil
          } else { // 2 rings
            extraDmg = ring1.dmg + ring2.dmg
            extraAr = ring1.ar + ring2.ar
            extraGil = ring1.gil + ring2.gil
          }
          p1.dmg += extraDmg
          p1.ar += extraAr
          p1.gil += extraGil
          p1.wpn = wpn.name
          p1.amr = amr.name
          p1.rng1 = ring1.name
          p1.rng2 = ring2.name
          players.push(p1)
        }
      }
    })
  })
  return players
}

var cloneBoss = function (base) {
  return {
    hp: base.hp,
    dmg: base.dmg,
    ar: base.ar
  }
}

var day21 = function() {

  for (var i = 0; i < input.length; i++) {
    /*var example = {
      hp: 8,
      dmg: 5,
      ar: 5
    }*/
    var basePlayer = new Player(100, 0, 0, 0)
    var players = generatePlayers(basePlayer)

    var inputs = input[i].split(/\n/)
    var baseBoss = {
      hp: Number(inputs[0].split(/\s/)[2]),
      dmg: Number(inputs[1].split(/\s/)[1]),
      ar: Number(inputs[2].split(/\s/)[1])
    }

    var cheapest = Number.MAX_SAFE_INTEGER
    $.each(players, function(pidx, player) {
      var boss = cloneBoss(baseBoss)
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
      if (player.hp > 0) { // win
        if (player.gil < cheapest) {
          cheapest =  player.gil
          // console.log(player, boss)
        }
      }
    })

    $('#day21').append(input[i])
      .append('<br>&emsp;')
      .append(cheapest)
      .append('<br>')
  }
}

var day21part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var basePlayer = new Player(100, 0, 0, 0)
    var players = generatePlayers(basePlayer)

    var inputs = input[i].split(/\n/)
    var baseBoss = {
      hp: Number(inputs[0].split(/\s/)[2]),
      dmg: Number(inputs[1].split(/\s/)[1]),
      ar: Number(inputs[2].split(/\s/)[1])
    }

    var expensivest = 0
    $.each(players, function(pidx, player) {
      var boss = cloneBoss(baseBoss)
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
      if (boss.hp > 0) { // lose
        if (player.gil > expensivest) {
          expensivest = player.gil
          // console.log(player, boss)
        }
      }
    })

    // 282 too high
    $('#day21part2').append(input[i])
      .append('<br>&emsp;')
      .append(expensivest)
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

