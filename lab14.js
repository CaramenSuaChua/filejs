'use strict'
const countriesContainer = document.querySelector('.countries')



const renderCountry = function(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

    const html =` <article class="${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span> ${(+data.population /1000000)
      .toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.language[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>` ; 

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1 ;
})
}
renderCountry('usa')
renderCountry('portugal')

const whereAml =  function(lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
        if (!res.ok) throw new Error( ` Problem with geocoding ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log(data)
        console.log(`You are live in ${data.city}, ${data.country}`)

        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
    })
    .then(res => {
        if (!res.ok) 
        throw new Error( `Country not found (${res.status})`)
        return res.json()
    })
    .then(data =>renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
}
whereAml(52.508, 13.381);
whereAml(19.037, 72.873);
whereAml(-33.933, 18.474);


