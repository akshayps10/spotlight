import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Dashboard = () => {
  const [username, setUsername] = useState("Guest");
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", description: "", image: null });
  const [editingArticle, setEditingArticle] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch data 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://journal-spotlight-backend-4.onrender.com/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, articles } = response.data.user;
        setUsername(name);
        setArticles(articles || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Handle add
  const handleAddArticle = async () => {
    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("description", newArticle.description);
    if (newArticle.image) {
      formData.append("image", newArticle.image);
    }

    try {
      const response = await axios.post("https://journal-spotlight-backend-4.onrender.com/add-article", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setArticles([...articles, response.data.article]);
      setShowModal(false);
      setNewArticle({ title: "", description: "", image: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // Handle delet
  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`https://journal-spotlight-backend-4.onrender.com/delete-article/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(articles.filter((article) => article._id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Handle edit
  const handleEditArticle = async () => {
    const formData = new FormData();
    formData.append("title", editingArticle.title);
    formData.append("description", editingArticle.description);
    if (editingArticle.image) {
      formData.append("image", editingArticle.image);
    }

    try {
      const response = await axios.put(
        `https://journal-spotlight-backend-4.onrender.com/update-article/${editingArticle._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setArticles(
        articles.map((article) =>
          article._id === editingArticle._id ? response.data.article : article
        )
      );
      setEditModal(false);
      setEditingArticle(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditingArticle({ ...editingArticle, image: file });
      } else {
        setNewArticle({ ...newArticle, image: file });
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container  mt-10">
      <h2>Welcome  {username}!</h2>
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Publish Article
      </Button>
      {articles.length === 0 ? (
        <p>No articles added yet.</p>
      ) : (
        <Table className="bg-success bg-opacity-25">
          <thead >
            <tr>
              <th>no.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody >
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>
                  {article.image ? (
                    <img
                      src={`https://journal-spotlight-backend-4.onrender.com${article.image}`}
                      alt="Article"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger mb-5 me-2"
                    onClick={() => handleDeleteArticle(article._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditingArticle(article);
                      setImagePreview(`https://journal-spotlight-backend-4.onrender.com${article.image}`);
                      setEditModal(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

     
      <Modal className="bg-success bg-opacity-25" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Dialog className="bg-success bg-opacity-25">
        <Modal.Header closeButton>
          <Modal.Title>Add New Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newArticle.description}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </Form.Group>
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}
          </Form>
          
        </Modal.Body>
        </Modal.Dialog>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddArticle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingArticle?.title || ""}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingArticle?.description || ""}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
              />
            </Form.Group>
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleEditArticle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
