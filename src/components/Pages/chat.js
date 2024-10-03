import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";

export default function ChatInterface() {
  const { auth, User, getUserDetails } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!User) return; // Ensure User is defined
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${User._id}` // Ensure endpoint is correct
        );
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
    getUserDetails();
  }, [User]);

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

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${User._id}/${user._id}`
      );
      const messages = response.data.map((message) => {
        return {
          sender: message.sender._id, // Save sender ID from populated field
          content: message.content,
        };
      });
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!User || !User._id) {
      console.error("User is not defined or missing _id");
      return;
    }

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
          {
            sender: User._id,
            content: newMessage,
          },
        ]);

        // Update recent chats with the new message
        setParticipants((prevParticipants) => {
          const existingParticipantIndex = prevParticipants.findIndex(
            (p) => p.user._id === selectedUser._id
          );
          if (existingParticipantIndex > -1) {
            const updatedParticipants = [...prevParticipants];
            updatedParticipants[existingParticipantIndex].content = newMessage;
            return updatedParticipants;
          } else {
            return [
              ...prevParticipants,
              {
                user: selectedUser,
                content: newMessage,
              },
            ];
          }
        });

        setNewMessage(""); // Clear message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("Message is empty or no user selected.");
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
                          msg.sender === User._id ? "text-end" : "text-start"
                        }
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
