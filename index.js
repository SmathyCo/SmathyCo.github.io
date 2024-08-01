addEventListener("load", () => {
    document.body.className = "loaded";
    document.querySelectorAll("#home > .cards > .card").forEach(c => c.addEventListener("animationend", () => {
        c.classList.add("animd");
    }, {once: true}));

    addEventListener("keydown", ev => {
        var k = ev.key.toLowerCase();
        if (k == "F12" || (ev.ctrlKey && (
            k == "s" ||
            k == "o" ||
            k == "u"
        ))) ev.preventDefault();
    }, {passive: false});

    const html = document.documentElement;
    var oST = html.scrollTop;
    document.body.classList.toggle("scrolled", !!oST);
    html.style.setProperty("--scrollY", oST + "px");
    addEventListener("scroll", ev => {
        if (ev.target === document) {
            document.body.classList.toggle("shownav", html.scrollTop > oST);
            oST = html.scrollTop;
            document.body.classList.toggle("scrolled", !!oST);
            html.style.setProperty("--scrollY", oST + "px");
        }
    }, true);

    no:
        /*
        // DevTools Protection
        const script = `setInterval(()=>{
            var o = new Date().getTime();
            debugger;
            var n = new Date().getTime();
            if (n-o< 300)return;
            location.reload();
        }, 300);`.replaceAll("\n", "").replaceAll("    ", "");
        var sc = document.createElement(`script`);
        sc.src = URL.createObjectURL(new Blob([script]));
        sc.async = true;
        var everything = document.body.querySelectorAll("*");
        var get = () => everything[~~(Math.random() * everything.length)];
        for(let i = 0; i < 6; i++)
            get().append(sc.cloneNode(true));
        */
       false;

    //
}, true);
