// 563492ad6f917000010000015bd4668c914e405cb7f2c132800f9fce

const auth = "563492ad6f917000010000015bd4668c914e405cb7f2c132800f9fce";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBotton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

let searchValue;
let page = 1;
let fetchLink = "";
let currentSearch;

// Event Listner
searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

// fetch Api
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

// Genrate Photos
async function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">    
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
        </div>   
        <img src=${photo.src.large}></img> 
        `;
    gallery.appendChild(galleryImg);
  });
}

// Start Photos
async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated/?page=1&per_page=15`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

// Searched Photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=15`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

// Function Call
curatedPhotos();
