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
    modelArray = this.models.filter(function (item) {
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
    // 'silent: true' is critical so state of DOM doesn't change while sortupdate tries to run
    //  otherwise drag updates are lost when DOM updates.
    this.sort({silent: true});  
  }
});