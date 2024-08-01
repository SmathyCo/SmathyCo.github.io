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
    addEventListener("resize", (function r() {
        html.style.setProperty("--target-widthIn", html.offsetWidth + "px");
        return r;
    })(), true);

    var oST = html.scrollTop;
    const animElements = document.querySelectorAll(".animh");
    addEventListener("scroll", (function s(ev) {
        if (ev.target === document) {
            var nowLower = html.scrollTop > oST;
            document.body.classList.toggle("hidenav", nowLower);
            oST = html.scrollTop;
            document.body.classList.toggle("scrolled", !!oST);
            html.style.setProperty("--scrollY", oST + "px");

            animElements.forEach(el => {
                if (el.classList.contains("anim"))
                    el.classList.toggle("anim", el.offsetTop - html.scrollTop-1 < html.offsetHeight);
                else
                    el.classList.toggle("anim", el.offsetTop - html.scrollTop-1 + el.offsetHeight/2 < html.offsetHeight);
            });
        }
        return s;
    })({target: document}), true);

    addEventListener("animationend", ev => {
        ev.target.classList.add("animended");
    }, true);


    CodeSyntax:
        document.querySelectorAll("code").forEach(el => {
            var lines = el.innerText.split("\n");
            var result = [];

            // Basically the same formatting codes as in Minecraft xD
            let styles = {
                "c": "color:#ff4444",
                "4": "color:#ff2626",
                "6": "color:#ffa544",
                "e": "color:#fbff42",
                "a": "color:#82f97c",
                "2": "color:#28c120",
                "b": "color:#7cf9ef",
                "3": "color:#4e97f5",
                "9": "color:#58a1ff",
                "1": "color:#147bff",
                "d": "color:#f1a1ff",
                "5": "color:#e134ff",
                "7": "color:#bfbfbf",
                "8": "color:#858585",
                "0": "color:#1a1a1a",
                "f": "color:#f1f1f1",
                "l": "font-weight:600",
                "o": "font-style:italic",
                "n": "text-decoration:underline",
                "m": "text-decoration:line-through",
                "k": "color:#fff"
            };

            function htmlescape(string) {
                return string.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
            }

            function addLine(format, ...args) {
                let html = "";
                let inStyle = false;
                let inStyleRaw = false;
                let spans = 0;
                let string = "";
                let argIndex = 0;
                let inCaller = false;
                for (let char of format) {
                    if (inStyle) {
                        inStyle = false;
                        if (char == "[") {
                            inStyleRaw = true;
                        } else if (styles[char]) {
                            html += '<span style="' + styles[char] + '">';
                            spans++;
                        } else if (char == "r") {
                            html += '</span>'.repeat(spans);
                            spans = 0;
                        } else html += '&' + char;
                    } else if (inStyleRaw) {
                        if (char == "]") {
                            inStyleRaw = false;
                            html += '<span style="' + string + '">';
                            string = '';
                            spans++;
                        } else {
                            string += char;
                        }
                    } else if (inCaller) {
                        if (char == "}") {
                            inCaller = false;
                            html += htmlescape(args[argIndex]);
                            argIndex++;
                        } else {
                            inCaller = false;
                            html += "{" + char;
                        }
                    } else if (char == "&") {
                        inStyle = true;
                    } else if (char == "{") {
                        inCaller = true;
                    } else {
                        html += char;
                    }
                }
                for (let n in styles)
                    html = html.replaceAll("&amp;" + n, `<span style="${styles[n]}">&${n}</span>`);
                result.push(html + "</span>".repeat(spans));
            }
            for (let line of lines) {
                if (/^on (.*):/.test(line))
                    addLine("&6&l{}", line);
                else if (/^#!(.+)/.test(line))
                    addLine("&7{}", line);
                else if (/^[#|//]/.test(line.trim()))
                    addLine("&8{}", line);
                // else if (/(.*)=(.*)/.test(line))
                //     addLine("&[color:#1e90ff]&n{}");
                else addLine("{}", line);
            }
            el.innerHTML = result.join("\n");
        });


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
