var puzzleInput =
`Hit Points: 71
Damage: 10`

var input = [
`Hit Points: 13
Damage: 8`,
`Hit Points: 14
Damage: 8`,
  puzzleInput
]

var spells = [
  {name:'Magic Missile', effect: false, mana: 53, dmg: 4},
  {name:'Drain',         effect: false, mana: 73, dmg: 2, heal: 2},
  {name:'Shield',        effect: true,  mana: 113, turns: 6, ar: 7},
  {name:'Poison',        effect: true,  mana: 173, turns: 6, dmg: 3},
  {name:'Recharge',      effect: true,  mana: 229, turns: 5, regen: 101}
]

var Player = function (hp, mana, ar, manaSpent) {
  this.hp = hp
  this.mana = mana
  this.ar = ar
  this.manaSpent = manaSpent
  this.effects = []
}

var clonePlayer = function (p) {
  var cP = new Player(p.hp, p.mana, 0, p.manaSpent)
  $.each(p.effects, function(eidx, effect) {
    cP.effects.push({
      name: effect.name,
      turns: effect.turns,
      ar: effect.ar,
      dmg: effect.dmg,
      regen: effect.regen
    })
  })
  return cP
}

var cloneBoss = function (base) {
  return {
    hp: base.hp,
    dmg: base.dmg
  }
}

var applyEffects = function(p, b) {
  // spell effects
  $.each(p.effects, function(eidx, eff) {
    if (eff.ar) {
      p.ar = eff.ar
    } else if (eff.dmg) {
      b.hp -= eff.dmg
    } else if (eff.regen) {
      p.mana += eff.regen
    }
    eff.turns--
  })
  // remove effects with no turns
  p.effects = p.effects.filter(function (eff) {
    return eff.turns > 0
  })
}

var generateStates = function (state, part2) {
  var newStates = []
  if (state.playerTurn) {
    $.each(spells, function (spidx, spell) {
      var newPlayer = clonePlayer(state.player)
      var newBoss = cloneBoss(state.boss)
      if (part2) { // part 2 specific
        newPlayer.hp--
      }
      applyEffects(newPlayer, newBoss)
      if (newPlayer.effects.find(function(ef) {
        return ef.name === spell.name
      })) {
        return true // can't cast spell already in effect
      } else if (newPlayer.mana < spell.mana) {
        return true // not enough mana for this spell. Continue
      } else {
        // cast spell
        newPlayer.manaSpent += spell.mana
        newPlayer.mana -= spell.mana
        if (spell.effect) {
          newPlayer.effects.push({
            name: spell.name,
            turns: spell.turns,
            ar: spell.ar,
            dmg: spell.dmg,
            regen: spell.regen
          })
        } else { // Magic Missile and Drain
          newBoss.hp -= spell.dmg
          if (spell.heal) { // Drain
            newPlayer.hp += spell.heal
          }
        }
        var newHistory = state.history + ' P' + spell.name
        newStates.push({'player': newPlayer, 'boss': newBoss, 'playerTurn': !state.playerTurn, history: newHistory})
      }
    })
  } else {
    var newPlayer = clonePlayer(state.player)
    var newBoss = cloneBoss(state.boss)
    applyEffects(newPlayer, newBoss)
    var damage = 0
    if (newBoss.hp > 0) {
      damage = newBoss.dmg - newPlayer.ar
      newPlayer.hp -= damage > 1 ? damage : 1
    }
    var newHistory = state.history + ' B' + damage
    newStates.push({'player': newPlayer, 'boss': newBoss, 'playerTurn': !state.playerTurn, history: newHistory})
  }
  return newStates
}

var day22 = function() {

  for (var i = 0; i < input.length; i++) {

    var basePlayer
    if (i < 2) { // examples
      basePlayer = new Player(10, 250, 0, 0)
    } else { // puzzle
      basePlayer = new Player(50, 500, 0, 0)
    }

    var inputs = input[i].split(/\n/)
    var baseBoss = {
      hp: Number(inputs[0].split(/\s/)[2]),
      dmg: Number(inputs[1].split(/\s/)[1])
    }

    var lowest = Number.MAX_SAFE_INTEGER

    var initialState = {'player': basePlayer, 'boss': baseBoss, 'playerTurn': true}
    var nextStates = [initialState]
    var counter = 0
    while (nextStates.length > 0) {
      // var state = nextStates.shift()
      var state = nextStates.pop()
      // if (counter++ % 10000 === 0) {
      //   console.log(nextStates.length, state.player, state.boss)
      // }
      if (lowest <= state.player.manaSpent) {
        continue
      } else if (state.player.hp <= 0) { // lose
        continue
      } else if (state.boss.hp <= 0) { // win
        if (state.player.manaSpent < lowest) {
          lowest =  state.player.manaSpent
          // console.log(state.player, state.boss)
        }
      } else {
        nextStates.push(...generateStates(state))
      }
    }

    $('#day22').append(input[i])
      .append('<br>&emsp;')
      .append(lowest)
      .append('<br>')
  }
}

var day22part2 = function() {
  for (var i = 0; i < input.length; i++) {

    var basePlayer
    if (i < 2) { // examples
      basePlayer = new Player(10, 250, 0, 0)
    } else { // puzzle
      basePlayer = new Player(50, 500, 0, 0)
    }

    var inputs = input[i].split(/\n/)
    var baseBoss = {
      hp: Number(inputs[0].split(/\s/)[2]),
      dmg: Number(inputs[1].split(/\s/)[1])
    }

    var lowest = Number.MAX_SAFE_INTEGER

    var initialState = {'player': basePlayer, 'boss': baseBoss, 'playerTurn': true, history: ''}
    var nextStates = [initialState]
    var counter = 0
    while (nextStates.length > 0) {
      // var state = nextStates.pop()
      var state = nextStates.shift()
      // if (counter++ % 10000 === 0) {
      //   console.log(nextStates.length, state.player.hp , state.player.manaSpent, state.boss.hp, state.history)
      // }
      if (lowest <= state.player.manaSpent) {
        continue
      } else if (state.player.hp <= 0) { // lose
        continue
      } else if (state.boss.hp <= 0) { // win
        if (state.player.manaSpent < lowest) {
          lowest =  state.player.manaSpent
          // console.log(state.player, state.boss)
        }
      } else {
        nextStates.push(...generateStates(state, true))
      }
    }

    // probably 1937
    $('#day22part2').append(input[i])
      .append('<br>&emsp;')
      .append(lowest)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="day22part2"><h2>day #22 part 2</h2></div>')
  day22part2()
  $('#main').append('<br>')
})

