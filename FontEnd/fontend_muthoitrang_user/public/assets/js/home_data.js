app.controller("HomeCtrl", function ($scope, $http) {
    $(".OptionUser").hide();
    $scope.GetUuDai= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,Tendanhmucuudai:"FlagSale"},
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listUudai = response.data.data; 
        });
    };   
	$scope.GetUuDai();

    $scope.Getfavourite= function () {
        $http({
            method: 'GET',
            url: current_url + '/api-user/SanPham/sp-uathich',
        }).then(function (response) {  
            $scope.listUathich = response.data;     
            console.log($scope.listUathich);
        });
    };   
	$scope.Getfavourite();

    $scope.GetSerum= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,TenDanhMuc:"Serum"},
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listSerum = response.data.data; 
        });
    };   
	$scope.GetSerum();

    $scope.GetCleanser= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,TenDanhMuc:"Sữa rửa mặt"},
            url: current_url + '/api-user/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listCleanser = response.data.data; 
        });
    };   
	$scope.GetCleanser();

    $scope.GetAdsLeft= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,MoTa:"false"},
            url: current_url + '/api-user/QuangCao/search-quangcao',
        }).then(function (response) {  
            $scope.listADSLeft = response.data.data; 
        });
    };   
    $scope.GetAdsLeft();

    $scope.GetAdsRight= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,MoTa:"true"},
            url: current_url + '/api-user/QuangCao/search-quangcao',
        }).then(function (response) {  
            $scope.listADSRight = response.data.data; 
        });
    };   
    $scope.GetAdsRight();

    $http.get(current_url + '/api-user/SlideDetail/get-all-slide')
    .then(function(res){
        $scope.listImgSlider = res.data.map(function(value){
            return value.linkAnh
        })

        // var imgs = ["./assets/img/skincare+banner.jpg",
        // "./assets/img/skincare.png",
        // "./assets/img/rsz_1228873144.jpg",
        // "./assets/img/banner3.jpg",
        // "./assets/img/banner2.jpg",
        // "./assets/img/banner1.jpg"];
        var imgs=[]
        imgs = $scope.listImgSlider


        var prevBtn = document.querySelector('.prev')
        var nextBtn = document.querySelector('.next')
        var image = document.querySelector(".image img")


        var index = 0;

        nextBtn.addEventListener("click",function(e){
            image.style.opacity = '0'
            setTimeout(function(){
                index++;
                if(index >= imgs.length){
                    index = 0
                }
                document.getElementById('img').src=imgs[index];
                image.style.opacity = '1'

                // image.style.animation=''
                // image.style.animation='next .5s ease'
            },300)


        })

        prevBtn.addEventListener("click",function(e){
            image.style.opacity = '0'
            setTimeout(function(){
                index--;
                if(index<0){
                    index=imgs.length-1;
                }
                document.getElementById('img').src=imgs[index];
                image.style.opacity = '1'
                // image.style.animation=''
                // image.style.animation='next .5s ease'
            },300)


        })

        setInterval(function(){
            image.style.opacity = '0'
            setTimeout(function(){
                index++;
                if(index >= imgs.length){
                    index = 0
                }
                document.getElementById('img').src=imgs[index];
                image.style.opacity = '1'

                // image.style.animation=''
                // image.style.animation='next .5s ease'
            },300)  
        },3000)
    })
});
