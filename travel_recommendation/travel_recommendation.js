// Fetch data from JSON
fetch('travel_recommendation/travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {

      // Guarda los datos en el almacenamiento local
      localStorage.setItem('recommendations', JSON.stringify(data));
  });
  
  function searchRecommendations() {
    const query = document.getElementById('search-bar').value.trim().toLowerCase();
    const data = JSON.parse(localStorage.getItem('recommendations'));

    // Validar si hay datos
    if (!data) {
        console.error("No hay datos en localStorage");
        return;
    }

    // Recoger coincidencias basadas en la consulta
    const matches = [];
    for (const category in data) {
        matches.push(
            ...data[category].filter(item => {
                return (
                    (item.name && item.name.toLowerCase().includes(query)) || 
                    (item.description && item.description.toLowerCase().includes(query))
                );
            })
        );
    }

    // Mostrar o esconder resultados
    if (query) {
        displaySearchResults(matches);
    } else {
        hideSearchResults();
    }
}


function displaySearchResults(results) {
    const searchResultsSection = document.getElementById('search-results');
    const resultContainer = searchResultsSection.querySelector('.result-cards');

    // Limpiar resultados anteriores
    resultContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(item => {
            const section = document.createElement('div');
            section.className = 'result-section';

            // Título general (país, templo o playa)
            section.innerHTML = `
                <h2 class="section-title">${item.name}</h2>
            `;

            let content = '';
            if (item.cities) {
                // Si tiene ciudades
                content = item.cities.map(city => `
                    <div class="card">
                        <img src="${city.imageUrl || 'default-image.jpg'}" alt="${city.name}">
                        <h4>${city.name}</h4>
                        <p>${city.description}</p>
                        <button class="explore-btn">Explore</button>
                    </div>
                `).join('');
            } else if (item.temples) {
                // Si tiene templos
                content = item.temples.map(temple => `
                    <div class="card">
                        <img src="${temple.imageUrl || 'default-image.jpg'}" alt="${temple.name}">
                        <h4>${temple.name}</h4>
                        <p>${temple.description}</p>
                        <button class="explore-btn">Explore</button>
                    </div>
                `).join('');
            } else if (item.beaches) {
                // Si tiene playas
                content = item.beaches.map(beach => `
                    <div class="card">
                        <img src="${beach.imageUrl || 'default-image.jpg'}" alt="${beach.name}">
                        <h4>${beach.name}</h4>
                        <p>${beach.description}</p>
                        <button class="explore-btn">Explore</button>
                    </div>
                `).join('');
            }

            // Insertar tarjetas debajo del título general
            section.innerHTML += `<div class="cards-container">${content}</div>`;
            resultContainer.appendChild(section);
        });

        searchResultsSection.style.display = 'block'; // Mostrar la sección de resultados
    } else {
        // Sin resultados
        resultContainer.innerHTML = '<p>No results found. Try another search!</p>';
        searchResultsSection.style.display = 'block';
    }
}





