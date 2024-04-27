app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.id = $routeParams.id;
}]);

app.controller("ProductCtrl", function ($scope, $http) {
    $scope.ProductByid
    $scope.listImgDetail

    $http.get(current_url+'/api-user/SanPham/getbyid-sanpham/'+$scope.id)
    .then(function (response) {  
        $scope.ProductByid = response.data; 

        document.title = $scope.ProductByid.tenSanPham

        $http({
            method: 'GET',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-user/SanPham/getbyid-anhsanphamdetail/' + response.data.maSanPham,
        }).then(function(response){
            $scope.listImgDetail = response.data
            

            // var menuInf = document.querySelector(".menu-inf")
            // window.addEventListener("scroll",function(){
            //     var x = window.pageYOffset
            //     if(x>550){
            //         menuInf.classList.add("menu-inf-fix")
            //     }
            //     else{
            //         menuInf.classList.remove("menu-inf-fix")
            //     }
            // })



            var menuclick = document.querySelectorAll(".menu-inf li")
            menuclick.forEach(function(menuItem){
                menuItem.addEventListener("click",function(){
                    document.documentElement.scrollTop=menuItem.dataset.scroll
                })

            })

            var goToTop = document.querySelector(".go-to-top")
            var colorMenu = document.querySelectorAll(".color-menu")

            window.addEventListener("scroll",function(){
                var x = window.pageYOffset
                for (let i = 0; i < colorMenu.length; i++) {
                    if(x>520  & x<1186){
                        colorMenu[0].classList.add('color-scroll')
                    }
                    if(x>1186 & x<1484){
                        colorMenu[1].classList.add('color-scroll')
                
                    }
                    if(x>1484 & x<1900){
                        colorMenu[2].classList.add('color-scroll')
                    }
                    if(x>1900 & x<2020){
                        colorMenu[3].classList.add('color-scroll')
                    }
                    if(x>2050){
                        colorMenu[4].classList.add('color-scroll')
                    }
                    else{
                        colorMenu[i].classList.remove('color-scroll')
                    }
                    
                }
            })



            var buy = document.querySelector(".buy-now")
            buy.addEventListener("click",function(){
                if(!customerLocalStorage){
                    window.location.href = './login.html'
                    return
                }
                else{
                    window.location = '#!/order2'
                }
            })


            function updateAmount(amount){
                    amount.value = valueAmount
                }

                
            var plus = document.querySelector(".plus")
            var minus = document.querySelector(".minus")
            var amount = document.querySelector(".amount")
            var valueAmount = amount.value
            plus.addEventListener("click",function(){
                valueAmount++
                updateAmount(amount)
            })

            minus.addEventListener("click",function(){
                    if(valueAmount>1){
                            valueAmount--
                            updateAmount(amount)
                        }
                    })
                    
            amount.addEventListener("input",function(){
                    valueAmount = amount.value
                    valueAmount = parseInt(valueAmount)
                    if(isNaN(valueAmount) || valueAmount===0){
                            valueAmount = 1
                        }
                        updateAmount(amount)
                    })




            var Imgproduct = document.querySelector(".product-item-img img").src
            var Nameproduct = document.querySelector(".product-item-name").innerHTML
            var PriceProduct = document.querySelector(".product-item_price_current").innerHTML
            var SizeProduct = document.querySelector(".size").innerHTML
            var AmounProduct = document.querySelector(".amount")
            var addItem = document.querySelector(".add-item")
            var buyNow = document.querySelector(".buy-now")
            // var country = document.querySelector('.country-origin').innerHTML
            var price = document.querySelector(".product-item_price_old")
            if(price){
                var priceO = price.innerHTML
            }
            else{
                var priceO = PriceProduct
            }


            function ShopAmount(){
                var shopvalue = document.querySelector(".shopping .shop")
                var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
                x = `<span class="value-cart">${listProduct.length}</span>` 
                shopvalue.innerHTML = x
                
            }
            
            ShopAmount()

            addItem.addEventListener("click",function(){
                if(!customerLocalStorage){
                    window.location.href = './login.html'
                    return
                }
                var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
                var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
                var search = listProduct.find(x => x.name === $scope.ProductByid.tenSanPham)   
                var search2 =  listProductBuy.find(x => x.name === $scope.ProductByid.tenSanPham)   
                if(search){
                    search.amount = Number(search.amount) + Number(AmounProduct.value)
                    localStorage.setItem("productList",JSON.stringify(listProduct))
                    if(search2){
                        search2.amount = Number(search2.amount) + Number(AmounProduct.value)
                        localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
                    }
                    productLast('Sản phẩm đã có trong giỏ hàng','block')
                    return
                }
                else{
                    listProduct.push({  
                        id : $scope.ProductByid.maSanPham,
                        img : $scope.ProductByid.anhDaiDien,
                        name : $scope.ProductByid.tenSanPham,
                        priceOld : $scope.ProductByid.gia,
                        price : $scope.ProductByid.giaGiam,
                        size : $scope.ProductByid.trongLuong,
                        amount : AmounProduct.value,
                        countryItem :$scope.ProductByid.xuatXu,
                        state: false
                    })
                    localStorage.setItem("productList",JSON.stringify(listProduct))
                    
                    ShopAmount()

                    productLast('Sản phẩm đã được thêm vào giỏ hàng','block')
                }

            })


            function productLast(title,display = 'none'){
                var frame = document.getElementById("frame")
                var chilFrame = document.createElement("div")
                chilFrame.style.display = `${display}`
                chilFrame.classList.add('last')
                var productLast = document.createElement('div')
                productLast.classList.add('product-last')
                productLast.innerHTML=`<div class="product-last">
                                        <div class="product-last-icon">
                                            <i class="fa-solid fa-circle-check"></i>
                                        </div>
                                        <div class="product-last-name">
                                            ${title}
                                        </div>
                                    </div>`
                                    frame.appendChild(chilFrame)
                                    chilFrame.appendChild(productLast)
                                    setTimeout(function(){
                                        chilFrame.removeChild(productLast)
                                        chilFrame.style.display = 'none'
                                    },2500)

                                    
            }




            buyNow.addEventListener("click",function(){
                var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
                buyNowProduct={  
                    id : Number($scope.ProductByid.maSanPham),
                    img : $scope.ProductByid.anhDaiDien,
                    name : $scope.ProductByid.tenSanPham,
                    priceOld : $scope.ProductByid.gia,
                    price : $scope.ProductByid.giaGiam,
                    size : $scope.ProductByid.trongLuong,
                    amount : Number(AmounProduct.value),
                    countryItem :$scope.ProductByid.xuatXu
                }
                localStorage.setItem("buyNowProduct",JSON.stringify(buyNowProduct))
            })


            var miror = document.querySelector(".miror")
            var img = document.querySelector(".product-item-img img")
            miror.style.display='none'


            img.addEventListener("mouseleave",function(e){
                miror.style.display='none'

            })
            // vi tri ngang chuot di vao anh
            // chieu rong cao anh
            img.addEventListener("mousemove",function(e){
                img.style.cursor = 'none'
                miror.style.display='block' 
                
                miror.style.top =  e.pageY +'px'
                miror.style.left = e.pageX +'px'
                
                let w = e.target.offsetWidth;
                let h = e.target.offsetHeight;
                
                let mouseWidthImg = e.pageX 
                let mouseHeightImg = e.pageY
                
                let percentX = (mouseWidthImg / w)*100
                let percentY = (mouseHeightImg / h)*100
                
                miror.style.backgroundPositionX = percentX - 30 +'%'
                miror.style.backgroundPositionY = percentY -42 +'%'
                
                miror.style.backgroundImage = `url(${img.src})`
                

            })

            
            var imgP = document.querySelector(".product-item-img img")

            function updateActive(i){
                var acti = document.querySelector('.img-slider .activeImg')
                if(acti){
                    acti.classList.remove('activeImg')
                }
                var opaci = document.querySelector(".img-slider .opacity1")
                if(opaci){
                    opaci.classList.remove('opacity1')
                    opaci.classList.add('opacity')

                }
                listImg[i].classList.add('activeImg')

                listImg[i].classList.add('opacity1')
            }

            $scope.images = [];
            $scope.images.push(`<img src="${$scope.ProductByid.anhDaiDien}" alt="">`)
            $scope.imageslist = $scope.listImgDetail.map(function(value){
                return `<img src="${value.linkAnh}" alt="">`;
            });
            $scope.images.push($scope.imageslist)
            
            $scope.listImgShow = [].concat(...$scope.images)

            var imgSlider = document.querySelector(".img-slider");
            
            imgSlider.innerHTML=''
            $scope.listImgShow.forEach(function(image) {
                imgSlider.innerHTML += image;
            });
            
            var listImg = document.querySelectorAll(".img-slider img")

            listImg.forEach(function(e,i){
                e.addEventListener("click",function(){
                    imgP.style.opacity = '0'
                    setTimeout(function(){
                        index = i
                        var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                        updateActive(i)
                        imgP.style.opacity = '1'
                    },300)
                })    
                e.classList.add('opacity')

            })


            index  = 0

            $scope.Next = function(){
                imgP.style.opacity = '0'
                setTimeout(function(){
                    index++
                    if(index >= listImg.length){
                    index=0
                    }
                    var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                    updateActive(index)
                    imgP.style.opacity = '1'
                    
                },100)
                
            }

            $scope.Prev = function(){
                imgP.style.opacity = '0'
                setTimeout(function(){
                    index--
                    if(index<0){
                        index = listImg.length-1
                    }
                    var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                    updateActive(index)
                    imgP.style.opacity = '1'
                },100)
            }
            updateActive(0)

            var icon = document.querySelector('.but')

            var Pleft = document.querySelector('.product-left')
            Pleft.addEventListener("mouseover",function(){
                icon.style.display = 'block'
            })

            Pleft.addEventListener("mouseleave",function(){
                icon.style.display = 'none'
            })

            // setInterval(function(){
            //     $scope.Next()
            // },3000)

            $scope.GetProductConnect= function () {
                $http({
                    method: 'POST',
                    data: { page: 1, pageSize: 5,TenDanhMuc:$scope.ProductByid.tenDanhMuc},
                    url: current_url + '/api-user/SanPham/search-sanpham',
                }).then(function (response) {  
                    $scope.listConnect = response.data.data; 
                });
            };   
            $scope.GetProductConnect();

        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
    });

    // $scope.getStarsArray = function(num) {
    //     return Array.from({ length: num }, (_, index) => index + 1);
    // };
    $scope.getStarsArray = function(num) {
        var starsArray = [];
        for (var i = 1; i <= num; i++) {
            starsArray.push(i);
        }
        return starsArray;
    };
    
    var listTextStar = ['Rất không hài lòng','Không hài lòng','Bình thường','Khá hài lòng/Hài lòng','Rất hài lòng']
    var listStar = document.querySelectorAll('.stars i')
    listStar.forEach((star,index1)=>{
        star.addEventListener('click',()=>{
            listStar.forEach((star,index2)=>{
                index1 >= index2 ? star.classList.add("activeStar") : star.classList.remove("activeStar")
            })
            $scope.rating = index1+1
            $('.textStar').html(listTextStar[index1])
        })
    })

    function UpdateStar(value){
        var listStar = document.querySelectorAll('.stars2 i')
        listStar.forEach((star,index)=>{
            if (index < value) {
                star.classList.add("activeStar");
            } else {
                star.classList.remove("activeStar");
            }
        })
    }

    document.querySelector('.previewRating img').style.display = 'none';

    var previewRate = document.querySelector('.previewRating img');

    $scope.getFilePathProduct=function(){
        $('#ratingIMG').change(function () {
            if (previewRate && previewRate.src && previewRate.src.trim() !== 'http://127.0.0.1:5500/user/') {
                document.querySelector('.previewRating img').style.display = 'block';
                console.log(previewRate.src);
            } else {
                document.querySelector('.previewRating img').style.display = 'none';
                console.log(previewRate.src);
            }
            var file = this.files[0]
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function(e){
                    previewRate.src = e.target.result
                }
            }
        });
    }
    $scope.getFilePathProduct()

    var datarating = {
        page:1,
        pageSize: 10,
        MaSanPham: $scope.id
    }

    $scope.GetRatingUser = function(datarating){
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
            data: datarating,
            url: current_url + '/api-user/DanhGia/search-danhgia',
        }).then(function (response) {  
            $scope.listRating = response.data.data; 
            $scope.amountlistRating = response.data.totalItems
            if(customerLocalStorage){
                $scope.searchTurnComment = $scope.listRating.find(x => Number(x.maTaiKhoan) === Number(customerLocalStorage.mataikhoan))
            }
            if($scope.searchTurnComment){
                $('.ratingUser').hide()
                $('.stars2').show()
                UpdateStar($scope.searchTurnComment.chatLuong)
                $('.commentRated').html($scope.searchTurnComment.noiDung)
                $('.imgRated').attr("src",$scope.searchTurnComment.anhDanhGia)
                $('.textStar').html(listTextStar[$scope.searchTurnComment.chatLuong - 1])
            }
            else if(!customerLocalStorage){
                $('.stars2').hide()
                $('.ratingUser').hide()
            }
            else{
                $('.ratingUser').show()
                $('.stars2').hide()
            }
            response.data.data.length === 0 ? $('.nonRate').show() : $('.nonRate').hide()

            if(datarating.page===1){
                $('.prevRate').addClass('opacityBtnRate')
            }
            if(datarating.page===Math.ceil($scope.amountlistRating/datarating.pageSize)){
                $('.nextRate').addClass('opacityBtnRate')
            }
            if(Math.ceil($scope.amountlistRating/datarating.pageSize)===1){
                $('.nextRate').addClass('opacityBtnRate')
            }
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    }
    $scope.GetRatingUser(datarating)

    console.log(Math.ceil($scope.amountlistRating/datarating.pageSize));

    $scope.nextRate=function(){
        if(datarating.page < Math.ceil($scope.amountlistRating/datarating.pageSize)){
            datarating.page++
            $scope.GetRatingUser(datarating)
            $('.nextRate').removeClass('opacityBtnRate')
            $('.prevRate').removeClass('opacityBtnRate')
        }
        if(datarating.page===Math.ceil($scope.amountlistRating/datarating.pageSize)){
            $('.nextRate').addClass('opacityBtnRate')
        }
    }

    $scope.prevRate = function(){
        if(datarating.page > 1){
            datarating.page--
            $scope.GetRatingUser(datarating)
            $('.prevRate').removeClass('opacityBtnRate')
            $('.nextRate').removeClass('opacityBtnRate')
        }
        if(datarating.page===1){
            $('.prevRate').addClass('opacityBtnRate')
        }
    }
    
    if(customerLocalStorage){
        $scope.sendrate=function(){
            if($scope.rating&&$scope.comment){
                $http({
                    method: 'GET',
                    headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
                    url: current_url + '/api-user/HoaDon/getbytaikhoan-mahoadon-chitiethoadon-product/' + customerLocalStorage.mataikhoan,
                }).then(function (response) {
                    $scope.listIdProduct = response.data.map(function(value){
                        return value.maSanPham
                    })
                    $scope.search = $scope.listIdProduct.find(x => x === Number($scope.id))
    
                    var file = document.getElementById('ratingIMG').files[0];
                    if (file) {
                        const formData = new FormData();
                        formData.append('file', file);
                        $http({
                            method: 'POST',
                            headers: {
                                "Authorization": 'Bearer ' + customerLocalStorage.token,
                                'Content-Type': undefined
                            },
                            data: formData,
                            url: current_url + '/api-user/Image/upload',
                        }).then(function (res) {
                            $scope.Image = res.data.filePath;
                            previewRate.src = "../img"+ $scope.Image
                            $http({
                                method: 'POST',
                                headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
                                data: {
                                    MaSanPham: $scope.id,
                                    MaTaiKhoan: customerLocalStorage.mataikhoan,
                                    ChatLuong: $scope.rating,
                                    NoiDung:$scope.comment,
                                    TrangThai: Number($scope.id) === Number($scope.search),
                                    ThoiGian: gmt7ISODate,
                                    AnhDanhGia:  "../img"+$scope.Image,
                                    GhiChu:''
                                  },
                                url: current_url + '/api-user/DanhGia/create-danhgia',
                            }).then(function (response) {  
    
                            }).catch(function (error) {
                                console.error('Lỗi :', error);
                            });
                        });
                    }
                    else{
                        $http({
                            method: 'POST',
                            headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
                            data: {
                                MaSanPham: $scope.id,
                                MaTaiKhoan: customerLocalStorage.mataikhoan,
                                ChatLuong: $scope.rating,
                                NoiDung:$scope.comment,
                                TrangThai: Number($scope.id) === Number($scope.search),
                                ThoiGian: gmt7ISODate,
                                AnhDanhGia: '',
                                GhiChu:''
                              },
                            url: current_url + '/api-user/DanhGia/create-danhgia',
                        }).then(function (response) {  
                            window.location.reload()
                        }).catch(function (error) {
                            console.error('Lỗi :', error);
                        });
                    }
                    
                }).catch(function (error) {
                    console.error('Lỗi:', error);
                });
                
            }
            else{
                alert('Vui lòng chọn đánh giá và nhập nội dung đánh giá !')
            }
        }
    }
})