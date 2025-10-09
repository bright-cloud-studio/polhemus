$(function () {
	let moved = false;

	$(".navbar_menu-button").on("click", function () {
		
		$('.menu-icon_component').toggleClass('active');
		
		if (!moved) {
			// OPEN: move in and slide down
			$(".navbar_menu")
				.appendTo(".nav-overlay")
				.attr("data-nav-menu-open", "")
				.hide()
				.slideDown(300);

			$(".nav-overlay").css({
				display: "block",
				height: $(window).height() + "px"
			});

			moved = true;
		} else {
			$(".navbar_menu").stop(true, true).slideUp(300, function () {
				$(".nav-overlay").css({ display: "none", height: "" });
			
				setTimeout(() => {
					$(this)
						.appendTo(".navbar_container-interaction")
						.removeAttr("data-nav-menu-open"); // keep hidden for next open
				}, 100);
			
				moved = false;
			});
		}
	});
});

function bindDropdownEvents() {
 const $dropdowns = $(".navbar_menu-dropdown");

 // Remove old events before rebinding
 $dropdowns.off();

 if ($(window).width() < 992) {
	 // --- Mobile: click ---
	 $dropdowns.on("click", function (e) {
		 e.stopPropagation(); // prevent bubbling
		 const $dropdown = $(this);
		 const $toggle = $dropdown.find(".navbar_dropdown-toggle");
		 const $list = $dropdown.find(".navbar_dropdown-list");
		 const $icon = $dropdown.find(".dropdown-icon");

		 if ($dropdown.hasClass("open")) {
			 // Close it
			 $list.fadeOut(200, function () {
				 $list.removeClass("open");
				 $toggle.removeClass("open");
				 $dropdown.removeClass("open");
				 $icon.css({
					 transform: "rotate(0deg)",
					 transition: "transform 0.3s ease"
				 });
			 });
		 } else {
			 // Open it
			 $dropdown.addClass("open");
			 $toggle.addClass("open");
			 $list.stop(true, true).addClass("open").fadeIn(200);
			 $icon.css({
				 transform: "rotate(180deg)",
				 transition: "transform 0.3s ease"
			 });
		 }
	 });

	 // Close if clicking outside
	 $(document).on("click", function () {
		 $dropdowns.find(".navbar_dropdown-list").fadeOut(200);
		 $dropdowns.removeClass("open").find(".open").removeClass("open");
		 $(".dropdown-icon").css({ transform: "rotate(0deg)" });
	 });
 } else {
	 // --- Desktop: hover ---
	 $dropdowns.hover(
		 function () {
			 const $dropdown = $(this);
			 const $toggle = $dropdown.find(".navbar_dropdown-toggle");
			 const $list = $dropdown.find(".navbar_dropdown-list");
			 const $icon = $dropdown.find(".dropdown-icon");

			 $dropdown.addClass("open");
			 $toggle.addClass("open");
			 $list.stop(true, true).addClass("open").fadeIn(200);
			 $icon.css({
				 transform: "rotate(180deg)",
				 transition: "transform 0.3s ease"
			 });
		 },
		 function () {
			 const $dropdown = $(this);
			 const $toggle = $dropdown.find(".navbar_dropdown-toggle");
			 const $list = $dropdown.find(".navbar_dropdown-list");
			 const $icon = $dropdown.find(".dropdown-icon");

			 $list.stop(true, true).fadeOut(200, function () {
				 $list.removeClass("open");
				 $toggle.removeClass("open");
				 $dropdown.removeClass("open");
				 $icon.css({
					 transform: "rotate(0deg)",
					 transition: "transform 0.3s ease"
				 });
			 });
		 }
	 );
 }
}

// Run on load + resize
$(document).ready(bindDropdownEvents);
$(window).on("resize", function () {
 bindDropdownEvents();
});