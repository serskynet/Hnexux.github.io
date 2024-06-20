document.addEventListener('DOMContentLoaded', function() {
  const movies = [
      {
          title: "Película 1",
          category: "action",
          type: "movie",
          players: [
              { source: "https://www.youtube.com/embed/dQw4w9WgXcQ", label: "YouTube" },
              { source: "https://player.vimeo.com/video/76979871", label: "Vimeo" }
          ]
      },
      {
          title: "Película 2",
          category: "comedy",
          type: "movie",
          players: [
              { source: "https://www.youtube.com/embed/9bZkp7q19f0", label: "YouTube" },
              { source: "https://player.vimeo.com/video/22439234", label: "Vimeo" }
          ]
      },
      {
          title: "Serie 1",
          category: "drama",
          type: "serie",
          players: [
              { source: "https://www.youtube.com/embed/VIDEO_ID_SERIE1", label: "YouTube" },
              { source: "https://player.vimeo.com/video/VIDEO_ID_SERIE1", label: "Vimeo" }
          ]
      },
      {
          title: "Serie 2",
          category: "action",
          type: "serie",
          players: [
              { source: "https://www.youtube.com/embed/VIDEO_ID_SERIE2", label: "YouTube" },
              { source: "https://player.vimeo.com/video/VIDEO_ID_SERIE2", label: "Vimeo" }
          ]
      }
      // Añadir más películas y series aquí
  ];

  const peliculasContainer = document.getElementById('peliculas');
  const seriesContainer = document.getElementById('series');
  const searchInput = document.getElementById('search');
  const categoryFilter = document.getElementById('category-filter');
  const peliculasLink = document.getElementById('peliculas-link');
  const seriesLink = document.getElementById('series-link');

  function renderMedia(container, type, filter = '') {
      container.innerHTML = '';
      const filteredMedia = movies.filter(media => {
          const matchesSearch = media.title.toLowerCase().includes(filter.toLowerCase());
          const matchesCategory = categoryFilter.value === 'all' || media.category === categoryFilter.value;
          return media.type === type && matchesSearch && matchesCategory;
      });

      filteredMedia.forEach(media => {
          const mediaElement = document.createElement('div');
          mediaElement.className = 'movie';

          let playersHTML = '';
          media.players.forEach((player, index) => {
              playersHTML += `<button data-src="${player.source}" class="${index === 0 ? 'active' : ''}">${player.label}</button>`;
          });

          mediaElement.innerHTML = `
              <h2>${media.title}</h2>
              <div class="player-options">
                  ${playersHTML}
              </div>
              <iframe class="movie-player" src="${media.players[0].source}" frameborder="0" allowfullscreen></iframe>
          `;
          container.appendChild(mediaElement);
      });

      attachPlayerEvents(container);
  }

  function attachPlayerEvents(container) {
      const playerButtons = container.querySelectorAll('.player-options button');
      playerButtons.forEach(button => {
          button.addEventListener('click', function() {
              const mediaContainer = this.closest('.movie');
              const iframe = mediaContainer.querySelector('.movie-player');
              const allButtons = mediaContainer.querySelectorAll('.player-options button');

              allButtons.forEach(btn => btn.classList.remove('active'));
              this.classList.add('active');

              iframe.src = this.dataset.src;
          });
      });
  }

  searchInput.addEventListener('input', function() {
      renderMedia(peliculasContainer, 'movie', this.value);
      renderMedia(seriesContainer, 'serie', this.value);
  });

  categoryFilter.addEventListener('change', function() {
      renderMedia(peliculasContainer, 'movie', searchInput.value);
      renderMedia(seriesContainer, 'serie', searchInput.value);
  });

  peliculasLink.addEventListener('click', function(event) {
      event.preventDefault();
      peliculasContainer.style.display = 'flex';
      seriesContainer.style.display = 'none';
      renderMedia(peliculasContainer, 'movie', searchInput.value);
  });

  seriesLink.addEventListener('click', function(event) {
      event.preventDefault();
      seriesContainer.style.display = 'flex';
      peliculasContainer.style.display = 'none';
      renderMedia(seriesContainer, 'serie', searchInput.value);
  });

  // Carga inicial de películas
  renderMedia(peliculasContainer, 'movie');
});
