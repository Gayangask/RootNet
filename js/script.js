// ===========================
// INIT AOS (Scroll Animations)
// ===========================
AOS.init({
	duration: 900,
	once: true,
	offset: 80,
});

// ===========================
// HAMBURGER MENU
// ===========================
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobileMenu");
var mobileClose = document.getElementById("mobileClose");

// Open menu when hamburger is clicked
hamburger.addEventListener("click", function () {
	mobileMenu.classList.add("open");
	document.body.style.overflow = "hidden"; // stop background scroll
});

// Close menu when X button is clicked
mobileClose.addEventListener("click", function () {
	mobileMenu.classList.remove("open");
	document.body.style.overflow = "";
});

// Close menu when any nav link inside mobile menu is clicked
var mobileLinks = document.querySelectorAll(".mobile-menu a");
for (var i = 0; i < mobileLinks.length; i++) {
	mobileLinks[i].addEventListener("click", function () {
		mobileMenu.classList.remove("open");
		document.body.style.overflow = "";
	});
}

// Close menu when clicking outside (on the dark overlay itself)
mobileMenu.addEventListener("click", function (e) {
	if (e.target === mobileMenu) {
		mobileMenu.classList.remove("open");
		document.body.style.overflow = "";
	}
});

// Close menu with Escape key
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
		mobileMenu.classList.remove("open");
		document.body.style.overflow = "";
	}
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
var navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
	if (window.scrollY > 60) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}

	// Back to top button visibility
	var backToTopBtn = document.getElementById("backToTop");
	if (window.scrollY > 400) {
		backToTopBtn.classList.add("show");
	} else {
		backToTopBtn.classList.remove("show");
	}
});

// ===========================
// BACK TO TOP BUTTON
// ===========================
var backToTopBtn = document.getElementById("backToTop");

backToTopBtn.addEventListener("click", function () {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounters() {
	var counters = document.querySelectorAll(".counter");

	for (var i = 0; i < counters.length; i++) {
		(function (counter) {
			var target = parseInt(counter.getAttribute("data-target"));
			var current = 0;
			var step = Math.ceil(target / 60);

			var timer = setInterval(function () {
				current += step;
				if (current >= target) {
					current = target;
					clearInterval(timer);
				}
				counter.textContent = current;
			}, 30);
		})(counters[i]);
	}
}

// Trigger counter only when stats section enters the viewport
var statsSection = document.querySelector(".stats-section");
var counted = false;

var statsObserver = new IntersectionObserver(
	function (entries) {
		if (entries[0].isIntersecting && !counted) {
			counted = true;
			animateCounters();
		}
	},
	{ threshold: 0.3 },
);

if (statsSection) {
	statsObserver.observe(statsSection);
}

// ===========================
// LOGIN / REGISTER BUTTON ALERT
// ===========================
var authButtons = document.querySelectorAll(".btn-login, .btn-register");

for (var j = 0; j < authButtons.length; j++) {
	authButtons[j].addEventListener("click", function () {
		alert(
			"🌿 Login / Register coming soon!\n\nThank you for your interest in RootNet.",
		);
	});
}
