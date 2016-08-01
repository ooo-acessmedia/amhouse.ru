(function ($) {

    'use strict';

    // var cl = function (msg) {
    //    console.log(msg);
    // };
    //
    // $(window).on('resize', function () {
    //    cl($(window).width());
    // });

    $('#tv-projectcategory_0').on('change', function () {
        if ($('#tv-projectcategory_0 :selected').data().sort === 0) {
            $('#mse2_filters').find('>fieldset').not('#mse2_tv-projectcategory').addClass('is-vis-hidden');
            location.href = 'http://amhouse.ru/proektyi/?tv|projectcategory=novostroika';
        } else {
            $('#mse2_filters').find('>fieldset').not('#mse2_tv-projectcategory').removeClass('is-vis-hidden');
        }

    });

    // mFilter2

    $('.msearch-results').appendTo('.filter-results');

    // Сохраняем значения фильра в localstorage

    $('.filter-button').on('click', function () {
        var filterQuery = location.search;
        localStorage.setItem('filterUrl', filterQuery);
        localStorage.setItem('outerPage', '1');
    });

    if (location.pathname === '/proektyi/' && localStorage.getItem('outerPage') === '1') {
        location.search = localStorage.getItem('filterUrl');
        localStorage.setItem('outerPage', '2');
    }

    // Fancybox

    $('.fancybox').fancybox({
        'max-width': '80%',
        'max-height': '80%'
    });

    // m-newhouses-slider

    var $newHousesSlider = $('.m-newhouses-slider');

    $newHousesSlider.owlCarousel({
        items: 3,
        loop: true,
        nav: true,
        navText: ['', ''],
        margin: 37
    });

    // main-questions custom scrollbar

    var $questionsScroll = $('.main-questions .block');

    $questionsScroll.mCustomScrollbar({
        scrollButtons: {
            enable: true
        }
    });

    // Раскрывающиеся вопросы

    var $itemQuestion = $('.questions-item'),
        $firstQuestion = $itemQuestion.eq(0);

    $firstQuestion.find('.questions-item-text').addClass('is-visible');

    $itemQuestion.find('.questions-item-title').on('click', function () {
        $(this).parent().find('.questions-item-text').toggleClass('is-visible');
    });

    // Анимации

    var controller = new ScrollMagic.Controller();

    var $mainAboutTeasers = $('.teasers-item:gt(1)').addClass('animated').css('visibility', 'hidden');

    $mainAboutTeasers.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'slideInDown').addTo(controller);
    });

    // Анимируем страницу список услуг

    var $servicesItem = $('.service-page .item').addClass('animated');

    $servicesItem.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInRight').addTo(controller);
    });

    // Анимируем инвестиционные предложения

    var $investPageItem = $('.investments-page table tbody tr td');

    $investPageItem.addClass('animated');

    $investPageItem.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInLeft').addTo(controller);
    });

    var $investmentsButton = $('.investments-page .more-info');

    $investmentsButton.addClass('animated');

    $investmentsButton.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-500).setClassToggle(this, 'fadeInUp').addTo(controller);
    });

    // Анимируем покупку недвижимости

    var $buyEstateItem = $('.buy-estate-page .items-block .item');

    $buyEstateItem.addClass('animated');

    $buyEstateItem.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInLeft').addTo(controller);
    });

    var $bottomBlockLeft = $('.bottom-block .left');
    var $bottomBlockRight = $('.bottom-block .right');

    $bottomBlockLeft.addClass('animated');
    $bottomBlockRight.addClass('animated');

    $bottomBlockLeft.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInDown').addTo(controller);
    });

    $bottomBlockRight.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInDown').addTo(controller);
    });

    // Анимируем страниуц рассрочки

    var $paymentsItem = $('.payments-block .item');

    $paymentsItem.addClass('animated');

    $paymentsItem.each(function () {
        new ScrollMagic.Scene({
            triggerElement: this
        }).offset(-250).setClassToggle(this, 'fadeInLeft').addTo(controller);
    });


    // Вертикальный слайдер

    var $container = $('.vertical-slider');
    var $track = $container.find('.vertical-slider-container').silverTrack({
        perPage: 3,
        itemClass: 'item',
        mode: 'vertical',
        animationAxis: 'y'
    });

    // install the plugins you want, in our case Navigator

    $track.install(new SilverTrack.Plugins.Navigator({
        prev: $('.vertical-slider-prev', $container),
        next: $('.vertical-slider-next', $container)
    }));

    $track.start();

    // Если в слайдере элементов нет то скрываем его

    if ($container.find('.vertical-slider-container > div').size() < 1) {
        $container.addClass('is-hidden');
    }

    // Калькулятор

    var $calculatorButton = $('.calculator-button');

    $calculatorButton.on('click', function () {

        var $calcPrice = $(this).parents('.m-calculator').find('.calculator-title input'),
            $calcCreditYear = $(this).parents('.m-calculator').find('.calc-credit-year input'),
            $calcBankCredit = $(this).parents('.m-calculator').find('.calc-bank-credit input'),
            $calcBid = $(this).parents('.m-calculator').find('.calc-bid input'),
            $calcMontlyPay = $(this).parents('.m-calculator').find('.calc-montly-pay');

        var montlyPay,
            price = $calcPrice.val(),
            creditYear = $calcCreditYear.val(),
            bankCredit = $calcBankCredit.val() / 100,
            calcBid = $calcBid.val() / 100;

        montlyPay = ((calcBid / 12) * (price * bankCredit)) / (1 - (1 / Math.pow(1 + (calcBid / 12), (creditYear * 12))));


        if (!isNaN(montlyPay)) {
            montlyPay = Math.floor(montlyPay);
            $calcMontlyPay.html(montlyPay);
            $(this).parents('.m-calculator').find('.calculator-error').html('');
        } else {
            montlyPay = 'Введите числовые значения';
            $(this).parents('.m-calculator').find('.calculator-error').html(montlyPay);
        }
    });

    // Переменные для формы

    var $activateCalc = $('.table-ipotech'),
        $formPopupCalc = $('.calc-popup'),
        $formFadeCalc = $('.calc-fade'),
        $activateApart = $('.table-callout'),
        $activateApartWithoutParameters = $('.investments-page .more-info'),
        $formPopup = $('.form-popup'),
        $formFade = $('.form-fade'),
        $formClose = $('.form-popup-close'),
        $apartFade = $('.apart-fade'),
        $apartCallout = $('.apart-callout'),
        thisPlaceholder,
        $fadeStandart = $('.fade-standart'),
        $popupStandart = $('.popup-standart'),
        $activeteMainHouses = $('.apartments-page-block .m-main-btn, .calculator-button'),
        $mainHousesPopup = $('.mainhouse-popup'),
        $mainHousesFade = $('.mainhouse-fade');

    var activatePopupForm = function (activateButton, formPopup, formFade) {
        activateButton.on('click', function () {
            formPopup.add(formFade).addClass('is-visible fade-in');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('fade-in');
            }, 300);

            // Добавляем значение цены для калкурятора в зависимости от кнопки по которой кликнули

            var currentPrice = $(this).siblings('.table-price').text();

            currentPrice = currentPrice.replace(/\s+/g, '');
            currentPrice = parseInt(currentPrice);

            formPopup.find('.calculator-title input').val(currentPrice);

            // Передаем параметры квартиры в форму заявки

            var currentApartName = $(this).siblings('.apartments-name').text(),
                currentApartPlan = $(this).siblings('.apartments-planning').find('a').attr('href'),
                currentApartFloor = $(this).siblings('.apartments-floor').text(),
                currentApartSize = $(this).siblings('.apartments-size').text(),
                currentApartBalcony = $(this).siblings('.apartments-balcony').text(),
                currentApartPolisad = $(this).siblings('.apartments-polisad').text(),
                currentApartPrice = $(this).siblings('.apartments-price').text();


            formPopup.find('#apartments-number').val(currentApartName);
            formPopup.find('#apartments-planning').val(currentApartPlan);
            formPopup.find('#apartments-floor').val(currentApartFloor);
            formPopup.find('#apartments-size').val(currentApartSize);
            formPopup.find('#apartments-balcony').val(currentApartBalcony);
            formPopup.find('#apartments-polisad').val(currentApartPolisad);
            formPopup.find('#apartments-price').val(currentApartPrice);
        });

        formFade.add($formClose).on('click', function () {
            formPopup.add(formFade).addClass('fade-out');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('is-visible fade-out');
            }, 300);
        });


    };

    activatePopupForm($activateCalc, $formPopupCalc, $formFadeCalc);
    activatePopupForm($activateApart, $apartCallout, $apartFade);
    activatePopupForm($activateApartWithoutParameters, $popupStandart, $fadeStandart);
    activatePopupForm($activeteMainHouses, $mainHousesPopup, $mainHousesFade);


    // Сменяющиеся плейсхолдеры для форм

    $formPopup.find('input').add($formPopup.add('textarea'))
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

    // Центрирование формы

    var formCentered = function () {

        var winWidth = $(window).width(),
            formWidth = $formPopup.width();

        $formPopup.css({
            left: winWidth / 2 - formWidth / 2
        });
    };

    formCentered();

    $(window).resize(function () {
        formCentered();
    });


    // Страница беспроцентная рассрочка - сменяющиеся названия

    var $investTitleItem = $('.payments-block .title span');

    $investTitleItem.on('click', function () {
        $investTitleItem.removeClass('active');
        $(this).addClass('active');

        var $bottomItem = $('.payments-block .bottom .bottom-item');

        $bottomItem.removeClass('is-visible');

        $bottomItem.eq($(this).data().index).addClass('is-visible');
    });

    // Сменяющиеся вкладки на странице список услуг

    if ($('body').data().id === 5) {

        var $rightBlock = $('.right-block'),
            $leftBlock = $('.left-block');

        $rightBlock.find('.item').on('click', function () {
            var curItemText = $(this).html(),
                curItemAddText = $(this).data().text;
            $leftBlock.html(curItemText);

            $('.description-block').html(curItemAddText);

            var curIndex = $(this).index();
            curIndex = 'index-' + curIndex;
            $leftBlock.removeClass('index-0 index-1 index-2 index-3 index-4 index-5 index-6 index-7');
            $leftBlock.addClass(curIndex);
        });
    }

    // Калькулятор на странице Инвестиционные предложения - функция взята со старого сайта

    function getcourse() {
        $.get('/curse.php', function (data) {
            $('.calc table button').click(function () {
                calck(data);
            });

            $('.calc table input').keypress(function (evt) {
                var charCode = evt.charCode || evt.keyCode;
                if (charCode === 13) {
                    calck(data);
                }
            });
        });

        function calck(data) {
            $('.calc table th').eq(1).find('p').text($('.calc select option:selected').text());
            if ($('.calc select option:selected').val() === 'eu') {
                $(".calc table th").eq(1).find("img").attr("src", "/images/calc/2-1.png");
            } else {
                $(".calc table th").eq(1).find("img").attr("src", "/images/calc/2.png");
            }
            ;

            var val = $(".calc select option:selected").val();
            if (val == "kr") {
                $(".calc table td:nth-child(1)").each(function () {
                    var pr = parseInt($(this).text());
                    $(this).next().text((parseInt($(".calc input").val()) * (pr / 100)).toFixed(0));

                    var pr = parseInt($(this).text());
                    $(this).next().next().text(((parseInt($(".calc input").val()) * (pr / 100)) / 12).toFixed(0));
                })
            } else {
                $(".calc table td:nth-child(1)").each(function () {
                    var pr = parseInt($(this).text());
                    $(this).next().text((parseInt($(".calc input").val()) * (pr / 100)).toFixed(0));

                    var pr = parseInt($(this).text());
                    var val = (((parseInt($(".calc input").val()) * (pr / 100)) / 12) * parseFloat(data)).toFixed(0);
                    $(this).next().next().text(val);
                });
            }
        }

    }

    getcourse();


})(jQuery);



