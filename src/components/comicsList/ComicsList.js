import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newLoading, setNewLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        setNewLoading(initial ? false : true);
        getAllComics(offset).then(loadedComics);
    }

    const loadedComics = (newComics) => {
        setComicsEnded(newComics.length < 8 ? true : false)

        setOffset(offset => offset + 8);
        setComicsList(comicsList => [...comicsList, ...newComics]);
        setNewLoading(false);
    }

    function renderComics(comics) {
        const items = comics.map(item => {
            return (
                <li key={item.id} className="comics__item">
                    <a href={item.url}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newLoading ? <Spinner /> : null;
    const content = renderComics(comicsList)

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}

            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                disabled={newLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;