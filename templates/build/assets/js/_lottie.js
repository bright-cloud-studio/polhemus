$(function() {
	$('lottie-player').on('inview', function(event, isInView) {
		if (isInView) {
			// Element is visible
			this.play();
		} else {
			// Element is out of view
			this.stop();
		}
	});
});