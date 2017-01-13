(function(){

    var PokemonHeaderController = function($scope,$rootScope,$location,PokemonFactory){
        console.log("PokemonHeaderController",$location.path(),"dsjhfjdshfjhsd",$location.path());
        

        $scope.abrirMenu = function(){
            console.log("dfjkdjfkdjkf");
            PokemonFactory.abrirMenu(true);
        }
    }

    var modulo = angular.module("app");
    modulo.controller("PokemonHeaderController",PokemonHeaderController);

}());