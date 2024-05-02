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
        op("assembly/assembly.html");
    } else if (x === "C" || x === "CLANG") {
        op("c/c.html");
    } else if (x === "C#" || x === "CS" || x === "CSHARP") {
        op("csharp/csharp.html");
    } else if (x === "CSS") {
        op("css/css.html");
    } else if (x === "D" || x === "DLANG") {
        op("d/d.html");
    } else if (x === "DART" || x === "DT") {
        op("dart/dart.html");
    } else if (x === "GO" || x === "GOLANG") {
        op("go/go.html");
    } else if (x === "HTML") {
        op("html/html.html");
    } else if (x === "JAVA" || x === "JV") {
        op("java/java.html");
    } else if (x === "JAVASCRIPT" || x === "JS") {
        op("javascript/javascript.html");
    } else if (x === "KOTLIN" || x === "KOT") {
        op("kotlin/kotlin.html");
    } else if (x === "NODEJS" || x === "NODE.JS" || x === "NODE") {
        op("nodejs/nodejs.html");
    } else if (x === "OBJECTIVEC" || x === "OBJC") {
        op("objectivec/objectivec.html");
    } else if (x === "PERL") {
        op("perl/perl.html");
    } else if (x === "PHP") {
        op("php/php.html");
    } else if (x === "PYTHON" || x === "PY") {
        op("python/python.html");
    } else if (x === "R") {
        op("r/r.html");
    } else if (x === "RUBY" || x === "RB") {
        op("ruby/ruby.html");
    } else if (x === "RUST" || x === "RS") {
        op("rust/rust.html");
    } else if (x === "SCALA") {
        op("scala/scala.html");
    } else if (x === "SCRATCH") {
        op("scratch/scratch.html");
    } else if (x === "SKRIPT" || x === "SK") {
        op("skript/skript.html");
    } else if (x === "SQL") {
        op("sql/sql.html");
    } else if (x === "SWIFT") {
        op("swift/swift.html");
    } else if (x === "TYPESCRIPT" || x === "TS") {
        op("typescript/typescript.html");
    } else if (x === "VISUALBASIC" || x === "VB") {
        op("visualbasic/visualbasic.html");
    } else {
        createPopup("The programming language " + document.getElementById("search").value + " wasn't found. Try correcting errors in the name or suggest the programming language on our Discord.");
    }
}