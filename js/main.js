document.addEventListener('DOMContentLoaded', function() {
    loadPorjects();
    loadTecnologias();
});

let btnBarra = document.getElementById("sideNavButton");

function toggleSideNav() {
    const sideNav = document.getElementById("sideNav");
    sideNav.classList.toggle("active");

    if (sideNav.classList.contains("active")) {
        document.addEventListener("click", handleOutsideClick);
    } else {
        document.removeEventListener("click", handleOutsideClick);
    }
}

function handleOutsideClick(event) {
    const sideNav = document.getElementById("sideNav");
    const sideNavButton = document.getElementById("sideNavButton");

    if (!sideNav.contains(event.target) && !sideNavButton.contains(event.target)) {
        sideNav.classList.remove("active");
        document.removeEventListener("click", handleOutsideClick);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
    toggleSideNav();
}



function loadTecnologias() {
    const data = "js/proyectos.json";

    fetch(data)
        .then(response => response.json())
        .then(data => {
            let fullTec = new Set();  

            data.forEach(proyecto => {
                proyecto.tecnologias.forEach(tecnologia => {
                    fullTec.add(tecnologia);
                });
            });

            let contenido = '<option value="">Todos</option>'; 
            fullTec.forEach(tecs => {
                contenido += `
                <option value="${tecs}">${tecs}</option>    
                `;
            });
            document.getElementById("techDropdown").innerHTML = contenido;
        });
}

function loadPorjects() {
    const data = "js/proyectos.json";

    fetch(data)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let content = '';

        data.forEach(pry => {

            const tecs = pry.tecnologias.map(
                tecnologias => `<a class="badge bg-primary me-2 mt-2">#${tecnologias}</a>`
            ).join('');

            content += `
                <div class="col-lg-6">
                    <div class="card h-100">
                        <img src="${pry.imagen}" class="card-img-top" alt="${pry.nombre}">
                        <h3 class="mt-3">${pry.nombre}</h3>
                        <p class="card-text">
                            ${pry.descripcion}
                        </p>
                        <a href="${pry.url}" target="_blank" class="go-corner">
                            <div class="go-arrow"><i class="bi bi-box-arrow-in-up-right"></i></div>
                        </a>
                        <div class="card-footer text-body-secondary">
                            ${tecs}
                        </div>
                    </div>
                </div>
            `
        });
        document.getElementById("pryContainer").innerHTML = content;
    })
}

function filterProjectsByTechnology(technology) {
    const data = "js/proyectos.json";

    fetch(data)
    .then(response => response.json())
    .then(data => {
        let content = '';

        const filteredProjects = technology === ""
            ? data 
            : data.filter(pry => pry.tecnologias.includes(technology));

        filteredProjects.forEach(pry => {

            const tecs = pry.tecnologias.map(
                tecnologias => `<a class="badge bg-primary me-2 mt-2">#${tecnologias}</a>`
            ).join('');

            content += `
                <div class="col-lg-6">
                    <div class="card h-100">
                        <img src="${pry.imagen}" class="card-img-top" alt="${pry.nombre}">
                        <h3 class="mt-3">${pry.nombre}</h3>
                        <p class="card-text">
                            ${pry.descripcion}
                        </p>
                        <a href="${pry.url}" target="_blank" class="go-corner">
                            <div class="go-arrow"><i class="bi bi-box-arrow-in-up-right"></i></div>
                        </a>
                        <div class="card-footer text-body-secondary">
                            ${tecs}
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById("pryContainer").innerHTML = content;
    });
}
