(function(){
    var modulo = angular.module('app');
    var PokemonFactory = function ($http){
        return{
           obtenerPokemones:function(baseUrl){
               return $http.get(baseUrl+'/pokemon/pokemons.json');
           }
        }
    };
    modulo.factory("PokemonFactory",PokemonFactory);
}());