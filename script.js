// Get references to the HTML elements
const responseContainer = document.getElementById('response');
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');

// This function sends a prompt to the OpenAI API and displays the response
async function getIcebreakerResponse(prompt) {
  // Show a fun loading message
  responseContainer.textContent = "Breaking the silence... 🧊";

  // Prepare the messages for the API
  const messages = [
    {
      role: 'system',
      content: `You are a witty and welcoming assistant whose job is to break awkward silences in group conversations. Your responses should be fun, light-hearted, and spark group interaction without putting anyone on the spot. Aim for responses that feel casual and natural, like something a clever friend might say to fill the silence. I only need the content in your response.`
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  // Send a POST request to the OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // apiKey should be defined in secrets.js
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: messages
    })
  });

  // Parse the response
  const result = await response.json();

  // Show the AI's response
  responseContainer.textContent = result.choices[0].message.content;
}

// Add event listeners to each button
iceBtn.addEventListener('click', () => {
  // Ask for a general icebreaker question or topic
  getIcebreakerResponse('Give me a fun meeting icebreaker question or topic.');
});

factBtn.addEventListener('click', () => {
  // Ask for a weird or surprising fact
  getIcebreakerResponse('Tell me a weird or surprising fact.');
});

jokeBtn.addEventListener('click', () => {
  // Ask for a mild, friendly joke
  getIcebreakerResponse('Tell me a mild, friendly joke I can share with classmates.');
});

weatherBtn.addEventListener('click', () => {
  // Ask for a light comment about the weather
  getIcebreakerResponse('Write a conversation starter that opens with a weather-related question and invites people to check outside and share.');
});