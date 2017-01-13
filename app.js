modulo = angular.module("app",['ui.router']);
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

(function(){

var PokemonDetalleController = function($scope,$http,$rootScope,$location,detalle){
        $scope.detallePokemon = {};
        $rootScope.enlace = $location.path();
        var evolucion = [];
        $scope.detallePokemon.nombre = detalle[0].name;
        $scope.detallePokemon.img = './img/pokemons/'+detalle[0].name.toLowerCase()+'.jpg';
        $scope.detallePokemon.especie = detalle[0].species;
        $scope.detallePokemon.tipo = detalle[0].type;
        $scope.detallePokemon.altura = detalle[0].height;
        $scope.detallePokemon.peso = detalle[0].weight;
        evolucion = detalle[0].evolution.filter(function(current){
            return current != detalle[0].name;
        });
        $scope.detallePokemon.evolucion = [];
        for(var i in evolucion){
            var evolucionDetalle = {};
            evolucionDetalle.img = './img/pokemons/'+evolucion[i].toLowerCase()+'.jpg';
            evolucionDetalle.nombre = evolucion[i];
            $scope.detallePokemon.evolucion.push(evolucionDetalle);
        }
    }



    var modulo = angular.module('app');
    modulo.controller('PokemonDetalleController',PokemonDetalleController);
}());
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
           },
           abrirMenu:function(menu){
               console.log("menu",menu)
               factory.menu = menu;
           }
        }
        return factory;
    };
    modulo.factory("PokemonFactory",PokemonFactory);
}());
(function(){

    var PokemonHeaderController = function($scope,$state,PokemonFactory){
        $scope.abrirMenu = function(){
            console.log("dfjkdjfkdjkf");
            PokemonFactory.abrirMenu(true);
        }
        $scope.return= function(){
            $state.go("inicio");
        }
    }

    var modulo = angular.module("app");
    modulo.controller("PokemonHeaderController",PokemonHeaderController);

}());
(function(){

    var PokemonMenuController = function($scope, PokemonFactory){
        $scope.filtros = {};
        $scope.especieOculto = true;
        $scope.tipoOculto = true;
        $scope.especieFiltro;
        $scope.activarMenu = false;

        $scope.$watch(function(){return PokemonFactory.menu},function(newValue,oldValue){
            $scope.activarMenu = newValue;
        });
        $scope.cerrarMenu= function(){
            console.log("CERRRAR")
            $scope.activarMenu = false;
            PokemonFactory.abrirMenu(false);
        }


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
(function(){

    var routes = function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/inicio");
        $stateProvider.state("inicio",{
            url:"/inicio",
            views:{
                "cuerpo":{
                    templateUrl:"./templates/general.html"
                },
                "menu":{
                    templateUrl:"./templates/menu.html"
                }
            }  
        })
        .state("detalle",{
            url:"/detalle/:pokemon",
            views:{
                "cuerpo":{
                    templateUrl:"./templates/detalles.html",
                    controller:"PokemonDetalleController"
                }
            },
            resolve:{
                detalle:function(PokemonFactory,$location,$http,$stateParams){
                    var baseUrl = $location.absUrl().split('#')[0];
                    return PokemonFactory.obtenerPokemones(baseUrl).then(function(resp){
                        buscar = $stateParams.pokemon;
                        return resp.data.filter(function(currentValue,index){
                            return currentValue.name == buscar;
                        });
                    })
                }
            }  
        });
    } 
    var modulo = angular.module('app');   
    modulo.config(routes); 

}());