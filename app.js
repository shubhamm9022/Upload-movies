import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv1KgOL_CsLs4xV6KuYuk3TD6xqpnY-84",
  authDomain: "movievault-e650e.firebaseapp.com",
  projectId: "movievault-e650e",
  storageBucket: "movievault-e650e.appspot.com", // Corrected typo
  messagingSenderId: "61140580505",
  appId: "1:61140580505:web:d3216ca8bd944662a22008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch Movies
async function fetchMovies() {
    try {
        const moviesCollection = collection(db, "movies");
        const snapshot = await getDocs(moviesCollection);
        const movies = snapshot.docs.map(doc => doc.data());

        console.log("Movies fetched:", movies);
        // Call your function to render movies here
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
