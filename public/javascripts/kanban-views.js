kanban.LaneView = Backbone.View.extend({
  template: _.template($('#card-template').html()),

  events: {
    sortupdate: "sortUpdate"
  },
  
  initialize: function (options) {
    _.bindAll(this, 'sortUpdate', 'render');
    this.lane = options.lane;
    this.collection.bind('add reset', this.render, this);
  },
  
  sortUpdate: function (event, ui) {
    this.collection.updateLane({lane: this.lane, prefix: 'card-', idArray: this.$el.sortable('toArray')});
  },
  
  render: function () {
    var el = this.$el,
      template = this.template;
      
    el.empty();
    _.each(this.collection.inLane(this.lane), function (model) {
      el.append(template(model.toJSON()));
    });
  }
});