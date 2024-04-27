app.controller ('newsDetail', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.id = $routeParams.id;
}]);

app.controller("newsDetailCtrl", function ($scope, $http) {
    $scope.GetListDetailNew = function(){
        $http.get(current_url+'/api-admin/TinTuc/getbyid-tintuc/'+$scope.id)
        .then(function (response) {  
            $scope.listNewDetail = response.data
            document.title= $scope.listNewDetail.tieuDe
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    }
    $scope.GetListDetailNew()
})