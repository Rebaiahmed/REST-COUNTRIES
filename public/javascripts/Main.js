

angular.module('RestAPI',['720kb.socialshare','ngSocial','ui.router','angular-loading-bar','ngAnimate'])

    .config(function($stateProvider, $urlRouterProvider) {



        $stateProvider


            .state('countries', {
                url: '/',
                templateUrl: 'partials/index.html',
                controller :'RestCtrl',

            })

            .state('country', {
                url: '/country',
                templateUrl: 'countryDetails.html',
                controller :'CountryCtrl',
                params: {
                    'country':{}
                }
            })

        $urlRouterProvider.otherwise('/');

    })

    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    })














.service('RestService',['$http','$q','cfpLoadingBar', function($http,$q,cfpLoadingBar){

        /*
        method1 to get all countries
         */


        this.getAllCountries = function(){
         $http.get('https://restcountries.eu/rest/v1/all')


        }

        this.getCountriesByRegion = function(region){

            return $http.get('https://restcountries.eu/rest/v1/region/'+ region);

        }

        this.getCountriesBylanguage = function(language){
            return $http.get('https://restcountries.eu/rest/v1/lang/' + language);

        }

        this.getCountriesByName = function(name){
            var deffered = $q.defer();
            $http.get('https://restcountries.eu/rest/v1/name/' + name)
                .then(function(data){
var country ={};
                    country =data.data[0];

                    deffered.resolve(country);
                }).catch(function(err){

                    deffered.reject();
                })

            return  deffered.promise;

        }



    }])
   .controller('RestCtrl',['RestService','$http','$state','$scope','cfpLoadingBar','$timeout', function(RestService,$http,$state,$scope,cfpLoadingBar
    ,$timeout){












$scope.show = true;
        /*
        dataMaps
         */
        var basic_choropleth = new Datamap({
            element: document.getElementById("basic"),
            projection: 'mercator',
            fills: {
                defaultFill: "#ABDDA4",
                authorHasTraveledTo: "#fa0fa0"
            },
            data: {
                USA: { fillKey: "authorHasTraveledTo" },
                JPN: { fillKey: "authorHasTraveledTo" },
                ITA: { fillKey: "authorHasTraveledTo" },
                CRI: { fillKey: "authorHasTraveledTo" },
                KOR: { fillKey: "authorHasTraveledTo" },
                DEU: { fillKey: "authorHasTraveledTo" },
            },
            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    $scope.show = false;
                    $state.go('country',{country:geography});

                });
            }
        });

        var colors = d3.scale.category10();

        window.setInterval(function() {
            basic_choropleth.updateChoropleth({
                USA: colors(Math.random() * 10),
                RUS: colors(Math.random() * 100),
                AUS: { fillKey: 'authorHasTraveledTo' },
                BRA: colors(Math.random() * 50),
                CAN: colors(Math.random() * 50),
                ZAF: colors(Math.random() * 50),
                IND: colors(Math.random() * 50),
            });
        }, 2000);


        $scope.start = function() {
            cfpLoadingBar.start();
        };

        $scope.complete = function () {
            cfpLoadingBar.complete();
        }


        // fake the initial load so first time users can see it right away:
        $scope.start();
        $scope.fakeIntro = true;
        $timeout(function() {
            $scope.complete();
            $scope.fakeIntro = false;
        }, 750);


    }])




/*

 */

    .controller('CountryCtrl',['RestService','$http','$state','$scope','$stateParams','cfpLoadingBar','$timeout', function(RestService,$http,$state,$scope,$stateParams
    ,cfpLoadingBar,$timeout){


$scope.country ={};



        var name = $stateParams.country.properties.name

        var res = name.substring(0,2);
         $scope.name_flag = res.toLowerCase();

        function getCountriesByName(name){
            RestService.getCountriesByName(name)
                .then(function(data){

                   $scope.country=data;


                }).catch(function(err){
                    console.log('err' + JSON.stringify(err));

                })
        }


        getCountriesByName(name);


        $scope.start = function() {
            cfpLoadingBar.start();
        };

        $scope.complete = function () {
            cfpLoadingBar.complete();
        }


        // fake the initial load so first time users can see it right away:
        $scope.start();
        $scope.fakeIntro = true;
        $timeout(function() {
            $scope.complete();
            $scope.fakeIntro = false;
        }, 750);

    }])