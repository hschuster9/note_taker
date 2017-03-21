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

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
  }
