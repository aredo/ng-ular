'use strict';

/* Controllers */

angular.module('inVoiceApp.controllers', []).
  controller('InvoiceController', ['$scope', function($scope) {

  $scope.logoRemoved = false;
  $scope.printMode = false;

  var sample_invoice = {
            tax: 10.00, 
            invoice_number: 10,
            customer_info: {
              name: "Mr. John Doe", 
              web_link: "John Doe Designs Inc.", 
              address1: "1 Infinite Loop", 
              address2: "Cupertino, California, US", 
              postal: "90210"
            },
            company_info: {
              name: "Tukangslicing Labs",
              web_link: "www.tukangslicing.com",
              address1: "Cikoko Barat I, Pancoran",
              address2: "Jakarta Selatan, Indonesia",
              postal: "12770"
            },
            items:[{
              qty: 3,
              description: 'Convert PSD to HTML/CSS3/JS',
              cost: 100.2
            }, {
              qty: 3,
              description: 'Designs Landing Page',
              cost: 70.7
            }]
          };

  if(localStorage["invoice"] == "" || localStorage["invoice"] == null){
    $scope.invoice = sample_invoice;
  }
  else{
    $scope.invoice =  JSON.parse(localStorage["invoice"]);
  }
    $scope.addItem = function() {
        $scope.invoice.items.push({qty:0, cost:0, description:""});    
    }
    $scope.removeLogo = function(element) {
        var elem = angular.element("#remove_logo");
        if(elem.text() == "Show Logo"){
          elem.text("Remove Logo");
          $scope.logoRemoved = false;
        }
        else{
          elem.text("Show Logo");
          $scope.logoRemoved = true;
        }

    }

    $scope.editLogo = function(){
      $("#imgInp").trigger("click");
    }

    $scope.showLogo = function() {
        $scope.logoRemoved = false;
    }
    $scope.removeItem = function(item) {
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);    
    }
    
    $scope.invoice_sub_total = function() {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function(item, key){
          total += (item.qty * item.cost);
        });
        return total;
    }
    $scope.calculate_tax = function() {
        return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_grand_total = function() {
        localStorage["invoice"] = JSON.stringify($scope.invoice);
        return $scope.calculate_tax() + $scope.invoice_sub_total();
    } 

    $scope.printInfo = function() {
      window.print();
    }

    $scope.clearLocalStorage = function(){
      var confirmClear = confirm("Are you sure you would like to clear the invoice?");
      if(confirmClear){
        localStorage["invoice"] = "";
        $scope.invoice = sample_invoice;
      }
    }

  }])