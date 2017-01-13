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
                },
                "menu":{
                    templateUrl:"./templates/menu.html"
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