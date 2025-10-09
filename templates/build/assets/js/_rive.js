document.querySelectorAll(".rive").forEach((div) => {
	// Create a unique canvas inside each .rive container if one doesn't exist
	let canvas = div.querySelector("canvas");
	if (!canvas) {
		canvas = document.createElement("canvas");
		div.appendChild(canvas);
	}

	// Initialize Rive for this element
	const r = new rive.Rive({
		src: div.getAttribute("data-rive-url"),
		canvas: canvas,
		autoplay: div.getAttribute("data-rive-autoplay") === "true",
		artboard: div.getAttribute("data-rive-artboard"),
		stateMachines: div.getAttribute("data-rive-state-machine"),
		isTouchScrollEnabled:
			div.getAttribute("data-rive-is-touch-scroll-enabled") === "true",
		automaticallyHandleEvents:
			div.getAttribute("data-rive-automatically-handle-events") === "true",
		fit: div.getAttribute("data-rive-fit"),
		alignment: div.getAttribute("data-rive-alignment"),
		onLoad: () => {
			r.resizeDrawingSurfaceToCanvas();
		},
	});

	// Optionally store the instance on the div for later access
	div._riveInstance = r;
});