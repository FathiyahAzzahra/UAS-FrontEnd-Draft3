async function searchPoetry() {
    const searchTerm = document.getElementById('search-term').value;
    const poetryList = document.getElementById('poetry-list');
    poetryList.innerHTML = ''; // Clear previous results

    if (!searchTerm) {
        return; // If no search term, do nothing
    }

    try {
        // Construct the URL for PoetryDB API
        const url = `https://poetrydb.org/title/${searchTerm}/lines.json`;

        // Fetch data from the PoetryDB API
        const response = await fetch(url);
        const data = await response.json();

        // Check if any data is returned
        if (data && data.length > 0) {
            data.forEach(poem => {
                const poemCard = document.createElement('div');
                poemCard.classList.add('poem-card');

                // Add title to the card (if available)
                const title = poem.title ? `<h3>${poem.title}</h3>` : '';

                // Add lines of the poem
                const lines = poem.lines.map(line => `<p>${line}</p>`).join('');

                // Set the card content
                poemCard.innerHTML = title + lines;

                // Append to the poetry list
                poetryList.appendChild(poemCard);
            });
        } else {
            poetryList.innerHTML = '<p>No poems found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching poems:', error);
        poetryList.innerHTML = '<p>Error fetching poems. Please try again later.</p>';
    }
}