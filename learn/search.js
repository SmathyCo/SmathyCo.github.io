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

function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    let error;
    if (query === "") {
        error = true;
    }
    const folders = ['assembly', 'bash', 'c', 'csharp', 'css', 'd', 'dart', 'go', 'groovy', 'html', 'java', 'javascript', 'kotlin', 'make', 'matlab', 'nodejs', 'objectivec', 'perl', 'php', 'python', 'r', 'ruby', 'rust', 'scala', 'scratch', 'shell', 'skript', 'sql', 'swift', 'typescript', 'visualbasic'];

    // Find all folders that contain the query
    const matchedFolders = folders.filter(folder => folder.includes(query));

    // Get the results div
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.classList.add('resultsDiv');

    if (matchedFolders.length > 0) {
        // Display matching folders as links with highlighted matching text
        matchedFolders.forEach(folder => {
            if (error != true) {
                resultsDiv.style.marginTop = "50px";
                const link = document.createElement('a');
                link.href = `./languages/${folder}/${folder}.html`;
                link.classList.add('results');
                link.style.cursor = "pointer";
    
                // Highlight the matching text
                const startIndex = folder.indexOf(query);
                const endIndex = startIndex + query.length;
                const highlightedText = folder.substring(startIndex, endIndex);
                const highlightedFolder = capitalizeFirstLetter(folder.substring(0, startIndex)) +
                `<span style="color: white;">${capitalizeFirstLetter(folder.substring(0, startIndex)) === "" ? capitalizeFirstLetter(highlightedText) : highlightedText}</span>` +
                folder.substring(endIndex);
                
                link.innerHTML = highlightedFolder;
                resultsDiv.appendChild(link);
                resultsDiv.appendChild(document.createElement('br'));
            } else {
                resultsDiv.innerHTML = '<p style="color: red;">Please enter a programming language name.</p>';
                resultsDiv.classList.remove('resultsDiv');
                resultsDiv.style.marginTop = "100px";
                resultsDiv.style.fontWeight = "bold";
                resultsDiv.style.textShadow = "black 0px 0px 10px"
                return;
            }
        });
    } else {
        resultsDiv.textContent = 'No matching folders found';
    }
});