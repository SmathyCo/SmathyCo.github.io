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
            var lines = el.innerText.trimEnd().split("\n");
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

            function htmlescape(string, quotes = false) {
                let e = string.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                if (quotes)
                    e = e.replaceAll('"', "&quot;")
                return e;
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
                if (html.endsWith(" "))
                    html = html.trimEnd() + '<span style="border-radius:3px;background:#ff444488;margin-block:2px 4px;display:inline-block">' + "&nbsp;".repeat(html.length - html.trimEnd().length) + "</span>";
                result.push(html + "</span>".repeat(spans));
            }
            let instr = false;
            for (let line of lines) {
                let startIndent = " ".repeat(line.length - line.trimStart().length);
                let ll = line.toLowerCase();
                let lt = ll.trim();
                let _;
                if (/^on (.*):/.test(line))
                    addLine("&6&l{}", line);
                else if (instr) {
                    if (line.includes('"') || line.includes("`"))
                        instr = false;
                    addLine("{}", line);
                    continue;
                } else if (/^command \/(.*):/.test(ll) ||
                         /^def (.*)/.test(lt) ||
                         /^function (.*)/.test(lt) ||
                         /^fn (.*)/.test(lt) ||
                         /^fun (.*)/.test(lt) ||
                         /^func (.*)/.test(lt) ||
                         /^sub (.*)/.test(ll) ||
                         /^module (.+)/.test(ll) ||
                         /^class (.*)/.test(ll) ||
                         /^interface (.*)/.test(ll) ||
                         /^@interface (.*)/.test(ll) ||
                         /^enum (.*)/.test(ll) ||
                         /^clause (.*)/.test(ll) ||
                         /^record (.*)/.test(ll) ||
                         /^}(.*)/.test(lt) ||
                         /^end function|sub|module/.test(ll))
                    addLine("&[color:#ffb666]&l{}", line);
                else if (/^trigger:/.test(lt) ||
                         /^executable by: (.+)/.test(lt) ||
                         /^permission: (.+)/.test(lt) ||
                         /^permission message: (.*)/.test(lt) ||
                         /^cooldown: (.*)/.test(lt) ||
                         /^cooldown message: (.*)/.test(lt))
                    addLine("&[color:#ffb666]{}", line);
                // TODO: Make a regexp on a function execution! 🔽
                // else if (_ = /^(a-Z,0-9,\$)(@|!?)\((.*)\)(.*)/.exec(line.trim()))
                //     addLine(startIndent + "&e{}&6{}&9(&r{}&9)&r{}", _[1], _[2], (console.log(_) || _)[3], _[4]);
                else if (_ = /^(@|!|\??)(package|import|print|echo|exit|raise|throw|return|if|set|kick|send|broadcast|if|elif|else|fi|for|while|loop|foreach)(!|\??)(.*)/.exec(line.trim()))
                    addLine(startIndent + "&6{}&3{}&6{}&r{}", _[1], _[2], _[3], _[4]);
                else if (/^#!(.+)/.test(line))
                    addLine("&7{}", line);
                else if (/^(#|\/\/|::)/.test(lt))
                    addLine("&8{}", line);
                // else if (/(.*)=(.*)/.test(line))
                //     addLine("&[color:#1e90ff]&n{}");
                else addLine("{}", line);
                if ((line.indexOf('"') == line.lastIndexOf('"') && line.includes('"')) || (line.indexOf('`') == line.lastIndexOf('`') && line.includes('`')))
                    instr = true;
            }
            var html = result.join("\n");
            for (let n in styles)
                html = html.replaceAll("&amp;" + n, `<span style="${styles[n]}">&${n}</span>`);
            html = (html => {
                let r = "";
                let inString = false;
                let wait = false;
                for (let c of html) {
                    if (wait) {
                        if (c == ">")
                            wait = false;
                    } else if (c == "<") {
                        wait = true;
                    } else if (c == '"' || c == '`') {
                        if (inString) {
                            inString = false;
                            r += c + "</span>";
                            continue;
                        } else {
                            inString = true;
                            r += '<span style="color:#4dc74d">';
                        }
                    }
                    r += c;
                }
                if (inString)
                    r += '</span>';
                return r;
            })(html);
            el.innerHTML = html + "\n&ZeroWidthSpace;";
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
       "don't understand. no.";
}, true);
