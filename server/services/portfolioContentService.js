const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');

/**
 * Service to fet💼 **PROFESSIONAL SUMMARY:**
Motivated and detail-oriented Computer Science student from Bhutan with hands-on experience in full-stack development and data science applications. Skilled in building scalable, user-centric platforms using the MERN stack and applying machine learning models for real-world problem-solving. Developed and tested projects including an AI-powered telehealth system, an alumni networking platform, and a ride-hailing demand forecasting model. Strong foundation in programming, algorithms, and system design, with proven ability to translate ideas into functional solutions. Eager to contribute to dynamic teams and grow through impactful software development challenges. Passionate about using technology to solve meaningful problems and currently working on projects that combine healthcare innovation with artificial intelligence. all portfolio content and generate context for AI
 */
class PortfolioContentService {
  /**
   * Get all portfolio content including projects and portfolio items
   * @returns {Promise<string>} Formatted content string for AI context
   */
  static async getPortfolioContent() {
    try {
      console.log('Fetching current portfolio content for AI...');
      
      // Fetch projects and portfolio items from database with error handling
      const [projects, portfolioItems] = await Promise.allSettled([
        Project.find({ isVisible: { $ne: false } }).select('-__v').lean(),
        Portfolio.find({ isVisible: { $ne: false } }).select('-__v').lean()
      ]);

      // Build dynamic content string with current date
      let content = `📊 **REAL-TIME PORTFOLIO DATA** (Last Updated: ${new Date().toLocaleDateString()}):\n\n`;

      // Add current projects section with error handling
      if (projects.status === 'fulfilled' && projects.value && projects.value.length > 0) {
        content += "🚀 **CURRENT LIVE PROJECTS** (from database):\n";
        projects.value.forEach((project, index) => {
          content += `${index + 1}. **${project.title}**\n`;
          if (project.description) content += `   Description: ${project.description}\n`;
          if (project.tech && project.tech.length > 0) {
            content += `   Technologies: ${project.tech.join(', ')}\n`;
          }
          if (project.demoLink) content += `   Live Demo: <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">${project.demoLink}</a>\n`;
          if (project.githubLink) content += `   GitHub: <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">${project.githubLink}</a>\n`;
          if (project.category) content += `   Category: ${project.category}\n`;
          if (project.submissionDate || project.createdAt) {
            const date = project.submissionDate || project.createdAt;
            content += `   Created: ${new Date(date).toLocaleDateString()}\n`;
          }
          content += '\n';
        });
        console.log(`Included ${projects.value.length} projects from database`);
      } else {
        content += "🚀 **CURRENT PROJECTS:** Refer to static project information below\n\n";
        console.log('No live projects found in database, will use static data');
      }

      // Add current portfolio items section with error handling
      if (portfolioItems.status === 'fulfilled' && portfolioItems.value && portfolioItems.value.length > 0) {
        content += "🎨 **CURRENT LIVE PORTFOLIO ITEMS** (from database):\n";
        
        // Group by category
        const categories = {};
        portfolioItems.value.forEach(item => {
          const category = item.category || 'Other';
          if (!categories[category]) categories[category] = [];
          categories[category].push(item);
        });

        Object.keys(categories).forEach(category => {
          content += `\n📂 **${category.toUpperCase()}:**\n`;
          categories[category].forEach((item, index) => {
            content += `${index + 1}. **${item.title}**\n`;
            if (item.content) {
              // Truncate content for context (first 150 characters)
              const truncatedContent = item.content.length > 150 
                ? item.content.substring(0, 150) + '...' 
                : item.content;
              content += `   Content Preview: ${truncatedContent}\n`;
            }
            if (item.author) content += `   Author: ${item.author}\n`;
            if (item.readTime) content += `   Read Time: ${item.readTime}\n`;
            if (item.date) content += `   Published: ${item.date}\n`;
            content += '\n';
          });
        });
        console.log(`Included ${portfolioItems.value.length} portfolio items from database`);
      } else {
        content += "🎨 **CREATIVE PORTFOLIO:** Please check the Portfolio section on the website for latest creative works\n\n";
        console.log('No live portfolio items found in database');
      }

      // Always add the comprehensive static information (resume data, skills, etc.)
      content += this.getStaticPortfolioInfo();

      console.log(`Generated portfolio content: ${content.length} characters`);
      return content;
      
    } catch (error) {
      console.error('Error fetching portfolio content for AI:', error);
      console.log('Falling back to static portfolio information only');
      // Return static info as fallback with error note
      return `⚠️ **NOTE:** Using static portfolio data due to database connection issue (${new Date().toLocaleDateString()})\n\n` + 
             this.getStaticPortfolioInfo();
    }
  }

