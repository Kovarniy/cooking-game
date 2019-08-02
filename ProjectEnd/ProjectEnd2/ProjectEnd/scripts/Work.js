var nameIndig = [];
var linkIndeg = [];

var dishId = [];
var dishName = [];
var description = [];



$(function() {
    //alert("hi");

    $.getJSON('bd.json')
        .done(dish);

});

function dish(jsonObj) {

    /* выгрузка блюд*/
    $(jsonObj.dish).each(function (index) {
        dishId[index] = $(this).attr('id');
        dishName[index] = $(this).attr('dishName');
        description[index] = $(this).attr('description');
    });

    /* выгрузка ингридиентов*/
    $(jsonObj.indigrodients).each(function (index) {
        nameIndig[index] = $(this).attr('name');
        linkIndeg[index] = $(this).attr('link');
    });

    item = getRandomArbitrary(0,4);

    /* Какой салат нужно готовить?*/
    switch (item) {
        case 0:
            $('.resept').text('Приготовь мне: ' + description[0]);
            break;
        case 1:
            $('.resept').text('Приготовь мне: ' + description[1]);
            break;
        case 2:
            $('.resept').text('Приготовь мне: ' + description[2]);
            break;
        case 3:
            $('.resept').text('Приготовь мне: ' + description[3]);
            break;
        default:
            alert("ошибка");
    }

    /*вывод индигридиентов*/
    switch (item) {

    }


}

/* рандомное число*/
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

