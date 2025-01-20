import { Outlet } from "react-router";

import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SingleComicPage = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </>
    )
}

export default SingleComicPage;