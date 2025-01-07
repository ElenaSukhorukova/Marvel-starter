import { Component, Children, cloneElement } from 'react';
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
        charEnded: false,
        selectedChar: null
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

    onSelect = (charId) => {
        this.props.onCharSelected(charId)

        this.setState({selectedChar: charId})
    }

    onKeyDown = (e, charId) => {
        if (e.keyCode === 13) {
            this.onSelect(charId)
        }
    }

   render () {
        const {chars, loading, error, newItemLoading, offset, charEnded, selectedChar} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        let content;

        if (!(loading || error)) {
            content = chars.map(char => {
                return (
                    <View char={char}
                        key={char.id}
                        className={"char__item"}
                        onCharSelected={() => this.onSelect(char.id)}
                        onKeyDown={(e) => this.onKeyDown(e, char.id)}/>
                );
            });
        } else {
            content = null
        }

        return (
            <div className="char__list">
                <UlWrapper selectedChar={selectedChar}>
                    {errorMessage}
                    {spinner}
                    {content}
                </UlWrapper>
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
    const {className, onCharSelected, onKeyDown} = props;
    const imgStyle = thumbnail.includes("image_not_available") ? {objectFit: 'fill'} : null

    return (
        <li className={className}
            onClick={onCharSelected}
            tabIndex="0"
            onKeyDown={onKeyDown}>
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    );
}

class UlWrapper extends Component {
    render() {
        const {children, selectedChar} = this.props
        return (
            <ul className="char__grid">
                {
                    Children.map(children, child => {
                        if (child && (child.key && Number(child.key) === selectedChar)) {
                            return cloneElement(child, {className: `${child.props.className} char__item_selected` })
                        }

                        return child;
                    })
                }
            </ul>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;