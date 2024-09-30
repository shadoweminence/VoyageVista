import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";

export default function ChatInterface() {
  const { auth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [participants, setParticipants] = useState([]); // For participants
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all participants with the latest messages when component mounts
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!auth.User || !auth.User._id) return; // Ensure auth.User._id is available
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/participants/${auth.User._id}`
        );
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, [auth.User]);

  const handleSearch = async () => {
    if (!searchQuery) {
      // If the search query is empty, reset search results
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/search?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${auth.User._id}/${user._id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Check if the message is not empty and a user is selected
    if (newMessage.trim() && selectedUser) {
      try {
        const messageData = {
          sender: auth.User._id, // Logged-in user's ID
          receiver: selectedUser._id, // The user being chatted with
          content: newMessage, // The message text
        };

        console.log("Sending message:", messageData); // Debugging log

        // POST message to backend
        const response = await axios.post(
          "http://localhost:5000/api/messages",
          messageData
        );

        console.log("Message sent successfully:", response.data); // Debugging log

        // Add the message to the message list
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage(""); // Clear the message input after sending
      } catch (error) {
        console.error("Error sending message:", error); // Log any error that occurs
      }
    } else {
      console.warn("Message is empty or no user selected."); // Log a warning if conditions aren't met
    }
  };

  return (
    <div className="d-flex">
      {/* Left-side: List of participants with the latest message */}
      <div className="col-md-4">
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
            {loading ? "Searching..." : "Search"}
          </Button>
        </Form>

        <ListGroup>
          {searchResults.map((user) => (
            <ListGroup.Item
              key={user._id}
              action
              onClick={() => selectUser(user)}
            >
              {user.name}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Show previous participants */}
        <h5 className="mt-3">Recent Chats:</h5>
        <ListGroup>
          {participants.map((participant) => (
            <ListGroup.Item
              key={participant.user._id}
              action
              onClick={() => selectUser(participant.user)}
            >
              {participant.user.name} - {participant.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Right-side: Chat window */}
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
                        className={
                          msg.sender === auth.User._id
                            ? "text-end" // Align your messages to the right
                            : "text-start" // Align their messages to the left
                        }
                      >
                        <strong>
                          {msg.sender === auth.User._id
                            ? "You"
                            : selectedUser.name}
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