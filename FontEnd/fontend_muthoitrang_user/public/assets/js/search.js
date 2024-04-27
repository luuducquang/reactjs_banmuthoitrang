var $all = $('#frame');
var $search = $('.wrap');
var $homeSearch = $(".home-search");
var $contentSearch = $(".content-search");
var $searchInput = $('.searchTerm');

$all.click(function() {
    $homeSearch.css('display', 'none');
});

$search.click(function(event) {
    $homeSearch.css('display', 'block');
    event.stopPropagation();
});


$searchInput.focus(function() {
    $contentSearch.css('display', 'block');
});

$searchInput.keydown(function(){
    $contentSearch.css('display', 'block');
});

$('.suggest a').on('click', function() {
    $(".content-search").css('display', 'none');
});