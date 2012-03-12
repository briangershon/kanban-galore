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
      
    _.each(idArray, function (cid) {
      var item = collection.getByCid(cid);
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
      currentModels = _.map(collection.inLane(lane), function (model) {
        return model.cid;
      }),
      newModel = new kanban.Card({lane: lane, title: title}),
      newCID = newModel.cid;
    
    collection.add(newModel, {silent: true});
    
    currentModels.reverse();
    currentModels.push(newCID);
    currentModels.reverse();
    this.updateLane({lane: lane, idArray: currentModels});
    collection.trigger('reset');
    return newCID;
  }
  
});