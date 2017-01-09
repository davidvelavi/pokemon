(function(){
    var modulo = angular.module('app');
    var PokemonFactory = function ($http,$q){
        return{
            obtenerListPokemon:function(){
               return  $http.get("http://pokeapi.co/api/v2/evolution-chain/?limit=5")
            },
            obtenerPokemon:function(array){
                return $q.all(array);
            }
        }
    };
    modulo.factory("PokemonFactory",PokemonFactory);
}());