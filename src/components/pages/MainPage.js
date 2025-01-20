import { useState } from 'react';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../CharSearch/CharSearch"

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);
    const [charList, setCharList] = useState([]);

    const onCharSelected = (id) => {
        setChar(id)
    }

    const onCharList = (chars) => {
        setCharList(charList => [...charList, ...chars])
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} onCharList={onCharList} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}>
                        <CharSearch charList={charList} />
                    </CharInfo>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;