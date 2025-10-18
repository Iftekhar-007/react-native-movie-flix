// export const TMDB_CONFIG={
//     BASE_URL : "https://api.themoviedb.org/3",
//     API_KEY : process.env.EXPO_TMDB_HEADER,
//     headers:{
//         accept:"application/json",
//         Authorization:`Bearer ${process.env.EXPO_TMDB_HEADER}`
//     }
// }

// export const fetchMovies =async ({query} : {query:string}) =>{
//     const endPoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
    
//     `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

//     const response = await fetch(endPoint,{
//         method:"GET",
//         headers:TMDB_CONFIG.headers
//     })

//     if(!response.ok){
//         throw new Error("failed to fetch movies")
//     }

//     const data = await response.json()
//     return data.results
// }

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODc5YTE3NDlmZThiZDNjNGI0NTg4ZWZjZmYzNjlhZiIsIm5iZiI6MTc2MDcwNjE1NS40NzcsInN1YiI6IjY4ZjIzZTZiOWE5OGVlNWQ0MjU5MTE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wKwYuQ_VE6P9IAMpIeSG0X5g6NP21rJOCF8_ONNW86M",
  },
};

// ✅ Trending Movies fetch
export const fetchTrendingMovies = async () => {
  const url = `${TMDB_CONFIG.BASE_URL}/trending/movie/day?language=en-US`;

  const response = await fetch(url, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};


// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODc5YTE3NDlmZThiZDNjNGI0NTg4ZWZjZmYzNjlhZiIsIm5iZiI6MTc2MDcwNjE1NS40NzcsInN1YiI6IjY4ZjIzZTZiOWE5OGVlNWQ0MjU5MTE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wKwYuQ_VE6P9IAMpIeSG0X5g6NP21rJOCF8_ONNW86M'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));