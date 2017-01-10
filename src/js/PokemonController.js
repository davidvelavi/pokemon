(function(){
    var modulo = angular.module("app");

    var PokemonController = function($scope, PokemonFactory,$http,$location){
        var baseUrl = $location.absUrl().split('#')[0];
        $scope.ArrayPokemon = [];
        var especies = [];
        var tipos = [];
        var pokemon = {};
        $scope.filtros = {}; 
        $scope.especieFiltro;
        $scope.activarMenu = true;

        $scope.seleccionFiltro= function(filtro){
            console.log(filtro)
            $scope.especieFiltro = filtro;
        }
      console.log(baseUrl)
        PokemonFactory.obtenerPokemones(baseUrl).then(function(resp){

        for(var i in resp.data){
            pokemon.name = resp.data[i].name;
            pokemon.img = './img/pokemons/'+resp.data[i].name.toLowerCase()+'.jpg';
            pokemon.especie = resp.data[i].species;
            pokemon.tipos = resp.data[i].type;

            var buscarEspecie = resp.data[i].species;
            if(especies.indexOf(buscarEspecie)<0){
                especies.push(buscarEspecie)
            }
            for(var j in resp.data[i].type){
                var buscarTipo = resp.data[i].type[j];
                if(tipos.indexOf(buscarTipo)<0){
                    tipos.push(buscarTipo)
                }
            }
            $scope.ArrayPokemon.push(pokemon);
            pokemon = {};  
        }
        $scope.filtros['especies'] = especies;
        $scope.filtros['tipos'] = tipos;
        console.log("Filtros",$scope.filtros);

        })
       
    }



    modulo.controller("PokemonController",PokemonController);
}());
