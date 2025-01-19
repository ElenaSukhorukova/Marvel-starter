import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SingleComicPage = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <SingleComic />
            </ErrorBoundary>
        </>
    )
}

export default SingleComicPage;