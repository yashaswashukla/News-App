import React from "react";

const NewsItem = (props) => {
  return (
    <>
      <div className="card mb-3">
        <img
          src={
            props.imageUrl
              ? props.imageUrl
              : "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
          }
          className="card-img-top"
          alt="..."
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
