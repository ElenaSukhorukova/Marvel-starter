import { useState, useEffect, createRef, Children } from 'react';
import PropTypes from 'prop-types';
import { motion } from "motion/react";

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

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        setNewItemLoading(initial ? false : true);

        getAllCharacters(offset).then(onCharLoaded);
    }

    const onCharLoaded = async (newChars) => {
        let duration = 0
        newChars = newChars.map(char => {
            duration += 1
            return {...char, nodeRef: createRef(null), duration: duration}
        })

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
            <ul className="char__grid">
                {arr.map((item) => {
                    const imgStyle = item.thumbnail.includes("image_not_available") ? {'objectFit': 'fill'} : null

                    return (
                        <motion.li
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: item.duration}}
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
                        </motion.li>
                    )
                })}
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
            {props.render(chars)}

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