(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, PokemonFactory,$http){
        $scope.Mensaje = "Pokemon";
        var arrayPokemon = [];
        var arrayIdPokemon = [];
        $scope.pokemon = {};

        PokemonFactory.obtenerListPokemon().then(function(resp){
            var firstSearch = resp.data.results;
            for(var i in firstSearch){
               arrayPokemon.push($http.get(firstSearch[i].url));
            }
            PokemonFactory.obtenerPokemon(arrayPokemon).then(function(resp){
                for(var i in resp){
                   var url = "http://pokeapi.co/api/v2/pokemon/"+resp[i].data.id;
                   arrayIdPokemon.push($http.get(url));
                }
                PokemonFactory.obtenerPokemon(arrayIdPokemon).then(function(resp){
                    console.log("cada pokemon", resp[0].data)
                    $scope.pokemon.img = resp[0].data.sprites.front_default;
                });

                
            });

        })
    
    }



    modulo.controller("PokemonController",PokemonController);
}());
