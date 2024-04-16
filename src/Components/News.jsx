import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import "react-spinner-animated/dist/index.css";
const News = ({ country, category, pageSize, mode, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // document.title = `${this.capitalize(category)} - NewsApp`;

  useEffect(() => {
    const updateNews = async () => {
      setProgress(0);
      console.log(process.env.NEWS_API_KEY);
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=1&pageSize=${pageSize}`;

      setLoading(true);

      let data = await fetch(url);
      let parsedData = await data.json();
      setProgress(20);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      setProgress(100);
    };
    updateNews();
  }, [country, category, pageSize, setProgress]);

  const fetchMore = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }&page=${page + 1}&pageSize=${pageSize}`;

    setPage(page + 1);

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-4">
      <h1
        className="text-center"
        style={{
          margin: "30px",
          marginTop: "80px",
          color: mode === "light" ? "black" : "white",
        }}
      >
        Top Headlines - {capitalize(category)}
      </h1>

      <div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          hasMore={articles !== totalResults}
          loader={
            Math.ceil(totalResults / pageSize) > page + 1 ? (
              <div className="d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              ""
            )
          }
        >
          <div className="row my-3">
            {articles.map((element) => {
              if (typeof element != "undefined") {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      mode={mode}
                      title={element.title.slice(0, 50)}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author}
                    />
                  </div>
                );
              } else {
                return <div></div>;
              }
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
