function goTo(link) {
    window.location.href = link;
}

function scrollToSection(sectionId) {
    let targetSection = document.getElementById(sectionId);

    if (targetSection) {
        window.scrollTo({
            top: (targetSection.offsetTop - (window.innerHeight - targetSection.offsetHeight) / 2),
            behavior: 'smooth'
        });
    }
}