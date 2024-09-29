import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";
import { Form, Button, ListGroup, Alert } from "react-bootstrap";

export default function Chat1() {
  const { User } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For displaying filtered results
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const usersData = res.data.filter((user) => user._id !== User._id);
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filtered users to all users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [User]);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/messages/${User._id}/${selectedUser._id}`,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser, User]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: User._id,
      receiver: selectedUser._id,
      content: newMessage,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        messageData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to all users if search query is cleared
    }
  }, [searchQuery, users]);

  return (
    <div className="container text-center mt-3">
      <div className="row">
        {/* Left Column: List of users */}
        <div className="col-sm-3 user-list" style={{ paddingRight: "0" }}>
          <h5>Select a user to chat with:</h5>
          <Form className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
            />
          </Form>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ListGroup>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <ListGroup.Item
                    key={user._id}
                    className={`list-group-item ${
                      selectedUser && selectedUser._id === user._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setSelectedUser(user)} // Select user and show chat
                    style={{ cursor: "pointer" }}
                  >
                    {user.name}
                  </ListGroup.Item>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </ListGroup>
          )}
        </div>

        {/* Middle border between user list and chat box */}
        <div
          className="col-sm-1 border-divider"
          style={{ borderLeft: "1px solid #ddd", height: "100%" }}
        ></div>

        {/* Right Column: Chat Box */}
        <div className="col-sm-8">
          {selectedUser ? (
            <>
              <h5>Chat with {selectedUser.name}</h5>
              <div
                className="chat-box"
                style={{
                  height: "400px",
                  overflowY: "scroll",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message d-flex ${
                      message.sender._id === User._id
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 mb-2 ${
                        message.sender._id === User._id
                          ? "bg-primary text-white"
                          : "bg-light"
                      }`}
                      style={{ borderRadius: "10px", maxWidth: "60%" }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button className="btn btn-primary mt-2" onClick={sendMessage}>
                  Send
                </Button>
              </div>
            </>
          ) : (
            <h5>Select a user to start chatting</h5>
          )}
        </div>
      </div>
    </div>
  );
}
