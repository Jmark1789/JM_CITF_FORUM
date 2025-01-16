const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Dialogflow API settings
const API_KEY = 'YOUR_API_KEY';
const PROJECT_ID = 'YOUR_PROJECT_ID';

// Initialize Dialogflow API
const dialogflow = require('dialogflow').v2beta1;

// Create a session client
const sessionClient = new dialogflow.SessionsClient();

// Send user input to Dialogflow
sendBtn.addEventListener('click', async () => {
  const userInputValue = userInput.value;
  const sessionId = Math.random().toString(36).substr(2, 10);
  const sessionPath = sessionClient.sessionPath(PROJECT_ID, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInputValue,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const response = await sessionClient.detectIntent(request);
    const responseText = response.queryResult.fulfillmentText;
    chatBox.innerHTML += `<p>Bot: ${responseText}</p>`;
    userInput.value = '';
  } catch (error) {
    console.error(error);
  }
});
