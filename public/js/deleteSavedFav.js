const $deleteFavorite = document.getElementById('deleteFav');
const $deleteSaved = document.getElementById('deleteSave');

$deleteFavorite.addEventListener('click', async (event) => {
    
    try {
        
    }
    catch (error) {
        console.error('Network error:', error);
    }
    window.location.reload()
});