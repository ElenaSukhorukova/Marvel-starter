import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import useMarvelService from '../../services/MarvelService';
import setListContent from '../../utils/setListContent';

import './comicsList.scss';

const ComicsList = () => {
    const {getAllComics, process, setProcess} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newLoading, setNewLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
        setNewLoading(initial ? false : true);

        getAllComics(offset)
            .then(loadedComics)
            .then(() => setProcess('confirmed'));
    }

    const loadedComics = (newComics) => {
        setComicsEnded(newComics.length < 8 ? true : false)

        setOffset(offset => offset + 8);
        setComicsList(comicsList => [...comicsList, ...newComics]);
        setNewLoading(false);
    }

    function renderComics(comics) {
        const items = comics.map((item, i) => {
            const imgStyle = item.thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setListContent(process, () => renderComics(comicsList), newLoading)}

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