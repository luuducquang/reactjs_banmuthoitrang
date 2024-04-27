var app = angular.module("Home", ["ngRoute","ngSanitize"]);

app.filter('roundUp', function () {
    return function (input) {
        return Math.ceil(input);
    };
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })

    .when("/product/:id", {
        templateUrl : "product.html",
        controller: "product"
    })

    .when("/searchProduct/:page/:name", {
        templateUrl : "searchProduct.html",
        controller: "searchProduct"
    })

    .when("/searchProduct/:page/:name/:start/:end", {
        templateUrl : "searchProduct.html",
        controller: "searchProduct"
    })
    
    .when("/searchProduct/:page/:name/:price", {
        templateUrl : "searchProduct.html",
        controller: "searchProduct"
    })
    
    .when("/searchProduct/:page/:name/:price/:start/:end", {
        templateUrl : "searchProduct.html",
        controller: "searchProduct"
    })

    .when("/cart", {
        templateUrl : "cart.html"
    })
    
    .when("/order", {
        templateUrl : "order.html"
    })
    
    .when("/order2", {
        templateUrl : "order2.html"
    })

    .when("/category/:page/:tendanhmucsearch", {
        templateUrl : "category.html",
        controller:"category"
    })
    
    .when("/category/:page/:tendanhmucsearch/:start/:end", {
        templateUrl : "category.html",
        controller:"category"
    })

    .when("/category/:page/:tendanhmucsearch/:price", {
        templateUrl : "category.html",
        controller:"category"
    })

    .when("/category/:page/:tendanhmucsearch/:price/:start/:end", {
        templateUrl : "category.html",
        controller:"category"
    })

    .when("/invoice", {
        templateUrl : "invoice.html"
    })
    
    .when("/information", {
        templateUrl : "information.html"
    })

    .when("/changepassword", {
        templateUrl : "changepassword.html"
    })
    
    .when("/news/:page", {
        templateUrl : "news.html",
        controller:"news"
    })
    
    .when("/newsDetail/:id", {
        templateUrl : "newsDetail.html",
        controller:"newsDetail"
    })
});

app.controller("IndexCtrl", function ($scope, $http) {
    $scope.GetDanhMuc = function(){
        $http.get(current_url+'/api-user/DanhMuc/get-all-danhmuc')
        .then(function (response) {  
            $scope.ListDanhMuc = response.data; 
        });
    }
    $scope.GetDanhMuc();

    document.title='Trang chủ'

    $('.imgUser').hide()
    $scope.customer = customerLocalStorage
    if(customerLocalStorage){
        $('.imgUser').show()
        $('.Login').hide()
        $('.Registry').hide()
    }
    
    logoutUser = function(){
        localStorage.setItem("customer",null)
    }

    
    $scope.GetProductSearch= function (tensanpham) {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 1000,TenSanPham:tensanpham},
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.mockdata = response.data.data; 
            Updateproduct($scope.mockdata)
        });
    };   
    $scope.GetProductSearch()
    
    function Updateproduct(mockdata){
        var productDOM = document.querySelector(".content-search");
        while (productDOM.firstChild) {
            productDOM.removeChild(productDOM.firstChild);
        }
        var products = document.querySelector(".content-search")
            mockdata.forEach(item=>{
                var newProducts = document.createElement('div')
                newProducts.classList.add('products-search')
                newProducts.innerHTML ='<a href="#!/product/'+item.maSanPham+'"><img src="'+item.anhDaiDien+'" alt=""> <div class="info"> <div class="name-search">'+item.tenSanPham+'</div> <div class="price-search"> <span>'+item.giaGiam.toLocaleString('DE-de')+'</span><sup>đ</sup> </div> </div></a>'
                products.append(newProducts)
            })
            var searchInput = document.querySelector(".search input")
            searchInput.addEventListener("input",(e)=>{
                setTimeout(() => {
                    let txtSearch = e.target.value.trim().toLowerCase()
                
                    // $scope.GetProductSearch(txtSearch)
                    
                    var listProductDOM = document.querySelectorAll(".products-search")
                    listProductDOM.forEach(item=>{
                        if(item.innerText.toLowerCase().includes(txtSearch)){
                            item.classList.remove('hide')
                        }
                        else{
                            item.classList.add('hide')
                        }
                    })
                }, 1000);
            })

            var aElements = $('.content-search a');
            var $contentSearch = $(".content-search");
            aElements.each(function () {
                $(this).on('click', function () {
                    $contentSearch.css('display', 'none');
                    $scope.name=''
                });
            });
    }

    
    var $contentSearch = $(".content-search");
    $scope.searchProduct = function() {
        if(!$scope.name){
            // window.location.href="#!/"
            return
        }
        window.location.href="#!/searchProduct/1/" + $scope.name
    };

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        redirectToInvoice();
    });

    document.getElementById("searchButton").addEventListener("click", function() {
        redirectToInvoice();
    });

    function redirectToInvoice() {
        if(!$scope.name){
            return
        }
        window.location.href = "#!/searchProduct/1/"+$scope.name;
        $contentSearch.css('display', 'none');
    }
})

var customerLocalStorage = JSON.parse(localStorage.getItem("customer"))
var productListLocalStorage = JSON.parse(localStorage.getItem("productList"))

var currentDate = new Date();
var gmt7Time = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
var gmt7ISODate = gmt7Time.toISOString().slice(0, 16);



function ShopAmount(){
    var shopvalue = document.querySelector(".shopping .shop")
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    x = `<span class="value-cart">${listProduct.length}</span>` 
    shopvalue.innerHTML = x
    
}

ShopAmount()