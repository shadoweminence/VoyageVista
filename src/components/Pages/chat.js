import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";

export default function ChatInterface() {
  const { User, getUserDetails } = useContext(AuthContext);
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lastMessageRef = useRef(null);

  // Admin details (this should come from your database or context)
  const adminUser = {
    _id: "66efb80ae6ada9fc6957a3ad", // Admin ID
    name: "prashant",
    email: "admin123@gmail.com",
    role: "admin",
  };

  // Fetch messages for a specific user
  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${User._id}/${userId}`
      );
      setMessages(
        response.data.map((message) => ({
          sender: message.sender._id,
          content: message.content,
        }))
      );
    } catch (err) {
      setError("Failed to load messages");
    }
  };

  // Auto-select admin if specified in the URL location state
  const autoSelectAdmin = () => {
    if (location.state?.contactAdmin && participants.length > 0) {
      const admin = adminUser; // You can dynamically get this from your DB if needed
      setSelectedUser(admin);
      fetchMessages(admin._id);
    }
  };

  // Fetch participants and user details on initial load
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!User) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${User._id}`
        );
        setParticipants(response.data);
      } catch (err) {
        setError("Failed to load participants");
      }
    };
    fetchParticipants();
    getUserDetails();
  }, [User, getUserDetails]);

  // New useEffect to handle admin selection after participants are loaded
  useEffect(() => {
    autoSelectAdmin();
  }, [participants, location.state]);

  // Scroll to the latest message when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Search users based on the query entered
  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/search?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  // Select a user to start chatting
  const selectUser = async (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  // Send a new message to the selected user
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      try {
        const messageData = {
          sender: User._id,
          receiver: selectedUser._id,
          content: newMessage,
        };
        await axios.post("http://localhost:5000/api/messages", messageData);

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: User._id, content: newMessage },
        ]);

        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.user._id === selectedUser._id
              ? { ...participant, content: newMessage }
              : participant
          )
        );
        setNewMessage("");
      } catch (err) {
        setError("Failed to send message");
      }
    }
  };

  return (
    <div className="d-flex">
      <div className="col-md-4">
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          className="d-flex mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Form.Control
            type="text"
            placeholder="Search for users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="me-2"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Search"
            )}
          </Button>
        </Form>

        {searchResults.length === 0 && searchQuery && !loading && (
          <p>No users found</p>
        )}

        <ListGroup>
          {searchResults.map((user) => (
            <ListGroup.Item
              key={user._id}
              action
              active={selectedUser && user._id === selectedUser._id}
              onClick={() => selectUser(user)}
            >
              {user.name}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h5 className="mt-3">Recent Chats:</h5>
        <ListGroup>
          {participants.map((participant) => (
            <ListGroup.Item
              key={participant.user._id}
              action
              active={selectedUser && participant.user._id === selectedUser._id}
              onClick={() => selectUser(participant.user)}
            >
              <strong>{participant.user.name}</strong>
              <div>{participant.content}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="col-md-8">
        {selectedUser ? (
          <>
            <h4 className="mb-3">Chat with {selectedUser.name}</h4>
            <Card className="mb-3">
              <Card.Body className="message-container">
                {messages.length > 0 ? (
                  <ListGroup variant="flush">
                    {messages.map((msg, index) => (
                      <ListGroup.Item
                        key={index}
                        ref={
                          index === messages.length - 1 ? lastMessageRef : null
                        }
                        className={`${
                          msg.sender === User._id ? "text-end" : "text-start"
                        }`}
                      >
                        <strong>
                          {msg.sender === User._id ? "You" : selectedUser.name}
                        </strong>
                        : {msg.content}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p>No messages yet.</p>
                )}
              </Card.Body>
            </Card>
            <Form onSubmit={handleSendMessage}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Send
              </Button>
            </Form>
          </>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
}
