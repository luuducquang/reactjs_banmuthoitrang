app.controller ('news', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tieudesearch = $routeParams.tieudesearch;
}]);

app.controller("NewsCtrl", function ($scope, $http) {
    $scope.pageSize=10

    document.title = 'Tin tức'
    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        TieuDe:$scope.tieudesearch
    }
    $scope.GetListNews= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
            data: datas,
            url: current_url + '/api-admin/TinTuc/search-tintuc',
        }).then(function (response) {  
            $scope.listNew = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetListNews();

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
                    if($scope.tieudesearch){
                        window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                    }
                    else{
                        window.location='#!news/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.tieudesearch){
                        window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                    }
                    else{
                        window.location='#!news/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
            }
        })
    }

    $scope.showDetailNews = function(x){
        window.location = '#!/newsDetail/'+x.maTinTuc
    }
})