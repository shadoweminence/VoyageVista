import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";

export default function ChatInterface() {
  const { User, getUserDetails } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reference to the last message
  const lastMessageRef = useRef(null);

  // Fetch participants (users with whom there are messages)
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!User) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${User._id}`
        );
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
    getUserDetails();
  }, [User, getUserDetails]);

  // Scroll to the last message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Trigger when messages update

  // Search users
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
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Select user and fetch conversation
  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${User._id}/${user._id}`
      );
      setMessages(
        response.data.map((message) => ({
          sender: message.sender._id,
          content: message.content,
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

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

        // Update messages in the chat window
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: User._id, content: newMessage },
        ]);

        // Update the participants list to show the last message
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.user._id === selectedUser._id
              ? { ...participant, content: newMessage }
              : participant
          )
        );

        setNewMessage(""); // Clear the message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
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
              <strong>{participant.user.name}</strong> {/* User name */}
              <div>{participant.content}</div> {/* Display last message */}
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
                        ref={
                          index === messages.length - 1 ? lastMessageRef : null
                        } // Set ref to last message
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
