const detailsList = document.querySelectorAll('details');

if (detailsList) {
	const closeSmooth = (details, content) => {
		if (!details.open) { return; }
	
		const current = getComputedStyle(content).height;
		content.style.height = current;
		void content.offsetHeight; // force reflow
		content.style.height = '0px';
	
		const onEnd = (e) => {
			if (e.propertyName !== 'height') { return; }
			details.open = false;
			content.removeEventListener('transitionend', onEnd);
		};
		content.addEventListener('transitionend', onEnd);
	};
	
	const openSmooth = (details, content) => {
		const end = content.scrollHeight;
		content.style.height = '0px';
		void content.offsetHeight; // force reflow
		content.style.height = end + 'px';
	
		const onEnd = (e) => {
			if (e.propertyName !== 'height') { return; }
			content.style.height = 'auto';
			content.removeEventListener('transitionend', onEnd);
		};
		content.addEventListener('transitionend', onEnd);
	};
	
	// --- Main accordion logic ---
	
	detailsList.forEach((details) => {
		const summary = details.querySelector('summary');
		const content = details.querySelector('.content');
		if (!summary || !content) { return; }
	
		if (details.open) { content.style.height = 'auto'; }
	
		// Smooth OPEN
		details.addEventListener('toggle', () => {
			if (!details.open) { return; }
			openSmooth(details, content);
	
			// Single-open behavior with smooth closes
			detailsList.forEach((other) => {
				if (other !== details && other.open) {
					const otherContent = other.querySelector('.content');
					if (otherContent) { closeSmooth(other, otherContent); }
				}
			});
		});
	
		summary.addEventListener('click', (e) => {
			if (!details.open) { return; }
			e.preventDefault();
			closeSmooth(details, content);
		});
	});
}