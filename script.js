const API_URL = "https://mahatechmahi-backend.onrender.com/api/courses";
let globalContent = []; 

async function fetchContent() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Backend not responding");
        
        globalContent = await response.json();
        renderContent(globalContent);
    } catch (error) {
        document.getElementById("tutorials-container").innerHTML = "<h3 style='color:red;'>Failed to wake up the server. Please refresh!</h3>";
        document.getElementById("projects-container").innerHTML = "";
        console.error(error);
    }
}

function renderContent(contentToRender) {
    const tutorialsContainer = document.getElementById("tutorials-container");
    const projectsContainer = document.getElementById("projects-container");

    tutorialsContainer.innerHTML = "";
    projectsContainer.innerHTML = "";

    const tutorials = contentToRender.filter(item => item.type === "Tutorial");
    const projects = contentToRender.filter(item => item.type !== "Tutorial");

    if (tutorials.length === 0) {
        tutorialsContainer.innerHTML = "<p style='color: #777;'>No matching tutorials found.</p>";
    } else {
        tutorials.forEach(tutorial => tutorialsContainer.appendChild(createCard(tutorial)));
    }

    if (projects.length === 0) {
        projectsContainer.innerHTML = "<p style='color: #777;'>No matching projects found.</p>";
    } else {
        projects.forEach(project => projectsContainer.appendChild(createCard(project)));
    }
}

function createCard(item) {
    const card = document.createElement("div");
    card.className = "project-card";

    let imageSource = `https://via.placeholder.com/600x300/007bff/ffffff?text=${encodeURIComponent(item.title || 'Maha Tech Mahi')}`;
    if (item.imageUrl && item.imageUrl.trim() !== "") {
        imageSource = item.imageUrl;
    } else if (item.youtubeId && item.youtubeId.trim() !== "") {
        imageSource = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    }

    card.innerHTML = `
        <img src="${imageSource}" alt="${item.title}" class="project-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x300/007bff/ffffff?text=Image+Not+Found';">
        <div class="project-info">
            <div class="tags">
                <span class="tag">${item.category || 'General'}</span>
                <span class="tag" style="background-color: #d1ecf1; color: #0c5460;">${item.techStack || 'Code'}</span>
                <span class="tag" style="background-color: #fff3cd; color: #856404;">${item.difficulty || 'All Levels'}</span>
            </div>
            <h3 class="project-title">${item.title || 'Untitled'}</h3>
            <p class="project-desc">${item.description || 'Dive into this exciting new tutorial!'}</p>
            <a href="blog.html?id=${item.id}" class="start-btn">
                ${item.type === 'Tutorial' ? 'Start Reading' : 'Start Building'}
            </a>
        </div>
    `;
    return card;
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredContent = globalContent.filter(item => {
        const titleMatch = (item.title || "").toLowerCase().includes(searchTerm);
        const techMatch = (item.techStack || "").toLowerCase().includes(searchTerm);
        const categoryMatch = (item.category || "").toLowerCase().includes(searchTerm);
        
        return titleMatch || techMatch || categoryMatch;
    });

    renderContent(filteredContent);
});

window.onload = fetchContent;

// --- CHATBOT LOGIC ---

function toggleChat() {
    document.getElementById('chatbot-container').classList.toggle('hidden');
}

function toggleMaximize() {
    document.getElementById('chatbot-container').classList.toggle('maximized');
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const inputField = document.getElementById('chatInput');
    const message = inputField.value.trim();
    if (!message) return;

    const chatWindow = document.getElementById('chat-window');
    
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user-message';
    userBubble.textContent = message;
    chatWindow.appendChild(userBubble);
    inputField.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    const thinkingBubble = document.createElement('div');
    thinkingBubble.className = 'chat-message bot-message';
    thinkingBubble.textContent = 'Maha Bot is thinking...';
    chatWindow.appendChild(thinkingBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('https://mahatechmahi-backend.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        let formattedReply = data.reply;
        formattedReply = formattedReply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedReply = formattedReply.replace(/`(.*?)`/g, '<code style="background:#ddd;padding:2px 4px;border-radius:4px;">$1</code>');
        
        thinkingBubble.innerHTML = formattedReply;
        
    } catch (error) {
        thinkingBubble.textContent = "Error: Cannot connect to Maha Bot. Please try again.";
        console.error(error);
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
}