const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		// !!! спред оператор - раскидывает елементы без необходимости обращения к каждому элементу отдально
		element.classList.add(...classNames);
	}
	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element
};

const createHeader = ({ 
		title, 
		header: { 
			logo, menu, social }, }) => {

	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	container.append(wrapper);
	header.append(container);

	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип: ' + title,
		});
		wrapper.append(logoElem);
	}

	if (menu) {
		const menuWrapper = getElement('nav', ['menu-list']);
		
		const allMenuItems = menu.map(item => {

			const menuItem = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});

			return menuItem
		});

		wrapper.append(menuWrapper)
		menuWrapper.append(...allMenuItems)

		const menuButton = getElement('button', ['menu-button']);
		container.append(menuButton);
		menuButton.addEventListener('click', () => {
			menuButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});

	}

	if (social) {
		const socialWrapper = getElement('div', ['social'])

		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link'], {
				href: item.link,
				target: '_blank',
			});
			
			socialLink.append(getElement('img', '', {
				src: item.image,
				alt: item.title,
			}));

			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	};

	return header;
};

const createMain = ({ 
	title, 
	main: { genre, rating, description, trailer, slider }, }) => {

	const main = getElement ('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper)
	const content = getElement('div', ['content']);
	wrapper.append(content)

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {textContent: genre})
		
		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
			})
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
			textContent: title
	}))

	if (description) {
		content.append(getElement('p', 
			['main-description', 'animated', 'fadeInRight'], 
			{textContent: description}
		));
	}

	if (trailer) {
		const youtubeLink = getElement('a', 
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер',
			}
		);

		const youtubeImageLink = getElement('a', 
			['play', 'youtube-modal'], 
			{
				href: trailer,
				ariaLibel: 'Смотреть трейлер'
			}
		);

		const iconPlay = getElement('img', ['play-img'], 
			{
				src: 'img/play.svg',
				alt: '',
				ariaHidden: true,
			}
		);
		
		youtubeImageLink.append(iconPlay);
		content.append(youtubeLink);
		wrapper.append(youtubeImageLink);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map(item => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: (item.subtitle || '') + (item.subtitle && item.title ? ' - ' : '') + (item.title || ''),
				// alt: (item.subtitle ? item.subtitle : '') + (item.subtitle && item.title ? ' - ' : '') + (item.title ? item.title : ''),
			})

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''} 
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}`;

				card.append(cardDescription);
			}
			swiperSlide.append(card);

			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

	return main;
};

const createFooter = ({ footer: { copyright, menu }}) => {
	const footer = getElement('footer');
	const container = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);
	const footerLeft = getElement('div', ['left']);
	const footerRight = getElement('div', ['right']);

	footer.append(container);
	container.append(footerContent);
	footerContent.append(footerLeft, footerRight);

	if (copyright) {
		footerLeft.append(getElement('span', ['copyright'], { textContent: copyright }));
	}
	
	if (menu) {
		const footerMenu = getElement('nav', ['footer-menu']);
		const allFooterMenuItems = menu.map(item =>
			getElement('a', ['footer-link'], {
				href: item.link,
				textContent: item.title,
			}))
		
		footerMenu.append(...allFooterMenuItems);
		footerRight.append(footerMenu);
	}

	return footer;
};

const moviConstructor = (selector, options) => {
	
	document.title = options.title;

	const app = document.body;
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	if (options.subColor)
		document.documentElement.style.setProperty('--sub-color', options.subColor);

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.')
		const type = options.favicon.substring(index + 1);
		
		const favicon = getElement('link', '', {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + ('svg' ? 'svg-xml' : type),
		});

		document.head.append(favicon);

	}

// Тернарный оператор, заменяет if в функциональном программировании
	app.style.backgroundImage = options.background ? `url('${options.background}')` : '';
	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if (options.footer) {
		app.append(createFooter(options));
	}

};

// moviConstructor('.app', {
// 	title: 'Ведьмак',
// 	background: 'witcher/background.jpg',
// 	favicon: 'witcher/logo.png',
// 	fontColor: '#ffffff',
// 	backgroundColor: '#141218',
// 	subColor: '#9d2929',

// 	header: {
// 		logo: 'witcher/logo.png',
// 		menu: [
// 			{
// 				title: 'Описание',
// 				link: '#'
// 			},
// 			{
// 				title: 'Трейлер',
// 				link: '#'
// 			},
// 			{
// 				title: 'Отзывы',
// 				link: '#'
// 			},
// 		],
// 		social: [
// 			{
// 				title: 'Twitter',
// 				link: 'https://twitter.com',
// 				image: 'witcher/social/twitter.svg',
// 			},
// 			{
// 				title: 'Instagram',
// 				link: 'https://instagram.com',
// 				image: 'witcher/social/instagram.svg',
// 			},
// 			{
// 				title: 'Facebok',
// 				link: 'https://facebook.com',
// 				image: 'witcher/social/facebook.svg',
// 			},
// 		]
// 	},

// 	main: {
// 		genre: '2019, фэнтези',
// 		rating: '8',
// 		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет 							этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
// 		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
// 		slider: [
// 			{
// 				img: 'witcher/series/series-1.jpg',
// 				title: 'Начало конца',
// 				subtitle: 'Серия №1',
// 			}, 
// 			{
// 				img: 'witcher/series/series-2.jpg',
// 				title: 'Четыре марки',
// 				subtitle: 'Серия №2',
// 			}, 
// 			{
// 				img: 'witcher/series/series-3.jpg',
// 				title: 'Предательская луна',
// 				subtitle: 'Серия №3',
// 			}, 
// 			{
// 				img: 'witcher/series/series-4.jpg',
// 				title: 'Банкеты, ублюдки и похороны',
// 				subtitle: 'Серия №4',
// 			}
// 		]
// 	},

// 	footer: {
// 		copyright: '© 2020 The Witcher. All right reserved.',
// 		menu: [
// 			{
// 				title: 'Privacy Policy',
// 				link: '#'
// 			},
// 			{
// 				title: 'Terms of Service',
// 				link: '#'
// 			},
// 			{
// 				title: 'Legal',
// 				link: '#'
// 			},
// 		],
// 	},
// });


// moviConstructor('.app', {
// 	title: 'Локи',
// 	background: 'loki/background.jpg',
// 	favicon: 'loki/favicon.png',
// 	fontColor: '#ffffff',
// 	backgroundColor: '#000000',
// 	subColor: '#014206',

// 	header: {
// 		logo: 'loki/logo.png',
// 		menu: [
// 			{
// 				title: 'Описание',
// 				link: '#'
// 			},
// 			{
// 				title: 'Трейлер',
// 				link: '#'
// 			},
// 			{
// 				title: 'Отзывы',
// 				link: '#'
// 			},
// 		],
// 		social: [
// 			{
// 				title: 'Twitter',
// 				link: 'https://twitter.com',
// 				image: 'loki/social/twitter.svg',
// 			},
// 			{
// 				title: 'Instagram',
// 				link: 'https://instagram.com',
// 				image: 'loki/social/instagram.svg',
// 			},
// 			{
// 				title: 'Facebok',
// 				link: 'https://facebook.com',
// 				image: 'loki/social/facebook.svg',
// 			},
// 		]
// 	},

// 	main : {
//         genre: '2021, фантастика, фэнтези, боевик, приключения',
//         rating: '8',
//         description: 'Локи попадает в таинственную организацию «Управление временными изменениями» после того, как он украл Тессеракт, и путешествует во времени, меняя историю.',
//         trailer: 'https://youtu.be/YrjHcYqe31g',
//         slider: [
//           {
//             img: 'loki/series/series-1.jpg',
//             title: 'Славная миссия',
//             subtitle: 'Серия №1',
//           }, 
//           {
//             img: 'loki/series/series-2.jpg',
//             title: 'Вариант',
//             subtitle: 'Серия №2',
//           }, 
//           {
//             img: 'loki/series/series-3.jpg',
//             title: 'Ламентис',
//             subtitle: 'Серия №3',
//           }, 
//           {
//             img: 'loki/series/series-4.jpg',
//             title: 'Смежное событие',
//             subtitle: 'Серия №4',
//           },
//           {
//             img: 'loki/series/series-5.jpg',
//             title: 'Путешествие в неизвестность',
//             subtitle: 'Серия №5',
//           },
//           {
//             img: 'loki/series/series-6.jpg',
//             title: 'На все времена. Всегда',
//             subtitle: 'Серия №6',
//           }
//         ]
//       },
// });

moviConstructor('.app', {
	title: 'Чёрная Вдова',
	background: 'BlackWidow/background.jpg',
	favicon: 'BlackWidow/logo.png',
	fontColor: '#000',
	backgroundColor: '#fff',
	subColor: '#ED1F24',

	header: {
		logo: 'BlackWidow/logo.png',
		menu: [
			{
				title: 'Описание',
				link: '#'
			},
			{
				title: 'Трейлер',
				link: '#'
			},
			{
				title: 'Отзывы',
				link: '#'
			},
		],
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'BlackWidow/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'BlackWidow/social/instagram.svg',
			},
			{
				title: 'Facebok',
				link: 'https://facebook.com',
				image: 'BlackWidow/social/facebook.svg',
			},
			{
				title: 'VKontakte',
				link: 'https://vk.com',
				image: 'BlackWidow/social/vk.svg',
			},
		]
	},

	main : {
        genre: '2021, фантастика, фэнтези, боевик, приключения',
        rating: '8',
        description: 'Наташе Романофф предстоит лицом к лицу встретиться со своим прошлым. Чёрной Вдове придется вспомнить о том, что было в её жизни задолго до присоединения к команде Мстителей, и узнать об опасном заговоре, в который оказываются втянуты её старые знакомые — Елена, Алексей (известный как Красный Страж) и Мелина.',
        trailer: 'https://youtu.be/W7Pl9s3ybvA',
        slider: [
          {
            img: 'BlackWidow/slider/01.jpg',
            title: '',
            subtitle: '',
          }, 
          {
            img: 'BlackWidow/slider/02.jpg',
            title: '',
            subtitle: '',
          }, 
          {
            img: 'BlackWidow/slider/03.jpg',
            title: '',
            subtitle: '',
          }, 
          {
            img: 'BlackWidow/slider/04.jpg',
            title: '',
            subtitle: '',
          },
          {
            img: 'BlackWidow/slider/05.jpg',
            title: '',
            subtitle: '',
          },
          {
            img: 'BlackWidow/slider/06.jpg',
            title: '',
            subtitle: '',
          }
        ]
      },
});

// пример функциии обертки...
const wrapper = (func) => {
	const cache = []
	return (...args) => {
		const result = func(...args);

		cache.push({
			[func.name + JSON.stringify(args)]: result
		});
		
		console.log('cache: ', cache);
		return result;
	}
};

const multy = (a, b) => a ** b;

const multyWrapper = wrapper(multy);

console.log(multyWrapper(5,3));
console.log(multyWrapper(5,5));
console.log(multyWrapper(3,3));
console.log(multyWrapper(3,5));
console.log(multyWrapper(2,3));
console.log(multyWrapper(2,2));