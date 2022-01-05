import { checkAuth, logout, getCity, createDefaultCity, updateSkyline, updateCastle, updateLand } from '../fetch-utils.js';

const skylineEL = document.getElementById('skyline');
const castleEL = document.getElementById('castle');
const landEL = document.getElementById('land');
const skylineDropdwonEL = document.getElementById('skyline-dropdown');
const castleDropdownEL = document.getElementById('castle-dropdown');
const landDropdwonEL = document.getElementById('land-dropdown');
const cityNameEL = document.getElementById('city-name');
const taglineEL = document.getElementById('tagline');


checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

skylineDropdwonEL.addEventListener('change', async() => {
    
    const skyValue = skylineDropdwonEL.value;

    const newSkyLine = await updateSkyline(skyValue);
    // const city = await getCity();
    displaySky(newSkyLine);
});

castleDropdownEL.addEventListener('change', async() => {
    // const city = await getCity();

    const castleValue = castleDropdownEL.value;

    const newCastle = await updateCastle(castleValue); 

    displayCastle(newCastle);
});

landDropdwonEL.addEventListener('change', async() => {
    // const city = await getCity();

    const landValue = landDropdwonEL.value;

    const newLand = await updateLand(landValue); 

    displayLand(newLand);
});

window.addEventListener('load', async() => {

    const city = await getCity();

    if (!city) {

        const newCity = await createDefaultCity();


        displayCity(newCity[0]);
    } else {

        displayCity(city);
    }
});



function displayCity(city) {
    cityNameEL.textContent = city.name;

    skylineEL.src = `../assets/${city.skyline}-skyline.jpg`;

    castleEL.src = `../assets/${city.castle}-castle.jpg`;

    landEL.src = `../assets/${city.land}-land.jpg`;


    for (let tagline of city.tagline) {
        const p = document.createElement('p');

        p.classList.add('tagline');

        p.textContent = tagline;

        taglineEL.append(p);
    }
}

function displaySky(city) {
    skylineEL.src = `../assets/${city.skyline}-skyline.jpg`;
}


function displayCastle(city) {
    castleEL.src = `../assets/${city.castle}-castle.jpg`;
}

function displayLand(city) {
    landEL.src = `../assets/${city.land}-land.jpg`;
}
