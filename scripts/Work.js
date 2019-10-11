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
var usersIndigs = [false, false, false, false, false, false, false, false, false];

//new Array(len).fill(false); Данный метод не работает в IE

$(function() {
    console.log(usersIndigs[0], usersIndigs[1]);

    $.getJSON('bd.json')
        .done(dish);
});

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

   // console.log(coockIndig);
    //console.log(allIndig);

    /*
    *  Множество номеров, для подходящих индигридиентов
    *  Тип данных МНОЖЕСТВО выбранно для того,
    *  что бы на экран дважды не добавлялся один и тот же индигридиент
    */
    let trueIndig = new Set();

    /*
    *    Подбираем позиции для индигридиентов из, которых мы будим готовить
    *  Подбор осушествляется до тех пор пока не будут придуманы индивидуальные номера для всех индигридиентов
    */
    while (trueIndig.size < colIndigr[item]) {
        trueIndig.add(getRandomArbitrary(0, 9));
    }
    console.log( trueIndig);

    var flag = false;
    /*Выводим список индигридиентов на экран */
    for (i = 0; i < 9; i++ ){
        /*Если ПИЗИЦИЯ индигридиента есть в множестве
        * то на её место ставим подходящий для салата индигридиент
        * */
        if( trueIndig.has(i) ){
            console.log(i + ' есть');
            /* Если эта позиция занята нужным индигредиентом,
            то выберем случайный индигредиент из нужных*/
            do {
                idCoock = getRandomArbitrary(0, coockImg.length);
                if ( coockImg[idCoock] != 'false' ){
                    console.log( "   ", coockImg[idCoock]);
                    $('#'+i).attr('src', coockImg[idCoock]);
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
                    console.log( "   ", allImg[idCoock]);
                    $('#'+i).attr('src', allImg[idCoock]);
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

/*Индигридиенты, которые выбрал пользователь*/
function addToSalad(salad_Id) {
    usersIndigs[salad_Id] = !usersIndigs[salad_Id];
}

function compareIndigs() {
    console.log(trueIndig);
    for(i=0; i < usersIndigs.length; i++ ){
        alert(i);
    }


}

