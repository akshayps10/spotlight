import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Image } from "react-bootstrap";
import axios from "axios";




const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:3001/articles"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="card border-0 shadow-sm p-4">
    <div className="card-body text-center">
      <div className="fs-1 mb-3">{icon}</div>
      <h5 className="card-title fw-bold mb-3">{title}</h5>
      <p className="card-text text-muted">{description}</p>
    </div>
  </div>
);

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data); 
      } catch (err) {
        console.error("Failed to load articles", err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
     
      <div
        className="d-flex flex-column gap-3 py-5 px-4 mx-auto"
        style={{ maxWidth: "960px" }}
      >
        <h1 className="display-4 fw-bold text-primary">
          Welcome to <span className="text-danger">JOURNAL SPOTLIGHT</span>
        </h1>
        <p className="text-secondary fs-5">
          Stay informed with the latest headlines, in-depth analysis, and breaking news.
        </p>
        <p className="text-muted fst-italic">Stay informed, stay ahead.</p>
        <Link to={"/about"}>
          <Button
            className="bg-warning border-0 text-dark py-2 px-4 rounded-pill fw-semibold shadow d-flex align-items-center gap-2"
            style={{ width: "fit-content" }}
          >
            MORE ABOUT WE <i className="text-danger bi-arrow-right fs-5"></i>
          </Button>
        </Link>
      </div>

   
      <div className="container my-5 ">
        <h2 className="text-center mb-4">Latest Articles</h2>
        <Row className="g-4">
          {Array.isArray(articles) && articles.length > 0 ? (
            articles
              .filter((article) => article && article.title && article.description)
              .map((article, index) => (
                <Col key={index} xs={12} sm={6} md={4}>
                  <div className="article-card border bg-success bg-opacity-25 p-3">
                    {article.image ? (
                      <img
                        src={`http://localhost:3001${article.image}`}
                        alt={`Article ${article.id}`}
                        className="img-fluid mb-3"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <p className="text-muted">Image not available</p>
                    )}
                    <h3 className="h5">{article.title}</h3>
                    <p className="text-muted">{article.description}</p>
                    
                
                    
                  </div>
                </Col>
              ))
          ) : (
            <Col xs={12}>
              <p>No articles found.</p>
            </Col>
          )}
        </Row>
      </div>

      <section className="py-5 bg-success bg-opacity-25 text-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-5 text-dark">
            Why You'll Love JOURNAL SPOTLIGHT
          </h2>
          <div className="row g-4 ">
            <div className="col-md-4">
              <FeatureCard
                title="Diverse Content"
                description="Explore news on a variety of topics, from technology to lifestyle."
                icon="📚"
              />
            </div>
            <div className="col-md-4 bg-success bg-opacity-25">
              <FeatureCard
                title="Community Driven"
                description="Connect with writers and readers who share your interests."
                icon="🌐"
              />
            </div>
            <div className="col-md-4">
              <FeatureCard
                title="Easy to Use"
                description="A seamless platform for sharing and discovering great content."
                icon="🚀"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="my-5 border-4 border-info rounded">
        <Row className="align-items-center py-5 justify-content-center mx-3">
          <Col md={6} className="text-center mb-4 mb-md-0 text-md-start">
            <h2 className="fw-bold mb-4">
              Want to know more about today's{" "}
              <span className="text-danger">TOP 10 news</span>?
            </h2>
            <Link to={"/News"}>
              <Button
                className="bg-warning border-3 text-dark px-4 rounded-pill fw-semibold"
                style={{ width: "fit-content" }}
              >
                VIEW ARTICLES <i className="text-danger bi-arrow-right fs-5"></i>
              </Button>
            </Link>
            <p className="mt-3 text-secondary">Checkout these top news articles!</p>
            <Link to={"/sign-in"}>
              <Button variant="warning" size="lg" className="mt-3 fw-semibold">
                Create Your Own Article
              </Button>
            </Link>
            <h5 className="mt-4">Show off your creativity ➔</h5>
          </Col>
          <Col md={6}>
            <Row className="g-4 justify-content-center">
              <Col xs={12} sm={6} md={4}>
                <Image
                  src="https://img.etimg.com/thumb/width-1200,height-1200,imgsize-165436,resizemode-75,msid-112671669/news/india/heavy-rains-winds-lash-parts-of-kerala-uprooting-trees-causing-traffic-snarls-power-cuts.jpg"
                  alt="News Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Image
                  src="https://st2.depositphotos.com/3591429/6010/i/950/depositphotos_60104597-stock-photo-man-with-laptop-reading-news.jpg"
                  alt="News Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8thwYqHKCnwpNh7rqhVHh7Jh7n5pVdGGiWzFrtKQx4Lspa4k-QM_EzC-Z8pR3cf6LjtA&usqp=CAU"
                  alt="News Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
