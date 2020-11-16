let darkMode  = localStorage.getItem("darkMode")
localStorage.setItem('darkMode', 'dark-mode');

getCountries(false, "Filter by Region");


const enableDarkMode = () => {
    const dropdownTitle = document.querySelector('.dropdown-title');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const dropdownContent = document.querySelector('div.dropdown-content');
    const searchBar = document.getElementById('search-bar');
    const glass = document.getElementById('glass');
    const allDarkMode = [dropdownTitle, body, header, nav, dropdownContent, searchBar, glass]
    const dropdownFilters = document.querySelectorAll('.dropdown-filter');
    const countryCardDesc = document.querySelectorAll('.country-card-desc');
    const countryCard = document.querySelectorAll('.country-card');
    const backButton = document.querySelectorAll('.back-button');

    countryCardDesc.forEach(element => element.classList.add('dark-mode'));
    countryCard.forEach(element => element.classList.add('dark-mode'));
    allDarkMode.forEach(element => element.classList.add('dark-mode'));
    dropdownFilters.forEach(element => element.classList.add('dark-mode'));
    backButton.forEach(element => element.classList.add('dark-mode'));
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    const dropdownTitle = document.querySelector('.dropdown-title');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const dropdownContent = document.querySelector('.dropdown-content');
    const searchBar = document.getElementById('search-bar');
    const glass = document.getElementById('glass');
    const allDarkMode = [dropdownTitle, body, header, nav, dropdownContent, searchBar, glass]
    const dropdownFilters = document.querySelectorAll('.dropdown-filter');
    const countryCardDesc = document.querySelectorAll('.country-card-desc');
    const countryCard = document.querySelectorAll('.country-card');
    const backButton = document.querySelectorAll('.back-button');

    countryCardDesc.forEach(element => element.classList.remove('dark-mode'));
    countryCard.forEach(element => element.classList.remove('dark-mode'));
    allDarkMode.forEach(element => element.classList.remove('dark-mode'));
    dropdownFilters.forEach(element => element.classList.remove('dark-mode'));
    backButton.forEach(element => element.classList.remove('dark-mode'));
    localStorage.setItem("darkMode", null);
}
// dark-mode even after refreshing
if (darkMode == "enabled") {
    enableDarkMode();
}

