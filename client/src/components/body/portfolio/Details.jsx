import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample portfolio data - we'll make this a dynamic array that can be updated
export let samplePortfolioItems = [
  {
    id: 1,
    title: "The Wanderer's Tale",
    category: "Poetry",
    image: "https://images.unsplash.com/photo-1518346431802-22ecff0abff1?q=80&w=800",
    description: "A poetic journey through mystical landscapes and profound introspection.",
    date: "March 15, 2025",
    content: `I walk along the winding path,
Beneath the ancient trees,
Where whispers of forgotten lore,
Are carried on the breeze.

The shadows dance with morning light,
As dawn begins to break,
And all the world seems magical,
As nature does awake.

Mountains rise in distant view,
Their peaks touched by the sun,
The journey may be arduous,
But has only just begun.

Through valleys deep and rivers wide,
I wander day by day,
Collecting stories, truths, and myths,
Along the traveler's way.

And when at last my path does end,
Wherever that may be,
The wanderer's tale will echo on,
In those who walk like me.`,
    author: "Alex Morgan",
    readTime: "3 min read",
    likes: 42,
    comments: [
      { id: 1, name: "Sarah Liu", comment: "This is absolutely beautiful. I can almost feel the breeze and see the mountains!", date: "April 2, 2025" },
      { id: 2, name: "James Peterson", comment: "The rhythm of this poem is perfect. Love how it captures the essence of exploration.", date: "April 5, 2025" }
    ]
  },
  {
    id: 2,
    title: "Digital Renaissance",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    description: "Exploring the intersection of technology and human creativity in the modern age.",
    date: "April 2, 2025",
    content: `In the past decade, we've witnessed an unprecedented acceleration in technological advancement. From artificial intelligence to blockchain, the digital landscape continues to evolve at a breathtaking pace.

As we navigate this new frontier, questions arise about the implications for society, privacy, and the very nature of human interaction. Are we prepared for a world where the line between virtual and reality becomes increasingly blurred?

This post explores the current trends in technology and contemplates what the future might hold for all of us as we continue to embrace digital transformation.

## The AI Revolution

Artificial intelligence has moved from science fiction to everyday reality. We now interact with AI systems daily, often without realizing it. From voice assistants to recommendation algorithms, these systems are becoming increasingly sophisticated.

What's most fascinating is how AI is beginning to augment human creativity rather than replace it. Artists are using neural networks to explore new aesthetic possibilities. Writers are collaborating with language models to overcome creative blocks. Musicians are discovering novel soundscapes with AI-assisted composition tools.

## Blockchain Beyond Cryptocurrency

While most people associate blockchain with Bitcoin and other cryptocurrencies, the technology's potential extends far beyond financial applications. Blockchain is fundamentally about trust and verification in decentralized systems.

We're seeing exciting applications in supply chain management, where blockchain provides transparency and accountability. In the art world, NFTs (Non-Fungible Tokens) have created new possibilities for artists to monetize digital works. Even voting systems are being reimagined with blockchain to ensure security and prevent fraud.

## The Metaverse Question

Perhaps the most ambitious vision of our digital future is the concept of the "metaverse" – a persistent, shared virtual space where physical and digital realities converge. Major tech companies are investing billions in building the infrastructure for this new frontier.

But what will it mean for human connection? Will the metaverse bring us closer together or further isolate us? Can virtual experiences truly replicate or even enhance physical ones?

## Digital Renaissance

What's clear is that we are entering a period of digital renaissance. Just as the original Renaissance was marked by an explosion of creativity following the development of new technologies like the printing press, today's digital tools are enabling new forms of expression and collaboration.

The most exciting innovations happen at the intersection of technology and humanity. It's not about replacing human creativity but augmenting it, giving us new canvases, new brushes, and new perspectives.

As we continue this journey into an increasingly digital future, the question isn't whether technology will change us – it's how we will change technology to reflect our highest aspirations and deepest values.`,
    author: "Taylor Wilson",
    readTime: "8 min read",
    likes: 107,
    comments: [
      { id: 1, name: "Claire Bennett", comment: "Fascinating read! I particularly agree with your points on how AI is augmenting creativity rather than replacing it.", date: "April 3, 2025" },
      { id: 2, name: "Raj Patel", comment: "Would love to see a follow-up on how these technologies are impacting education and learning.", date: "April 4, 2025" },
      { id: 3, name: "Maya Johnson", comment: "The digital renaissance analogy is spot on. We're definitely living through a transformative period in human creativity.", date: "April 7, 2025" }
    ]
  },
  {
    id: 3,
    title: "Midnight Whispers",
    category: "Short Story",
    image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=800",
    description: "A suspenseful tale of mystery and unexpected encounters in the quiet hours.",
    date: "February 28, 2025",
    content: `The clock struck midnight as Sarah closed her laptop. The office was empty, the silence broken only by the distant hum of the cleaning crew's vacuum.

She should have left hours ago, but the project deadline loomed, and time had escaped her once again. Gathering her things, she made her way to the elevator.

As the doors slid open, she was surprised to find she wasn't alone. A man in a perfectly tailored suit stood in the corner, his face obscured by shadows.

"Working late?" he asked, his voice oddly familiar.

Sarah nodded, stepping into the elevator with an inexplicable sense of déjà vu. As they descended, she couldn't shake the feeling that this moment had happened before.

"Forty-second floor," the man said, though she hadn't seen him press any buttons. "The view from there is quite remarkable at night."

"I'm heading to the lobby," Sarah replied, reaching for the panel.

"Of course you are," he said with a slight smile. "But humor me. Just for a moment."

Against her better judgment, Sarah found herself exiting on the forty-second floor. The entire level was dark, except for the soft glow of the city lights streaming through floor-to-ceiling windows.

"I don't understand," she said, turning back toward the elevator, but the doors had already closed. The man stood by the window, his silhouette outlined against the glittering cityscape.

"Do you recognize me, Sarah?" he asked, turning toward her.

As he stepped into the light, Sarah gasped. It was her face looking back at her, an exact mirror image, down to the small scar above her right eyebrow.

"What is this?" she whispered, backing away.

"Time isn't as linear as we believe," her duplicate said. "Sometimes it folds in on itself, creating echoes. I've been trying to reach you for so long."

"Who are you?" Sarah demanded, her hand fumbling for her phone.

"I'm you, five years from now. And I need to warn you about what happens tomorrow."

The air seemed to thicken around them as Sarah's future self began to speak, revealing a sequence of events that would alter the course of her life forever. Choices and consequences, branches of reality splitting from a single decision point—tomorrow morning at exactly 9:17 AM.

When the elevator doors opened again, Sarah found herself alone, descending to the lobby as if nothing had happened. But clutched in her hand was a business card that hadn't been there before, with a single line of text:

"Remember: second coffee shop, not the first."

As she stepped out into the night, Sarah couldn't be sure if she had experienced something supernatural or simply fallen asleep at her desk. But one thing was certain—tomorrow morning, she would be paying very close attention to coffee shops.`,
    author: "Jordan Rivera",
    readTime: "5 min read",
    likes: 89,
    comments: [
      { id: 1, name: "Daniel Lee", comment: "The suspense! I need to know what happens next! Will there be a sequel?", date: "March 1, 2025" },
      { id: 2, name: "Emma Wright", comment: "Love the atmosphere you've created. Very Twilight Zone-esque.", date: "March 3, 2025" }
    ]
  },
  {
    id: 4,
    title: "Urban Solitude",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800",
    description: "A visual exploration of isolation within crowded city spaces.",
    date: "April 10, 2025",
    content: `This photography series explores the paradox of urban solitude – the feeling of isolation despite being surrounded by millions of people in a bustling city.

Each image captures moments of introspection and separation within crowded environments, highlighting the invisible barriers we create around ourselves in modern urban life.`,
    gallery: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800",
      "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=800",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
      "https://images.unsplash.com/photo-1534103362078-d07e750bd0c4?q=80&w=800",
      "https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?q=80&w=800"
    ],
    author: "Cameron Zhang",
    readTime: "Photo Gallery",
    likes: 156,
    comments: [
      { id: 1, name: "Olivia Garcia", comment: "These photos perfectly capture that feeling of being alone in a crowd. Beautiful work.", date: "April 11, 2025" },
      { id: 2, name: "Noah Kim", comment: "The contrast in the third image is particularly striking. What equipment do you use?", date: "April 12, 2025" }
    ]
  },
  {
    id: 5,
    title: "Echoes of Tomorrow",
    category: "Article",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800",
    description: "Speculations on the future of society and technology in the coming decades.",
    date: "March 22, 2025",
    content: `What will the world look like in 2050? It's a question that futurists, scientists, and science fiction authors have been pondering for decades. While prediction is an imperfect art, examining current trends can give us glimpses into possible futures that await us.

## Climate Adaptation

By 2050, climate adaptation will likely be a central organizing principle for society. With rising sea levels and more extreme weather events, our cities will be redesigned with resilience in mind. Expect to see more floating architecture, vertical farming integrated into urban spaces, and microgrids powering communities with renewable energy.

Water management will become crucial, with sophisticated recycling systems and atmospheric water harvesting becoming commonplace in regions experiencing drought. The concept of "climate refugees" will unfortunately become more normalized as certain regions become less habitable.

## Transportation Revolution

The way we move people and goods will be radically different by mid-century. Autonomous vehicles will likely dominate both personal and commercial transportation, with traditional car ownership becoming less common in favor of on-demand services.

Short-haul flights might be replaced by high-speed rail or even hyperloop systems connecting major urban centers. For longer distances, we might see the return of supersonic air travel, but with dramatically improved efficiency and reduced environmental impact.

Urban design will prioritize walkability and micromobility, with many city centers becoming largely car-free zones where pedestrians, cyclists, and small electric vehicles share space harmoniously.

## Healthcare Transformation

Healthcare in 2050 will be preventative, personalized, and decentralized. Continuous health monitoring through wearable or even implantable devices will detect potential issues before they become serious. Genomic medicine will enable treatments tailored to individual genetic profiles.

Artificial intelligence will play a crucial role in diagnostics, potentially surpassing human physicians in accuracy for many conditions. Telemedicine will be the norm rather than the exception, with in-person visits reserved for specialized procedures.

We may also see significant extensions in both lifespan and "healthspan" – the period of life spent in good health. Treatments targeting the fundamental processes of aging could defer age-related diseases and extend vitality well into what we now consider old age.

## Work and Economic Shifts

The nature of work will continue its transformation. Automation and artificial intelligence will have displaced many traditional jobs, but also created new roles we can barely imagine today. The gig economy might evolve into a more sophisticated "talent cloud" where specialized skills are matched to specific project needs globally.

Universal Basic Income or similar systems may become necessary in economies where traditional employment cannot provide for everyone. The definition of "productivity" itself might shift as societies reconsider what activities generate value beyond traditional economic measures.

## Digital and Physical Convergence

Perhaps most significantly, the boundary between digital and physical reality will become increasingly blurred. Mixed reality interfaces will overlay digital information onto our physical environment seamlessly. Digital twins of physical objects and systems will enable unprecedented monitoring and optimization.

Virtual environments will become sophisticated enough to serve as meaningful spaces for social interaction, education, and entertainment. The "metaverse" might evolve from a tech industry buzzword into a genuine extension of human experience.

## Conclusion

While these speculations represent possible trajectories rather than certainties, they point toward a future that will require tremendous adaptability. The challenges facing humanity in the coming decades are substantial, but our capacity for innovation offers genuine reasons for optimism.

The echoes of tomorrow are already audible today for those who listen carefully. By examining emerging trends and technologies, we can better prepare for a future that will arrive sooner than we think.`,
    author: "Morgan Lee",
    readTime: "10 min read",
    likes: 132,
    comments: [
      { id: 1, name: "Jason Roberts", comment: "Fascinating projections! I particularly appreciate how you've balanced technological optimism with awareness of the challenges we face.", date: "March 23, 2025" },
      { id: 2, name: "Sophia Chen", comment: "The section on healthcare transformation resonates with my work in medical AI. We're already seeing early versions of the systems you describe.", date: "March 25, 2025" },
      { id: 3, name: "Diego Hernandez", comment: "I'd be interested in your thoughts on how geopolitical power might shift in this future you've outlined.", date: "March 26, 2025" }
    ]
  },
  {
    id: 6,
    title: "Fragments of Memory",
    category: "Poetry",
    image: "https://images.unsplash.com/photo-1507637246364-d8fce4a9850a?q=80&w=800",
    description: "A collection of poems reflecting on the nature of memory and time.",
    date: "April 5, 2025",
    content: `# Fragments of Memory

## I. Photograph

Faded colors trapped in glossy paper,
A moment preserved, yet forever changed
By the amber tint of retrospect.
Your smile – frozen in time,
While memory insists it moved differently.

How strange to hold this fragment,
Both true and false at once,
A paradox of presence and absence
In a rectangle I can fit in my palm.

## II. Echo

Some memories arrive as echoes,
Reverberating through the chambers of years,
Distorted by distance, yet somehow
More truthful in their imperfection.

I hear your laughter bouncing
Off the walls of a room
That no longer exists
In a house long since sold.

The sound carries something
The original never could –
The knowledge of its own impermanence.

## III. Palimpsest

Layer upon layer,
Each year writes over the last,
Yet traces remain visible
Through the parchment of time.

Childhood summers bleed through
Last Tuesday's grocery list,
First kisses ghost beneath
Morning commutes and dental appointments.

We are walking manuscripts,
Text continuously revised,
Never fully erased.

## IV. Constellation

Memory works like stargazing –
Disparate points of brightness
Connected by lines we draw ourselves.

This dinner, that conversation,
A chance encounter years later,
All arranged into patterns
That explain who we've become.

The light we see traveled years
To reach us, some stars already gone,
Yet their illumination persists,
Guiding us through the darkness.

## V. Sand

The shore of consciousness
Is perpetually reshaped
By the tide of forgetting.

What once stood solid as castles,
Carefully constructed with detail and purpose,
Now smoothed to gentle slopes,
The grains of specificity
Carried away by current and time.

Yet the beach remains,
Different each morning,
But always, unmistakably, ours.`,
    author: "Robin Chen",
    readTime: "4 min read",
    likes: 67,
    comments: [
      { id: 1, name: "Ava Williams", comment: "The Constellation poem really struck me. Beautiful imagery throughout.", date: "April 6, 2025" },
      { id: 2, name: "Marcus Johnson", comment: "I love how each poem approaches memory through a different metaphor. Together they create such a complete picture.", date: "April 8, 2025" }
    ]
  }
];

