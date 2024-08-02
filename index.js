document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const msSection = document.getElementById('ms');

    // Function to check if the element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle button visibility based on scroll
    function handleButtonVisibility() {
        const detectMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (detectMob) {
            // If mobile device, make sure button is removed
            if (button && document.body.contains(button)) {
                button.remove();
            }
        } else {
            // If not mobile device
            if (msSection && !isElementInViewport(msSection)) {
                // Section is not in viewport, append button if it's not already there
                if (button && !document.body.contains(button)) {
                    document.body.appendChild(button);
                }
            } else {
                // Section is in viewport or button is not needed
                if (button && document.body.contains(button)) {
                    button.remove();
                }
            }
        }
    }

    // Remove the button on page load
    if (button) {
        button.remove();
    }

    // Check button visibility on scroll
    window.addEventListener('scroll', handleButtonVisibility);

    // Also check button visibility on page load in case user starts scrolling immediately
    handleButtonVisibility();
});

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
                    socialMedias.style.marginTop = '48vh';
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

            const div1 = document.querySelectorAll('#div1');
            const div2 = document.querySelectorAll('#div2');
            const rights = document.querySelectorAll('#rights');
            const footer = document.querySelectorAll('#footer');
            div1.forEach(function(div1) {
                div2.forEach(function(div2) {
                    rights.forEach(function(rights) {
                        footer.forEach(function(footer) {
                            if (windowWidth <= maxWidth) {
                                div1.remove();
                                div2.remove();
                                rights.style.padding = '0';
                                rights.style.paddingBottom = '50px';
                                footer.style.textAlign = 'center';
                            }
                        });
                    });
                });
            });
        }
        adjustCardPosition();
        window.addEventListener('resize', adjustCardPosition);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const titleElements = document.querySelectorAll('.about');
    const titleElements2 = document.querySelectorAll('.card');
    const titleElements3 = document.querySelectorAll('.contactus');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });

    titleElements.forEach(element => {
        observer.observe(element);
    });
    titleElements2.forEach(element => {
        observer.observe(element);
    });
    titleElements3.forEach(element => {
        observer.observe(element);
    });
});

window.addEventListener('load', function() {
    document.getElementById('animated-text').classList.add('visible');
});