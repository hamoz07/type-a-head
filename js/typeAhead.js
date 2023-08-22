const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let allCities = [];

fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    allCities.push(...response);
  });

function matchedSearch(typed, allCities) {
  return allCities.filter((pl) => {
    let exp = new RegExp(typed, "ig");
    return pl.city.match(exp) || pl.state.match(exp);
  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getMatches() {
    let matches = matchedSearch(this.value, allCities);
    
    let data = matches
    .map((match) => {
      let highlight = new RegExp(this.value, "ig");

      let replaceCity = match.city.replace(
        highlight,
        `<span class="hl">${this.value}</span>`
      );
      let replaceState = match.state.replace(
        highlight,
        `<span class="hl">${this.value}</span>`
      );

      return `
      <li>
      <span class="name">${replaceCity}, ${replaceState}</span>
      <span class="population"> ${numberWithCommas(match.population)}</span>
    </li>
    `;
})
    .join("");
    
  ul.innerHTML = data;
}

let ul = document.querySelector(".suggestions");
let search = document.querySelector(".search");
search.addEventListener("keyup", getMatches);