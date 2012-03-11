var cards = new kanban.Cards();

$(document).ready(function () {
  var ready = new kanban.LaneView({el: '#ready', collection: cards, lane: 'ready'});
  var doing = new kanban.LaneView({el: '#doing', collection: cards, lane: 'doing'});
  var done = new kanban.LaneView({el: '#done', collection: cards, lane: 'done'});
  
  // sample data
  cards.reset([
    {id: 1, order: 1, lane: 'ready', title: 'one'},
    {id: 2, order: 2, lane: 'ready', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: 3, order: 3, lane: 'ready', title: 'three'},
    {id: 4, order: 1, lane: 'done', title: 'done a'},
    {id: 5, order: 2, lane: 'done', title: 'done b'},
    {id: 6, order: 3, lane: 'done', title: 'done c'},
    {id: 7, order: 1, lane: 'doing', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: 8, order: 2, lane: 'doing', title: 'Doing this'},
    {id: 9, order: 3, lane: 'doing', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  ]);
  
  cards.add({id: 10, order: 4, lane: 'doing', title: 'TEN TEN'});
  
});