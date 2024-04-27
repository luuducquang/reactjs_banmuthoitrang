var app = angular.module("Registry", []);

app.controller("RegistryCtrl", function ($scope, $http) {
    $scope.createNow = function(){
        var name = document.querySelector(".name").value
        var warning_name = document.querySelector(".warning-name")
        var check_name = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u

        var phoneNumber = document.querySelector(".tel").value;
        var warning_phoneNumber = document.querySelector(".warning-tel");
        var check_phoneNumber = /^[0-9]{10,}$/;

        var email = document.querySelector(".email").value
        var warning_email = document.querySelector(".warning-email")
        var check_email = /^[a-z]+[a-zA-Z0-9_]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/

        var User = document.querySelector(".user").value
        var warning_User = document.querySelector(".warning-user")
        var check_User = /^[a-zA-Z]+[a-zA-Z0-9]+$/

        var inputPass = document.querySelector(".input-pass").value
        var inputRePass = document.querySelector(".input-repass").value
        var warningPass = document.querySelector(".warning-pass")
        var warningRePass = document.querySelector(".warning-repass")
        var check = /^[a-zA-Z0-9]+[a-zA-Z0-9@_]+$/


        if(check_name.test(name)===false || name ===""){
            warning_name.style.display = "block"
            return
        }
        else if (check_phoneNumber.test(phoneNumber) === false || phoneNumber === "") {
            warning_phoneNumber.style.display = "block";
            return
        }
        else if(check_email.test(email)===false || email ===""){
            warning_email.style.display = "block"
            return
        }
        else if(User=="" || check_User.test(User)===false){
            warning_User.style.display= 'block'
            return
        }
        else if(inputPass=="" || check.test(inputPass)===false){
            warningPass.style.display= 'block'
            return
        }
        else if(inputRePass=="" || check.test(inputRePass)===false){
            warningRePass.style.display= 'block'
            return
        }
        else if(inputRePass!=inputPass){
            warningRePass.style.display= 'block'
            return
        }
        else if(document.getElementById('checkrule').checked===false){
            alert('Vui lòng đọc điều khoản!')
            return
        }
        else{
            $http.get(current_url + '/api-user/TaiKhoan/get-alltaikhoan')
            .then(function (response) {  
                $scope.user = response.data.map(function(value){
                    return value.tenTaiKhoan
                })
                if($scope.user.includes($scope.taikhoan)===false){
                    $http({
                        method: 'POST',
                        data: {
                            TenTaiKhoan: $scope.taikhoan,
                            MatKhau: $scope.matkhau2,
                            Email: $scope.email,
                            list_json_chitiet_taikhoan:[{
                                MaLoaitaikhoan: 2,
                                AnhDaiDien: "../../../img/user.jpg",
                                HoTen:$scope.hoten,
                                DiaChi:'',
                                SoDienThoai:$scope.sodienthoai
                            }]
                        },
                        url: current_url + '/api-user/TaiKhoan/create-taikhoan',
                    }).then(function (response) {  
                        alert('Tạo tài khoản thành công')
                        window.location.href='../user/login.html'
                    }).catch(function (error) {
                        console.error('Lỗi khi tạo:', error);
                    });
                }
                else{
                    alert('Tên đăng nhập đã tồn tại')
                }
            }).catch(function (error) {
                console.error('Lỗi khi tạo:', error);
            });
        }

    }
})