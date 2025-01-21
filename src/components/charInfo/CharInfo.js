import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = ( {charId, children} ) => {
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charId]);

    const updateChar = () => {
        if (!charId) return;

        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className='char__info-block'>
            <div className='char__info'>
                {setContent(process, View, {char})}
            </div>
            {children}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null;

    return (
        <>
            <div className='char__basics'>
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className='char__info-name'>{name}</div>
                    <div className='char__btns'>
                        <a href={homepage} className='button button__main'>
                            <div className='inner'>homepage</div>
                        </a>
                        <a href={wiki} className='button button__secondary'>
                            <div className='inner'>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='char__descr'>
                {description}
            </div>
            <div className='char__comics'>Comics:</div>
            <ul className='char__comics-list'>
                { comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i)=> {
                        const comicId = item.resourceURI.match(/(?<=comics\/)(\d{1,})/)[1]

                        return (
                            <li className='char__comics-item' key={i}>
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