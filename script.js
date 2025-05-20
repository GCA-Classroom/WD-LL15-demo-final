// Get references to the HTML elements
const responseContainer = document.getElementById('response');
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');

// This function sends a prompt to the OpenAI API and displays the response
async function getIcebreakerResponse(prompt) {
  // Show a loading message
  responseContainer.textContent = 'Thinking...';

  // Prepare the messages for the API
  const messages = [
    {
      role: 'system',
      content: `You are a friendly conversation starter bot. Give short, fun, and light-hearted responses.`
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
  getIcebreakerResponse('Give me a fun icebreaker question or topic.');
});

factBtn.addEventListener('click', () => {
  // Ask for a weird or surprising fact
  getIcebreakerResponse('Tell me a weird or surprising fact.');
});

jokeBtn.addEventListener('click', () => {
  // Ask for a mild, friendly joke
  getIcebreakerResponse('Tell me a mild, friendly joke.');
});

weatherBtn.addEventListener('click', () => {
  // Ask for a light comment about the weather
  getIcebreakerResponse('Say something light or funny about the weather.');
});