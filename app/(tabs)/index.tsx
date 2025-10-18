// import SearchBar from "@/components/SearchBar";
// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
// import { fetchMovies } from "@/services/api";
// import useFetch from "@/services/useFetch";
// import { useRouter } from "expo-router";
// import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

// export default function Index() {
//   const router = useRouter();

//   const {data:movies,loading:moviesLoading,error:moviesError} = useFetch(()=>fetchMovies({query:''}))
//   return (
//     <View className="flex-1 bg-primary">
//       <Image source={images.bg} className="absolute top-0 left-0 w-full h-full z-0" />
//       <ScrollView
//         className="flex-1 px-5"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
//       >
//         <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

//         {moviesLoading ?( 
//         <ActivityIndicator
//         size="large"
//         color="0000ff"
//         className="mt-10 self-center"
//         />  
//       ):moviesError?(<Text>Error:{moviesError?.message}</Text>):
//       (<View className="flex-1 mt-5">
//           <SearchBar
//             onPress={() => router.push("/search")}
//             placeholder="Search for a Movie"
//           />

//           <>
//           <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
//           </>
//         </View>)}

        
//       </ScrollView>
//     </View>
//   );
// }


import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.EXPO_TMDB_HEADER;
  // const fetchData = fetch(
  //   "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  // );

  const API_URL = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_URL]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#00BFFF"
        style={{ marginTop: 50 }}
      />
    );
  }

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchTrendingMovies());

  return (
    <View className="flex-1 bg-primary">
      {/* ✅ fixed bg image */}
      <Image
        source={images.bg}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <ScrollView
        className="flex-1 px-5 z-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-red-500 mt-10 text-center">
            Error: {moviesError.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a Movie"
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Trending Movies
            </Text>

            {/* ✅ show fetched movie titles */}
            {movies?.map((movie) => (
              <Text
                key={movie.id}
                className="text-white text-base mb-2"
                numberOfLines={1}
              >
                🎬 {movie.title}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
