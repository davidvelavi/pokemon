(function(){

    var routes = function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/inicio");
        $stateProvider.state("inicio",{
            url:"/inicio",
            templateUrl:"./templates/general.html"

        });
    } 
    var modulo = angular.module('app');
    modulo.config(routes); 

}());