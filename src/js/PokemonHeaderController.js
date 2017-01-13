(function(){

    var PokemonHeaderController = function($scope,$state,PokemonFactory){
        $scope.abrirMenu = function(){
            console.log("dfjkdjfkdjkf");
            PokemonFactory.abrirMenu(true);
        }
        $scope.return= function(){
            $state.go("inicio");
        }
    }

    var modulo = angular.module("app");
    modulo.controller("PokemonHeaderController",PokemonHeaderController);

}());