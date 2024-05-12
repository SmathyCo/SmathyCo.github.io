document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById("search");
    
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            search();
        }
    });
});

function search() {
    function op(lk) {
        window.location.href = lk;
        return;
    }
    let x = document.getElementById("search").value.toUpperCase().replaceAll(" ", "");
    
    if (x === "") {
        createPopup("Please insert a programming language name, if you have no idea what the programming language you want to learn is, you should ask on our Discord.");
    } else if (x === "ASSEMBLY" || x === "ASM") {
        op("languages/assembly/assembly.html");
    } else if (x === "C" || x === "CLANG") {
        op("languages/c/c.html");
    } else if (x === "C#" || x === "CS" || x === "CSHARP") {
        op("languages/csharp/csharp.html");
    } else if (x === "CSS") {
        op("languages/css/css.html");
    } else if (x === "D" || x === "DLANG") {
        op("languages/d/d.html");
    } else if (x === "DART" || x === "DT") {
        op("languages/dart/dart.html");
    } else if (x === "GO" || x === "GOLANG") {
        op("languages/go/go.html");
    } else if (x === "HTML") {
        op("languages/html/html.html");
    } else if (x === "JAVA" || x === "JV") {
        op("languages/java/java.html");
    } else if (x === "JAVASCRIPT" || x === "JS") {
        op("languages/javascript/javascript.html");
    } else if (x === "KOTLIN" || x === "KOT") {
        op("languages/kotlin/kotlin.html");
    } else if (x === "NODEJS" || x === "NODE.JS" || x === "NODE") {
        op("languages/nodejs/nodejs.html");
    } else if (x === "OBJECTIVEC" || x === "OBJC") {
        op("languages/objectivec/objectivec.html");
    } else if (x === "PERL") {
        op("languages/perl/perl.html");
    } else if (x === "PHP") {
        op("languages/php/php.html");
    } else if (x === "PYTHON" || x === "PY") {
        op("languages/python/python.html");
    } else if (x === "R") {
        op("languages/r/r.html");
    } else if (x === "RUBY" || x === "RB") {
        op("languages/ruby/ruby.html");
    } else if (x === "RUST" || x === "RS") {
        op("languages/rust/rust.html");
    } else if (x === "SCALA") {
        op("languages/scala/scala.html");
    } else if (x === "SCRATCH") {
        op("languages/scratch/scratch.html");
    } else if (x === "SKRIPT" || x === "SK") {
        op("languages/skript/skript.html");
    } else if (x === "SQL") {
        op("languages/sql/sql.html");
    } else if (x === "SWIFT") {
        op("languages/swift/swift.html");
    } else if (x === "TYPESCRIPT" || x === "TS") {
        op("languages/typescript/typescript.html");
    } else if (x === "VISUALBASIC" || x === "VB") {
        op("languages/visualbasic/visualbasic.html");
    } else if (x === "GROOVY") {
        op("languages/groovy/groovy.html");
    } else if (x === "MATLAB" || x === "ML") {
        op("languages/matlab/matlab.html");
    } else if (x === "MAKE" || x === "MK" || x === "MF" || x === "MAKEFILE") {
        op("languages/make/make.html");
    } else if (x === "SHELL" || x === "SH") {
        op("languages/shell/shell.html");
    } else if (x === "POWERSHELL" || x === "PS") {
        op("languages/powershell/powershell.html");
    } else if (x === "BASH") {
        op("languages/bash/bash.html");
    } else {
        createPopup("The programming language " + document.getElementById("search").value + " wasn't found. Try correcting errors in the name or suggest the programming language on our Discord.");
    }
}