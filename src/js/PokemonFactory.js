(function(){
    var modulo = angular.module('app');
    var PokemonFactory = function ($http){
       var factory = {
           obtenerPokemones:function(baseUrl){
               return $http.get(baseUrl+'pokemons.json');
           },
           establecerItems:function(items){
               factory.Filtros = items;
           },
           establecerFiltro:function(filtro){
               factory.filtro = filtro;
           }
        }
        return factory;
    };
    modulo.factory("PokemonFactory",PokemonFactory);
}());