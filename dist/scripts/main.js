'use strict';

var currentWidth = window.innerWidth;
var isMobile = window.innerWidth <= 600;
var $navLink = $('.l-header__inner__siteNav__list__item a');
var $navLinkMobile = $('.l-header-mobile__opened__nav__item a');
var contentsArr = [];

run();

window.addEventListener("resize", function () {
	if (currentWidth == window.innerWidth) {
		return;
	}
	currentWidth = window.innerWidth;
	isMobile = window.innerWidth <= 600;
	run();
});

function run() {
	if (!isMobile) {
		calcContentsPosition($navLink, contentsArr);
		$(window).on('load scroll', function () {
			currentCheck($navLink, contentsArr);
		});
		openSmallWindow();
		changeLanguage();
		smoothScroll($navLink, isMobile);
	} else {
		openMenu();
		smoothScroll($navLinkMobile, isMobile);
	}
}

function calcContentsPosition($navLink, contentsArr) {
	for (var i = 0; i < $navLink.length; i++) {
		var targetContents = $navLink.eq(i).attr('href');
		if (targetContents.charAt(0) == '#') {
			var headerHeight = $('header').height();
			var targetContentsTop = $(targetContents).offset().top - headerHeight;
			var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight() + headerHeight;

			contentsArr[i] = {
				top: targetContentsTop,
				bottom: targetContentsBottom
			};
		}
	}
}

function currentCheck($navLink, contentsArr) {
	var currentPosition = $(window).scrollTop();
	for (var i = 0; i < contentsArr.length; i++) {
		if (contentsArr[i].top <= currentPosition && currentPosition <= contentsArr[i].bottom) {
			$navLink.removeClass('current');
			$navLink.eq(i).addClass('current');
		}
	}
}

function smoothScroll($navLink, isMobile) {
	var headerHeight = void 0;
	isMobile ? headerHeight = 0 : headerHeight = 49;
	$navLink.click(function () {
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - headerHeight
		}, 300);
		return false;
	});
}

function openSmallWindow() {
	var $shareBtn = $('.l-header__inner__shareLinks__item a');
	for (var i = 0; i < $shareBtn.length; i++) {
		$shareBtn[i].addEventListener("click", function (e) {
			e.preventDefault();
			window.open(this.href, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
		}, false);
	}
}

function changeLanguage() {
	var $langBtn = $('.l-about__btns__item');
	var $langText = $('.l-about__text-area__item');
	$langBtn.click(function (event) {
		$langBtn.removeClass('btnActive');
		$(this).addClass('btnActive');
		$langText.hide().removeClass('.textActive');
		var BtnId = $(this).attr("id");
		var target = '#' + BtnId.substring(0, BtnId.length - 3) + 'Text';
		$('' + target).fadeIn(800).addClass('textActive');
		calcContentsPosition($navLink, contentsArr);
	});
}

function openMenu() {
	$('#menu').click(function (event) {
		$('#menuContents').addClass('isVisible');
		$('body').addClass('locked');
	});

	$('.l-header-mobile__opened__nav__item a').click(function (event) {
		$('#menuContents').removeClass('isVisible');
		$('body').removeClass('locked');
	});

	$('#close').click(function (event) {
		$('#menuContents').removeClass('isVisible');
		$('body').removeClass('locked');
	});
}
//# sourceMappingURL=main.js.map