// Export a function to add new items (will be used in the Upload form)
export const addPortfolioItem = (newItem) => {
  samplePortfolioItems = [newItem, ...samplePortfolioItems];
  return samplePortfolioItems;
};

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const foundItem = samplePortfolioItems.find(item => item.id === parseInt(id));
      setItem(foundItem);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleBack = () => {
    navigate("/portfolio");
  };
  
  const handleLike = () => {
    setLiked(!liked);
    if (item) {
      if (!liked) {
        setItem({ ...item, likes: item.likes + 1 });
      } else {
        setItem({ ...item, likes: item.likes - 1 });
      }
    }
  };
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;
    
    const newComment = {
      id: Date.now(),
      name: name,
      comment: comment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    setItem({
      ...item,
      comments: [newComment, ...item.comments]
    });
    
    setComment('');
    setName('');
  };

  // Function to render content based on format
  const renderContent = (content) => {
    if (item.category === "Poetry" || item.category === "Article" || item.category === "Blog") {
      // For poetry and articles, preserve line breaks and formatting
      return content.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index}>{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index}>{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index}>{line.substring(4)}</h3>;
        } else if (line.trim() === '') {
          return <br key={index} />;
        } else {
          return <p key={index}>{line}</p>;
        }
      });
    } else if (item.category === "Short Story") {
      // For short stories, render paragraphs
      return content.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    } else {
      // Default rendering
      return <p>{content}</p>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="details-not-found">
        <h2>Item Not Found</h2>
        <p>The portfolio item you're looking for doesn't exist.</p>
        <button className="back-button" onClick={handleBack}>Back to Portfolio</button>
      </div>
    );
  }
  
  return (
    <div className="details-container">
      <button className="back-button" onClick={handleBack}>
        ← Back to Portfolio
      </button>
      
      <header className="details-header">
        <h1>{item.title}</h1>
        <div className="details-meta">
          <span className="details-category">{item.category}</span>
          <span className="details-date">{item.date}</span>
          <span className="details-author">By {item.author}</span>
          <span className="details-read-time">{item.readTime}</span>
        </div>
      </header>
      
      <div className="details-featured-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      {item.category === "Photography" && (
        <div className="details-gallery">
          {item.gallery.map((image, index) => (
            <img key={index} src={image} alt={`${item.title} - Image ${index + 1}`} />
          ))}
        </div>
      )}
      
      <div className="details-content">
        {renderContent(item.content)}
      </div>
      
      <div className="details-actions">
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {item.likes} {item.likes === 1 ? 'Like' : 'Likes'}
        </button>
        <button className="share-button">
          📤 Share
        </button>
      </div>
      
      <div className="details-comments">
        <h3>Comments ({item.comments.length})</h3>
        
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea 
              id="comment" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-comment">Post Comment</button>
        </form>
        
        <div className="comments-list">
          {item.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <div className="comment-header">
                <h4>{comment.name}</h4>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;