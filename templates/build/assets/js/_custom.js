// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
	) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				} else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				}
			});
		}
	}
});	


// Copyright start
// © Code by T.RICKS, https://www.tricksdesign.com/
// You have the license to use this code in your projects but not redistribute it to others

// Find all text with .tricks class and break each letter into a span
var tricksWord = document.getElementsByClassName("tricks");
for (var i = 0; i < tricksWord.length; i++) {

	var wordWrap = tricksWord.item(i);
	wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
}

var tricksLetter = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksLetter.length; i++) {

	var letterWrap = tricksLetter.item(i);
	letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

}
// Copyright end





// Slide In Animation
var slideIn = anime.timeline({
	loop: false,
	autoplay: false,
});

slideIn
	.add({
		targets: '.slide-in .letter',
		opacity: [0, 1],
		easing: "easeInOutQuad",
		duration: 2250,
		delay: (el, i) => 150 * (i + 1)
	}).add({
		targets: '.slide-in',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});


// Slide Up Animation
var slideUp = anime.timeline({
	loop: false,
	autoplay: false,
});

slideUp
	.add({
		targets: '.slide-up .letter',
		translateY: ["1.1em", 0],
		opacity: [0, 1],
		translateZ: 0,
		duration: 750,
		delay: (el, i) => 50 * i
	}).add({
		targets: '.slide-up',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});


// Fade Up Animation
var fadeUp = anime.timeline({
	loop: false,
	autoplay: false,
});

fadeUp
	.add({
		targets: '.fade-up .letter',
		translateY: [100, 0],
		translateZ: 0,
		opacity: [0, 1],
		easing: "easeOutExpo",
		duration: 1400,
		delay: (el, i) => 300 + 30 * i

	});



// Rotate In Animation
var rotateIn = anime.timeline({
	loop: false,
	autoplay: false,
});

rotateIn
	.add({
		targets: '.rotate-in .letter',
		translateY: ["1.1em", 0],
		translateX: ["0.55em", 0],
		translateZ: 0,
		rotateZ: [180, 0],
		duration: 750,
		easing: "easeOutExpo",
		delay: (el, i) => 50 * i
	}).add({
		targets: '.rotate-in',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});


// Pop In Animation
var popIn = anime.timeline({
	loop: false,
	autoplay: false,
});

popIn
	.add({
		targets: '.pop-in .letter',
		scale: [0, 1],
		duration: 1500,
		elasticity: 600,
		delay: (el, i) => 45 * (i + 1)
	}).add({
		targets: '.pop-in',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});


// Play your animation with these
fadeUp.play();
slideUp.play();
slideIn.play();
rotateIn.play();
popIn.play();



// Wait before playing animation
setTimeout(() => {
	// Put the play below this line
}, 800);


// Play animaton when something is clicked
$(".your-button-class").click(function() {
	// Put the play below this line
});


// Play animaton when hovered in
$(".your-button-class").mouseenter(function() {
	// Put the play below this line
});

// Play animation when scrolled into view
$('#heading-container').on('inview', function(event, isInView) {
	if (isInView) {
		// Put the play below this line
	} else {}
});

// Play animation when scrolled into view
$('.hero-features').on('inview', function(event, isInView) {
	if (isInView) {

	} else {}
});




