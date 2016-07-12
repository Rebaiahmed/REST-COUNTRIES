

angular.module('RestAPI',['720kb.socialshare','ngSocial','ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {



        $stateProvider



            .state('country', {
                url: '/country',
                templateUrl: 'countryDetails.html',
                controller :'CountryCtrl',
                params: {
                    'country':{}
                }
            })

    })














.service('RestService',['$http','$q', function($http,$q){

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
            return $http.get('https://restcountries.eu/rest/v1/name/' + name);

        }



    }])
   .controller('RestCtrl',['RestService','$http','$state','$scope', function(RestService,$http,$state,$scope){


        function getAllCountries(){



        }



        $http.get('https://restcountries.eu/rest/v1/all').then(function(data){

        }).catch(function(err){
            console.log('err' + err);
        })


        getAllCountries()

        /*

         */
        function getCountriesByRegion(region){
            RestService.getCountriesByRegion(region)
                .then(function(data){

                }).catch(function(err){

                })
        }



        function getCountriesBylanguage(language){
            RestService.getCountriesBylanguage(language)
                .then(function(data){

                }).catch(function(err){

                })
        }



        function getCountriesByName(name){
            RestService.getCountriesByName(name)
                .then(function(data){

                }).catch(function(err){

                })
        }










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
                    alert(geography.properties.name);


                    console.log('georgrapgy' + geography);
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



    }])




/*

 */

    .controller('CountryCtrl',['RestService','$http','$state','$scope','$stateParams', function(RestService,$http,$state,$scope,$stateParams){


$scope.country ={};



        var name = $stateParams.country.properties.name

        var res = name.substring(0,2);
         $scope.name_flag = res.toLowerCase();



        console.log($scope.name_flag );

        function getCountriesByName(name){
            RestService.getCountriesByName(name)
                .then(function(data){

                    $scope.country=data.data;
                }).catch(function(err){
                    console.log('err' + JSON.stringify(err));

                })
        }


        getCountriesByName(name);



    }])