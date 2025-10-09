(function () {
	function parseVal(v) {
		if (v == null) { return undefined; }
		var s = String(v).trim().toLowerCase();
		if (s === 'true') { return true; }
		if (s === 'false') { return false; }
		if (!isNaN(+s)) { return +s; }
		return v;
	}

	function readAttr(el, name) {
		var v = el.getAttribute(name);
		if (v === null) { return undefined; }
		return parseVal(v);
	}

	document.addEventListener('DOMContentLoaded', function () {
		var sliders = document.querySelectorAll('.slider');
		for (var i = 0; i < sliders.length; i++) {
			var el = sliders[i];
			var opts = {};
			var json = el.getAttribute('data-slick');
			if (json) {
				try {
					opts = JSON.parse(json);
				} catch (e) {
					opts = {};
				}
			}

			// Only use individual data-* if no JSON
			if (!json) {
				var show = readAttr(el, 'data-slides-to-show');
				if (show !== undefined) { opts.slidesToShow = show; }

				var scroll = readAttr(el, 'data-slides-to-scroll');
				if (scroll !== undefined) { opts.slidesToScroll = scroll; }

				var infinite = readAttr(el, 'data-infinite');
				if (infinite !== undefined) { opts.infinite = infinite; }

				var autoplay = readAttr(el, 'data-autoplay');
				if (autoplay !== undefined) {
					if (autoplay === true) {
						opts.autoplay = true;
						opts.autoplaySpeed = 3000;
					} else if (typeof autoplay === 'number') {
						opts.autoplay = true;
						opts.autoplaySpeed = autoplay;
					} else {
						opts.autoplay = !!autoplay;
					}
				}

				var speed = readAttr(el, 'data-speed');
				if (speed !== undefined) { opts.speed = speed; }

				var fade = readAttr(el, 'data-fade');
				if (fade !== undefined) { opts.fade = fade; }

				var arrows = readAttr(el, 'data-arrows');
				if (arrows !== undefined) { opts.arrows = arrows; }

				var dots = readAttr(el, 'data-dots');
				if (dots !== undefined) { opts.dots = dots; }
				
				var rtl = readAttr(el, 'data-right');
				if (rtl !== undefined) { opts.rtl = rtl; }

				var adaptiveHeight = readAttr(el, 'data-adaptive-height');
				if (adaptiveHeight !== undefined) { opts.adaptiveHeight = adaptiveHeight; }

				var centerMode = readAttr(el, 'data-center-mode');
				if (centerMode !== undefined) { opts.centerMode = centerMode; }

				var variableWidth = readAttr(el, 'data-variable-width');
				if (variableWidth !== undefined) { opts.variableWidth = variableWidth; }

				var cssEase = readAttr(el, 'data-css-ease');
				if (cssEase !== undefined) { opts.cssEase = cssEase; }

				var pauseHover = readAttr(el, 'data-pause-on-hover');
				if (pauseHover !== undefined) { opts.pauseOnHover = pauseHover; }

				var pauseFocus = readAttr(el, 'data-pause-on-focus');
				if (pauseFocus !== undefined) { opts.pauseOnFocus = pauseFocus; }

				var draggable = readAttr(el, 'data-draggable');
				if (draggable !== undefined) { opts.draggable = draggable; }

				var swipe = readAttr(el, 'data-swipe');
				if (swipe !== undefined) { opts.swipe = swipe; }

				var responsive = el.getAttribute('data-responsive');
				if (responsive) {
					try {
						opts.responsive = JSON.parse(responsive);
					} catch (e2) {}
				}

				var appendArrows = el.getAttribute('data-append-arrows');
				if (appendArrows) {
					opts.appendArrows = document.querySelector(appendArrows) || appendArrows;
				}
				
				var appendDots = el.getAttribute('data-append-dots');
				if (appendDots) {
					opts.appendDots = document.querySelector(appendDots) || appendDots;
				}

				// Defaults
				if (opts.slidesToShow === undefined) { opts.slidesToShow = 1; }
				if (opts.slidesToScroll === undefined) { opts.slidesToScroll = 1; }
				if (opts.arrows === undefined) { opts.arrows = true; }
				if (opts.dots === undefined) { opts.dots = false; }
				if (opts.rtl === undefined) { opts.rtl = false; }
			}

			// Initialize Slick
			$(el).slick(opts);
		}
	});
})();