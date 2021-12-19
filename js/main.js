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
            }, 50)
        }

        function closeMenu() {
            $headerOverlay.classList.remove('active');
            $headerMenu.classList.remove('active');
            $html.classList.remove('overflow-hidden');
            
            setTimeout(function() {
                $headerOverlay.style.display = '';
            }, transitionDelay)
        }
    }

    function initShowButtons() {
        const $chatBtn = document.querySelector('.chat-button');
        const $telBtn = document.querySelector('.phone-button');

        $telBtn.classList.add('hidden');
        $chatBtn.classList.add('hidden');

        if (window.innerWidth <= 600) {
            initButton($chatBtn);
            initButton($telBtn);
        } else {
            if ($chatBtn) {
                $chatBtn.classList.remove('hidden');
            }
            if ($telBtn) {
                $telBtn.classList.remove('hidden');
            }
        }

        function initButton(button) {
            if (button) {
                window.addEventListener('scroll', function(e) {
                    toggleItemVisibility(button);
                })
            }
        }

        function toggleItemVisibility(item) {
            if (window.pageYOffset > 200) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    }
    function initWavesAnimations() {
        const hero = document.querySelector('.hero');
        
        let offset = window.pageYOffset; 
        let baseStep = 90;
        let step = baseStep;
        let step2 = baseStep;
        let step3 = baseStep;

        let unit = 'px';
        let position = -20;
        let position2 = -50;
        let position3 = -20;

        let minPosition = -50;
        let minPosition2 = -50;
        let minPosition3 = -5;

        let maxWidth = 2525;
        let maxWidth2 = 1820;
        let maxWidth3 = 310;
        
        let heroWave = document.querySelectorAll('.hero__wave')[0];
        let heroWave2 = document.querySelectorAll('.hero__wave')[1];
        let heroWave3 = null;

        let title = document.querySelector('.hero__title');
        let titleStep = 8;
        let titlePosition = 0;
        let maxTitleOffset = 200;

        // Setup on other screens 
        if (window.innerWidth <= 600) {
            unit = 'px';
            baseStep = 20;
            step = baseStep;
            step2 = baseStep;
            step3 = baseStep;

            heroWave = document.querySelectorAll('.hero__wave-mob')[0];
            heroWave2 = document.querySelectorAll('.hero__wave-mob')[1];
            heroWave3 = document.querySelectorAll('.hero__wave-mob')[2]
            titleStep = 6;
            
            minPosition = -5;
            minPosition2 = -5;
            minPosition3 = -5;
            
            maxWidth = 360;
            maxWidth2 = 336;
        }
        else if (window.innerWidth <= 1100) {
            unit = '%';
            baseStep = 7;
            step = baseStep;
            step2 = baseStep;

            minPosition = -19;
            minPosition2 = -40;
            
            maxWidth = 330;
            maxWidth2 = 270;
        }

        // Tablet - touch events animation
        if (window.innerWidth <= 1024) {
            baseStep = 100;
            step = baseStep;
            step2 = baseStep;
            step3 = baseStep;
            let maxTitleOffset = 80;

            titleStep = 20;

            let currentY, lastY;
        
            hero.addEventListener('touchstart', function(e) {
                currentY = e.touches[0].clientY;
            })
            hero.addEventListener('touchend', function(e) {
                lastY = e.changedTouches[0].clientY;

                if(currentY > lastY + 5){
                    if (-maxWidth <= position) {
                        heroWave.style.left = position + unit;
                        position -= step;
                    }
                    if (-maxWidth2 <= position2) {
                        heroWave2.style.right = position2 + unit;
                        position2 -= step / 1.5;
                    }
                    if (titlePosition <= maxTitleOffset) {
                        title.style.bottom = -titlePosition + 'px';
                        titlePosition += titleStep;
                    } else {
                        document.body.classList.remove('overflow-hidden');
                    }
                    if (heroWave3 && -maxWidth3 <= position3) {
                        heroWave3.style.left = position3 + unit;
                        position3 -= step;
                    }

                } else if(currentY < lastY - 5){
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    title.style.bottom = -titlePosition + 'px';

                    if (titlePosition > 0) {
                        titlePosition -= titleStep;
                    }
                    if (position2 < minPosition2 && position2 + step < 0) {
                        position2 += step / 1.5;
                    }
                    if (position < minPosition && position + step < 0) {
                        position += step;
                    }
                    if (heroWave3 && position3 < minPosition3 && position3 + step < 0) {
                        position3 += step;
                        heroWave3.style.left = position3 + unit;
                    }
                }
            })
        } 
        // Desktop - mousewheel events animation
        else {
            hero.addEventListener('wheel', function(e) {
                if (e.deltaY > 0) {
                    if (-maxWidth <= position) {
                        heroWave.style.left = position + unit;
                        position -= step;
                    }
                    if (-maxWidth2 <= position2) {
                        heroWave2.style.right = position2 + unit;
                        position2 -= step / 1.5;
                    }
                    if (titlePosition <= maxTitleOffset) {
                        title.style.bottom = -titlePosition + 'px';
                        titlePosition += titleStep;
                    } else {
                        document.body.classList.remove('overflow-hidden');
                    }
                    if (heroWave3 && -maxWidth3 <= position3) {
                        heroWave3.style.left = position3 + unit;
                        position3 -= step;
                    }
                } else {
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    title.style.bottom = -titlePosition + 'px';
    
                    if (titlePosition > 0) {
                        titlePosition -= titleStep;
                    }
                    if (position2 < minPosition2 && position2 < 0) {
                        position2 += step / 1.5;
                    }
                    if (position < minPosition && position < 0) {
                        position += step;
                    }
                    if (heroWave3 && position3 < minPosition3 && position3 < 0) {
                        position3 += step;
                        heroWave3.style.left = position3 + unit;
                    }
                }
            })
        }
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

                var swiper = new Swiper(".certificates__tabs-content-wrapper", {
                    spaceBetween: 12,
                    slidesPerView: 1.2,
                    centeredSlides: true,
                    slidesOffsetBefore: -30,
                });

                $tabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        swiper.slideTo(+tab.dataset.tab - 1);
                    })
                })

                swiper.on('slideChange', function (e) {
                    const activeItem = e.slides[e.activeIndex].dataset.tab;
                    const activeTitle = document.querySelector('.certificates__tabs-titles>li[data-tab="'+activeItem+'"]');
                    $tabs.forEach(tab => {
                        tab.classList.remove('active');
                    })
                    activeTitle.classList.add('active');
                });
                
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
    }

    function initDynamicAdapt() {
        const da = new DynamicAdapt("max");  
        da.init();
    }

    function scrollTopBeforePageLoading() {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }

    scrollTopBeforePageLoading();
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