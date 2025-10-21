import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { newsAPI } from "../../API/news";
import { addToHot } from "../../API/hot";
import "./Home.scss";

import PlaceholderImage from "../../assets/news placeholder.jpg";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const nav = useNavigate();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      nav("/login");
    } else {
      setLoading(true);
      newsAPI(token)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setLoading(false);
            setNews(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("Failed to fetch news");
        });
    }
  }, [nav, token]);

  const newsClick = (item) => {
    addToHot(item, token);
    return window.open(item.url, "_blank noopener noreferrer");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {/* Floating hot button */}
      <div className="tooltip">
        <span className="tooltiptext">Check what's hot</span>
        <div className="floating-hot">
          <button onClick={() => nav("/hot")}>🔥</button>
        </div>
      </div>

      {/* Home Screen */}
      <div className="home">
        {/* No data */}
        {news?.length === 0 && <div className="no-news">No news available</div>}
        {/* World News - NYT */}
        {news && news?.worldNYT && (
          <>
            <h1 className="news-title">
              World News - Powered by New York Times
            </h1>
            <div className="horizontal-slider">
              {news?.worldNYT?.map(
                (item, index) =>
                  item?.title && (
                    <>
                      {/* news list */}
                      <div
                        key={index}
                        className="news-item shadow"
                        onClick={() => newsClick(item)}
                      >
                        <div className="title">{item?.title}</div>
                        {item?.multimedia && item?.multimedia[0] && (
                          <img
                            src={item?.multimedia[0]?.url}
                            alt={item?.multimedia[0]?.copyright}
                            width={"100%"}
                          ></img>
                        )}
                        <div className="content">{item?.abstract}</div>
                      </div>
                    </>
                  )
              )}
            </div>
          </>
        )}

        {/* Trending News - Gaudian */}
        {news && news?.trendingGuardian && (
          <>
            <h1 className="news-title">
              Trending News - Powered by The Guardian
            </h1>
            <div className="horizontal-slider">
              {news?.trendingGuardian?.map(
                (item, index) =>
                  item?.title && (
                    <>
                      {/* news list */}
                      <div
                        key={index}
                        className="news-item shadow"
                        onClick={() => newsClick(item)}
                      >
                        <div className="title">{item?.title}</div>
                        {item?.multimedia && item?.multimedia[0] ? (
                          <img
                            src={item?.multimedia[0]?.url}
                            alt={item?.multimedia[0]?.copyright}
                            width={"100%"}
                          ></img>
                        ) : (
                          <img
                            src={PlaceholderImage}
                            alt="News placeholder"
                            width={"100%"}
                          ></img>
                        )}
                        <div className="content">{item?.abstract}</div>
                      </div>
                    </>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
