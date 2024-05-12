function openFile(path) {
    window.open(path, "_self");
}

function scrollToId(id) {
    const element = document.getElementById(id);
    let url = window.location.href;
    if (!element) {
        window.open(url.substring("./index.html", "_self"));
    }
    window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 60, behavior: 'smooth' });
}

function toggleNavColor() {
    let elements = document.querySelectorAll('li a');
    let navbar = document.querySelector('nav');
    const msElement = document.getElementById('ms');
    function isNavbarOverMs() {
        const navbarRect = navbar.getBoundingClientRect();
        const msRect = msElement.getBoundingClientRect();
        return navbarRect.top >= msRect.bottom;
    }
    if (!isNavbarOverMs()) {
        elements.forEach(element => {
            element.style.color = "white";
        });
    } else {
        elements.forEach(element => {
            element.style.color = "black";
        });
    }
}

window.addEventListener('scroll', toggleNavColor);