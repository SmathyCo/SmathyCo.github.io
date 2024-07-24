document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById("search");
    
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            search();
        }
    });
});

function goLoading(x, y) {
    window.location.href = x + '?redirectUrl=' + encodeURIComponent(y);
}

function search() {
    let x = document.getElementById("search").value.toUpperCase().replaceAll(" ", "");
    
    if (x === "") {
        createPopup("Please insert a programming language name, if you have no idea what the programming language you want to learn is, you should ask on our Discord.");
    } else if (x === "ASSEMBLY" || x === "ASM") {
        goLoading('../loading.html', './learn/languages/assembly/assembly.html');
    } else if (x === "C" || x === "CLANG") {
        goLoading('../loading.html', './learn/languages/c/c.html');
    } else if (x === "C#" || x === "CS" || x === "CSHARP") {
        goLoading('../loading.html', './learn/languages/csharp/csharp.html');
    } else if (x === "CSS") {
        goLoading('../loading.html', './learn/languages/css/css.html');
    } else if (x === "D" || x === "DLANG") {
        goLoading('../loading.html', './learn/languages/d/d.html');
    } else if (x === "DART" || x === "DT") {
        goLoading('../loading.html', './learn/languages/dart/dart.html');
    } else if (x === "GO" || x === "GOLANG") {
        goLoading('../loading.html', './learn/languages/go/go.html');
    } else if (x === "HTML") {
        goLoading('../loading.html', './learn/languages/html/html.html');
    } else if (x === "JAVA" || x === "JV") {
        goLoading('../loading.html', './learn/languages/java/java.html');
    } else if (x === "JAVASCRIPT" || x === "JS") {
        goLoading('../loading.html', './learn/languages/javascript/javascript.html');
    } else if (x === "KOTLIN" || x === "KOT") {
        goLoading('../loading.html', './learn/languages/kotlin/kotlin.html');
    } else if (x === "NODEJS" || x === "NODE.JS" || x === "NODE") {
        goLoading('../loading.html', './learn/languages/nodejs/nodejs.html');
    } else if (x === "OBJECTIVEC" || x === "OBJC") {
        goLoading('../loading.html', './learn/languages/objectivec/objectivec.html');
    } else if (x === "PERL") {
        goLoading('../loading.html', './learn/languages/perl/perl.html');
    } else if (x === "PHP") {
        goLoading('../loading.html', './learn/languages/php/php.html');
    } else if (x === "PYTHON" || x === "PY") {
        goLoading('../loading.html', './learn/languages/python/python.html');
    } else if (x === "R") {
        goLoading('../loading.html', './learn/languages/r/r.html');
    } else if (x === "RUBY" || x === "RB") {
        goLoading('../loading.html', './learn/languages/ruby/ruby.html');
    } else if (x === "RUST" || x === "RS") {
        goLoading('../loading.html', './learn/languages/rust/rust.html');
    } else if (x === "SCALA") {
        goLoading('../loading.html', './learn/languages/scala/scala.html');
    } else if (x === "SCRATCH") {
        goLoading('../loading.html', './learn/languages/scratch/scratch.html');
    } else if (x === "SKRIPT" || x === "SK") {
        goLoading('../loading.html', './learn/languages/skript/skript.html');
    } else if (x === "SQL") {
        goLoading('../loading.html', './learn/languages/sql/sql.html');
    } else if (x === "SWIFT") {
        goLoading('../loading.html', './learn/languages/swift/swift.html');
    } else if (x === "TYPESCRIPT" || x === "TS") {
        goLoading('../loading.html', './learn/languages/typescript/typescript.html');
    } else if (x === "VISUALBASIC" || x === "VB") {
        goLoading('../loading.html', './learn/languages/visualbasic/visualbasic.html');
    } else if (x === "GROOVY") {
        goLoading('../loading.html', './learn/languages/groovy/groovy.html');
    } else if (x === "MATLAB" || x === "ML") {
        goLoading('../loading.html', './learn/languages/matlab/matlab.html');
    } else if (x === "MAKE" || x === "MK" || x === "MF" || x === "MAKEFILE") {
        goLoading('../loading.html', './learn/languages/make/make.html');
    } else if (x === "SHELL" || x === "SH") {
        goLoading('../loading.html', './learn/languages/shell/shell.html');
    } else if (x === "POWERSHELL" || x === "PS") {
        goLoading('../loading.html', './learn/languages/powershell/powershell.html');
    } else if (x === "BASH") {
        goLoading('../loading.html', './learn/languages/bash/bash.html');
    } else {
        createPopup("The programming language " + document.getElementById("search").value + " wasn't found. Try correcting errors in the name or suggest the programming language on our Discord.");
    }
}