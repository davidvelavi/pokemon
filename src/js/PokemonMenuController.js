(function(){

    var PokemonMenuController = function($scope, PokemonFactory){
        $scope.filtros = {};
        $scope.especieOculto = true;
        $scope.tipoOculto = true;
        $scope.especieFiltro;
        $scope.activarMenu = true;
        $scope.$watch(function(){return PokemonFactory.Filtros;}, function(newValue, oldValue){
             $scope.filtros = newValue;
        });
        $scope.seleccionFiltro= function(filtro){
            PokemonFactory.establecerFiltro(filtro);
        }
        $scope.ocultarItems= function(opcion){
            if(opcion == 'Especie'){
                $scope.especieOculto = false;
                $scope.tipoOculto = true;
            }else{
                $scope.especieOculto = true;
                $scope.tipoOculto = false;
            }
            
        }

    }


    var modulo = angular.module("app");
    modulo.controller("PokemonMenuController",PokemonMenuController);
}());