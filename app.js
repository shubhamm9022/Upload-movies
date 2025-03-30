// Import Firebase Modules import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"; import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration const firebaseConfig = { apiKey: "AIzaSyDv1KgOL_CsLs4xV6KuYuk3TD6xqpnY-84", authDomain: "movievault-e650e.firebaseapp.com", projectId: "movievault-e650e", storageBucket: "movievault-e650e.appspot.com", messagingSenderId: "61140580505", appId: "1:61140580505:web:d3216ca8bd944662a22008" };

// Initialize Firebase const app = initializeApp(firebaseConfig); const db = getFirestore(app);

// DOM Elements const movieList = document.getElementById("movie-list"); const prevPageBtn = document.getElementById("prevPage"); const nextPageBtn = document.getElementById("nextPage");

let lastVisible = null; // Keeps track of pagination const moviesPerPage = 10; // Number of movies per page

// Fetch Movies with Pagination async function fetchMovies(next = false) { try { let moviesQuery;

if (next && lastVisible) {
        moviesQuery = query(collection(db, "movies"), orderBy("year", "desc"), startAfter(lastVisible), limit(moviesPerPage));
    } else {
        moviesQuery = query(collection(db, "movies"), orderBy("year", "desc"), limit(moviesPerPage));
    }

    const snapshot = await getDocs(moviesQuery);
    if (!snapshot.empty) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]; // Update last document for pagination
    }

    const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderMovies(movies);

    // Enable or disable buttons
    prevPageBtn.disabled = !lastVisible;
    nextPageBtn.disabled = snapshot.docs.length < moviesPerPage;

} catch (error) {
    console.error("Error fetching movies:", error);
}

}

// Render Movies function renderMovies(movies) { movieList.innerHTML = ""; // Clear previous content

movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-container");
    movieElement.innerHTML = `
        <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
        <a href="movie.html?id=${movie.id}" class="movie-title">${movie.title} (${movie.year})</a>
    `;
    movieList.appendChild(movieElement);
});

}

// Event Listeners for Pagination nextPageBtn.addEventListener("click", () => fetchMovies(true)); prevPageBtn.addEventListener("click", () => fetchMovies(false));

// Initial Fetch fetchMovies();

