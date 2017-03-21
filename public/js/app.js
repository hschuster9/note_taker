angular
  .module("notesApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("NoteFactory", [
    "$resource",
    NoteFactoryFunction
  ])
  .controller('NoteIndexController', [
    "NoteFactory",
    "$state",
    NoteIndexControllerFunction
  ])
  .controller('NoteShowController', [
    "NoteFactory",
    "$state",
    "$stateParams",
    NoteShowControllerFunction
  ])

  function RouterFunction($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/notes",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "NoteIndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/notes/:title",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "NoteShowController",
      controllerAs: "vm"
    })
  }

  function NoteFactoryFunction( $resource){
    return $resource("/api/notes/:title", {}, {
      update: {method: "PUT"}
    })
  }

  function NoteIndexControllerFunction( NoteFactory, $state){
    this.notes = NoteFactory.query()

  }

  function NoteShowControllerFunction( NoteFactory, $state, $stateParams){
    this.note = NoteFactory.get({ title: $stateParams.title})
  }
