const menuItems = Array.from(document.querySelectorAll('.main-nav > li.dropdown'));

menuItems.forEach((item) => {
    const toggle = item.querySelector('.dropdown-toggle');
    const dropdown = item.querySelector('.dropdown-menu');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const shouldOpen = !dropdown.classList.contains('is-open');

        menuItems.forEach((other) => {
            const dropdown = other.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.remove('is-open');
            }
        });

        if (shouldOpen) dropdown.classList.add('is-open');
    });
});

const centerMenuItems = Array.from(document.querySelectorAll('.center-nav .main-nav > li'));

centerMenuItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        const link = item.querySelector(':scope > a');
        const href = link?.getAttribute('href') || '#';
        const isDropdownItem = item.classList.contains('dropdown');

        if (!isDropdownItem) event.preventDefault();

        centerMenuItems.forEach((other) => {
            other.classList.remove('active');
            other.querySelector('.dropdown-menu')?.classList.remove('is-open');
        });

        item.classList.add('active');

        if (isDropdownItem) {
            window.setTimeout(() => {
                item.querySelector('.dropdown-menu')?.classList.add('is-open');
            }, 450);
        } else if (href !== '#') {
            window.setTimeout(() => {
                window.location.href = href;
            }, 650);
        }
    });
});

document.querySelectorAll('.profile-card').forEach((card) => {
    const flipCard = () => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', String(isFlipped));
        card.setAttribute('aria-label', isFlipped ? '詳細を閉じる' : '詳細を表示');
    };

    card.addEventListener('click', flipCard);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            flipCard();
        }
    });
});

document.querySelectorAll('.music-card').forEach((card) => {
    const flipCard = () => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', String(isFlipped));
    };

    card.addEventListener('click', (event) => {
        if (event.target.closest('iframe')) return;
        flipCard();
    });
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            flipCard();
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

// ヒーローごとのアビリティ切り替え
(function() {
    document.querySelectorAll('.ability-switcher').forEach((switcher) => {
        const buttons = Array.from(switcher.querySelectorAll('.ability-button'));
        const panels = Array.from(switcher.querySelectorAll('.ability-panel'));

        if (!buttons.length || !panels.length) return;

        const firstButton = buttons[0];
        const firstTargetId = firstButton.getAttribute('data-target');
        buttons.forEach((button) => {
            button.classList.toggle('is-active', button === firstButton);
        });
        panels.forEach((panel) => {
            panel.classList.toggle('is-active', panel.id === firstTargetId);
        });

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
    });
})();


