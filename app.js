import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCx4I0fv-H4OHeH6txTksCN946C2apAjwg",
    authDomain: "moviesvault-ff5fa.firebaseapp.com",
    projectId: "moviesvault-ff5fa",
    storageBucket: "moviesvault-ff5fa.appspot.com",
    messagingSenderId: "404186300802",
    appId: "1:404186300802:web:5816c1defa386ed31fcf9b",
    measurementId: "G-4W6F3L7Q90"
};

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCx4I0fv-H4OHeH6txTksCN946C2apAjwg",
    authDomain: "moviesvault-ff5fa.firebaseapp.com",
    projectId: "moviesvault-ff5fa",
    storageBucket: "moviesvault-ff5fa.appspot.com",
    messagingSenderId: "404186300802",
    appId: "1:404186300802:web:5816c1defa386ed31fcf9b",
    measurementId: "G-4W6F3L7Q90"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch Movies
async function fetchMovies() {
    try {
        const moviesCollection = db.collection("movies");
        const snapshot = await moviesCollection.get();
        const movies = snapshot.docs.map(doc => doc.data());

        console.log("Movies fetched:", movies);
        renderMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

fetchMovies();

// Render movies
templateFunction();
function renderMovies() {
    movieList.innerHTML = "";
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-container");
        movieElement.innerHTML = `
            <img class="movie-poster" src="${movie.poster}" alt="${movie.name}">
            <p class="movie-title">${movie.name} (${movie.year})</p>
            <a href="${movie.streamLink}" target="_blank" class="stream-btn">Watch Now</a>
        `;
        movieList.appendChild(movieElement);
    });
}

// Update Pagination Buttons
function updatePaginationButtons(snapshot) {
    prevPageBtn.disabled = !firstVisible;
    nextPageBtn.disabled = snapshot.docs.length < moviesPerPage;
}

// Event Listeners
nextPageBtn.addEventListener("click", () => templateFunction("next"));
prevPageBtn.addEventListener("click", () => templateFunction("prev"));
