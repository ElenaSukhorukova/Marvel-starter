import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleChar.scss';

const SingleChar = () => {
    const {charId} = useParams();
    const [char, setCahr] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();


    useEffect(() => {
        updateCahr(charId);
    }, [charId])

    const updateCahr = (id) => {
        clearError();
        getCharacter(id, false)
            .then(loadedChar)
            .then(() => setProcess('confirmed'));
    }

    const loadedChar = (newChar) => {
        setCahr(newChar);
    }

    return (
        <div className="single-char">
            {setContent(process, View, {char})}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics' character`}
                />
                <title>{`${name} comics' character`}</title>
            </Helmet>
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
