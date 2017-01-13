(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, PokemonFactory,$http,$location,$rootScope){
        var baseUrl = $location.absUrl().split('#')[0];
        $rootScope.enlace = $location.path();
        $scope.ArrayPokemon = [];
        var especies = [];
        var tipos = [];
        var pokemon = {};
        var filtros = {}; 
        $scope.especieFiltro = "";
        PokemonFactory.obtenerPokemones(baseUrl).then(function(resp){
            for(var i in resp.data){
                pokemon.name = resp.data[i].name;
                pokemon.img = './img/pokemons/'+resp.data[i].name.toLowerCase()+'.jpg';
                pokemon.especie = resp.data[i].species;
                pokemon.tipos = resp.data[i].type;

                // Filtrado de Especies
                var buscarEspecie = resp.data[i].species;
                if(especies.indexOf(buscarEspecie)<0){
                    especies.push(buscarEspecie)
                }

                //Filtrado de Tipos
                for(var j in resp.data[i].type){
                    var buscarTipo = resp.data[i].type[j];
                    if(tipos.indexOf(buscarTipo)<0){
                        tipos.push(buscarTipo)
                    }
                }
                $scope.ArrayPokemon.push(pokemon);
                pokemon = {};  
            }
            filtros['especies'] = especies;
            filtros['tipos'] = tipos;
        PokemonFactory.establecerItems(filtros);

        })
        $scope.$watch(function(){return PokemonFactory.filtro; },function(newValue, oldValue)  {
            $scope.especieFiltro = newValue;
         });
          
       
    }



    modulo.controller("PokemonController",PokemonController);
}());
