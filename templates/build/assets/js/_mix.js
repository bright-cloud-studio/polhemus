var containerEl = document.querySelector('.mix-container');

if (containerEl) {
	var mixer = mixitup(containerEl, {
		multifilter: {
			enable: true
		},
		animation: {
			effects: 'fade translateZ(-100px)'
		}
	});
}