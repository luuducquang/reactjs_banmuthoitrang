app.controller("CartCtrl", function ($scope, $http) {
    $scope.GetProductRelate= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10},
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listRelate = response.data.data; 
        });
    };   
	$scope.GetProductRelate();
    
    document.title = 'Giỏ hàng'
})