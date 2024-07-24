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
        navbar.classList.remove('black');
        elements.forEach(element => {
            element.style.color = "white";
            element.addEventListener("mouseover", function() {
                this.style.transition = "color linear 0.2s";
                this.style.color = "gray";
            });
            element.addEventListener("mouseout", function() {
                this.style.transition = "color linear 0.2s";
                this.style.color = "";
            });
        });
    } else {
        navbar.classList.add('black');
        elements.forEach(element => {
            element.style.color = "black";
            element.addEventListener("mouseover", function() {
                this.style.transition = "color linear 0.2s";
                this.style.color = "gray";
            });
            element.addEventListener("mouseout", function() {
                this.style.transition = "color linear 0.2s";
                this.style.color = "black";
            });
        });
    }
}

window.addEventListener('scroll', toggleNavColor);

function goLoading(x, y) {
    window.location.href = x + '?redirectUrl=' + encodeURIComponent(y);
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const detectMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (detectMob === true && button) {
        button.remove();
    }
    window.addEventListener('scroll', function() {
        const msSection = document.getElementById('ms');
        const detectMobOnScroll = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (detectMobOnScroll === false && msSection && !isElementInViewport(msSection)) {
            if (button && !document.body.contains(button)) {
                document.body.appendChild(button);
            }
        } else {
            if (button && document.body.contains(button)) {
                button.remove();
            }
        }
    });
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const detectMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (detectMob === true) {
        const maxWidth = 768;
        function adjustCardPosition() {
            const cards = document.querySelectorAll('.card');
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            cards.forEach(function(card) {
                if (windowWidth <= maxWidth) {
                    card.style.marginLeft = 'auto';
                    card.style.marginRight = 'auto';
                    card.style.marginBottom = '100px'
                } else {
                    card.style.marginLeft = '';
                    card.style.marginRight = '';
                }
            });
            const socialMedias = document.querySelectorAll('.socialmedias');
            socialMedias.forEach(function(socialMedias) {
                if (windowWidth <= maxWidth) {
                    socialMedias.style.marginTop = '55vh';
                }
            });
            const displayPrices = document.querySelectorAll('#displayPrices');
            const plan1 = document.querySelectorAll('.plan1');
            const aboutChoice = document.querySelectorAll('#aboutChoice');
            const mostPopular = document.querySelectorAll('#mostPopular');
            const forPlan = document.querySelectorAll('#forPlan');
            displayPrices.forEach(function(displayPrices) {
                plan1.forEach(function(plan1) {
                    aboutChoice.forEach(function(aboutChoice) {
                        mostPopular.forEach(function(mostPopular) {
                            forPlan.forEach(function(forPlan) {
                                if (windowWidth <= maxWidth) {
                                    displayPrices.style.display = 'block';
                                    displayPrices.style.justifyContent = '';
                                    plan1.style.marginLeft = 'auto';
                                    plan1.style.marginRight = 'auto';
                                    plan1.style.marginBottom = '100px';
                                    aboutChoice.remove();
                                    mostPopular.style.marginRight = '';
                                    mostPopular.style.marginLeft = '150px';
                                    mostPopular.style.transform = '';
                                    forPlan.style.width = '300px';
                                    forPlan.style.marginLeft = 'auto';
                                    forPlan.style.marginRight = 'auto';
                                }
                            });
                        });
                    });
                });
            });
        }
        adjustCardPosition();
        window.addEventListener('resize', adjustCardPosition);
    }
});