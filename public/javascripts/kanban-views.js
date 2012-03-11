kanban.LaneView = Backbone.View.extend({
  template: _.template($('#card-template').html()),

  events: {
    sortupdate: "sortUpdate"
  },
  
  initialize: function (options) {
    _.bindAll(this, 'sortUpdate', 'render');
    this.lane = options.lane;
  },
  
  sortUpdate: function (event, ui) {
    // console.log(this.lane, "updated to", this.$el.sortable('toArray'));
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