// onclick function toggling dark mode
function togglingDarkMode() {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode != "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Filter Countries per region

function reloadCountries() {
    const dropdownTitle = document.querySelector('.dropdown-title').innerHTML;
    let filterOnOff = false;
    if (dropdownTitle == "Africa" || dropdownTitle == "Americas" ||
    dropdownTitle == "Asia" || dropdownTitle == "Europe" ||
    dropdownTitle == "Oceania") {
       filterOnOff = true;
       getCountries(filterOnOff, dropdownTitle);
    } else {
        getCountries(filterOnOff, "Filter by Region");
    }
}

// fetch api 

async function getCountries(filterOnOff, region, query) {
     let res;
     let countries;
     if ((query == null || query == undefined || query == '') && filterOnOff == false) {
        res = await fetch(`https://restcountries.eu/rest/v2/all`);
        countries = await res.json();
     } else if (filterOnOff == true && (query == null || query == undefined)) {
        res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
        countries = await res.json();
     } else {
        res = await fetch(`https://restcountries.eu/rest/v2/name/${query}`);
        countries = await res.json();
     }

    displayCountries(countries)
}

// Commas after each data

function joinObjectsNames(data) {
    let res = [];
    let i = 0;
    while (i < 7) {
        try {
            res.push(' ' + data[i].name)
        } catch (error) {

        }
        i++;
    } 
    return res
}

function displayCountries(countries) {
    darkMode = localStorage.getItem('darkMode');
    const countriesCards = document.getElementById('countriesCards');
    countriesCards.innerHTML = '';
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('country-card');
        let classDarkMode = ''
        if (darkMode == 'enabled') {
            countryEl.classList.add('dark-mode');
            classDarkMode = 'dark-mode'
        } else {
            countryEl.classList.remove('dark-mode')
        }
        countryEl.setAttribute('onclick', 'onClickCountryCard(this)');
        let countryPopulation = (country.population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let countryCurrencies = joinObjectsNames(country.currencies);
        let countryLanguages= joinObjectsNames(country.languages);
        countryEl.id = country.alpha3Code;
        country.alpha3Code = country.name;
        countryEl.innerHTML = `
        <span style="background-image: url(${country.flag}); background-size: 100%; background-repeat: no-repeat;background-position: center;" class="country-card-img"></span>
        <div class="country-card-desc ${classDarkMode}">
            <p class="card-countries-title country-name">${country.name}</p>
            <p class="card-desc bold600">Population:<span class="card-desc population"> ${countryPopulation}</span></p>
            <p class="card-desc bold600">Region:<span class="card-desc region"> ${country.region}</span></p>
            <p class="card-desc bold600">Capital:<span class="card-desc capital"> ${country.capital}</span></p>
        </div>
        <div class="country-card-desc-detail">
            <a class="back-button bold300 ${classDarkMode}" href="/index.html">Back</a>
            <div class="detail-wrap-title">
                <p class="detail-title country-name"> ${country.name}</p>
            </div>
            <div class="detail-desc-wrap">
                <div class="detail-desc-wrap-left">
                    <p class="detail-desc bold600">Native Name: <span id="native-name" class="card-desc"> ${country.nativeName}</span></p>
                    <p class="detail-desc bold600">Population: <span class="card-desc population">${countryPopulation}</span></p>
                    <p class="detail-desc bold600">Region: <span class="card-desc region">${country.region}</span></p>
                    <p class="detail-desc bold600">Sub Region: <span id="sub-region" class="card-desc">${country.subregion}</span></p>
                    <p class="detail-desc bold600">Capital: <span class="card-desc capital">${country.capital}</span></p>
                </div>
                <div class="detail-desc-wrap-right">
                    <p class="detail-desc bold600">Top Level Domain: <span class="card-desc" id="domain"> ${country.topLevelDomain}</span></p>
                    <p class="detail-desc bold600">Currencies: <span id="currencies" class="card-desc">${countryCurrencies}</span></p>
                    <p class="detail-desc bold600">Languages: <span id="languages" class="card-desc"> ${countryLanguages}</span></p>
                </div>
            </div>
            <div class="detail-border-wrap">
                <p class="detail-desc bold700">Border Countries: <span id="border-countries" class="card-desc">${country.borders}</span></p>
            </div>
        </div>
        `;
        countriesCards.appendChild(countryEl);
    });


    // Adjust height of container

    let desktopView = false;
    let tabletView = false;

    if (window.matchMedia("(min-width: 1300px)").matches) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 4));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
        desktopView = true;
    } else if ((window.matchMedia("(max-width: 1300px)").matches) &&
    (window.matchMedia("(min-width: 768px)").matches)) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 2));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
        tabletView = true;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 1));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
    }

    //Blank card for fill last row

    if (desktopView) {
        if ((countries.length % 4) == 1) {
            countriesCards.appendChild(document.createElement('div'));
        } else if ((countries.length % 4) == 2) {
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
        } else if ((countries.length % 4) == 3) {
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
        }
    } else if(tabletView) {
        if ((countries.length % 4) == 1) {
            countriesCards.appendChild(document.createElement('div'));
        }
    }

    const lastBlankCard = countriesCards.lastElementChild;

    if (lastBlankCard.classList == "") {
        lastBlankCard.classList.add('blank-card');
    }
    if (lastBlankCard.previousElementSibling.classList == "") {
        lastBlankCard.previousElementSibling.classList.add('blank-card')
    }
    if (lastBlankCard.previousElementSibling.previousElementSibling == "") {
        lastBlankCard.previousElementSibling.previousElementSibling.classList.add('blank-card')
    }
}


//Display detail 
function onClickCountryCard(card) {
    const countryCard = document.querySelectorAll('.country-card')
    const countriesCards = document.getElementById('countriesCards');
    const searchFilter = document.querySelector('.search-filter')
    const countryDetail = card.lastElementChild;
    
    countriesCards.style.height = "686px";
    if (!(card.classList.contains('card-detail'))) {
        countryCard.forEach(element => element.classList.toggle('card-detail-out'));
        card.classList.remove('card-detail-out')
        card.classList.toggle('card-detail');
        countriesCards.classList.toggle('card-detail');
        searchFilter.classList.toggle('card-detail-out');
        countryDetail.classList.toggle('active');
    }
}


//dropdown button
function dropdownBtn() {
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownTitle = document.querySelector('.dropdown-title')
    dropdownTitle.classList.toggle('active')
    dropdownContent.classList.toggle('active')
}


//function toggling dropdown
function dropdownFilter(data) {
    const dropdownTitle = document.querySelector('.dropdown-title')
    if (data.innerHTML == dropdownTitle.innerHTML) {
        dropdownTitle.innerHTML = 'Filter by Region';
        dropdownTitle.classList.remove('bold700')
    } else {
        dropdownTitle.innerHTML = data.innerHTML;
        dropdownTitle.classList.add('bold700');
    }
}