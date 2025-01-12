import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const {loading, request, error} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=fb6eb76b1a018487c1812ab708f9594a';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = (char) => {
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

	return {loading, error, getAllCharacters, getCharacter};
}

export default useMarvelService;