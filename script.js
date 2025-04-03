document.addEventListener("DOMContentLoaded", async () => {
    const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Replace with actual key
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let currentPage = 1;
    const moviesPerPage = 10;
    let currentCategory = null;

    async function fetchMovies(page = 1, category = null) {
        const start = (page - 1) * moviesPerPage;
        const end = start + moviesPerPage - 1;

        let query = supabase.from("movies").select("*").order("id", { ascending: false }).range(start, end);
        if (category && category !== "Join Telegram") {
            query = query.eq("category", category);
        }

        let { data, error } = await query;
        if (error) {
            console.error("❌ Error fetching movies:", error);
            return;
        }

        displayMovies(data);
    }

    async function searchMovies() {
        const query = document.getElementById("searchInput").value.toLowerCase();
        if (!query) {
            fetchMovies(currentPage, currentCategory);
            return;
        }

        let { data, error } = await supabase.from("movies").select("*").ilike("title", `%${query}%`);
        if (error) {
            console.error("❌ Search error:", error);
            return;
        }

        displayMovies(data);
    }

    function displayMovies(movies) {
        const movieList = document.getElementById("movie-list");
        movieList.innerHTML = "";

        if (!movies || movies.length === 0) {
            movieList.innerHTML = "<p>No movies found.</p>";
            return;
        }

        movies.forEach(movie => {
            const movieSlug = movie.title.trim().replace(/\s+/g, '-').toLowerCase();
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");

            movieItem.innerHTML = `
                <a href="movie.html?title=${movieSlug}">
                    <img src="${movie.poster}" alt="${movie.title}">
                </a>
                <h3>${movie.title} (${movie.year})</h3>
                <p>${movie.genre}</p>
            `;

            movieList.appendChild(movieItem);
        });
    }

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage, currentCategory);
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        currentPage++;
        fetchMovies(currentPage, currentCategory);
    });

    document.querySelectorAll(".category-box").forEach(box => {
        box.addEventListener("click", () => {
            const category = box.dataset.category;
            currentCategory = category === "Join Telegram" ? null : category;
            fetchMovies(1, currentCategory);
        });
    });

    fetchMovies(currentPage);
});
