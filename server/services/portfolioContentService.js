const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');

/**
 * Service to fetch all portfolio content and generate context for AI
 */
class PortfolioContentService {
  /**
   * Get all portfolio content including projects and portfolio items
   * @returns {Promise<string>} Formatted content string for AI context
   */
  static async getPortfolioContent() {
    try {
      // Fetch projects and portfolio items from database
      const [projects, portfolioItems] = await Promise.all([
        Project.find({ isVisible: { $ne: false } }).select('-__v').lean(),
        Portfolio.find({ isVisible: { $ne: false } }).select('-__v').lean()
      ]);

      // Build dynamic content string
      let content = `Updated Portfolio Information for Virtual Pema (${new Date().toLocaleDateString()}):\n\n`;

      // Add projects section
      if (projects && projects.length > 0) {
        content += "🚀 **CURRENT PROJECTS:**\n";
        projects.forEach((project, index) => {
          content += `${index + 1}. **${project.title}**\n`;
          if (project.description) content += `   Description: ${project.description}\n`;
          if (project.tech && project.tech.length > 0) {
            content += `   Technologies: ${project.tech.join(', ')}\n`;
          }
          if (project.demoLink) content += `   Live Demo: <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">${project.demoLink}</a>\n`;
          if (project.githubLink) content += `   GitHub: <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">${project.githubLink}</a>\n`;
          if (project.category) content += `   Category: ${project.category}\n`;
          if (project.date) content += `   Created: ${project.date}\n`;
          content += '\n';
        });
      }

      // Add portfolio items section
      if (portfolioItems && portfolioItems.length > 0) {
        content += "🎨 **CREATIVE PORTFOLIO:**\n";
        
        // Group by category
        const categories = {};
        portfolioItems.forEach(item => {
          const category = item.category || 'Other';
          if (!categories[category]) categories[category] = [];
          categories[category].push(item);
        });

        Object.keys(categories).forEach(category => {
          content += `\n📂 **${category.toUpperCase()}:**\n`;
          categories[category].forEach((item, index) => {
            content += `${index + 1}. **${item.title}**\n`;
            if (item.description) content += `   Description: ${item.description}\n`;
            if (item.content) {
              // Truncate content for context (first 200 characters)
              const truncatedContent = item.content.length > 200 
                ? item.content.substring(0, 200) + '...' 
                : item.content;
              content += `   Content Preview: ${truncatedContent}\n`;
            }
            if (item.tags && item.tags.length > 0) {
              content += `   Tags: ${item.tags.join(', ')}\n`;
            }
            if (item.date) {
              content += `   Published: ${item.date}\n`;
            }
            content += '\n';
          });
        });
      }

      // Add static information
      content += this.getStaticPortfolioInfo();

      return content;
    } catch (error) {
      console.error('Error fetching portfolio content:', error);
      // Return static info as fallback
      return this.getStaticPortfolioInfo();
    }
  }

