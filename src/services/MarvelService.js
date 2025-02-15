import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const {request, clearError, process, setProcess} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=fb6eb76b1a018487c1812ab708f9594a';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id, shortDescr = true) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

		return _transformCharacter(res.data.results[0], shortDescr);
	}

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformComics);
	}

	const getSingleComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

		return _transformComics(res.data.results[0]);
	}

	const _transformComics = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			description: comic.description || "There is no description",
			pages: `${comic.pageCount} pages`,
			price: `${comic.prices[0]?.price}$`,
			language: comic.textObjects[0]?.language || "en-us",
			thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
		}
	}

	const _transformCharacter = (char, shortDescr = true) => {
		const modifyDescription = (desc) => {
			if (desc.length === 0) {
				return "Description is absent"
			} else if (shortDescr && desc.length > 180) {
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

	return {process,
			setProcess,
            getAllCharacters,
            getCharacter,
            clearError,
            getAllComics,
            getSingleComic,
            getCharacterByName};
}

export default useMarvelService;