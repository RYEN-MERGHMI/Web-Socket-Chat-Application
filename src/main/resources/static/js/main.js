'use strict';

// DOM Elements
var usernamePage = document.querySelector('#username-page'); // The username input page
var chatPage = document.querySelector('#chat-page'); // The chat page
var usernameForm = document.querySelector('#usernameForm'); // The username form
var messageForm = document.querySelector('#messageForm'); // The message input form
var messageInput = document.querySelector('#message'); // The message input field
var messageArea = document.querySelector('#messageArea'); // The area where messages are displayed
var connectingElement = document.querySelector('.connecting'); // The "Connecting..." message element

// WebSocket and User Variables
var stompClient = null; // STOMP client for WebSocket communication
var username = null; // The current user's username

// Colors for user avatars
var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

/**
 * Connects to the WebSocket server and initializes the chat.
 * @param {Event} event - The form submission event.
 */
function connect(event) {
    // Get the username from the input field
    username = document.querySelector('#name').value.trim();

    // If the username is provided
    if (username) {
        // Hide the username page and show the chat page
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        // Create a new WebSocket connection using SockJS
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        // Connect to the WebSocket server
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault(); // Prevent the form from submitting
}

/**
 * Called when the WebSocket connection is successfully established.
 */
function onConnected() {
    // Subscribe to the public topic to receive messages
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Notify the server that the user has joined
    stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    // Hide the "Connecting..." message
    connectingElement.classList.add('hidden');
}

/**
 * Called when there is an error connecting to the WebSocket server.
 * @param {Error} error - The error object.
 */
function onError(error) {
    // Display an error message
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

/**
 * Sends a chat message to the server.
 * @param {Event} event - The form submission event.
 */
function sendMessage(event) {
    // Get the message content from the input field
    var messageContent = messageInput.value.trim();

    // If the message is not empty and the WebSocket connection is active
    if (messageContent && stompClient) {
        // Create a chat message object
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        // Send the message to the server
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

        // Clear the message input field
        messageInput.value = '';
    }
    event.preventDefault(); // Prevent the form from submitting
}

/**
 * Called when a message is received from the server.
 * @param {Object} payload - The message payload from the server.
 */
function onMessageReceived(payload) {
    // Parse the message payload
    var message = JSON.parse(payload.body);

    // Create a new list item for the message
    var messageElement = document.createElement('li');

    // Handle different message types (JOIN, LEAVE, CHAT)
    if (message.type === 'JOIN') {
        // Display a join event message
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        // Display a leave event message
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        // Display a regular chat message
        messageElement.classList.add('chat-message');

        // Create an avatar element for the sender
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]); // Use the first letter of the username
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender); // Set avatar color

        // Append the avatar to the message element
        messageElement.appendChild(avatarElement);

        // Create a username element
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    // Create a text element for the message content
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    // Append the text element to the message element
    messageElement.appendChild(textElement);

    // Append the message element to the message area
    messageArea.appendChild(messageElement);

    // Scroll to the bottom of the message area
    messageArea.scrollTop = messageArea.scrollHeight;
}

/**
 * Generates a color for the user's avatar based on their username.
 * @param {string} messageSender - The username of the sender.
 * @returns {string} - A color from the predefined list.
 */
function getAvatarColor(messageSender) {
    // Generate a hash value for the username
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    // Use the hash to select a color from the list
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

// Event Listeners
usernameForm.addEventListener('submit', connect, true); // Handle username form submission
messageForm.addEventListener('submit', sendMessage, true); // Handle message form submission