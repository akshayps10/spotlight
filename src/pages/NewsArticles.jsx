import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
       
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=632eb66242334e5d85d160665dae3c67",
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
              "Content-Type": "application/json",
            },
          }
        );

        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
       
        setError(err.response?.data?.message || "Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="container my-5">
        <h1 className="text-center text-danger">Error</h1>
        <p className="text-center">{error}</p>
      </div>
    );

  return (
    <div className="container my-5 bg-success bg-opacity-25">
      <h1 className="text-center mb-4">TRENDING ARTICLES</h1>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-3 mb-2">
            <div className="card h-100">
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.description || "No description available."}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-warning p-3 text-white"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
