kanban.Card = Backbone.Model.extend({
  lane: '',
  order: 1,
  title: ''
});

kanban.Cards = Backbone.Collection.extend({
  model: kanban.Card,
  comparator: function (card) {
    return card.get('lane') + card.get("order");
  },

  inLane: function (lane) {
    modelArray =_.filter(this.models, function (item) {
      if (item.get('lane') === lane) {
        return true;
      }
      return false;
    });
    return modelArray;
  },
  
  updateLane: function (lane, idArray) {
    var order = 1,
      collection = this;
    _.each(idArray, function (id) {
      var item = collection.get(id);
      item.set({lane: lane, order: order});
      order++;
    });
    this.sort();
  }
});