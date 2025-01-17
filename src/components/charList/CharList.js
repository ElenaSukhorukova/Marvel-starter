import { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService();
    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [duration, setDuraction] = useState(300);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        if (initial) {
            setNewItemLoading(false);
        } else {
            setNewItemLoading(true);
            setDuraction(300);
        }

        getAllCharacters(offset).then(onCharLoaded);
    }

    const onCharLoaded = async (newChars) => {
        newChars = newChars.map(char => ({...char, nodeRef: createRef(null), duration: setDuraction(duration => duration + 100)}))

        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9)
        setCharEnded(newChars.length < 9 ? true : false)
    }

    const focusOnItem = (ref) => {
        const siblings = Array.from(ref.current.parentElement.children);

        siblings.forEach(item => item.classList.remove('char__item_selected'));
        ref.current.classList.add('char__item_selected');
        ref.current.focus();
    }

    function renderItems(arr) {
        return (
            <ul>
                <TransitionGroup className="char__grid">
                    {arr.map((item) => {
                        const imgStyle = item.thumbnail.includes("image_not_available") ? {'objectFit': 'fill'} : null

                        return (
                            <CSSTransition
                                key={item.id}
                                timeout={item.duration}
                                nodeRef={item.nodeRef}
                                classNames="item">

                                <li
                                    className="char__item"
                                    tabIndex={0}
                                    key={item.id}
                                    ref={item.nodeRef}
                                    onClick={() => {
                                        props.onCharSelected(item.id);
                                        focusOnItem(item.nodeRef);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === " " || e.key === "Enter") {
                                            props.onCharSelected(item.id);
                                            focusOnItem(item.nodeRef);
                                        }
                                    }}>

                                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                                    <div className="char__name">{item.name}</div>
                                </li>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(chars);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;