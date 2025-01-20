import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ( {charId, children} ) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if (!charId) return;

        clearError();

        getCharacter(charId).then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className='char__info-block'>
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
            {children}
        </div>
    )
}

const View = ({char, search}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                { comics.length > 0 ? null : "There is no comics with this character"}
                {
                    comics.map((item, i)=> {
                        const comicId = item.resourceURI.match(/(?<=comics\/)(\d{1,})/)[1]

                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${comicId}`}>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;