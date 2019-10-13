/*Индигридиеньы нужны для готовки*/
var coockIndig = [];
var coockImg = [];
/* все остальные индигридиенты*/
var allIndig = [];
var allImg = [];

/*блюда*/
var dishId = [];
var dishName = [];
var description = [];
var colIndigr = [];

/*Индигридиенты, которые выбрал пользователь*/
var usersIndigs = [false, false, false, false, false, false, false, false, false, false];
//new Array(len).fill(false); Данный метод не работает в IE
//Множество нужных индигридиентов, для сравнения
var сhoiceIndig = new Set();

var indigs = [];

$(function() {
    for (i=0;i < 10;i++) {
        indigs[i] = document.getElementById(i);
        indigs[i].onclick = addToSalad;
    }
    $.getJSON('bd.json')
        .done(dish);
});

/*Индигридиенты, которые выбрал пользователь*/
function addToSalad() {
    salad_Id = this.getAttribute("id");
    usersIndigs[salad_Id] = !usersIndigs[salad_Id];
    hnode = this.childNodes[3];
    htext = hnode.childNodes[1];

    if (usersIndigs[salad_Id] == true){
        hnode.classList.add('chooseIndigs');
        htext.innerHTML = "Выбрано";
    } else {
        hnode.classList.remove('chooseIndigs');
        htext.innerHTML = "Выбрать";
    }


}

function dish(jsonObj) {
    /* выгрузка блюд*/
    $(jsonObj.dish).each(function (index) {
        dishId[index] = $(this).attr('id');
        dishName[index] = $(this).attr('dishName');
        description[index] = $(this).attr('description');
        colIndigr[index] = $(this).attr('colIndigr');
    });

    /* Номер солата */
    item = getRandomArbitrary(0,4);
    /* Какой салат нужно готовить?*/
    $('.resept').text('Приготовь мне: ' + description[item]);
    
    var idCoock = 0;
    var idAll = 0;
    /* выгрузка ингридиентов*/
    $(jsonObj.indigrodients).each(function (index) {
        /*
        * Если индигридиент подходит, то добавляем его в список требуемых индигридиентов
        * Иначе в список всех остальных индигридиентов
        * */
        //console.log( $(this).attr('name') + "   " + $(this).attr(dishName[item]) );
        if( $(this).attr(dishName[item]) == 'true' ){
            coockIndig[idCoock] = $(this).attr('name');
            coockImg[idCoock] = $(this).attr('link');
            idCoock++;
        } else {
            allIndig[idAll] = $(this).attr('name');
            allImg[idAll] = $(this).attr('link');
            idAll++;
        }

    });


    /*
    *  Множество номеров, для подходящих индигридиентов
    *  Тип данных МНОЖЕСТВО выбранно для того,
    *  что бы на экран дважды не добавлялся один и тот же индигридиент
    */

    /*
    *    Подбираем позиции для индигридиентов из, которых мы будим готовить
    *  Подбор осушествляется до тех пор пока не будут придуманы индивидуальные номера для всех индигридиентов
    */
    while (сhoiceIndig.size < colIndigr[item]) {
        сhoiceIndig.add(getRandomArbitrary(0, 9));
    }
  //  console.log( сhoiceIndig);

    var trueIndig = new Set(сhoiceIndig);

    var flag = false;
    /*Выводим список индигридиентов на экран */
    for (i = 0; i < 10; i++ ){
        /*Если ПИЗИЦИЯ индигридиента есть в множестве
        * то на её место ставим подходящий для салата индигридиент
        * */
        if( trueIndig.has(i) ){
           // console.log(i + ' есть');
            /* Если эта позиция занята нужным индигредиентом,
            то выберем случайный индигредиент из нужных*/
            do {
                idCoock = getRandomArbitrary(0, coockImg.length);
                if ( coockImg[idCoock] != 'false' ){
                   // console.log( "   ", coockImg[idCoock]);
                    $('#'+i+'i').attr('src', coockImg[idCoock]);
                    coockImg[idCoock] = 'false';
                    trueIndig.delete(i);
                    flag = true;
                } else flag = false;
            } while (!flag)
        } else{
            console.log(i + 'нет');
            /* иначе выберем случайный индигредиент из не нужных*/
            do {
                idCoock = getRandomArbitrary(0, allImg.length);
                
                if ( allImg[idCoock] != 'false' ){
                   // console.log( "   ", allImg[idCoock]);
                    $('#'+i+'i').attr('src', allImg[idCoock]);
                    allImg[idCoock] = 'false';
                    flag = true;
                } else flag = false;
            } while (!flag)
        }
    }
}

/* рандомное число*/
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function compareIndigs() {
console.log(сhoiceIndig);
    console.log(usersIndigs);

    //Перебор значений в множестве
    for(let item of сhoiceIndig){
        if (usersIndigs[item] == false){
            $('.resept').text('Не хватает ингредиентов!');
            break;
        }
        if (item == сhoiceIndig.size) {
            $('.resept').text('Из тебя получится хороший повар!');
            break;
        }
    }

    console.log("len = " + usersIndigs.length);s
    for(i=0;i<usersIndigs.length;i++) {
        console.log("hi");
        if ( !сhoiceIndig.has(usersIndigs[i]) ) {
            $('.resept').text('Ты неправильно приготовил блюдо!');
            break;
        } 
    }
}

