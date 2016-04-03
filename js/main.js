$(document).ready(function(){

	$('.login_registration_on_top,.cart_ico_block,.block_model_cat,.lk_th_elements').click(function(){
		window.location=$(this).find('a').attr('href');
		return false;
	})

//	any scripts past here

//	Инициализация слайдера в боковом меню слева(акции) и Инициализайция слайдера новостей над футером
		$(function() {
			var jcarousel = $('div.slidewrap,div.slidewrap3'); /*обвертка слайдера*/
			jcarousel
				.on('jcarousel:reload jcarousel:create', function () {
					var width = jcarousel.innerWidth();
					if (width >= 600) {
						width = width / 3; /**/
					} else if (width >= 350) {
						width = width / 2;
					}
					jcarousel.jcarousel('items').css('width', width + 'px');
				})
				.jcarousel({
					wrap: 'circular'
				});
			$('.next,.mr-rotato-next') /*кнопки-назад*/
				.jcarouselControl({
					target: '-=1'
				});
			$('.prev,.mr-rotato-prev') /*кнопки-вперед*/
				.jcarouselControl({
					target: '+=1'
				});
			$('.jcarousel-pagination')
				.on('jcarouselpagination:active', 'a', function() {
					$(this).addClass('active');
				})
				.on('jcarouselpagination:inactive', 'a', function() {
					$(this).removeClass('active');
				})
				.on('click', function(e) {
					e.preventDefault();
				})
				.jcarouselPagination({
					perPage: 1,
					item: function(page) {
						return '<a href="#' + page + '">' + page + '</a>';
					}
				});
		});

//	Нумерация списков
	$("section ol li").map(function(i, o) {
		var num = i+1;
		$(o).prepend("<span class='numlist'>"+num+".</span>");
	});

//	Выпадающее главное меню
	$('div.head_heart nav ul li').hover(function () {
		clearTimeout($.data(this,'timer'));
		$('ul',this).stop(true,true).fadeIn(200);
	}, function () {
		$.data(this,'timer', setTimeout($.proxy(function() {
			$('ul',this).stop(true,true).fadeOut(200);
		}, this), 100));
	});

//	Инициализация fancybox для картинок
	$('.fancybox').fancybox();

//	Инициализация галереи fancybox для карточки товара
	$('.good_gallery > a').fancybox({
		beforeLoad: function() {
			var group = this.group;
			var href = this.href;
			if (group.length != 1) {return true;}

			$('.good_gallery .thumbnail').each(function() {
				var elem = $(this);
				var elem_href = elem.data('image');
				if (elem_href != href) {
					group.push({
						element: elem
						,isDom: true
						,title: ''
						,type: 'image'
						,href: elem_href
					});
				}
			});
			this.group = group;
		}
	});

//	Подстановка превьюшек в основное окно предпросмотра изображения товара
	$( "a.thumbnail" ).click(function() {
		var PrevievWin = $("div.good_gallery a img#mainImage");
		var PrevievLink = $("div.good_gallery a.FansyMainImage");
		var ThisImage = $(this).children('img').attr('src');
		$(PrevievWin).attr('src', ThisImage),$(PrevievLink).attr('href', ThisImage);
	});

//	Подняться наверх
	var scrollDiv = jQuery(".totop_button");
	if (jQuery(window).scrollTop() >= "200") scrollDiv.fadeIn("slow");
	jQuery(window).scroll(function() {
		if (jQuery(window).scrollTop() <= "200") scrollDiv.fadeOut("slow")
		else scrollDiv.fadeIn("slow")
	});
	scrollDiv.click(function() {
		jQuery("html, body").animate({scrollTop: 0}, "slow")
	})


//	увеличение-уменьшение колличества товаров в корзине
	var picecountButt_plus = jQuery(".input_pice_count_plus");
	var picecountButt_minus = jQuery(".input_pice_count_minus");

	picecountButt_plus.click(function() {
		var cur_value = $(this).parent().parent().children().children('.input_pice_count').attr('value');
		cur_value = parseInt(cur_value) + 1;
		$(this).parent().parent().children().children('.input_pice_count').attr('value',cur_value);
	})

	picecountButt_minus.click(function() {
		var cur_value = $(this).parent().parent().children().children('.input_pice_count').attr('value');
		if (cur_value==0){
			return false;
		}else{
			cur_value = parseInt(cur_value) - 1;
			$(this).parent().parent().children().children('.input_pice_count').attr('value',cur_value);
		}
	})


//	дата-пикер
	$(function() {
		$( "#pers_date" ).datepicker();
	});

	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
			'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
			'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$('input.datepicker').datepicker({
		showOn: 'both',
		buttonImageOnly: true,
		buttonImage: '/images/026.png'
	});

//	свернуть-развернуть каталог2-1 и каталог1(асайд)
	$( "a.cat_name,span.cat_turn_expand_img").click(function() {
		$(this).parent(".cat_turned_block").toggleClass( "expand_cat_block", 300 );
	});
	$( "a.cataside_name,span.cataside_turn_expand_img").click(function() {
		$(this).parent(".cataside_turned_block").toggleClass( "expand_cat_block", 300 );
	});
});