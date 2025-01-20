import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router';

import Spinner from "../spinner/Spinner";

import "./mainContent.scss";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePageLayout = lazy(() => import("../pages/SinglePageLayout"));
const SingleComic = lazy(() => import("../singleComic/SingleComic"));
const SingleChar = lazy(() => import("../singleChar/SingleChar"));

const MainContent = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
      <main
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >
          <Suspense fallback={<Spinner/>}>
              <Routes location={displayLocation}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/comics" element={<ComicsPage />} />
                  <Route element={<SinglePageLayout />}>
                    <Route path="/comics/:comicId" element={<SingleComic />} />
                    <Route path="/chars/:charId" element={<SingleChar />} />
                  </Route>
                  <Route path="*" element={<Page404 />} />
              </Routes>
          </Suspense>
      </main>
  )
}

export default MainContent;