describe('Rules', function(){
  var rules
  var totalMoves,
    totalAttacks,
    remainingMoves,
    remainingAttacks,
    actions,
    turn

  beforeEach(function(){
    totalMoves = Math.floor((Math.random()*10 )+2)
    totalAttacks = Math.floor((Math.random()*10 )+2)
    rules = new Rules(totalMoves, totalAttacks)
    actions = new Array()
  })
  describe('Functions behaviour', function(){
    describe('move', function(){
      it('should substract one move to remainingMoves', function(){
        rules.remainingMoves = 2
        rules.move()
        expect(rules.remainingMoves).toEqual(1)
      })
    })
    describe('attack', function(){
      it('should substract one attack to remainingAttack', function(){
        rules.remainingAttacks = 2
        rules.attack()
        expect(rules.remainingAttacks).toEqual(1)
      })
    })
    describe('restartActions', function(){
      it('should restart remainingMoves', function(){
        rules.restartActions()
        expect(rules.remainingMoves).toEqual(rules.totalMoves)
      })
      it('should restart remainingAttacks', function(){
        rules.restartActions()
        expect(rules.remainingAttacks).toEqual(rules.totalAttacks)
      })
    })
    describe('cleanActions', function(){
      it('should empty actions array', function(){
        rules.actions = [2,3]
        rules.cleanActions()
        expect(rules.actions.length).toEqual(0)
      })
    })
    describe('hasTwoActions', function(){
      it('should have 2 actions', function(){
        rules.actions = [2,3]
        expect(rules.actions.length).toEqual(2)
      })
    })
    describe('addClickedCell', function(){
      it('should add info from the clicked cell', function(){
        rules.addClickedCell(2)
        expect(rules.actions.length).toEqual(1)
      })
    })
    describe('_firstActionIsAttacker', function(){
      it('First action should be a soldier of ours', function(){
        rules.actions.push({type: 'team_one'})
        rules.turn = 'team_one'
        expect(rules._firstActionIsAttacker()).toBe(true)
      })
    })
    describe('_hasSecondAction', function(){
      it('should have a second action', function(){
        rules.action = ['one', 'two']
        expect(rules.action[1]).toBeTruthy()
      })
    })
    describe('validPlayerAction', function(){
      it('should be a valid action', function(){
        rules.actions.push({type: 'team_one'})
        rules.actions.push('fake action two')
        rules.turn = 'team_one'
        expect(rules.validPlayerAction()).toBe(true)
      })
    })
    describe('attackingUnitName', function(){
      it('should return name of attacking unit', function(){
        rules.actions.push({name: 'soldier1'})
        expect(rules.attackingUnitName()).toEqual('soldier1')
      })
    })
    describe('attackingUnitName', function(){
      it('should return name of attacking unit', function(){
        rules.actions.push({name: 'soldier1'})
        rules.actions.push({name: 'soldier2'})
        expect(rules.attackedUnitName()).toEqual('soldier2')
      })
    })
    describe('_secondActionIsAnEnemy', function(){
      it('first action should be a soldier of theirs', function(){
        rules.actions.push({type: 'team_one'})
        rules.actions.push({type: 'team_two'})
        rules.turn = 'team_one'
        expect(rules._secondActionIsAnEnemy()).toBe(true)
      })
    })
    describe('_haveRemainingActions', function(){
      it('should have remaining actions to do', function(){
        rules.remainingAttacks = 1
        expect(rules._haveRemainingActions()).toBe(true)
      })
    })
    describe('isValidAttack', function(){
      it('first action is attacker and second attacked', function(){
        rules.actions.push({type: 'team_one'})
        rules.actions.push({type: 'team_two'})
        rules.turn = 'team_one'
        expect(rules.isValidAttack()).toBe(true)
      })
    })
    describe('secondActionIsNotAUnit', function(){
      it('second action should not have a unit', function(){
        rules.actions.push({type: 'team_one'})
        rules.actions.push({place: 'valid place'})
        expect(rules.secondActionIsNotAUnit()).toBe(true)
      })
    })
  })
})
