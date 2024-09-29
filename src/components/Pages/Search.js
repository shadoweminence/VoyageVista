import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, ListGroup, Alert } from "react-bootstrap";

export default function Search() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(""); // To handle errors
  const [loading, setLoading] = useState(false); // To handle loading state

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/Pages/Login", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSearch = async () => {
    setLoading(true);
    setError(""); // Reset error state before searching
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/search?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while searching. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search - Voyage Vista</title>
      </Helmet>

      <Form className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="me-2"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {searchResults.length > 0 && (
        <ListGroup>
          {searchResults.map((user) => (
            <ListGroup.Item key={user._id}>
              {user.name} - Match Score: {user.matchScore}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {searchResults.length === 0 && !loading && !error && (
        <p>No results found.</p>
      )}
    </div>
  );
}
