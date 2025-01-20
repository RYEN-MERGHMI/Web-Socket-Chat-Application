# Spring Boot WebSocket Chat Application

This is a real-time chat application built using **Spring Boot** and **WebSocket**. It allows users to join a chat room, send messages, and see messages from other users in real-time. The application demonstrates the use of WebSocket for full-duplex communication between the client and server.

---

## Technologies Used

### Backend
- **Spring Boot**: A powerful framework for building Java-based web applications.
- **WebSocket**: A protocol that enables full-duplex communication between the client and server over a single, long-lived connection.
- **STOMP (Simple Text Oriented Messaging Protocol)**: A messaging protocol that works on top of WebSocket to define message formats and communication patterns.
- **SockJS**: A JavaScript library that provides a WebSocket-like object, ensuring compatibility with older browsers that do not support WebSocket.

### Frontend
- **HTML/CSS**: For structuring and styling the chat application.
- **JavaScript**: For handling WebSocket communication and dynamic updates to the chat interface.
- **SockJS Client**: For establishing a WebSocket-like connection from the browser.
- **STOMP.js**: For handling STOMP messaging in the browser.

---

## WebSocket Overview

WebSocket is a communication protocol that provides **full-duplex communication** over a single TCP connection. Unlike HTTP, which is stateless and requires a new connection for each request, WebSocket maintains a persistent connection between the client and server. This makes it ideal for real-time applications like chat, online gaming, and live notifications.

### Key Features of WebSocket:
- **Real-Time Communication**: Messages are delivered instantly between the client and server.
- **Low Latency**: WebSocket reduces the overhead associated with HTTP headers, making it more efficient for frequent communication.
- **Persistent Connection**: The connection remains open, allowing for continuous communication without the need to re-establish the connection.

---

## How It Works

1. **User Joins the Chat**:
   - The user enters a username and clicks "Start Chatting".
   - The client establishes a WebSocket connection with the server using SockJS and STOMP.
   - The server adds the user to the chat room and broadcasts a "JOIN" message to all connected clients.

2. **Sending Messages**:
   - The user types a message and clicks "Send".
   - The message is sent to the server via the WebSocket connection.
   - The server broadcasts the message to all connected clients.

3. **User Leaves the Chat**:
   - When a user disconnects, the server detects the disconnection and broadcasts a "LEAVE" message to all connected clients.

---

## Project Structure
src/
├── main/
│ ├── java/
│ │ └── com/rayen/chat/ (Java backend code)
│ └── resources/
│ ├── static/ (Frontend files: CSS, JS, HTML)
│ └── templates/ (Thymeleaf templates, if used)
└── test/
└── java/ (Unit tests)


---

## Getting Started

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Maven or Gradle (for building the project)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Running the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/spring-websocket-chat.git
2. Navigate to the project directory:
    ```bash
    cd spring-websocket-chat
3. Build the project using Maven:
    ```bash
    mvn clean instal
4. Run the application:
    ```bash
    mvn spring-boot:run
5. Open your browser and navigate to:
    ```bash
    http://localhost:8080/
## screenshots
![Screenshot from 2025-01-20 10-36-38](https://github.com/user-attachments/assets/41137ee9-e7be-43a7-a4bf-3097c43d507a)
![Screenshot from 2025-01-20 10-36-27](https://github.com/user-attachments/assets/d3450f4f-94fd-4dbe-b907-07a35454f0a2)
![Screenshot from 2025-01-20 10-36-12](https://github.com/user-attachments/assets/2e972cf0-fe2e-4c52-b1db-c865f1fab01e)
![Screenshot from 2025-01-20 10-36-06](https://github.com/user-attachments/assets/1d41370a-c386-4a79-980f-6a48fd825e91)
