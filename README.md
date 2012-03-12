# Kanban Galore

Kanban helps you visualize your work, and limit the number of items that are in-progress.

This implementation is in JavaScript, using Backbone.js and jQuery UI.

## Screenshot

![Screenshot of Kanban Galore](https://github.com/briangershon/kanban-galore/raw/master/screenshot.png)

## Current features

* Drag and Drop UI for ordering cards in lanes and moving cards between lanes.

* Client-side Backbone.js models, collections and views. Unit tested.

* Add new cards.

## Roadmap of Upcoming Features

* See [Issue Tracker](https://github.com/briangershon/kanban-galore/issues).

## To try it

    # clone repository locally
    # open index.html in browser

## Are all tests running ok? (on Travis CI)

[![Build Status](https://secure.travis-ci.org/briangershon/kanban-galore.png?branch=master)](http://travis-ci.org/briangershon/kanban-galore)

## How to run tests locally

    # Setup Jasmine dependencies. From root of repo:
    bundle install
    
    # Run tests
    rake jasmine
    # open browser to http://localhost:8888
    
    # Or for CI
    rake    # which by default runs 'jasmine:ci' task
