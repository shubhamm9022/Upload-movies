import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv1KgOL_CsLs4xV6KuYuk3TD6xqpnY-84",
  authDomain: "movievault-e650e.firebaseapp.com",
  projectId: "movievault-e650e",
  storageBucket: "movievault-e650e.appspot.com",
  messagingSenderId: "61140580505",
  appId: "1:61140580505:web:d3216ca8bd944662a22008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const movieList = document.getElementById("movie-list");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

let movies = [];
let currentPage = 1;
const moviesPerPage = 10;

// Fetch Movies from Firestore
async function fetchMovies() {
    try {
        const moviesCollection = collection(db, "movies");
        const snapshot = await getDocs(moviesCollection);
        movies = snapshot.docs.map(doc => doc.data());

        console.log("Movies fetched:", movies);
        renderMovies();
        updatePaginationButtons();
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Render Movies
function renderMovies() {
    movieList.innerHTML = "";

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = movies.slice(startIndex, endIndex);

    paginatedMovies.forEach(movie => {
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
function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage * moviesPerPage >= movies.length;
}

// Pagination Event Listeners
nextPageBtn.addEventListener("click", () => {
    currentPage++;
    renderMovies();
    updatePaginationButtons();
});

prevPageBtn.addEventListener("click", () => {
    currentPage--;
    renderMovies();
    updatePaginationButtons();
});

// Fetch movies on load
fetchMovies();
