class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=fb6eb76b1a018487c1812ab708f9594a';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fecth ${url}, status ${res.status}`)
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  }

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  }
}

export default MarvelService;