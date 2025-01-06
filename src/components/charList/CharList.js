import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharLoading();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoaded = (newChars) => {
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: newChars.length < 9 ? true : false
         }))
    }

   render () {
        const {chars, loading, error, newItemLoading, offset, charEnded} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        let content

        if (!(loading || error)) {
            content = chars.map(char => {
                return <View char={char}
                             key={char.id}
                             onCharSelected={() => this.props.onCharSelected(char.id)} />;
            })
        } else {
            content = null
        }

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
   }
}

const View = (props) => {
    const {name, thumbnail} = props.char
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <li className="char__item"
            onClick={props.onCharSelected}>
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;