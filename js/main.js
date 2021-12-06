document.addEventListener('DOMContentLoaded', () => {

    function initMenu() {
        // vars
        const $html = document.querySelector('html');
        const $headerMenu = document.querySelector('.header__menu');
        const $headerBtn = document.querySelector('.header__menu-burger');
        const $headerCloseBtn = document.querySelector('.menu__close');

        let isInit = false;

        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1100
            if (window.innerWidth <= 1100 && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', openMenu)
                $headerCloseBtn.addEventListener('click', closeMenu)
            } else {
                window.addEventListener('resize', checkScreenWidth);
            }
        }

        checkScreenWidth();

        function openMenu() {
            $headerMenu.classList.add('active');
            $html.classList.add('overflow-hidden');
        }

        function closeMenu() {
            $headerMenu.classList.remove('active');
            $html.classList.remove('overflow-hidden');
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

        let heroWave = document.querySelectorAll('.hero__wave')[0];
        let heroWave2 = document.querySelectorAll('.hero__wave')[1];
        let heroWave3 = null;

        if (window.innerWidth <= 600) {
            step = 3;
            animatedScreenHeight = 450;
            heroWave = document.querySelectorAll('.hero__wave-mob')[0];
            heroWave2 = document.querySelectorAll('.hero__wave-mob')[1];
            heroWave3 = document.querySelectorAll('.hero__wave-mob')[2]
            position = -20;
            position2 = -20;
        }
        else if (window.innerWidth <= 1100) {
            unit = '%';
            step = 1;
            position = -19;
            position2 = -40;
        }
        
        window.addEventListener('scroll', function(e) {
            if (window.pageYOffset < animatedScreenHeight) {
                if (position > 0) position = -50;
                if (position2 > 0) position2 = -50;
                if (position3 > -15) position3 = -20;

                if (window.pageYOffset > offset) {
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    position -= step;
                    position2 -= step / 1.5;
                    if (heroWave3) {
                        position3 -= step * 1.2;
                        heroWave3.style.left = position3 + unit;
                    }
                } else {
                    heroWave.style.left = position + unit;
                    heroWave2.style.right = position2 + unit;
                    position += step;
                    position2 += step / 1.5;
                    if (heroWave3) {
                        position3 += step * 1.2;
                        heroWave3.style.left = position3 + unit;
                    }
                }
    
                if (window.pageYOffset <= 60) {
                    position = -50;
                    position2 = -50;
                    position3 = -20;
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
        const $tabsContents = document.querySelectorAll('.certificates__tabs-content');

        if ($tabs.length > 0) {
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
})