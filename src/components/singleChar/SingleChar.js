import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleChar.scss';

const SingleChar = (props) => {
    const {charId} = useParams();
    const [char, setCahr] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateCahr(charId);
    }, [charId])

    const updateCahr = (id) => {
        clearError();
        getCharacter(id).then(loadedChar)
    }

    const loadedChar = (newChar) => {
        setCahr(newChar);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) && char ? <View char={char} /> : null

    return (
        <div className="single-char">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <>
            <img src={thumbnail} alt={name} className="single-char__img" style={imgStyle}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>

            <Link to="/" className="single-char__back">Back to characters</Link>
       </>
    )
}
export default SingleChar;
