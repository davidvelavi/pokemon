(function(){

var PokemonDetalleController = function($scope,$http,$rootScope,$location,detalle){
        $scope.detallePokemon = {};
        $rootScope.enlace = $location.path();
        var evolucion = [];
        $scope.detallePokemon.nombre = detalle[0].name;
        $scope.detallePokemon.img = './img/pokemons/'+detalle[0].name.toLowerCase()+'.jpg';
        $scope.detallePokemon.especie = detalle[0].species;
        $scope.detallePokemon.tipo = detalle[0].type;
        $scope.detallePokemon.altura = detalle[0].height;
        $scope.detallePokemon.peso = detalle[0].weight;
        evolucion = detalle[0].evolution.filter(function(current){
            return current != detalle[0].name;
        });
        $scope.detallePokemon.evolucion = [];
        for(var i in evolucion){
            var evolucionDetalle = {};
            evolucionDetalle.img = './img/pokemons/'+evolucion[i].toLowerCase()+'.jpg';
            evolucionDetalle.nombre = evolucion[i];
            $scope.detallePokemon.evolucion.push(evolucionDetalle);
        }
    }



    var modulo = angular.module('app');
    modulo.controller('PokemonDetalleController',PokemonDetalleController);
}());