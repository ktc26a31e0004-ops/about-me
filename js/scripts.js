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
