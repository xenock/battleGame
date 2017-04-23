describe('Board', function(){
  var width, height, grid

  beforeEach(function(){
    width = Math.floor((Math.random()*10 )+1)
    height = Math.floor((Math.random()*10 )+1)
    board = new Board(width, height)
  })

  describe('Functions behaviour', function(){
    it('should generate a board with desired dimensions', function(){
      board._generateGrid()
      expect(board.grid.length).toEqual(board.width)
    })
  })
})
