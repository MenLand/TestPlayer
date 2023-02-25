$(async () => {
	const $videos = $('.slider__wrapper .slider-slide video');

	await Promise.all(
		$videos.map(function () {
			return new Promise((res) => {
				$(this).on('loadedmetadata', res);
			});
		})
	);

	$videos.each(function () {
		$(this)
			.parent()
			.attr('data-swiper-autoplay', this.duration * 1000);
	});

	const swiper = new Swiper('.swiper', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		allowTouchMove: false,

		autoplay: {
			disableOnInteraction: false,
		},
		loop: true,
		on: {
			init: ({ realIndex }) => {
				const animationTime = $videos[realIndex].duration + 's';
				$('html')
					.get(0)
					.style.setProperty('--animation-duration', animationTime);
			},
		},
	});

	swiper.on('activeIndexChange', ({ realIndex }) => {
		$videos.each(function () {
			this.currentTime = 0;
			this.pause();
		});

		$videos[realIndex].play();
		const animationTime = $videos[realIndex].duration + 's';
		$('html')
			.get(0)
			.style.setProperty('--animation-duration', animationTime);
	});

	$('.sound').click(() => {
		$videos.each(function () {
			if (this.muted === false) {
				this.muted = true;
			} else {
				this.muted = false;
				// your code
			}
		});
	});
});
