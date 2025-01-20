import { Outlet } from "react-router";

import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SinglePageLayout = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </>
    )
}

export default SinglePageLayout;