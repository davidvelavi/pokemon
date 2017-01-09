(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, PokemonFactory,$http,$location){
        var baseUrl = $location.absUrl();
        $scope.ArrayPokemon = [];
        $scope.pokemon = {};
        
    
    $http.get(baseUrl+'pokemons.json').then(function(resp){
        console.log(resp.data[0])
       
        $scope.pokemon.name = resp.data[0].name;
        $scope.pokemon.img = './img/pokemons/'+resp.data[0].name.toLowerCase()+'.jpg';

        console.log($scope.pokemon)
    })
    }



    modulo.controller("PokemonController",PokemonController);
}());
