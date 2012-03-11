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
  
  updateLane: function (params) {
    var order = 1,
      collection = this,
      lane = params.lane,
      prefix = params.prefix,
      idArray = params.idArray;
      
    _.each(idArray, function (id) {
      var idWithoutPrefix = id.slice(prefix.length);
      var item = collection.get(idWithoutPrefix);
      item.set({lane: lane, order: order});
      order++;
    });
    this.sort();
  }
});