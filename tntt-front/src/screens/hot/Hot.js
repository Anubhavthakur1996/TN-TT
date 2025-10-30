import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getHotNews } from "../../API/hot";
import "./Hot.scss";

import PlaceholderImage from "../../assets/news placeholder.jpg";

const Hot = () => {
  const [hotNews, setHotNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      nav("/login");
    } else {
      setLoading(true);
      getHotNews(token)
        .then((response) => {
          setLoading(false);
          if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
          }
          setHotNews(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch hot news:", err);
        });
    }
  }, [nav, token]);

  const newsClick = (item) => {
    return window.open(item.url, "_blank noopener noreferrer");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!hotNews) {
    return <div className="no-data">Nothing to show here yet ...</div>;
  }

  return (
    <div className="hot-news-page">
      <div className="page-title"> 🔥 Hot News 🔥</div>
      {hotNews &&
        hotNews?.map((news, index) =>
          index === 0 ? (
            <div
              key={index}
              className={"hot-news-main shadow"}
              onClick={() => newsClick(news)}
            >
              <div className="main-title-wrapper">
                <div className="title-main">{news?.title}</div>
                <div className="clicks-wrapper">
                  <div className="clicks-main">🔥</div>
                  <div className="clicks-main-text">{news?.clicks}</div>
                </div>
              </div>
              {news?.img ? (
                <img src={news?.img} alt={"hot news"} width={"100%"}></img>
              ) : (
                <img
                  src={PlaceholderImage}
                  alt="News placeholder"
                  width={"100%"}
                ></img>
              )}
              <div className="content-main">{news?.abstract}</div>
            </div>
          ) : (
            <div
              key={index}
              className={"hot-news shadow"}
              onClick={() => newsClick(news)}
            >
              {news?.img ? (
                <img src={news?.img} alt={"hot news"} width={"100%"}></img>
              ) : (
                <img
                  src={PlaceholderImage}
                  alt="News placeholder"
                  width={"100%"}
                ></img>
              )}
              <div className="hot-news-content-wrap">
                <div className="title">{news?.title}</div>
                <div className="content">{news?.abstract}</div>
              </div>
              <div className="clicks-wrapper">
                <div className="clicks">🔥</div>
                <div className="clicks-overlay">{news?.clicks}</div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Hot;
