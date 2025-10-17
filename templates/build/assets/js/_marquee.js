(function() {
	function setupMarquee(root) {
		var speed = Number(root.getAttribute('data-speed')) || 80; // px/sec
		var track = root.querySelector('.marquee__track');
		if (!track) {
			return;
		}

		// Duplicate items for seamless looping
		var children = Array.prototype.slice.call(track.children);
		var frag = document.createDocumentFragment();
		children.forEach(function(el) {
			var clone = el.cloneNode(true);
			clone.setAttribute('aria-hidden', 'true');
			clone.tabIndex = -1;
			frag.appendChild(clone);
		});
		track.appendChild(frag);

		// Measure width and compute animation
		function measure() {
			var setWidth = track.scrollWidth / 2;
			var duration = setWidth / speed; // seconds
			track.style.animationDuration = duration + 's';

			// Set keyframes dynamically for precise translation
			var styleTag = document.getElementById('marquee-dynamic');
			if (styleTag) {
				styleTag.remove();
			}

			styleTag = document.createElement('style');
			styleTag.id = 'marquee-dynamic';
			styleTag.textContent =
				'@keyframes scroll { to { transform: translateX(-' + setWidth + 'px); } }';
			document.head.appendChild(styleTag);
		}

		measure();
		var resizeTimer;
		window.addEventListener('resize', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(measure, 100);
		}, { passive: true });
	}

	var marquees = document.querySelectorAll('.marquee');
	Array.prototype.forEach.call(marquees, setupMarquee);
})();