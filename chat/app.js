// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCSkr1HPM9TAVt0_AEepGBo6xk3TQXZJc",
  authDomain: "ofuihjeo.firebaseapp.com",
  projectId: "ofuihjeo",
  storageBucket: "ofuihjeo.appspot.com",
  messagingSenderId: "442913640354",
  appId: "1:442913640354:web:05bbabfbe7c0c0acfaecfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Send message function
document.getElementById('sendMessage').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    const messagesRef = ref(database, 'messages');
    set(messagesRef.push(), {
        text: message,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('messageInput').value = ''; // Clear input field
    }).catch(error => {
        console.error('Error sending message:', error);
    });
});

// Listen for new messages
const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    document.getElementById('messages').appendChild(messageElement);
});
