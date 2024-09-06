
class Directus {

  apiBase = 'http://localhost:8055';
  apiToken = '-bigYuGfJdYDoBmgBO7RLC5ikc8A1-wB';

  getResourse = async (url) => {
    let response = await fetch(url, {
      headers: {
          Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getAllPhotos = () => {
    return this.getResourse(`${this.apiBase}/items/photos?limit=9&offset=0`);
  };

  getPhoto = (id) => {
    return this.getResourse(`${this.apiBase}/items/photos/${id}`)
  }
}

export default Directus;
