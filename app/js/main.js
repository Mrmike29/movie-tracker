const changeFrame = async (newPage) => {
    var iframe = document.getElementById('mIframe');
    iframe.src = newPage;
}

window.addEventListener('message', function(event) {
    if (event.origin !== 'http://127.0.0.1:5500') {
        return;
    }

    var iframe = document.getElementById('mIframe');

    if (event.source === iframe.contentWindow) {
        iframe.src = event.data;
    }
});

window.onload = async () => {
    await changeFrame('app/pages/movies/list.html');
}