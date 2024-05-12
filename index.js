function openFile(path) {
    window.open(path, "_self");
}

function scrollToId(id) {
    const element = document.getElementById(id);
    let url = window.location.href;
    if (!element) {
        window.open(url.substring(0, url.indexOf("newwebsite") + "newwebsite".length) + "/index.html", "_self");
    }
    window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 60, behavior: 'smooth' });
}