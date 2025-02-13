const changeFrame = async (newPage) => {
    
    window.parent.postMessage(newPage, 'http://127.0.0.1:5500'); // Reemplaza 'https://www.example.com' con el origen del documento principal
}