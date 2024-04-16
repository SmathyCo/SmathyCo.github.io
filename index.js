function openLink(link) {
    window.open(link, "_blank");
}

function createPopup(message) {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);
    var popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#ffffff';
    popup.style.padding = '20px';
    popup.style.border = '2px solid #000000';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.innerHTML = message + "<br><br><p style='text-align: center;color: black;'>Click anywhere to close.</p>";
    document.body.appendChild(popup);
    overlay.onclick = function() {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    };
}