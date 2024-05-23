import axios from "axios";

type Photo = {
  ///окремий об’єкт фотографії///
  id: string; ///Унікальний ідентифікатор фотографії///
  urls: {
    ///Об’єкт, що містить URL для різних розмірів зображення (наприклад, regular та small)///
    regular: string; ///Рядок, що представляє URL зображення звичайного розміру.///
    small: string; ///Рядок, що представляє URL зображення малого розміру.///
  };
  alt_description: string; ///Рядок, що представляє альтернативний опис фотографії (якщо він доступний)///
};

type FetchDataArgs = {
  ///представляє аргументи, які очікує функція fetchData///
  query: string; /// Рядок, що представляє пошуковий запит для фотографій///
  page: number; ///Число, що представляє номер сторінки (для пагінації результатів)///
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>; /// Функція, яка встановлює стан масиву об’єктів Photo///
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; /// Функція, яка встановлює стан завантаження (зазвичай булеве значення) ///
  setError: React.Dispatch<React.SetStateAction<string>>; /// Функція, яка встановлює повідомлення про помилку (зазвичай рядок) ///
};

export async function fetchData({
  query,
  page,
  setPhotos,
  setLoading,
  setError,
}: FetchDataArgs): Promise<void> {
  try {
    setLoading(true); /// Отримання даних з сервера ///
    const response = await axios.get(
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
    setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]); /// Оновлення стану фотографій ///
  } catch (error) {
    /// Обробка помилок ///
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  } finally {
    setLoading(false);
  }
}
