kanban.LaneView = Backbone.View.extend({
  template: _.template($('#card-template').html()),
  
  initialize: function (options) {
    _.bindAll(this, 'render');
    this.lane = options.lane;
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