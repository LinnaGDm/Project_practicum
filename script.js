document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('theme-selector');
    const showMoreButton = document.getElementById('show-more');
    const moreText = document.getElementById('more-text');
    const catSliders = document.querySelectorAll('.cat-slider');
    const prevButton = document.getElementById('cat-prev-btn');
    const nextButton = document.getElementById('cat-next-btn');

    if (!themeSelector || !showMoreButton || !moreText || !prevButton || !nextButton || catSliders.length === 0) {
        console.error("Не все элементы найдены!");
        return;
    }

    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(currentTheme);
        themeSelector.value = currentTheme === 'dark-theme' ? 'dark' : 'light';
    } else {
        document.body.classList.add('dark-theme');
        themeSelector.value = 'dark';
    }

    themeSelector.addEventListener('change', (e) => {
        const selectedTheme = e.target.value === 'dark' ? 'dark-theme' : 'light-theme';
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });

    showMoreButton.addEventListener('click', () => {
        if (moreText.style.display === 'none') {
            moreText.style.display = 'block';
            showMoreButton.textContent = 'Скрыть';
        } else {
            moreText.style.display = 'none';
            showMoreButton.textContent = 'Показать больше';
        }
    });

    let currentIndex = 0;

    function updateSlider() {
        catSliders.forEach((slider, index) => {
            slider.style.display = index === currentIndex ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : catSliders.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < catSliders.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    updateSlider();
});
