import axios, { AxiosResponse } from "axios";

// Визначте інтерфейс для об'єкта фотографії Unsplash
interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

// Визначте інтерфейс для всієї відповіді API Unsplash
interface UnsplashResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export async function fetchData({
  query,
  page,
  setPhotos,
  setLoading,
  setError,
}: FetchDataArgs): Promise<void> {
  try {
    setLoading(true);

    // Зробіть запит до API
    const response: AxiosResponse<UnsplashResponse> = await axios.get(
      "https://api.unsplash.com/search/photos/",
      {
        params: {
          client_id: "sSw2A24lCtgMKKWaGbVZZ3GjpqcpzhpoZDxANpcbn30",
          query: query,
          per_page: 12,
          page: page,
          orientation: "landscape",
        },
      }
    );

    // Оновіть стан з отриманими фотографіями
    setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
  } catch (error) {
    // Обробка помилок
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Сталася невідома помилка");
    }
  } finally {
    setLoading(false);
  }
}
