import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getSingleComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
    }, [comicId])

    const updateComic = (id) => {
        clearError();
        getSingleComic(id).then(loadedComic)
    }

    const loadedComic = (newComic) => {
        setComic(newComic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) && comic ? <View comic={comic} /> : null

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    const {title, description, pages, price, thumbnail} = comic
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <>
         <img src={thumbnail} alt={title} className="single-comic__img" style={imgStyle}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>

            <Link to="/comics" className="single-comic__back">Back to all</Link>
       </>
    )
}
export default SingleComicPage;