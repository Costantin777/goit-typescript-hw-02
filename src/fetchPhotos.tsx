import axios, { AxiosInstance } from 'axios'; // Import Axios and AxiosInstance

// Define the type for photo data (you can adjust this based on your actual data structure)
interface Photo {
  id: string;
  // Add other properties as needed
}

// Create a custom Axios instance with your configuration
const createCustomInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: { 'Accept-Version': 'v1' },
    params: {
      client_id: '5RTzoeWBx59VxVJJ35nR2YNpjl-WFFkqyyd0ucS7lrM',
      per_page: 12,
    },
  });
};

// Fetch photos using the custom instance
export default async function fetchPhotos(keyword: string, page: number): Promise<Photo[]> {
  const instance = createCustomInstance();

  try {
    const response = await instance.get('/search/photos', {
      params: { query: keyword, page },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}
