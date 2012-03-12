var cards = new kanban.Cards();

$(document).ready(function () {
  var ready = new kanban.LaneView({el: '#ready', collection: cards, lane: 'ready'});
  var doing = new kanban.LaneView({el: '#doing', collection: cards, lane: 'doing'});
  var done = new kanban.LaneView({el: '#done', collection: cards, lane: 'done'});
  var addcardview = new kanban.AddCardView({el: "#addcard", collection: cards, lane: 'ready'});
  
  // sample data
  cards.reset([
    {order: 1, lane: 'ready', title: 'one'},
    {order: 2, lane: 'ready', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {order: 3, lane: 'ready', title: 'three'},
    {order: 1, lane: 'done', title: 'done a'},
    {order: 2, lane: 'done', title: 'done b'},
    {order: 3, lane: 'done', title: 'done c'},
    {order: 1, lane: 'doing', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {order: 2, lane: 'doing', title: 'Doing this'},
    {order: 3, lane: 'doing', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  ]);
  
  cards.add({order: 4, lane: 'doing', title: 'TEN TEN'});
  
});