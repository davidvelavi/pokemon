(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, $http){
        $scope.Mensaje = "Pokemon";
       

        $http.get("http://pokeapi.co/api/v2/pokemon/1").then(function(resp){
            console.log(resp.data.name)
             $scope.Name = resp.data.name;
        });
    
    }



    modulo.controller("PokemonController",PokemonController);
}());