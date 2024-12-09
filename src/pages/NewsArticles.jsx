import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsArticles = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetching data from the new API
        const response = await axios.get("https://dummyjson.com/comments");

        // Set the comments data
        setComments(response.data.comments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch comments");
        setLoading(false);
      }
    };

    fetchComments();
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
      <h1 className="text-center mb-4">REVIEWS</h1>
      <div className="row">
        {comments.map((comment, index) => (
          <div key={index} className="col-md-3 mb-2">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{comment.user.fullName}</h5>
                <p className="card-text">{comment.body}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
