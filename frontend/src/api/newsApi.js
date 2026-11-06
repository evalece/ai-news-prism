
const API_BASE_URL = "http://localhost:3001/api";

export async function getNews() {
  const response = await fetch(`${API_BASE_URL}/news`);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  return response.json();
}
