const menuItems = Array.from(document.querySelectorAll('.about-item, .game-item, .music-item, .hobby-item'));

menuItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        const href = item.querySelector('a')?.getAttribute('href') || '#';
        const isDropdownItem = item.classList.contains('game-item') || item.classList.contains('music-item');

        if (!isDropdownItem) {
            event.preventDefault();
        }

        menuItems.forEach((other) => {
            other.classList.remove('active');
            const dropdown = other.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.remove('is-open');
            }
        });

        item.classList.add('active');

        if (isDropdownItem) {
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) {
                window.setTimeout(() => {
                    dropdown.classList.add('is-open');
                }, 450);
            }
        } else if (href && href !== '#') {
            window.setTimeout(() => {
                window.location.href = href;
            }, 650);
        }
    });
});

// 背景動画をスクロールに応じてフェードアウトさせる
(function() {
    const video = document.getElementById('bg-video');
    const hero = document.querySelector('.hero');
    const headerOverlay = hero && hero.querySelector('.owheader');
    if (!video || !hero) return;

    let ticking = false;

    function update() {
        const rect = hero.getBoundingClientRect();
        const heroHeight = rect.height;
        const scrolled = Math.max(0, -rect.top);
        const ratio = Math.min(1, scrolled / (heroHeight * 0.8));
        const opacity = Math.max(0, 1 - ratio);
        video.style.opacity = opacity;
        if (headerOverlay) headerOverlay.style.opacity = opacity;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // 初期状態をセット
    update();
})();

// トレーサーのアビリティ切り替え
(function() {
    const buttons = Array.from(document.querySelectorAll('.ability-button'));
    const panels = Array.from(document.querySelectorAll('.ability-panel'));

    if (!buttons.length || !panels.length) return;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            buttons.forEach((item) => {
                item.classList.toggle('is-active', item === button);
            });

            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.id === targetId);
            });
        });
    });
})();


