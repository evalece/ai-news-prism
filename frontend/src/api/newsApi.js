const API_URL = "http://localhost:3001/api/news";

export async function getNews() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  return response.json();
}