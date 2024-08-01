document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById("search");

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter")
            search();
    });
});

const search = () => {
    let x = document.getElementById("search").value.toUpperCase().replaceAll(" ", "");

    const options = {
        "assembly": "asm",
        "c": "clang",
        "csharp": ["c#", "cs"],
        "css": "style",
        "d": "dlang",
        "dart": "dt",
        "golang": "go",
        "html": "htm",
        "java": ["jar", "jv"],
        "javascript": "js",
        "kotlin": "kot",
        "nodejs": ["node", "node.js", "njs"],
        "objectivec": ["objc"],
        "perl": undefined,
        "php": ["phtml"],
        "python": ["py", "pyz", "pyzw", "pyi"],
        "r": undefined,
        "ruby": "rb",
        "rust": "rs",
        "scala": undefined,
        "scratch": undefined,
        "skript": "sk",
        "sql": undefined,
        "swift": undefined,
        "typescript": "ts",
        "visualbasic": ["vb", "vba"],
        "groovy": undefined,
        "matlab": "ml",
        "make": ["mk", "mf", "makefile"],
        "shell": "sh",
        "powershell": ["ps1", "ps2"],
        "bash": undefined
    };

    let o = x.toLowerCase();
    if (o == "") {
        alert("Please insert a programming language name, if you have no idea what the programming language you want to learn is, you should ask on our Discord.");
    } else if (options[o]) {
        location.assign("/learn/languages/" + o + "/" + o + ".html");
    } else {
        for (let o2 in options) {
            let v = options[o2];
            if (o2.startsWith(o) ||
                v == o ||
                (
                    typeof v === 'string' &&
                    v.startsWith(o)
                ) ||
                (
                    typeof v === 'object' &&
                    v.find(v => v.startsWith(o))
                )
            )
                return location.assign("/learn/languages/" + o2 + "/" + o2 + ".html");
        }
        let sim = {};
        for (let o2 in options) {
            let g = 0;
            for (let i = 0; i < o.length; i++)
                if (o[i] == o2[i])
                    g++;
                else break;
            sim[o2] = g;
        }
        console.log(JSON.stringify(sim));
        let max = -1;
        let maxv;
        for (let s in sim) {
            let sv = sim[s];
            if (sv > max) {
                max = sv;
                maxv = s;
            }
        }
        if (max >= 3)
            return location.assign("/learn/languages/" + maxv + "/" + maxv + ".html");
        alert("The programming language " + o + " couldn't found. Try correcting errors in the name or suggest the programming language on our Discord.");
    }
};
