

const apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search';


var app = angular.module('artApp', []);

async function searchArtworks() {
    const query = document.getElementById('searchInput').value;
    if (!query) return alert('Please enter a search term');

    try {
        const response = await fetch(`${apiUrl}?q=${query}&hasImages=true`);
        const data = await response.json();

        if (data.objectIDs && data.objectIDs.length > 0) {
            displayArtworks(data.objectIDs);
        } else {
            alert('No artworks found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayArtworks(objectIDs) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear previous results

    for (const id of objectIDs.slice(0, 12)) { // Limiting to 12 results
        const artwork = await fetchArtworkDetails(id);
        if (artwork) {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = artwork.primaryImage || 'https://via.placeholder.com/300';
            const title = artwork.title || 'No Title Available';
            const artist = artwork.artistDisplayName || 'Artist Unknown';

            card.innerHTML = `
            <img src="${img}" alt="${title}">
            <h3>${title}</h3>
            <p>${artist}</p>`;
            gallery.appendChild(card);
        }
    }
}

async function fetchArtworkDetails(id) {
    try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const artwork = await response.json();
        return artwork;
    } catch (error) {
        console.error('Error fetching artwork details:', error);
    }
}