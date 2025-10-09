function num(el, name, fallback) {
	const v = el.getAttribute(name);
	return v == null || isNaN(+v) ? fallback : +v;
}

// Initialize each element with data-anim
$('[data-anim]').each(function () {
	const el = this;
	const dir = (el.getAttribute('data-anim') || '').toLowerCase();
	const dist = num(el, 'data-distance', 24);
	const dur = num(el, 'data-duration', 900);
	const dly = num(el, 'data-delay', 0);

	// Set initial transform based on direction
	let fromTransform = 'translate(0,0)';
	switch (dir) {
		case 'fade-right': fromTransform = `translateX(${dist}%)`; break;
		case 'fade-left':  fromTransform = `translateX(${-dist}%)`; break;
		case 'fade-up':    fromTransform = `translateY(${dist}%)`; break;
		case 'fade-down':  fromTransform = `translateY(${-dist}%)`; break;
		case 'fade':       fromTransform = 'none'; break; // just fade
	}
	el.style.transform = fromTransform;
	el.style.opacity = 0;

	const tl = anime.timeline({ autoplay: false, easing: 'easeOutCubic' });

	tl.add({
		targets: el,
		opacity: [0, 1],
		translateX:
			dir === 'fade-right' ? [dist, 0] :
			dir === 'fade-left'  ? [-dist, 0] : undefined,
		translateY:
			dir === 'fade-up'   ? [dist, 0] :
			dir === 'fade-down' ? [-dist, 0] : undefined,
		duration: dur,
		delay: dly,
		complete: () => {
			// store current opacity after anim finishes
			el.dataset.originalOpacity = getComputedStyle(el).opacity;
		}
	});

	$(el).data('tl', tl);

	// --- NEW: Fade in/out on hover if data-fade-hover is present ---
	if (el.hasAttribute('data-fade-hover')) {
		const hoverDur = num(el, 'data-fade-hover-duration', 300);
		const hoverTo = num(el, 'data-fade-hover-to', 0); // fade out completely by default

		el.style.transition = `opacity ${hoverDur}ms ease`;

		el.addEventListener('mouseenter', () => {
			el.style.opacity = 1;
		});

		el.addEventListener('mouseleave', () => {
			const orig = el.dataset.originalOpacity || hoverTo;
			el.style.opacity = orig;
		});
	}
});

// Play/reverse when in view / out of view
$('[data-anim]').on('inview', function (_e, inView) {
	const tl = $(this).data('tl');
	if (!tl) {
		return;
	}
	if (inView) {
		if (tl.reversed) {
			tl.reverse();
		}
		tl.play();
	} else {
		if (!tl.reversed) {
			tl.reverse();
		}
		if (typeof tl.seek === 'function' && typeof tl.duration === 'number') {
			tl.seek(tl.duration);
		}
		tl.play();
	}
});
	
$('[data-spinner]').each(function () {
	var el = this;

	// Create a unique Anime.js timeline per element
	var spin = anime({
		targets: el,
		rotateZ: [0, 900],
		duration: 1000,
		easing: 'easeInOutCubic',
		autoplay: false
	});

	// Listen for inview events for each .cross
	$(el).on('inview', function (event, isInView) {
		if (isInView) {
			if (spin.reversed) { spin.reverse(); }
			spin.play();
		} else {
			if (!spin.reversed) { spin.reverse(); }
			spin.play();
		}
	});
});

// Check initial state on load
$(window).trigger('scroll');

// Button Hover Bounce
var $buttons = $('.button');

$buttons.css({
	transform: 'scale(1)',
	'will-change': 'transform'
});

// Hover in: shrink briefly, then bounce back up automatically
$buttons.on('mouseenter', function () {
	var el = this;
	anime.remove(el);
	anime.timeline({
		targets: el,
		easing: 'easeOutCubic',
		duration: 100
	})
	.add({
		scale: 0.7,            // quick shrink
		duration: 200,
		easing: 'easeOutQuad'
	})
	.add({
		scale: 1,              // bounce back to normal
		duration: 800,
		easing: 'easeOutElastic(1, .4)'
	});
});

// Optional: reset cleanly on mouseleave
$buttons.on('mouseleave', function () {
	anime.remove(this);
	anime({
		targets: this,
		scale: 1,
		duration: 200,
		easing: 'easeOutCubic'
	});
});

// On leave: bounce back to normal
$buttons.on('mouseleave', function () {
	anime.remove(this);
	anime({
		targets: this,
		scale: 1,
		duration: 800,
		easing: 'easeOutElastic(1, .6)'  // springy bounce back
	});
});
	