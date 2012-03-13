describe('Kanban Core', function () {
  
  describe('kanban.Card', function () {
    beforeEach(function () {
      this.card = new kanban.Card({order: 1, lane: 'ready', title: 'Card one'});
    });

    it('should have an order field', function () {
      expect(this.card.get('order')).toEqual(1);
    });

    it('should have a lane field', function () {
      expect(this.card.get('lane')).toEqual('ready');
    });

    it('should have a lane field', function () {
      expect(this.card.get('title')).toEqual('Card one');
    });
    
  });
  
  describe('kanban.Cards', function () {
    beforeEach(function () {
      this.cards = new kanban.Cards([
        {title: "1", order: 3, lane: 'ready'},
        {title: "2", order: 2, lane: 'ready'},
        {title: "3", order: 1, lane: 'ready'},
        {title: "4", order: 3, lane: 'done'},
        {title: "5", order: 2, lane: 'done'},
        {title: "6", order: 1, lane: 'done'}
      ]);
    });
  
    it('should be ordered by laneName', function () {
      expect(this.cards.at(0).get('title')).toEqual("6");
      expect(this.cards.at(1).get('title')).toEqual("5");
      expect(this.cards.at(2).get('title')).toEqual("4");
      expect(this.cards.at(3).get('title')).toEqual("3");
      expect(this.cards.at(4).get('title')).toEqual("2");
      expect(this.cards.at(5).get('title')).toEqual("1");
    });
    
    it('should filter by lane and be in correct order', function () {
      var cards = this.cards.inLane('ready');
      expect(cards.length).toEqual(3);
      expect(cards[0].get('title')).toEqual("3");
      expect(cards[1].get('title')).toEqual("2");
      expect(cards[2].get('title')).toEqual("1");
      
      cards = this.cards.inLane('done');
      expect(cards.length).toEqual(3);
      expect(cards[0].get('title')).toEqual("6");
      expect(cards[1].get('title')).toEqual("5");
      expect(cards[2].get('title')).toEqual("4");
    });

    it('should update lane with new model order', function () {
      // simulate moving id 2 and 3 from lane 'ready' to 'done'
      var readyLane = this.cards.inLane('ready'),
        doneLane = this.cards.inLane('done');
      
      doneLane.push(readyLane.pop());
      doneLane.push(readyLane.pop());

      this.cards.updateLane({lane: 'done' , idArray: doneLane});
      this.cards.updateLane({lane: 'ready', idArray: readyLane});

      var cards = this.cards.inLane('ready');
      expect(cards.length).toEqual(1);
      expect(cards[0].get('title')).toEqual("3");
      
      cards = this.cards.inLane('done');
      expect(cards.length).toEqual(5);
      expect(cards[0].get('title')).toEqual("6");
      expect(cards[1].get('title')).toEqual("5");
      expect(cards[2].get('title')).toEqual("4");
      expect(cards[3].get('title')).toEqual("1");
      expect(cards[4].get('title')).toEqual("2");
    });
    
    it('should sort properly when order is more than single digits', function () {
      var lotsOfCards = new kanban.Cards([
        {title: "1", order: 11, lane: 'done'},
        {title: "2", order: 10, lane: 'done'},
        {title: "3", order: 9, lane: 'done'},
        {title: "4", order: 8, lane: 'done'},
        {title: "5", order: 7, lane: 'done'},
        {title: "6", order: 6, lane: 'done'},
        {title: "7", order: 5, lane: 'done'},
        {title: "8", order: 4, lane: 'done'},
        {title: "9", order: 3, lane: 'done'},
        {title: "10", order: 2, lane: 'done'},
        {title: "11", order: 1, lane: 'done'}
      ]);
      
      var cards = lotsOfCards.inLane('done');
      expect(cards.length).toEqual(11);
      expect(cards[0].get('title')).toEqual("11");
      expect(cards[1].get('title')).toEqual("10");
      expect(cards[2].get('title')).toEqual("9");
      expect(cards[3].get('title')).toEqual("8");
      expect(cards[4].get('title')).toEqual("7");
      expect(cards[5].get('title')).toEqual("6");
      expect(cards[6].get('title')).toEqual("5");
      expect(cards[7].get('title')).toEqual("4");
      expect(cards[8].get('title')).toEqual("3");
      expect(cards[9].get('title')).toEqual("2");
      expect(cards[10].get('title')).toEqual("1");
    });

    it('should not fire reset event during sort so that DOM remains unchanged while completing drag/drop between columns', function () {
      var resetEvent = jasmine.createSpy('Reset Event');
      this.cards.bind('reset', resetEvent);

      // simulate moving id 2 and 3 from lane 'ready' to 'done'
      var readyLane = this.cards.inLane('ready'),
        doneLane = this.cards.inLane('done');
      
      doneLane.push(readyLane.pop());
      doneLane.push(readyLane.pop());
      
      this.cards.updateLane({lane: 'done', idArray: doneLane});
      this.cards.updateLane({lane: 'ready', idArray: readyLane});

      expect(resetEvent).not.toHaveBeenCalled();
    });
    
    it('should add a new card to the top of the "ready" lane', function () {
      var cid = this.cards.addNew({lane: 'ready', title: 'NEW CARD'})
      var readyCards = this.cards.inLane('ready');
      expect(readyCards.length).toEqual(4);
      expect(readyCards[0].cid).toEqual(cid);
    });

  });
  
});