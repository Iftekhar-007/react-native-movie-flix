import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";

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
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a Movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
