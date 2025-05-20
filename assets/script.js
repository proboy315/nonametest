// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Create code background
function createCodeBackground() {
  const codeBackground = document.getElementById('codeBackground');
  const codeSnippets = [
    "function animateBackground() { ... }",
    "const portfolio = new Portfolio();",
    "import React from 'react';",
    "export default function App() { ... }",
    "async function fetchData() { ... }",
    "class Developer { constructor() { ... } }",
    "document.addEventListener('click', handler);",
    "array.map(item => item * 2);",
    "const [state, setState] = useState();",
    "for(let i = 0; i < 10; i++) { ... }",
    "if (user.loggedIn) { ... } else { ... }",
    "try { ... } catch (error) { ... }",
    "const response = await fetch(url);",
    "console.log('Hello World!');",
    "localStorage.setItem('key', value);",
    "window.addEventListener('resize', handler);",
    "const regex = /pattern/;",
    "const obj = { key: 'value' };",
    "const arr = [1, 2, 3];",
    "const str = `template ${literal}`;",
    "function* generator() { yield value; }",
    "const promise = new Promise();",
    "const element = document.createElement('div');",
    "element.classList.add('active');",
    "const data = JSON.parse(json);",
    "const date = new Date();",
    "Math.random() * 100;",
    "setTimeout(() => { ... }, 1000);",
    "setInterval(() => { ... }, 1000);",
    "requestAnimationFrame(animate);"
  ];

  // Create 50 code lines
  for (let i = 0; i < 50; i++) {
    const codeLine = document.createElement('div');
    codeLine.className = 'code-line';
    
    // Randomly select a code snippet
    const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    codeLine.textContent = snippet;
    
    // Random position and animation delay
    const left = Math.random() * 100;
    const delay = Math.random() * -20;
    const duration = 10 + Math.random() * 20;
    const color = `hsl(${Math.floor(Math.random() * 60) + 270}, 70%, 70%)`;
    
    codeLine.style.left = `${left}%`;
    codeLine.style.animationDelay = `${delay}s`;
    codeLine.style.animationDuration = `${duration}s`;
    codeLine.style.color = color;
    
    codeBackground.appendChild(codeLine);
  }
}

// Call the function to create code background
createCodeBackground();

// Add floating animation to profile card
const profileCard = document.getElementById('profileCard');
profileCard.style.animation = 'floating 6s ease-in-out infinite';

// Add pulse animation to logo
const logo = document.querySelector('.logo');
logo.style.animation = 'pulse 3s ease-in-out infinite';

// Modal functionality
const accessBtn = document.getElementById('accessBtn');
const accessModal = document.getElementById('accessModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const statusMessage = document.getElementById('statusMessage');
const loading = document.getElementById('loading');
const signInTab = document.getElementById('signInTab');
const signUpTab = document.getElementById('signUpTab');

// Cache credentials after first fetch
let cachedCredentials = null;
let lastFetchTime = 0;
const CACHE_DURATION = 300000; // 5 minutes cache

// Path to your auth.txt file in GitHub repo
const authFileURL = 'https://raw.githubusercontent.com/proboy315/Source/refs/heads/main/Proboy%20vercel%20app/main/auth.txt';

// Prefetch credentials when page loads
window.addEventListener('load', () => {
  fetchCredentials().then(creds => {
    cachedCredentials = creds;
    lastFetchTime = Date.now();
  });
});

async function fetchCredentials() {
  try {
    const response = await fetch(authFileURL + '?t=' + Date.now()); // Cache busting
    if (!response.ok) throw new Error('Network error');
    const authText = await response.text();
    return authText.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && line.includes(':'));
  } catch (error) {
    console.error('Failed to fetch credentials:', error);
    return [];
  }
}

// Toggle modal
accessBtn.addEventListener('click', function(e) {
  e.preventDefault();
  accessModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

closeModal.addEventListener('click', function() {
  accessModal.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
});

// Close modal when clicking outside
accessModal.addEventListener('click', function(e) {
  if (e.target === accessModal) {
    accessModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
});

// Toggle between sign in and sign up forms
signInTab.addEventListener('click', function() {
  signInTab.classList.add('active');
  signUpTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

signUpTab.addEventListener('click', function() {
  signUpTab.classList.add('active');
  signInTab.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

// Login form submission
loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showMessage('Please enter both username and password', 'error');
    return;
  }

  loading.style.display = 'flex';
  
  try {
    // Use cached credentials if recent, otherwise fetch fresh
    const now = Date.now();
    let credentials = cachedCredentials;
    
    if (!credentials || now - lastFetchTime > CACHE_DURATION) {
      credentials = await fetchCredentials();
      cachedCredentials = credentials;
      lastFetchTime = now;
    }

    // Check credentials
    const credentialToCheck = `${username}:${password}`;
    const isValid = credentials.some(cred => cred === credentialToCheck);

    if (isValid) {
      showMessage('Authentication successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    showMessage('Invalid username or password', 'error');
    loginForm.style.animation = 'shake 0.4s';
    setTimeout(() => loginForm.style.animation = '', 400);
  } finally {
    loading.style.display = 'none';
  }
});

// Signup form submission
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const formData = {
    fullname: document.getElementById('fullname').value,
    password: document.getElementById('newPassword').value
  };
  
  // Create WhatsApp message
  const message = `*Cyber Account Request*%0A%0A` +
                 `*Name:* ${formData.fullname}%0A` +
                 `*Password:* ${formData.password}%0A%0A` +
                 `Dear ProBoy sir, I want account 🥺`;
  
  // Open WhatsApp with pre-filled message
  window.location.href = `https://wa.me/923261684315?text=${message}`;
  
  // Reset form
  this.reset();
});

function showMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
}

// Add hover effect to all interactive elements
const interactiveElements = document.querySelectorAll('a, button, .profile-img, .logo-img, .signature-img');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.classList.add('hover-grow');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('hover-grow');
  });
});
