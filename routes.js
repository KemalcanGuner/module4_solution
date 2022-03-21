(function() {
  'use strict';

  angular.module("MenuApp").config(RoutesCfg);

  RoutesCfg.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesCfg($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url:          "/",
        templateUrl:  "home.template.html"
      })
      .state("categories", {
        url:          "/categories",
        templateUrl:  "categories/categories.template.html",
        controller:   "CategoriesController as ctgrs",
        resolve: {
          categories: [ "MenuDataService", function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state("items", {
        url:          "/items/{categoryShortName}",
        templateUrl:  "items/itemlist.template.html",
        controller:   "ItemsController as itm",
        params:       { categoryShortName: null },
        resolve: {
          items: [ "$stateParams", "MenuDataService", function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }
})();
