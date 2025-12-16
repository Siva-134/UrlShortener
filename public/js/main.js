function copyToClipboard(shortCode, btnElement) {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    
    navigator.clipboard.writeText(fullUrl).then(() => {
        const originalIcon = btnElement.innerHTML;
        
        // Change icon to checkmark
        btnElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        `;
        btnElement.style.color = 'var(--success-color)';

        // Revert back after 2 seconds
        setTimeout(() => {
            btnElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            `;
            btnElement.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function toggleShare(btnElement) {
    const dropdown = btnElement.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.share-dropdown');
    
    // Close other dropdowns
    allDropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
    });

    dropdown.classList.toggle('show');
}

function shareLink(platform, shortCode) {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    const text = `Check out this link: ${fullUrl}`;
    let shareUrl = '';

    if (platform === 'whatsapp') {
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    } else if (platform === 'telegram') {
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent('Check this out!')}`;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('.share-container')) {
        document.querySelectorAll('.share-dropdown').forEach(d => {
            d.classList.remove('show');
        });
    }
});



