### 🚀 Maha Tech Mahi - AI-Powered Teaching Assistant

**Live Demo:** [Test the AI Here!](https://mahatechmahi.onrender.com/)

## 👋 Hey there!
I'm Mahalinga Raya, and this is my full-stack AI project, **Maha Tech Mahi**. 

I built this web app to help students learn coding the right way. Most AI bots today just hand you the final code, which doesn't actually help you learn. So, I built this platform to act like a real teacher. I integrated the Groq API (Llama 3.1) and gave it strict instructions to act as a "Socratic Tutor"—meaning it explains the logic, points out your mistakes, and gives hints, but it makes *you* write the code yourself.

## 🛠️ What I Used to Build It
* **Frontend:** HTML5, CSS3, and Vanilla JavaScript
* **Backend:** Java & Spring Boot
* **AI Integration:** Groq API (Llama-3.1-8b-instant)
* **Hosting:** Render (Cloud Deployment) & GitHub

## 🐛 The Hardest Bugs I Fixed (Technical Highlights)
Building this from scratch wasn't easy. Here are a few major roadblocks I ran into and how I solved them:

1. **Making the AI remember the chat:** REST APIs have no memory. If you ask the AI a second question, it forgets the first one. I fixed this by writing custom JavaScript to capture the entire chat history in an array. Now, every time a user hits "send," my frontend sends the whole conversation context to my Spring Boot backend.
2. **The frustrating caching issue:** When I deployed the site live on Render, I noticed that mobile browsers kept loading older, broken versions of my JavaScript. To bypass this aggressive CDN caching, I implemented a cache-busting technique by adding version queries (like `script.js?v=2`) to force the browser to load the freshest code.
3. **Protecting my API Keys:** You can't just put API keys in frontend JavaScript, or people will steal them. I built a secure Java backend specifically to act as a middleman. My frontend only talks to my Spring Boot endpoints, and the actual Groq API key is safely hidden inside Render's environment variables (`System.getenv()`).

## 💻 How to Run It Locally
If you want to pull this code and run it yourself:
1. Clone this repository.
2. Get a free API key from Groq and set it as an environment variable on your machine (`GROQ_API_KEY`).
3. Run the Spring Boot backend (`localhost:8080`).
4. Open the `index.html` file in your browser to start chatting!

## 👨‍💻 About Me
I'm a Java Full Stack Developer based in Bengaluru. I specialize in building practical, AI-driven web applications from the ground up and solving complex integration challenges. I'm currently looking for full-time software engineering roles where I can bring this hands-on building experience to a great team.

* **LinkedIn:** [linkedin.com/in/mahalingaraya](https://www.linkedin.com/in/mahalingaraya)
* **GitHub:** [github.com/MahalingaRaya](https://github.com/MahalingaRaya)
