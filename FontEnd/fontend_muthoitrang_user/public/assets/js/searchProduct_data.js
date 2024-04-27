app.controller ('searchProduct', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.start = $routeParams.start;
    $scope.end = $routeParams.end;
    $scope.price = $routeParams.price;
    $scope.name = $routeParams.name;
}]);

app.controller("searchProductCtrl", function ($scope, $http) {
    $scope.pageSize = 10
    var datas = {
        page:$scope.page,
        pageSize:$scope.pageSize,
        TenSanPham:$scope.name,
        GiaMin:$scope.start,
        GiaMax:$scope.end
    }

    document.title = $scope.name

    $scope.$on('$destroy', function() {
        inputSearch.value = '';
    });

    var inputSearch = document.querySelector('.searchTerm')
    inputSearch.value=$scope.name

    
    $('.optionNonProduct').hide()

    $scope.GetProduct= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            if(response.data.totalItems>0){
                $scope.pageIndex(response.data.totalItems)
                $('.nav_page ul').show()
                $('.showNonProduct').hide()
                $('.optionNonProduct').hide()
            }
            else{
                $('.nav_page ul').hide()
                $('.optionNonProduct').show()
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   

    $scope.GetProductUp= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-user/SanPham/search-sanpham-gia-tang',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            if(response.data.totalItems>0){
                $scope.pageIndex(response.data.totalItems)
                $('.nav_page ul').show()
                $('.showNonProduct').hide()
                $('.optionNonProduct').hide()
            }
            else{
                $('.nav_page ul').hide()
                $('.optionNonProduct').show()
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };  

    $scope.GetProductDown= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-user/SanPham/search-sanpham-gia-giam',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            if(response.data.totalItems>0){
                $scope.pageIndex(response.data.totalItems)
                $('.nav_page ul').show()
                $('.showNonProduct').hide()
                $('.optionNonProduct').hide()
            }
            else{
                $('.nav_page ul').hide()
                $('.optionNonProduct').show()
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };  

    $scope.GetProductSelling= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-user/SanPham/search-sanpham-ban-chay',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            if(response.data.totalItems>0){
                $scope.pageIndex(response.data.totalItems)
                $('.nav_page ul').show()
                $('.showNonProduct').hide()
                $('.optionNonProduct').hide()
            }
            else{
                $('.nav_page ul').hide()
                $('.optionNonProduct').show()
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };  

    $scope.GetProductViewMost= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-user/SanPham/search-sanpham-luot-xem-nhieu',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            if(response.data.totalItems>0){
                $scope.pageIndex(response.data.totalItems)
                $('.nav_page ul').show()
                $('.showNonProduct').hide()
                $('.optionNonProduct').hide()
            }
            else{
                $('.nav_page ul').hide()
                $('.optionNonProduct').show()
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };  
    
    if($scope.price==='up'){
        $scope.GetProductUp()
    }
    else if($scope.price==='down'){
        $scope.GetProductDown()
    }
    else if($scope.price==='selling'){
        $scope.GetProductSelling()
    }
    else if($scope.price==='view'){
        $scope.GetProductViewMost()
    }
    else{
        $scope.GetProduct()
    }

    $scope.pageIndex = function(total){
        $('#pagination').pagination({
            dataSource: function(done){
                var result = [];
                for(var i = 1; i <= total; i++){
                    result.push(i);
                }
                done(result);
            },
            pageSize: $scope.pageSize,
            pageNumber: $scope.page,
            showGoInput: true,
            showGoButton: true,
            className: 'paginationjs-theme-green paginationjs-big',
            afterGoButtonOnClick :function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name
                    }
                    if($scope.price&&$scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price
                    }
                    if($scope.start&&$scope.end&&$scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.start+'/'+$scope.end
                    }
                    if($scope.start&&$scope.end&&$scope.name&&$scope.price){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price+'/'+$scope.start+'/'+$scope.end
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name
                    }
                    if($scope.price&&$scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price
                    }
                    if($scope.start&&$scope.end&&$scope.name){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.start+'/'+$scope.end
                    }
                    if($scope.start&&$scope.end&&$scope.name&&$scope.price){
                        window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price+'/'+$scope.start+'/'+$scope.end
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name
                }
                if($scope.price&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price
                }
                if($scope.start&&$scope.end&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.start+'/'+$scope.end
                }
                if($scope.start&&$scope.end&&$scope.name&&$scope.price){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price+'/'+$scope.start+'/'+$scope.end
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name
                }
                if($scope.price&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price
                }
                if($scope.start&&$scope.end&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.start+'/'+$scope.end
                }
                if($scope.start&&$scope.end&&$scope.name&&$scope.price){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price+'/'+$scope.start+'/'+$scope.end
                }
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name
                }
                if($scope.price&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price
                }
                if($scope.start&&$scope.end&&$scope.name){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.start+'/'+$scope.end
                }
                if($scope.start&&$scope.end&&$scope.name&&$scope.price){
                    window.location='#!searchProduct/'+pageNumber+'/'+$scope.name+'/'+$scope.price+'/'+$scope.start+'/'+$scope.end
                }
            }
        })
    }
    
    $scope.changePage=function(i) {
        datas.page = i
    }
    
    if($scope.start){
        $scope.giamin=Number($scope.start).toLocaleString('de-DE')
    }
    if($scope.end){
        $scope.giamax=Number($scope.end).toLocaleString('de-DE')
    }

    $(document).ready(function() {
        $('.startPrice, .endPrice').on('input', function() {
            $(this).val(function(index, value) {
                return value.replace(/[^0-9]/g, '').replace(/^0+/, '');
            });
            if ($(this).val() !== '') {
                $(this).val(parseInt($(this).val()).toLocaleString('de-DE'));
            }
        });
    });

    $scope.searchNow = function(){
        var startPrice= $('.startPrice').val().replaceAll('.','')
        var endPrice = $('.endPrice').val().replaceAll('.','')
        if(startPrice===''&&endPrice===''){
            return
        }
        if(startPrice&&endPrice===''){
            if(startPrice&&$scope.name){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+0+'/'+startPrice
            }
            if(startPrice&&$scope.name&&$scope.price){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+$scope.price+'/'+0+'/'+startPrice
            }
            return
        }
        if(endPrice&&startPrice===''){
            if(endPrice&&$scope.name){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+0+'/'+endPrice
            }
            if(endPrice&&$scope.name&&$scope.price){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+$scope.price+'/'+0+'/'+endPrice
            }
            return
        }
        if(Number(startPrice)>=Number(endPrice)){
            if(endPrice&&startPrice&&$scope.name){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+0+'/'+startPrice
            }
            if(endPrice&&startPrice&&$scope.name&&$scope.price){
                window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+$scope.price+'/'+0+'/'+startPrice
            }
            return
        }
        if($scope.name){
            window.location='#!searchProduct/'+1+'/'+$scope.name
        }
        if($scope.price&&$scope.name){
            window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+$scope.price
        }
        if(startPrice&&endPrice&&$scope.name){
            window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+startPrice+'/'+endPrice
        }
        if(startPrice&&endPrice&&$scope.name&&$scope.price){
            window.location='#!searchProduct/'+1+'/'+$scope.name+'/'+$scope.price+'/'+startPrice+'/'+endPrice
        }
    }

    $scope.delOption = function(){
        window.location='#!searchProduct/'+1+'/'+$scope.name
    }
})
