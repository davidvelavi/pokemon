(function(){

    var routes = function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/pokemon");
        $stateProvider.state("pokemon",{
            url:"/pokemon",
            templateUrl:"./templates/general.html"

        });
    } 
    var modulo = angular.module('app');
    modulo.config(routes); 

}());