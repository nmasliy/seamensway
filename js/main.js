document.addEventListener('DOMContentLoaded', () => {

    function initMenu() {
        // vars
        const $html = document.querySelector('html');
        const $headerMenu = document.querySelector('.header__menu');
        const $headerBtn = document.querySelector('.header__menu-burger');
        const $headerCloseBtn = document.querySelector('.menu__close');
        const $headerOverlay = document.querySelector('.header__overlay');
        const transitionDelay = 400; 

        let isInit = false;

        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1100
            if (window.innerWidth <= 1100 && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', openMenu)
                $headerCloseBtn.addEventListener('click', closeMenu)
                $headerOverlay.addEventListener('click', closeMenu);
            } else {
                window.addEventListener('resize', checkScreenWidth);
            }
        }

        checkScreenWidth();

        function openMenu() {
            $headerMenu.classList.add('active');
            $html.classList.add('overflow-hidden');
            $headerOverlay.style.display = 'block';

            setTimeout(function() {
                $headerOverlay.classList.add('active');
                hideScroll();
            }, 50)
        }

        function closeMenu() {
            $headerOverlay.classList.remove('active');
            
            setTimeout(function() {
                $headerOverlay.style.display = '';
                $headerMenu.classList.remove('active');
                $html.classList.remove('overflow-hidden');
            }, transitionDelay)
        }
    }

    function initShowButtons() {
        const $chatBtn = document.querySelector('.b24-widget-button-wrapper');
        const $telBtn = document.querySelector('.phone-button');

        if (window.innerWidth <= 600) {
            initButton($chatBtn);
            initButton($telBtn);
        }

        function initButton(button) {
            if (button) {
                window.addEventListener('scroll', function(e) {
                    toggleItemVisibility(button);
                })
            }
        }


        function toggleItemVisibility(item) {
            if (window.pageYOffset > 600) {
                item.style.opacity = '1';
            } else {
                item.style.opacity = '';
            }
        }
    }

    function initWavesAnimations() {
        let offset = window.pageYOffset; 
        let step = 20;
        let unit = 'px';
        let position = -20;
        let position2 = -50;
        let position3 = -20;
        let animatedScreenHeight = 700;

        let minPosition = -50;
        let minPosition2 = -50;
        let minPosition3 = -5;

        let maxWidth = 689;
        let maxWidth2 = 462;
        let maxWidth3 = 327;
        
        let heroWave = document.querySelectorAll('.hero__wave')[0];
        let heroWave2 = document.querySelectorAll('.hero__wave')[1];
        let heroWave3 = null;

        if (window.innerWidth <= 600) {
            step = 6;
            animatedScreenHeight = 450;
            heroWave = document.querySelectorAll('.hero__wave-mob')[0];
            heroWave2 = document.querySelectorAll('.hero__wave-mob')[1];
            heroWave3 = document.querySelectorAll('.hero__wave-mob')[2]
            
            minPosition = -5;
            minPosition2 = -5;
            minPosition3 = -5;
            
            maxWidth = 338;
            maxWidth2 = 278;
            
            position = minPosition;
            position2 = minPosition2;
            position3 = minPosition3;
        }
        else if (window.innerWidth <= 1100) {
            unit = '%';
            step = 1;
            position = -19;
            position2 = -40;
        }
        
        window.addEventListener('scroll', function(e) {
            if (window.pageYOffset < animatedScreenHeight) {
                if (maxWidth <= position) step = -step;
                if (maxWidth2 <= position2) step = -step;
                if (maxWidth3 <= -position3) step = -step;

                if (position > 0) position = minPosition;
                if (position2 > 0) position2 = minPosition2;
                if (position3 > 0) position3 = minPosition3;

                if (window.pageYOffset > offset) {
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    position -= step;
                    position2 -= step / 1.5;
                    if (heroWave3) {
                        position3 -= step;
                        heroWave3.style.left = position3 + unit;
                    }
                } else {
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    position += step;
                    position2 += step / 1.5;
                    if (heroWave3) {
                        position3 += step;
                        heroWave3.style.left = position3 + unit;
                    }
                }
    
                if (window.pageYOffset <= 60) {
                    // Плавно возвращаем на место волны, когда скроллим снизу вверх
                    heroWave.style.transition = '.7s ease';
                    heroWave2.style.transition = '.7s ease';
                    heroWave3.style.transition = '.7s ease';
                    position = minPosition;
                    position2 = minPosition2;
                    position3 = minPosition3;
                    setTimeout(function() {
                        heroWave.style.transition = '';
                        heroWave2.style.transition = '';
                        heroWave3.style.transition = '';
                    }, 750)
                }
                offset = window.pageYOffset; 
            }

        })
    }

    function initMainSlider() {

        const nextArrow = document.querySelector('.main-slider__button-next');
        const prevArrow = document.querySelector('.main-slider__button-prev');

        const slider = new Swiper('.main-slider__inner', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: ".main-slider__button-next",
                prevEl: ".main-slider__button-prev",
            },
            breakpoints: {
                320: {
                },
                600: {
                },
                1025: {
                },
            },
        })
    }

    function initPhoneMasks() {
        const $phones = document.querySelectorAll('.phone-mask');

        $phones.forEach(item => {
            IMask(item, {
                mask: '+{38\\0}(00)000-00-00',
            });
        })
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');

        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true, 
                awaitCloseAnimation: true, 
                disableScroll: true
            });
        }
    }

    function disableTransitionsBeforePageLoading() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        }
    }

    function initCertificatesTabs() {
        const $tabs = document.querySelectorAll('.certificates__tabs-titles>li');

        if ($tabs.length > 0) {
            if (window.innerWidth <= 768) {
                const $content = document.querySelector('.certificates__tabs-content-wrapper');
                const $contentList = $content.querySelector('.certificates__tabs-content-list');
                const $contentItems = $content.querySelectorAll('.certificates__tabs-content');

                $content.classList.add('swiper-container');
                $contentList.classList.add('swiper-wrapper');
                $contentItems.forEach(item => {
                    item.classList.add('swiper-slide');
                    item.classList.remove('active');
                })

                const $titlesWrapper = document.querySelector('.certificates__tabs-titles-wrapper');
                const $titlesList = $titlesWrapper.querySelector('.certificates__tabs-titles');

                $titlesWrapper.classList.add('swiper-container');
                $titlesList.classList.add('swiper-wrapper');
                
                $tabs.forEach(item => {
                    item.classList.add('swiper-slide');
                    item.classList.remove('active');
                })
                var swiper2 = new Swiper(".certificates__tabs-titles-wrapper", {
                    simulateTouch: false,
                    touchRatio: 0,
                });
                var swiper = new Swiper(".certificates__tabs-content-wrapper", {
                    spaceBetween: 12,
                    slidesPerView: 1.2,
                    centeredSlides: true,
                    slidesOffsetBefore: -10,
                    thumbs: {
                        swiper: swiper2,
                    },
                });
                $titlesWrapper.style.transform = 'none';
                swiper.on('beforeSlideChangeStart', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper.on('slideChange', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper.on('setTranslate', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper.on('beforeTransitionStart', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper.on('tap', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper.on('touchmove', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('beforeSlideChangeStart', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('slideChange', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('setTranslate', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('beforeTransitionStart', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('tap', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                swiper2.on('touchmove', function() {
                    $titlesWrapper.style.transform = 'none';
                })
                
            } else {
                $tabs.forEach(tab => {
                    tab.addEventListener('click', function(e) {
                        e.preventDefault();
    
                        const activeTab = document.querySelector('.certificates__tabs-titles>li.active');
                        const activeContent = document.querySelector('.certificates__tabs-content.active');
    
                        const id = tab.getAttribute('data-tab');
    
                        if (activeTab) {
                            activeTab.classList.remove('active');
                            activeContent.classList.remove('active');
                        }
                        const content = document.querySelector('.certificates__tabs-content[data-tab="'+id+'"]');
                        
                        tab.classList.add('active');
                        content.classList.add('active');
                    })
                })
            }
        }
    }

    function initScrollBar() {
        document.querySelectorAll('.certificates__tabs-content').forEach(item => new SimpleBar(item))
    }

    function initButtonsAnimations() {
        const buttons = document.querySelectorAll('.btn-animated');

        forEach = Array.prototype.forEach;

        if (buttons.length > 0) {
            forEach.call(buttons, function (b) {
                b.addEventListener('click', addElement);
            });
        }
        
        function addElement(e) {
            var addDiv  = document.createElement('div'),
                mValue  = Math.max(this.clientWidth, this.clientHeight),
                rect    = this.getBoundingClientRect();
                sDiv    = addDiv.style,
                px      = 'px';

            sDiv.width  = sDiv.height = mValue + px;
            sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
            sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;


            addDiv.classList.add('pulse');
            this.appendChild(addDiv);
        }

        function initCursor() {
            var cursor = document.querySelector('.cursor');
            var cursorInner = document.querySelector('.cursor-inner');

            buttons.forEach(btn => {
                
                btn.addEventListener('mousemove', function(e){
                    const clientX = e.clientX;
                    const clientY = e.clientY;
                    cursor.style.left = clientX + 'px';
                    cursor.style.top = clientY + 'px';
                    cursorInner.style.left = clientX + 'px';
                    cursorInner.style.top = clientY + 'px';

                    

                });
                btn.addEventListener('mouseover', function(e){
                    cursor.classList.add('hover');
                    cursorInner.classList.add('hover');
                    if (btn.classList.contains('btn-animated--black')) {
                        cursor.classList.add('black');
                    }
                });
                btn.addEventListener('mouseleave', function(e){
                    cursor.classList.remove('hover');
                    cursorInner.classList.remove('hover');
                    if (btn.classList.contains('btn-animated--black')) {
                        cursor.classList.remove('black');
                    }
                });
            })
        }
        if (window.innerWidth > 1100) {
            initCursor();
        }
    }

    function initDynamicAdapt() {
        const da = new DynamicAdapt("max");  
        da.init();
    }

    disableTransitionsBeforePageLoading();
    
    initDynamicAdapt()
    initPhoneMasks();
    initModals();
    initScrollBar();
    initWavesAnimations()

    initMenu();
    initMainSlider();
    initCertificatesTabs();
    initButtonsAnimations();
    initShowButtons();
})