let loader = document.querySelector(".loader");

let URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Herndon,VA?unitGroup=us&key=QTZNK5TFEJ9BWVSKRSY3U5KAL&include=days&elements=datetime,moonphase,,moonrise,moonset'

let datetimeh3 = document.getElementById("datetime-h3");
let moonImageDiv = document.getElementById("moon-image-div");
let mainContainer = document.getElementById("main-container");
let moonDisplayDiv = document.getElementById("moon-display-div");

var btn = document.getElementById("myBtn");

const today = new Date();
const formattedDate = today.toLocaleDateString('es-ES'); // Formato español
console.log(formattedDate);

window.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");
    setTimeout(() => {
        loader.classList.toggle("loader2")
        
        //loader.classList.add("display-none")
    }, 1500);
    setTimeout(() => {
        loader.remove();
    }, 2000);
    
    setTimeout(() => {
        moonDisplayDiv.style.animation = "moon-display 3s forwards";
    }, 2500);
    setTimeout(() => {
        mainContainer.classList.remove("hidden");
        btn.classList.remove("hidden");
        moonDisplayDiv.remove();
    }, 5000);
});

fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data['days']);
            getWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    

function getWeatherData(data) {
    datetimeh3.innerText = `Fecha de hoy: ${formattedDate}`;
    let date1 = document.getElementById("date1");
    let p = document.createElement("h2");
    p.innerHTML = `
        Estamos en: ${checkMoonPhase(data['days'][0]['moonphase'])}<br>
        Salida de la Luna: ${data['days'][0]['moonrise']}<br>
        Puesta de la Luna: ${data['days'][0]['moonset']}<br>
        `;
    date1.append(p)
    console.log(typeof(data['days'][0]['moonrise']));
    checkMoonPhase(data['days'][0]['moonphase']);

    
}


function checkMoonPhase(phase) {
    switch(true) {
        case (phase == 0):
            //Luna Nueva
            moonImageDiv.innerHTML= `
            <img src="assets/moon-icons/luna-nueva.png" class="moon-image" alt=""></img>
            <i><p>La Luna está entre la Tierra y el Sol. No vemos su cara iluminada, está en sombra, excepto durante un eclipse solar.</p></i>`;
            return "Luna Nueva"
        case (phase > 0 && phase < 0.25):
            //Luna Creciente
            moonDisplayDiv.innerHTML = `
            <img src="assets/moon-icons/creciente-concava.png" class="moon-image" alt=""></img>
            <i><p>Vemos una delgada franja iluminada a la derecha (en el hemisferio norte), que va aumentando.</p></i>`;
            return "Luna Creciente"
        case (phase == 0.25):
            //Cuarto Creciente
            moonImageDiv.innerHTML= `
            <img src="assets/moon-icons/cuarto-creciente.png" class="moon-image" alt=""></img>
            <i><p>La mitad derecha de la Luna se ve iluminada. La parte iluminada sigue creciendo.</p></i>`;
            return "Cuarto Creciente";
        case (phase > 0.25 && phase < 0.5):
            // Luna Gibosa Creciente
            moonImageDiv.innerHTML= `
            <img src="assets/moon-icons/luna-gibosa-creciente.png" class="moon-image" alt=""></img>
            <i><p>Más de la mitad de la Luna está iluminada, pero no completamente. La luz sigue aumentando.</p></i>`;
            return "Luna Gibosa Creciente";
        case (phase == 0.5):
            // Luna LLena
            moonDisplayDiv.innerHTML = `
            <img src="assets/moon-icons/luna-llena.png" class="moon-image" alt=""></img>
            <i><p>La cara iluminada de la Luna mira hacia la Tierra. Se ve completamente redonda y brillante.</p></i>`;
            return "Luna Llena";
        case (phase > 0.5 && phase < 0.75):
            // Luna Gibosa Menguante
            moonImageDiv.innerHTML = `
            <img src="assets/moon-icons/luna-gibosa-menguante.png" class="moon-image" alt=""></img>
            <i><p>La Luna está casi llena, pero la porción iluminada comienza a disminuir desde el lado derecho (en el hemisferio norte).</p></i>`; 
            return "Luna Gibosa Menguante";
        case (phase == 0.75):
            // Cuarto Menguante
            moonImageDiv.innerHTML= `
            <img src="assets/moon-icons/cuarto-menguante.png" class="moon-image" alt=""></img>
            <i><p>La mitad izquierda de la Luna se ve iluminada. La luz sigue disminuyendo. Se ve como una "C".</p></i>
            `;
            return "Cuarto Menguante";
        case (phase > 0.75 && phase < 1):
            // Luna Menguante
            moonImageDiv.innerHTML= `
            <img src="assets/moon-icons/luna-menguante.png" class="moon-image" alt=""></img>
            <i><p>Vemos una fina franja de luz a la izquierda (en el hemisferio norte) que se reduce hasta desaparecer, volviendo a la Luna Nueva. </p></i>`;
            return "Luna Menguante";
        default:
            break;
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// 0 – new moon
// 0-0.25 – waxing crescent
// 0.25 – first quarter
// 0.25-0.5 – waxing gibbous
// 0.5 – full moon
// 0.5-0.75 – waning gibbous
// 0.75 – last quarter
// 0.75 -1 – waning crescent