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
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=632eb66242334e5d85d160665dae3c67"
        );
        setArticles(response.data.articles); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;

  
  if (error) return <p>Error: {error}</p>;

 
  return (
    <div className="container my-5 bg-success bg-opacity-25">
      <h1 className="text-center mb-4">TRENDING ARTICLES</h1>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-3 mb-2">
            <div className="card h-30">
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
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
