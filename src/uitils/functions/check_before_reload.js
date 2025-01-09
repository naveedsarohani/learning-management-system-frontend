window.addEventListener('beforeunload', (event) => {
    if (window.confirm('Are you sure you want to refresh the page?')) {
        window.location.reload();
    } else {
        event.preventDefault();
    }
});