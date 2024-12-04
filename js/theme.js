document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    function toggleTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        body.classList.toggle('dark-mode', !isDarkMode);
        body.classList.add('dark-mode-transition');

        setTimeout(() => {
            body.classList.remove('dark-mode-transition');
        }, 300);

        updateIcon(!isDarkMode);
    }

    function updateIcon(isDarkMode) {
        darkModeToggle.innerHTML = isDarkMode ? '🌙' : '☀️';
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    body.classList.toggle('dark-mode', isDarkMode);
    updateIcon(isDarkMode);

    darkModeToggle.addEventListener('click', toggleTheme);
});


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

document.addEventListener('copy', function (e) {
    e.preventDefault();
});