
// Smooth Scroll on anchor links
(function () {

    'use strict';

    // Feature Test
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

        // Function to animate the scroll
        var smoothScroll = function (anchor, duration) {

            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance / (duration / 16);
            var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if (increments >= 0) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if (travelled <= (endLocation || 0)) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);

        };

        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scroll');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function (e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }

            }, false);

        });

    }

})();


// Google Maps


// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
}

// Change style of navbar on scroll
window.onscroll = function () {
    myFunction()
};

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-navbar" + " w3-animate-top" + "nav-hover";
    } else {
        navbar.className = navbar.className.replace("w3-animate-top nav-hover", "");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Datos de los productos, incluyendo la carpeta y la cantidad de imágenes
    const products = [
        { name: 'Escritorio Alpha I', folder: 'EscritorioAlphaI', numberOfImages: 6 },
        { name: 'Escritorio Alpha III', folder: 'EscritorioAlphaIII', numberOfImages: 5 },
        { name: 'Escritorio Alpha IV', folder: 'EscritorioAlphaIV', numberOfImages: 8 }
    ];

    const productsContainer = document.getElementById('products-container');

    // Función para generar el contenido dinámicamente
    products.forEach((product) => {
        const section = document.createElement('section');
        section.innerHTML = `
            <p class="w3-center"><em>${product.name}</em></p><br>
            <div class="masonry-grid w3-container" id="${product.folder}"></div>
        `;
        productsContainer.appendChild(section);
        // Generar la cuadrícula de imágenes
        generateGrid(product.folder, product.folder, product.numberOfImages);
    });

    // Función que genera la cuadrícula para un grupo de imágenes
    function generateGrid(gridId, folderName, numberOfImages) {
        const masonryGrid = document.getElementById(gridId);
        for (let i = 1; i <= numberOfImages; i++) {
            const div = document.createElement('div');
            div.classList.add('masonry-item');
            div.innerHTML = `
                <img src="/public/photos/${folderName}/${i}.jpg"
                     onclick="onClick(this)"
                     class="w3-hover-opacity">
            `;
            masonryGrid.appendChild(div);
        }
    }
});


