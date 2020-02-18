/*** Logics made with JQuery ***/

$(document).ready(function(){
  /** Slide Control Logics **/

  // Navbar redirects to correct slide
  $(".home").click(function(){
    $("#slider_1").prop("checked", true);
    //window.history.pushState('proov2', 'Title', '/home');
  });
  
  $(".about-me").click(function(){
    $("#slider_2").prop("checked", true);
    //window.history.pushState('proov2', 'Title', '/about-me');
  });

  $(".education").click(function(){
    $("#slider_3").prop("checked", true);
  });

  $(".skills").click(function(){
    $("#slider_4").prop("checked", true);
  });

  $(".works").click(function(){
    $("#slider_5").prop("checked", true);
  });


  // Radio bubbles trigger navbar colors
  $( ".slide-check" ).on( "click", function() {
    if ($('#slider_1').is(":checked")) {
      $(".home").focus();
    } else if ($('#slider_2').is(":checked")) {
      $(".about-me").focus();
    } else if ($('#slider_3').is(":checked")) {
      $(".education").focus();
      let x = "education";
    } else if ($('#slider_4').is(":checked")) {
      $(".skills").focus();
    } else if ($('#slider_5').is(":checked")) {
      $(".works").focus();
    }
  });

  /** Progress Bar Logics **/

  // Remove svg.radial-progress .complete inline styling
  $('svg.radial-progress').each(function( index, value ) { 
    $(this).find($('circle.complete')).removeAttr( 'style' );
  });


  // Validate if slider 4 is unchecked
  $(':radio, .navbut').click(function(){
    //Kui education ei ole chekcitut vol1

    $('svg.radial-progress').each(function( index, value )
    { 
    // Tee sama arvutus mis all
    if (!$('#slider_4').is(":checked")) {
        $(this).find($('circle.complete')).animate({'stroke-dashoffset': 219.91148575129}, 800);
    } 
    });
  })

  // Activate progress animation when clicking on #slider_3 radio
  $( "#slider_4, #navslide4" ).on( "click", function() {
    $('svg.radial-progress').each(function( index, value ) { 
        // If #slider_3 is checked
        if ($('#slider_4').is(":checked")) {
            // Get percentage of progress
            percent = $(value).data('percentage');
            // Get radius of the svg's circle.complete
            radius = $(this).find($('circle.complete')).attr('r');
            // Get circumference (2πr)
            circumference = 2 * Math.PI * radius;
            // Get stroke-dashoffset value based on the percentage of the circumference
            let strokeDashOffset = circumference - ((percent * circumference) / 100);
            // Transition progress for 1.25 seconds
            $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 2500);
        }
    });
  });
});

//Animatsiooni proov
$('.arrow').on("mouseover",function(){
  $(".timeline #rahumae").css("animation-play-state", "running");
  $(".timeline #kk").css("animation-play-state", "running");
  $(".timeline #khk").css("animation-play-state", "running");
  $('.timeline').addClass('changedFirst');
  $('.timeline #rahumae').addClass('changedSecond');
  $('.timeline #kk').addClass('changedThird');
  $('.timeline #khk').addClass('changedFourth');
});
  //


$( "#slider_3, #navslide3" ).on( "click", function() {
  
});
/*** Responsive Logics ***/

var svg, originalViewBox, max20em, mq, updateViewBox;

svg = document.querySelector('svg');

/* Store the original value in a variable */
originalViewBox = svg.getAttribute('viewBox');

/* Define our media query and media query object */
mq  = matchMedia("(max-width: 1360px)");

/* Define the handler */
updateViewBox = function(){
    if (mq.matches) {
        /* Change the viewBox dimensions to show the hexagon */
        svg.setAttribute('viewBox', "0 0 500 1500");
    } else {
        svg.setAttribute('viewBox', originalViewBox);
    }
}

/* Fire on document load */
// WebKit/Blink browsers
svg.onload = updateViewBox;

// Firefox & IE
svg.addEventListener('SVGLoad', updateViewBox, true);

/* Fire if the media condition changes */
mq.addListener(updateViewBox); 


