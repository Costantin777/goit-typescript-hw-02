import axios, { AxiosResponse } from "axios";

// Визначте інтерфейс для об'єкта фотографії Unsplash
interface UnsplashPhoto {
  id: string; // Унікальний ідентифікатор фотографії
  urls: {
    regular: string; // URL зображення звичайного розміру
    small: string; // URL зображення малого розміру
  };
  alt_description: string; // Альтернативний опис фотографії (якщо він доступний)
}

// Визначте інтерфейс для всієї відповіді API Unsplash
interface UnsplashResponse {
  results: UnsplashPhoto[]; // Масив об'єктів фотографій
  total: number; // Загальна кількість результатів
  total_pages: number; // Загальна кількість сторінок результатів (для пагінації)
}

// Визначте інтерфейс для параметрів fetchData
interface FetchDataArgs {
  query: string;
  page: number;
  setPhotos: (photos: UnsplashPhoto[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
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
