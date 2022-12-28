import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AboutMe } from 'renderer/pages/AboutMe';
import { Home } from 'renderer/pages/Home';
import { ReadMe } from 'renderer/pages/ReadMe';
import { useTweets } from '../Tweets/TweetsContext';
import { TweetsResponseType } from '../../types/TweetTypes';
import { NavBar } from './NavBar';
import { SearchContainer } from './SearchContainer';
import { EVENT_CALL_NAME } from '../../../constants';

export const Layout = () => {
  const {
    addTweets,
    addProfile,
    saveHistory,
    setLoading,
    setCurrentProfileSearch,
    profiles,
  } = useTweets();

  useEffect(() => {
    // istanbul ignore next
    ipcRenderer.on(
      EVENT_CALL_NAME.SEARCH_TWEETS_BY_USERNAME,
      (_, data: TweetsResponseType) => {
        setLoading(false);
        addTweets(data.tweets);
        if (data.profile) {
          if (!profiles || !profiles[data.profile.username as any]) {
            addProfile(data.profile);
          }
          saveHistory(data.profile.username);
          setCurrentProfileSearch(data.profile.username);
        }
      }
    );

    // istanbul ignore next
    ipcRenderer.on(EVENT_CALL_NAME.SHOW_ERROR, (_, data: any) => {
      setLoading(false);
      toast.error(data.error.message, {
        position: 'bottom-right',
      });
    });

    return () => {
      ipcRenderer.removeAllListeners(EVENT_CALL_NAME.SEARCH_TWEETS_BY_USERNAME);
      ipcRenderer.removeAllListeners(EVENT_CALL_NAME.SHOW_ERROR);
    };
  }, [addProfile, addTweets, saveHistory]);

  return (
    <>
      <Router>
        <NavBar />
        <div
          id="main-container"
          className="w-3/5 border border-gray-600 h-auto border-t-0 mb-3"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/read-me" element={<ReadMe />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
        <SearchContainer />
      </Router>
      <ToastContainer />
    </>
  );
};