/* Animatsiooni proov */

function Carousel(element) {
  this._autoDuration = 0;
  this._container = element.querySelector('.container');
  this._interval = null;
  this._nav = element.querySelector('nav');
  this._slide = 0;
  this._touchAnchorX = 0;
  this._touchTime = 0;
  this._touchX1 = 0;
  this._touchX2 = 0;
  element.addEventListener('click', this);
  element.addEventListener('touchstart', this);
  element.addEventListener('touchmove', this);
  element.addEventListener('touchend', this);
  element.addEventListener('transitionend', this);
  window.addEventListener('blur', this);
  window.addEventListener('focus', this);
  this.set(0);
}

Carousel.prototype.auto = function (ms) {
  if (this._interval) {
    clearInterval(this._interval);
    this._interval = null;
  }
  if (ms) {
    this._autoDuration = ms;
    var self = this;
    this._interval = setInterval(function () { self.next(); }, ms);
  }
}

Carousel.prototype.handleEvent = function (event) {
  if (event.touches && event.touches.length > 0) {
    this._touchTime = +new Date;
    this._touchX1 = this._touchX2;
    this._touchX2 = event.touches[0].screenX;
  }

  var screen = document.documentElement.clientWidth;
  var position = this._slide + (this._touchAnchorX - this._touchX2) / screen;
  var velocity = (new Date - this._touchTime) <= 200 ? (this._touchX1 - this._touchX2) / screen : 0;

  switch (event.type) {
    case 'blur':
      this.auto(0);
      break;
    case 'click':
      if (event.target.parentNode != this._nav) break;
      var i = parseInt(event.target.dataset.slide);
      if (!isNaN(i)) {
        event.preventDefault();
        this.auto(0);
        this.set(i);
      }
      break;
    case 'focus':
      this.auto(this._autoDuration);
      break;
    case 'touchstart':
      event.preventDefault();
      this.auto(0);
      this._container.style.transition = 'none';
      this._touchAnchorX = this._touchX1 = this._touchX2;
      break;
    case 'touchmove':
      this._container.style.transform = 'translate3d(' + (-position * 100) + 'vw, 0, 0)';
      break;
    case 'touchend':
      this._container.style.transition = '';
      var offset = Math.min(Math.max(velocity * 4, -0.5), 0.5);
      this.set(Math.round(position + offset));
      break;
    case 'transitionend':
      var i = this._slide, count = this._countSlides();
      if (i >= 0 && i < count) break;
      // The slides should wrap around. Instantly move to just outside screen on the other end.
      this._container.style.transition = 'none';
      this._container.style.transform = 'translate3d(' + (i < 0 ? -count * 100 : 100) + 'vw, 0, 0)';
      // Force changes to be applied sequentially by reflowing the element.
      this._container.offsetHeight;
      this._container.style.transition = '';
      this._container.offsetHeight;
      // Animate the first/last slide in.
      this.set(i < 0 ? count - 1 : 0);
      break;
  }
};

Carousel.prototype.next = function () {
  this.set(this._slide + 1);
};

Carousel.prototype.previous = function () {
  this.set(this._slide - 1);
};

Carousel.prototype.set = function (i) {
  var count = this._countSlides();
  if (i < 0) { i = -1; } else if (i >= count) { i = count; }
  this._slide = i;
  this._container.style.transform = 'translate3d(' + (-i * 100) + 'vw, 0, 0)';
  this._updateNav();
};

Carousel.prototype._countSlides = function () {
  return this._container.querySelectorAll('.slide').length;
};

Carousel.prototype._updateNav = function () {
  var html = '', count = this._countSlides();
  for (var i = 0; i < count; i++) {
    if (i > 0) html += '&nbsp;';
    html += '<a' +  (i == this._slide ? ' class="current"' : '') + ' data-slide="' + i + '" href="#">-</a>';
  }
  this._nav.innerHTML = html;
}

var carousels = Array.prototype.map.call(document.querySelectorAll('.carousel'), function (element) {
  var carousel = new Carousel(element);
  carousel.auto(5000);
  return carousel;
});