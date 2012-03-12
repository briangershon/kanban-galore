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
      idArray = params.idArray;
      
    _.each(idArray, function (id) {
      var item = collection.get(id);
      item.set({lane: lane, order: order});
      order++;
    });
    // 'silent: true' is critical so state of DOM doesn't change while sortupdate tries to run
    //  otherwise drag updates are lost when DOM updates.
    this.sort({silent: true});  
  },

  updateLaneWithDOMIds: function (params) {
    var lane = params.lane,
      prefix = params.prefix,
      idArray = params.idArray,
      newArray = _.map(idArray, function (idWithPrefix) {
        return idWithPrefix.slice(prefix.length);
      });
    this.updateLane({lane: lane, idArray: newArray});
  },
  
  addNew: function (params) {
    var collection = this,
      lane = params.lane,
      title = params.title,
      id_prefix = params.id_prefix,
      min = 1,
      max = 10000,
      newId = Math.random() * (max - min) + min,  // TODO: temporary
      currentModels = _.map(collection.inLane(lane), function (model) {
        return model.id;
      });

    currentModels.reverse();
    currentModels.push(newId);
    currentModels.reverse();
    collection.add({id: newId, lane: lane, title: title}, {silent: true});
    this.updateLane({lane: lane, idArray: currentModels});
    collection.trigger('reset');
    return newId;
  }
  
});