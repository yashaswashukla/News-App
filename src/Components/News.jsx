import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import "react-spinner-animated/dist/index.css";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // document.title = `${this.capitalize(props.category)} - NewsApp`;

  const updateNews = async () => {
    props.setProgress(0);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=962f603a690c4815a41e19f530fe3656&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(20);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMore = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=962f603a690c4815a41e19f530fe3656&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

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
          color: props.mode === "light" ? "black" : "white",
        }}
      >
        Top Headlines - {capitalize(props.category)}
      </h1>

      <div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          hasMore={articles !== totalResults}
          loader={
            Math.ceil(totalResults / props.pageSize) > page + 1 ? (
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
              if (typeof element != "undefined")
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      mode={props.mode}
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
