var board

function initialBoard(width, height){
  return Array.apply(null, Array(width)).map(e => Array(height))
}

$(document).ready(function(){
  var body = $('body')
  board = initialBoard(10, 20)

  board.forEach(function(rowArray){
    var row = $('<div>').addClass('row')

    for(var i=0; i<rowArray.length; i++){
      var column = $('<div>').addClass('column')
      row.append(column)
    }
    body.append(row)
  })

})
