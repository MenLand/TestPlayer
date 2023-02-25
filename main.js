$(async () => {
	const $videos = $('.slider__wrapper .slider-slide video');

	const swiper = new Swiper('.swiper', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
		allowTouchMove: false,
		on: {
			init: ({ realIndex }) => {
				$videos[realIndex].play();

				$($videos[realIndex]).on('timeupdate', ({ target }) => {
					updateVideoProgressLine(target);
				});

				$($videos[realIndex]).one('ended', () => {
					$($videos[realIndex]).off('timeupdate');
					swiper.slideNext();
				});
			},
		},
	});

	const updateVideoProgressLine = ({ duration, currentTime }) => {
		const percentage = `${(currentTime / duration) * 100}%`;
		$('html').get(0).style.setProperty('--video-width', percentage);
	};

	swiper.on('activeIndexChange', ({ realIndex }) => {
		$('html').get(0).style.setProperty('--video-width', 0);
		$videos.each(function () {
			$(this).off('timeupdate,ended');
			this.currentTime = 0;
			this.pause();
		});
		$videos[realIndex].play();

		$($videos[realIndex]).on('timeupdate', ({ target }) => {
			updateVideoProgressLine(target);
		});

		$($videos[realIndex]).one('ended', () => {
			$($videos[realIndex]).off('timeupdate');
			swiper.slideNext();
		});
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
