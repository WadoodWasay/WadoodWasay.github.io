fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const container = document.getElementById('featured-projects');

        projects
            .filter(project => project.featured)
            .slice(0, 6)
            .forEach(project => {
                container.innerHTML += `
                    <a class="project-card" href="${project.page}">
                        <div class="project-image-wrapper">
                            <img class="project-image"
                                 src="${project.image}"
                                 alt="${project.title}">
                            <span class="project-category-badge">${project.category}</span>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                        </div>
                    </a>
                `;
            });
    });
