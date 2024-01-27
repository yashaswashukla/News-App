import React from "react";

const NewsItem = (props) => {
  return (
    <>
      <div className={`card border-${props.mode} text-bg-${props.mode}`}>
        <img
          src={props.imageUrl ? props.imageUrl : "./news.jpg"}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              Last updated:{" "}
              {new Date(props.publishedAt).toGMTString().slice(5, 16)}
            </small>
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              Author: {!props.author ? "Unknown" : props.author}
            </small>
          </p>
          <a
            href={props.newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Continue Reading.
          </a>
        </div>
      </div>
    </>
  );
};
export default NewsItem;
