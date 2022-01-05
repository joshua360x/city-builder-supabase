import { checkAuth, logout, fetchCity, createDefaultCity, updateSkyline, updateCastle, updateLand, updateName, updateTag } from '../fetch-utils.js';

const skylineEL = document.getElementById('skyline');
const castleEL = document.getElementById('castle');
const landEL = document.getElementById('land');
const skylineDropdwonEL = document.getElementById('skyline-dropdown');
const castleDropdownEL = document.getElementById('castle-dropdown');
const landDropdwonEL = document.getElementById('land-dropdown');
const taglineEL = document.getElementById('tagline');
const taglineFormEL = document.getElementById('tagline-submit');
const cityNameEL = document.getElementById('city-name');
const nameFormEL = document.getElementById('name-submit');


checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

nameFormEL.addEventListener('submit', async(e) => {
    e.preventDefault();
    const newName = new FormData(nameFormEL);

    const nameUpdate = await updateName(newName.get('cityName'));
    nameFormEL.reset();
    displayName(nameUpdate);
});

taglineFormEL.addEventListener('submit', async(e) => {
    e.preventDefault();
    taglineEL.textContent = '';
    const newTag = new FormData(taglineFormEL);
    
    const city = await fetchCity();
    
    city.tagline.push((newTag.get('tagName')));
    const cityTag = await updateTag(city.tagline);
    // for (const tagline of city.tagline ) {
    //     const p = document.createElement('p')
    //     p.textContent = tagline
    //     taglineEL.append(p)
    // }
    taglineFormEL.reset();

    displayTagLine(cityTag);
});

skylineDropdwonEL.addEventListener('change', async() => {
    
    const skyValue = skylineDropdwonEL.value;

    const newSkyLine = await updateSkyline(skyValue);
    // const city = await fetchCity();
    displaySky(newSkyLine);
});

castleDropdownEL.addEventListener('change', async() => {
    // const city = await fetchCity();

    const castleValue = castleDropdownEL.value;

    const newCastle = await updateCastle(castleValue); 

    displayCastle(newCastle);
});

landDropdwonEL.addEventListener('change', async() => {
    // const city = await fetchCity();

    const landValue = landDropdwonEL.value;

    const newLand = await updateLand(landValue); 

    displayLand(newLand);
});

window.addEventListener('load', async() => {

    const city = await fetchCity();

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
function displayName(city) {
    cityNameEL.textContent = city.name;
}

function displayTagLine(city) {
    for (let tagline of city.tagline) {
        const p = document.createElement('p');

        p.classList.add('tagline');

        p.textContent = tagline;

        taglineEL.append(p);
    }
}
