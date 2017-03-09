var input = [
`inc a
jio a, +2
tpl a
inc a`,
  puzzleInput
]

var Computer = function () {
  this.pc = 0
  this.a = 0
  this.b = 0
  this.hlf = function (r) {
    this[r] = this[r] >> 1
    this.pc++
  }
  this.tpl = function (r) {
    this[r] = this[r] * 3
    this.pc++
  }
  this.inc = function (r) {
    this[r]++
    this.pc++
  }
  this.jmp = function (offset) {
    this.pc += offset
  }
  this.jie = function (r, offset) {
    if (this[r] % 2 === 0) {
      this.pc += offset
    } else {
      this.pc++
    }
  }
  this.jio = function (r, offset) {
    if (this[r] === 1) {
      this.pc += offset
    } else {
      this.pc++
    }
  }
}

var day23 = function() {

  for (var i = 0; i < input.length; i++) {

    var com = new Computer()

    var program = []
    var inputInstrs = input[i].split(/\n/)
    $.each(inputInstrs, function(idx, val) {
      var instr = val.split(/\s/)
      var fun = instr[0]
      var p1 = instr[1]
      var p2
      if (fun === 'jmp') {
        p1 = Number(instr[1])
      } else if (fun.startsWith('j')) {
        p1 = instr[1].replace(',','')
        p2 = Number(instr[2])
      }
      program.push({
        fun: fun,
        p1: p1,
        p2: p2
      })
    })
    // console.log(program)
    while (com.pc < program.length) {
      var instr = program[com.pc]
      com[instr.fun](instr.p1, instr.p2)
    }
    console.log(com)

    $('#day23').append(input[i])
      .append('<br>&emsp;')
      .append(com.b)
      .append('<br>')
  }
}

var day23part2 = function() {
  for (var i = 0; i < input.length; i++) {
    $('#day23part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day23"><h2>day #23</h2></div>')
  day23()
  $('#main').append('<br><div id="day23part2"><h2>day #23 part 2</h2></div>')
  day23part2()
  $('#main').append('<br>')
})