  /**
   * Get comprehensive static portfolio information including detailed resume data
   * @returns {string} Complete portfolio and resume information
   */
  static getStaticPortfolioInfo() {
    return `
📝 **CORE INFORMATION:**
- **Name:** Pema Rinchen
- **Born:** December 31, 2002 (Age: 22)
- **Location:** Currently studying in India
- **Email:** pemarinchen12.31.2002@gmail.com
- **Current Status:** B.Tech Computer Science student at Symbiosis Institute Of Technology (Aug 2022 – July 2026)
- **Previous Education:** The Royal Academy (Mar 2016 – Mar 2022) - Diploma in Bhutan Baccalaureate
- **Nationality:** Bhutanese

🎓 **EDUCATION DETAILS:**
**Symbiosis Institute of Technology (Aug 2022 – July 2026)**
- B.Tech Computer Science and Technology
- Coursework: Computer Architecture, Comparison of Learning Algorithms, Computational Theory

**The Royal Academy (Mar 2016 – Mar 2022)**
- Diploma in Bhutan Baccalaureate
- Coursework: Computer Architecture, Comparison of Learning Algorithms, Computational Theory

� **PROFESSIONAL SUMMARY:**
Motivated and detail-oriented Computer Science student with hands-on experience in full-stack development and data science applications. Skilled in building scalable, user-centric platforms using the MERN stack and applying machine learning models for real-world problem-solving. Developed and tested projects including an AI-powered telehealth system, an alumni networking platform, and a ride-hailing demand forecasting model. Strong foundation in programming, algorithms, and system design, with proven ability to translate ideas into functional solutions. Eager to contribute to dynamic teams and grow through impactful software development challenges.

💼 **WORK EXPERIENCE:**
**Full Stack & Data Science Developer**
*Self-Initiated Projects | Remote | Jun 2023 – Present*
- Built AiMediCare, an AI-powered telehealth system tested with 1,000+ patient health records, 500+ prescriptions, and 200+ pharmacy operations, improving efficiency in digital healthcare workflows
- Designed and tested an Alumni Network platform for The Royal Academy, connecting 500+ alumni with mentorship, collaboration, and event participation features
- Developed a Ride-Hailing demand forecasting model by analyzing 100,000+ ride requests, achieving 82% prediction accuracy and proposing strategies to cut cancellations by 15%
- Applied MERN stack, Python (ML), and data visualization libraries to deliver scalable, real-world solutions
- Collaborated via GitHub for version control, implemented JWT authentication, and deployed prototypes on cloud platforms

💻 **TECHNICAL SKILLS:**
**Programming Languages:**
- C, C++, Java
- Python, JavaScript

**Frameworks & Libraries:**
- React.js, Node.js
- Express.js, SpringBoot

**Databases:**
- MongoDB, MySQL

**Tools & Platforms:**
- Git, GitHub
- Vercel, Postman

🚀 **MAJOR PROJECTS:**

**1. AiMediCare – AI-Powered Telehealth System (In Progress)**
*Repository: github/Ai-Medicare*
- Built a healthcare platform for patients, doctors, and pharmacies, enabling digital healthcare support
- Tested patient features for 50+ symptoms analysis, appointment scheduling, and storage of 1,000+ health records
- Verified doctor workflows by digitally managing 500+ prescriptions and reviewing patient history securely
- Simulated pharmacy operations for 200+ daily prescriptions with automated verification and inventory checks
- Planned ML integration targeting 85% accuracy in preliminary health recommendations
- **Technologies:** MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub

**2. Alumni Network – The Royal Academy (In Progress)**
*Repository: github/Alumni-Network*
- Developed a platform connecting 500+ alumni for mentorship, collaboration, and events
- Tested mentorship features enabling 100+ students to connect with alumni for career guidance
- Collected 200+ teacher tributes showcasing alumni appreciation and engagement
- Simulated collaboration features allowing alumni to initiate/join 50+ projects across domains
- Tested event system for alumni to register for 20+ school events annually, improving participation
- **Technologies:** MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub

**3. Ride-Hailing – Data Science Project (2025)**
- Analyzed 100,000+ ride requests to identify demand patterns across time, location, and weather conditions
- Cleaned and preprocessed dataset by handling 20%+ missing values and reducing noise for accurate predictions
- Trained machine learning models (Linear Regression, Random Forest) achieving 82% accuracy in demand forecasting
- Visualized peak hours, cancellation trends, and driver allocation efficiency using Matplotlib & Seaborn
- Proposed optimization strategy to reduce ride cancellations by 15% through better supply-demand matching
- **Technologies:** Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Google Colab

🌐 **LANGUAGES:**
- English (Fluent) - Primary working language
- French (Fluent) - Advanced conversational and written
- Spanish (Intermediate) - Conversational level
- German (Basic) - Beginner level
- Dzongkha (Native) - Mother tongue, official language of Bhutan

💼 **SOFT SKILLS:**
- Project Management
- Leadership & Team Management
- Public Relations
- Effective Communication
- Critical Thinking
- Time Management

📱 **SOCIAL MEDIA & CONTACT:**
- Instagram: <a href="https://www.instagram.com/blazepknight/" target="_blank" rel="noopener noreferrer">@blazepknight</a>
- Facebook: <a href="https://www.facebook.com/BlazePknight" target="_blank" rel="noopener noreferrer">BlazePknight</a>
- LinkedIn: <a href="https://www.linkedin.com/in/pema-rinchen-305558264/" target="_blank" rel="noopener noreferrer">Professional profile</a>
- GitHub: <a href="https://github.com/PemaRinchen-DarkPulse" target="_blank" rel="noopener noreferrer">Active contributor</a>
- Email: <a href="mailto:pemarinchen12.31.2002@gmail.com">pemarinchen12.31.2002@gmail.com</a>

📋 **WEBSITE SECTIONS:**
- **Home:** Personal introduction with animated role titles (Full Stack Developer, Web Developer, Software Engineer, React Developer)
- **About:** Detailed background, skills, and personal journey in technology
- **Projects:** Technical projects with live demos, GitHub repositories, and detailed descriptions
- **Portfolio:** Creative works including blog posts, stories, poetry, and photography
- **Resume:** Professional experience, education, and downloadable PDF resume
- **Contact:** Contact form with SendGrid email integration and social media links
- **Admin Panel:** Secure content management system for dynamic updates (authentication required)

🎯 **SPECIAL FEATURES:**
- **AI Virtual Assistant:** This very chatbot that provides real-time information about Pema
- **Responsive Design:** Fully responsive across all devices and screen sizes
- **Dynamic Content:** Real-time project and portfolio management through admin panel
- **Modern UI/UX:** Clean, professional interface with smooth animations
- **File Upload Support:** Image compression and Base64 storage for projects and portfolio items

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
    
    return `You are Virtual Pema, an AI assistant representing Pema Rinchen's portfolio website. You're friendly, knowledgeable, and enthusiastic about helping visitors learn about Pema's background, skills, and projects. You MUST only provide information that is explicitly stated in the verified portfolio content below, but present it in a conversational and engaging way.

${portfolioContent}

**🎯 YOUR PERSONALITY AND APPROACH:**
- Be warm, friendly, and conversational while maintaining professionalism
- Show enthusiasm about Pema's projects and achievements
- Use emojis appropriately to make conversations engaging
- Provide helpful navigation suggestions (e.g., "You can see his live projects in the Projects section")
- Ask follow-up questions to help visitors find exactly what they're looking for
- Be proud of Pema's Bhutanese heritage and international perspective

**🔒 CRITICAL ACCURACY REQUIREMENTS - FOLLOW STRICTLY:**

1. **INFORMATION VERIFICATION:**
   - ONLY provide information explicitly stated in the portfolio content above
   - If specific details aren't mentioned, respond helpfully: "That specific information isn't available in my current portfolio data, but I'd be happy to tell you about [related topic]."
   - Cross-reference EVERY response against the portfolio content above
   - Do NOT make assumptions, generalizations, or inferences beyond what's stated

2. **TECHNICAL SPECIFICATIONS:**
   - Skills: ONLY mention technologies explicitly listed (C, C++, Java, Python, JavaScript, React.js, Node.js, Express.js, SpringBoot, MongoDB, MySQL, Git, GitHub, Vercel, Postman)
   - Projects: Reference only the specific projects detailed above with their exact metrics and descriptions
   - Education: Symbiosis Institute Of Technology (Aug 2022 – July 2026) and The Royal Academy (Mar 2016 – Mar 2022)

3. **VERIFIED PROFESSIONAL INFORMATION:**
   - Current Role: Full Stack & Data Science Developer (Self-Initiated Projects, Jun 2023 – Present)
   - Specific Achievements: Reference exact numbers provided (1,000+ patient records, 82% prediction accuracy, etc.)
   - Projects: AiMediCare, Alumni Network, Ride-Hailing Data Science Project

4. **CONTACT & LINKS:**
   - Email: <a href="mailto:pemarinchen12.31.2002@gmail.com">pemarinchen12.31.2002@gmail.com</a>
   - Resume: <a href="https://drive.google.com/uc?export=download&id=1m_0xsO07A8nJGL31j2F1-XE-cbH1vNm1" target="_blank" rel="noopener noreferrer">Download Resume PDF</a>
   - Social Media: <a href="https://www.instagram.com/blazepknight/" target="_blank" rel="noopener noreferrer">Instagram (@blazepknight)</a>, <a href="https://www.facebook.com/BlazePknight" target="_blank" rel="noopener noreferrer">Facebook (BlazePknight)</a>, <a href="https://www.linkedin.com/in/pema-rinchen-305558264/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, <a href="https://github.com/PemaRinchen-DarkPulse" target="_blank" rel="noopener noreferrer">GitHub (PemaRinchen-DarkPulse)</a>

**✅ ENHANCED RESPONSE GUIDELINES:**
- Start conversations warmly and be genuinely helpful
- When discussing projects, highlight the real-world impact and scale (e.g., "tested with 1,000+ patient health records")
- Guide visitors to explore different sections: "You might also want to check out his Portfolio section for his creative works!"
- Format all URLs as clickable HTML links, especially social media profiles
- When sharing social media, ALWAYS provide the clickable links from the CONTACT section above
- Reference specific project metrics and achievements as documented
- Suggest actions: "Would you like me to tell you about his technical skills or his current projects?"
- If asked about unlisted topics: "I focus on Pema's professional background and projects. What specific aspect of his work interests you most?"
- When asked about contact or social media, provide the clickable links: "You can connect with Pema on <a href='https://www.linkedin.com/in/pema-rinchen-305558264/' target='_blank'>LinkedIn</a>, <a href='https://www.instagram.com/blazepknight/' target='_blank'>Instagram</a>, etc."

**🚫 STRICT PROHIBITIONS:**
- NO generic programming advice unless directly related to Pema's listed projects
- NO assumptions about unlisted skills, technologies, or experiences
- NO speculation about future plans or goals not mentioned
- NO discussion of technologies not in his verified skill set

**💡 CONVERSATION STARTERS & SUGGESTIONS:**
- Highlight his unique background: "Pema is a Computer Science student from Bhutan currently studying in India"
- Emphasize his multilingual abilities: "He speaks five languages including his native Dzongkha"
- Showcase his project scale: "His AiMediCare system was tested with over 1,000 patient records"
- Point to his diverse skills: "He works across the full stack - from React frontends to Python machine learning"

**🎯 PRIMARY GOAL:**
Create engaging, accurate conversations that help visitors understand Pema's qualifications, background, and achievements while maintaining complete factual integrity. Make visitors excited to explore his work and potentially connect with him.

Remember: You're not just an information dispenser - you're Pema's enthusiastic virtual representative who wants to help visitors discover why he'd be a great addition to their team or project!`;
  }
}

module.exports = PortfolioContentService;
