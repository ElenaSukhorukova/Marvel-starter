import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getChars();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }

    getChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

   render () {
        const {chars, loading, error} = this.state;
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
                <button className="button button__main button__long">
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

export default CharList;