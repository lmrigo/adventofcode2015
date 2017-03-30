//    | 1   2   3   4   5   6
// ---+---+---+---+---+---+---+
//  1 |  1   3   6  10  15  21  28  36  45  55
//  2 |  2   5   9  14  20  27  35  44  54
//  3 |  4   8  13  19  26  34  43  53
//  4 |  7  12  18  25  33  42  52
//  5 | 11  17  24  32  41  51
//  6 | 16  23  31  40  50  61
//      22  30  39  49  60
//      29  38  48  59
//      37  47  58
//      46  57
//      56

//    |    1         2         3         4         5         6
// ---+---------+---------+---------+---------+---------+---------+
//  1 | 20151125  18749137  17289845  30943339  10071777  33511524
//  2 | 31916031  21629792  16929656   7726640  15514188   4041754
//  3 | 16080970   8057251   1601130   7981243  11661866  16474243
//  4 | 24592653  32451966  21345942   9380097  10600672  31527494
//  5 |    77061  17552253  28094349   6899651   9250759  31663883
//  6 | 33071741   6796745  25397450  24659492   1534922  27995004

var puzzleInput = 'To continue, please consult the code grid in the manual.  Enter the code at row 2947, column 3029.'
var input = [
'To continue, please consult the code grid in the manual.  Enter the code at row 5, column 1.', // 27995004
'To continue, please consult the code grid in the manual.  Enter the code at row 6, column 6.', // 27995004
  puzzleInput
]

var nextNumber = function (n) {
  return (n * 252533) % 33554393
}

var day25 = function() {
  for (var i = 0; i < input.length; i++) {
    var inputs = input[i].split(/\s/)
    var row = Number(inputs[16].replace(',',''))
    var column = Number(inputs[18])

    // find what order number is on the puzzle row/col
    var n = 1
    var r = 1, c = 1
    var maxR = 1, maxC = 1
    while (r < row || c < column) {
      // console.log(r,c,n)
      if (r === 1) {
        maxR++
        r = maxR
        c = 1
      } else {
        r--
        c++
      }
      n++
    }
    // console.log(r,c,n)
    // 5, 1 = 11
    // 6, 6 = 61
    // 2947, 3029 = 17850354

    var code = 20151125 // initial number provided by the puzzle
    // calculate the nth number
    while (--n) {
      code = nextNumber(code)
    }

    $('#day25').append(input[i])
      .append('<br>&emsp;')
      .append(code)
      .append('<br>')
  }
}

var day25part2 = function() {
  $('#day25part2')
    .append('<br>&emsp;To complete Part 2 49 stars need to be earned')
    .append('<br>')
}

$(function (){
  $('#main').append('<div id="day25"><h2>day #25</h2></div>')
  day25()
  $('#main').append('<br><div id="day25part2"><h2>day #25 part 2</h2></div>')
  day25part2()
  $('#main').append('<br>')
})
