// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase configuration (Replace with your details)
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Fetch Movies from Firestore
async function fetchMovies() {
    const moviesRef = collection(db, "movies");
    const movieSnapshot = await getDocs(moviesRef);
    const movieList = movieSnapshot.docs.map(doc => doc.data());
    
    displayMovies(movieList);
}

// Display Movies on Website
function displayMovies(movies) {
    const movieListContainer = document.getElementById("movie-list");
    movieListContainer.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.title}">
            <h2>${movie.title} (${movie.year})</h2>
            <a href="${movie.streamLink}" target="_blank">Stream</a> |
            <a href="${movie.downloadLink}" target="_blank">Download</a>
        `;

        movieListContainer.appendChild(movieElement);
    });
}

// Call fetchMovies when page loads
document.addEventListener("DOMContentLoaded", fetchMovies);
