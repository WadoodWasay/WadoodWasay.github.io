let projects = [];
let currentFilter = "All";

fetch("data/projects.json")
    .then(r => r.json())
    .then(data => {
        projects = data;
        renderProjects();
    });

function renderProjects() {
    const container = document.getElementById("all-projects");
    container.innerHTML = "";

    // Filter — copy so we never mutate the source array
    let filtered = currentFilter === "All"
        ? [...projects]
        : projects.filter(p => p.category === currentFilter);

    // Sort
    const sort = document.getElementById("sort-select").value;

    if (sort === "newest") {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "oldest") {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "az") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    filtered.forEach(project => {
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
}

// Filter buttons — toggle active class and re-render
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll("[data-filter]").forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        renderProjects();
    });
});

// Sort dropdown
document.getElementById("sort-select").addEventListener("change", renderProjects);
