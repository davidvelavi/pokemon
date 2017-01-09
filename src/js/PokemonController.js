(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, PokemonFactory,$http){
        var baseUrl = window.location.origin;
        $scope.ArrayPokemon = [];
        var pokemon = {}; 
      
        PokemonFactory.obtenerPokemones(baseUrl).then(function(resp){
        for(var i in resp.data){
                pokemon.name = resp.data[i].name;
                pokemon.img = './img/pokemons/'+resp.data[i].name.toLowerCase()+'.jpg';
                $scope.ArrayPokemon.push(pokemon);
                pokemon = {};  
            }
        })
    }



    modulo.controller("PokemonController",PokemonController);
}());
