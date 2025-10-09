document.querySelectorAll(".rive-scroll-section").forEach((div) => {
	// Ensure a canvas
	let canvas = div.querySelector("canvas");
	if (!canvas) {
		canvas = document.createElement("canvas");
		div.appendChild(canvas);
	}

	// Configurable data attrs
	const stateMachineName = div.getAttribute("data-rive-state-machine");
	const numberInputName  = div.getAttribute("data-rive-scroll-number") || "scroll-trigger";
	const triggerInputName = div.getAttribute("data-rive-enter-trigger"); // optional Trigger fired on first in-view of any target

	// Which elements should flip states?
	const sel1 = div.getAttribute("data-rive-trigger-1") || "[data-trigger-1]";
	const sel2 = div.getAttribute("data-rive-trigger-2") || "[data-trigger-2]";
	const threshold = Math.max(0, Math.min(1, parseFloat(div.getAttribute("data-rive-trigger-threshold") || "0.25")));

	// Gather targets (can be anywhere in the document)
	const targets1 = Array.from(document.querySelectorAll(sel1));
	const targets2 = Array.from(document.querySelectorAll(sel2));

	// Init Rive
	const r = new rive.Rive({
		src: div.getAttribute("data-rive-url"),
		canvas,
		autoplay: div.getAttribute("data-rive-autoplay") === "true",
		artboard: div.getAttribute("data-rive-artboard"),
		stateMachines: stateMachineName,
		isTouchScrollEnabled: div.getAttribute("data-rive-is-touch-scroll-enabled") === "true",
		automaticallyHandleEvents: div.getAttribute("data-rive-automatically-handle-events") === "true",
		fit: div.getAttribute("data-rive-fit"),
		alignment: div.getAttribute("data-rive-alignment"),
		onLoad: () => {
			r.resizeDrawingSurfaceToCanvas();

			// Inputs
			const inputs = r.stateMachineInputs(stateMachineName) || [];
			const numberInput = inputs.find(i => i.name === numberInputName && i.type === rive.StateMachineInputType.Number);

			let enterTrigger = null;
			if (triggerInputName) {
				enterTrigger = inputs.find(i => i.name === triggerInputName && i.type === rive.StateMachineInputType.Trigger);
			}

			if (!numberInput) {
				console.warn(`[Rive] Number input "${numberInputName}" not found on "${stateMachineName}".`);
				return;
			}

			// Visibility tracking
			const visible1 = new Set();
			const visible2 = new Set();
			let lastState = null;
			let hasFiredEnter = false;

			const recomputeState = () => {
				// Priority: any trigger-2 visible => 2; else if any trigger-1 visible => 1; else 0
				let state = 0;
				if (visible2.size > 0) {state = 2;}
				else if (visible1.size > 0) {state = 1;}

				if (state !== lastState) {
					numberInput.value = state; // 0 default, 1 devices enter, 2 devices leave / magnetic enters
					lastState = state;
				}

				// Optional one-shot trigger when *any* target becomes visible for the first time
				if (!hasFiredEnter && (visible1.size > 0 || visible2.size > 0) && enterTrigger) {
					enterTrigger.fire();
					hasFiredEnter = true;
				}
			};

			// Observer
			const io = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					const set = entry.target.hasAttribute("data-trigger-2") || entry.target.matches(sel2) ? visible2 : visible1;

					if (entry.isIntersecting) {set.add(entry.target);}
					else {set.delete(entry.target);}
				});
				recomputeState();
			}, { threshold });

			// Observe all targets
			targets1.forEach(el => io.observe(el));
			targets2.forEach(el => io.observe(el));

			// Initial compute (in case some are already in view)
			requestAnimationFrame(recomputeState);

			// Cleanup if node removed
			const mo = new MutationObserver(() => {
				if (!document.body.contains(div)) {
					io.disconnect();
					mo.disconnect();
				}
			});
			mo.observe(document.body, { childList: true, subtree: true });
		}
	});

	div._riveInstance = r;
});