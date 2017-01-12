(function(){

var PokemonDetalleController = function($scope,$http,detalle){
        $scope.detallePokemon = {};
        $scope.detallePokemon.nombre = detalle[0].name;
        $scope.detallePokemon.img = './img/pokemons/'+detalle[0].name.toLowerCase()+'.jpg';
        $scope.detallePokemon.especie = detalle[0].species;
        $scope.detallePokemon.tipo = detalle[0].type;
        $scope.detallePokemon.altura = detalle[0].height;
        $scope.detallePokemon.peso = detalle[0].weight;
        $scope.detallePokemon.evolucion = detalle[0].evolution.filter(function(current){
            return current != detalle[0].name;
        });

    }



    var modulo = angular.module('app');
    modulo.controller('PokemonDetalleController',PokemonDetalleController);
}());