import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComic.scss';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {getSingleComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
    }, [comicId])

    const updateComic = (id) => {
        clearError();
        getSingleComic(id)
            .then(loadedComic)
            .then(() => setProcess('confirmed'));
    }

    const loadedComic = (newComic) => {
        setComic(newComic);
    }

    return (
        <div className="single-comic">
            {setContent(process, View, {comic})}
        </div>
    )
}

const View = ({comic}) => {
    const {title, description, pages, price, thumbnail} = comic
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comic book`}
                />
                <title>{`${title} comic book`}</title>
            </Helmet>
             <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>

            <Link to="/comics" className="single-comic__back">Back to comics</Link>
       </>
    )
}
export default SingleComic;