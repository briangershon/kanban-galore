describe('Kanban Core', function () {
  
  describe('kanban.Card', function () {
    beforeEach(function () {
      this.card = new kanban.Card({id: 1, order: 1, lane: 'ready', title: 'Card one'});
    });

    it('should have a lane field', function () {
      expect(this.card.get('id')).toEqual(1);
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
        {id: 1, order: 3, lane: 'ready'},
        {id: 2, order: 2, lane: 'ready'},
        {id: 3, order: 1, lane: 'ready'},
        {id: 4, order: 3, lane: 'done'},
        {id: 5, order: 2, lane: 'done'},
        {id: 6, order: 1, lane: 'done'}
      ]);
    });
  
    it('should be ordered by laneName', function () {
      expect(this.cards.at(0).get('id')).toEqual(6);
      expect(this.cards.at(1).get('id')).toEqual(5);
      expect(this.cards.at(2).get('id')).toEqual(4);
      expect(this.cards.at(3).get('id')).toEqual(3);
      expect(this.cards.at(4).get('id')).toEqual(2);
      expect(this.cards.at(5).get('id')).toEqual(1);
    });
    
    it('should filter by lane and be in correct order', function () {
      var cards = this.cards.inLane('ready');
      expect(cards.length).toEqual(3);
      expect(cards[0].get('id')).toEqual(3);
      expect(cards[1].get('id')).toEqual(2);
      expect(cards[2].get('id')).toEqual(1);
      
      cards = this.cards.inLane('done');
      expect(cards.length).toEqual(3);
      expect(cards[0].get('id')).toEqual(6);
      expect(cards[1].get('id')).toEqual(5);
      expect(cards[2].get('id')).toEqual(4);
    });

    it('should update lane with new models reorder', function () {
      // simulate moving id 2 and 3 from lane 'ready' to 'done'
      this.cards.updateLane('done', [2,3,4,5,6]);
      this.cards.updateLane('ready', [1]);

      var cards = this.cards.inLane('ready');
      expect(cards.length).toEqual(1);
      expect(cards[0].get('id')).toEqual(1);
      
      cards = this.cards.inLane('done');
      expect(cards.length).toEqual(5);
      expect(cards[0].get('id')).toEqual(2);
      expect(cards[1].get('id')).toEqual(3);
      expect(cards[2].get('id')).toEqual(4);
      expect(cards[3].get('id')).toEqual(5);
      expect(cards[4].get('id')).toEqual(6);
    });

  });
  
});