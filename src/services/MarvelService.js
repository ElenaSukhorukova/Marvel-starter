class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=fb6eb76b1a018487c1812ab708f9594a';

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fecth ${url}, status ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);

		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		const modifyDescription = (desc) => {
			if (desc.length === 0) {
				return "Description is absent"
			} else if (desc.length > 180) {
				return `${desc.slice(0, 180)}...`
			} else {
				return desc;
			}
		}

		return {
			id: char.id,
			name: char.name,
			description: modifyDescription(char.description),
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items.slice(0, 9)
		}
  }
}

export default MarvelService;