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
  .controller('NoteNewController', [
    "NoteFactory",
    "$state",
    NoteNewControllerFunction
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
    .state("new", {
      url: "/notes/new",
      templateUrl: "/assets/js/ng-views/new.html",
      controller: "NoteNewController",
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

  function NoteIndexControllerFunction(NoteFactory, $state){
    this.notes = NoteFactory.query()
  }

  function NoteNewControllerFunction( NoteFactory, $state){
    this.note = new NoteFactory()
    this.create = function(){
      this.note.$save(function(note){
        $state.go("show", {title: note.title})
    })
}
}
  function NoteShowControllerFunction( NoteFactory, $state, $stateParams){
    this.note = NoteFactory.get({ title: $stateParams.title})
    this.update = function(){
      this.note.$update({ title: $stateParams.title}).then(function(){
        $state.go("index")
      })
    }
  }