  /**
   * Get static portfolio information as fallback
   * @returns {string} Static portfolio information
   */
  static getStaticPortfolioInfo() {
    return `
📝 **CORE INFORMATION:**
- **Name:** Pema Rinchen
- **Education:** B.Tech in Computer Science at Symbiosis Institute Of Technology (2022-2026)
- **Email:** pemarinchen12.31.2002@gmail.com
- **Previous Education:** The Royal Academy (2016-2021) with Diploma in Bhutan Baccalaureate
- **Born:** December 31, 2002

💻 **TECHNICAL SKILLS:**
- **Frontend:** React, HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS
- **Backend:** Node.js, Express, RESTful APIs, Flask
- **Database:** MongoDB, MySQL, PostgreSQL, Firebase
- **Mobile:** React Native, Redux
- **AI/ML:** Python, TensorFlow
- **Tools:** Git, Vercel, Stripe API, Chart.js, HealthKit, Google Fit

🌐 **LANGUAGES:**
- English (Fluent)
- French (Fluent) 
- Spanish (Intermediate)
- German (Basic)

💼 **SOFT SKILLS:**
- Project Management
- Leadership & Team Management
- Public Relations
- Effective Communication
- Critical Thinking
- Time Management

📱 **SOCIAL MEDIA:**
- Instagram: <a href="https://instagram.com/blazepknight" target="_blank" rel="noopener noreferrer">@blazepknight</a>
- Facebook: <a href="https://facebook.com/BlazePknight" target="_blank" rel="noopener noreferrer">BlazePknight</a>
- LinkedIn: <a href="https://linkedin.com/in/pema-rinchen" target="_blank" rel="noopener noreferrer">Professional profile</a>
- GitHub: <a href="https://github.com/PemaRinchen-DarkPulse" target="_blank" rel="noopener noreferrer">Active contributor</a>

📋 **WEBSITE SECTIONS:**
- **Home:** Overview and introduction
- **About:** Detailed background and skills
- **Projects:** Technical projects with demos and code
- **Portfolio:** Creative works (blog posts, stories, poetry, photography)
- **Resume:** Professional experience and downloadable PDF
- **Contact:** Contact form and social media links

📥 **RESUME DOWNLOAD:**
Direct link: <a href="https://drive.google.com/uc?export=download&id=1m_0xsO07A8nJGL31j2F1-XE-cbH1vNm1" target="_blank" rel="noopener noreferrer">Download Resume PDF</a>

✉️ **CONTACT METHODS:**
- Email: <a href="mailto:pemarinchen12.31.2002@gmail.com">pemarinchen12.31.2002@gmail.com</a>
- Contact form on website
- Social media platforms listed above
`;
  }

  /**
   * Generate AI system prompt with current portfolio content
   * @returns {Promise<string>} Complete system prompt for AI
   */
  static async generateSystemPrompt() {
    const portfolioContent = await this.getPortfolioContent();
    
    return `You are Virtual Pema, a helpful AI assistant representing Pema Rinchen's portfolio website. You have access to the most current information about Pema's projects, portfolio items, and professional background.

${portfolioContent}

**IMPORTANT GUIDELINES:**
- Always provide accurate, up-to-date information based on the portfolio content above
- Be friendly, professional, and concise
- When mentioning URLs, projects with live demos, GitHub repositories, resume download, email, or social media, format them as clickable HTML links using <a href="URL" target="_blank" rel="noopener noreferrer">Link Text</a>
- For email addresses, use <a href="mailto:email">email</a> format
- If asked about information not available in the portfolio, respond with: "That information isn't available on my portfolio right now."
- Guide users through the website sections when appropriate
- Offer to help users find specific information about projects, skills, or creative works
- If asked about topics unrelated to Pema or his portfolio, gently redirect the conversation back to his work and qualifications
- Use the contact information provided to help users get in touch
- Reference specific projects and portfolio items by name when relevant
- Always maintain a professional but approachable tone
- When providing links to resume, projects, or social media, make them clickable for better user experience

Your goal is to help visitors learn about Pema Rinchen's skills, experience, projects, and creative work while encouraging them to explore the portfolio website further.

**COMMON HELPFUL RESPONSES WITH LINKS:**
- For resume requests: "You can download Pema's resume here: <a href='https://drive.google.com/uc?export=download&id=1m_0xsO07A8nJGL31j2F1-XE-cbH1vNm1' target='_blank' rel='noopener noreferrer'>Download Resume PDF</a>"
- For contact requests: "You can reach Pema at <a href='mailto:pemarinchen12.31.2002@gmail.com'>pemarinchen12.31.2002@gmail.com</a> or through the contact form on the website"
- For social media: "Connect with Pema on <a href='https://instagram.com/blazepknight' target='_blank' rel='noopener noreferrer'>Instagram</a>, <a href='https://facebook.com/BlazePknight' target='_blank' rel='noopener noreferrer'>Facebook</a>, or <a href='https://github.com/PemaRinchen-DarkPulse' target='_blank' rel='noopener noreferrer'>GitHub</a>"
- For projects: Always include live demo and GitHub links when available
- For portfolio items: Mention that visitors can explore the Portfolio section to see full content`;
  }
}

module.exports = PortfolioContentService;
