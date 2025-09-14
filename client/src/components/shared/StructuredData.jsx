const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.pemarinchen.dev/#person",
        "name": "Pema Rinchen",
        "url": "https://www.pemarinchen.dev",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.pemarinchen.dev/src/assets/images/profile.webp",
          "caption": "Pema Rinchen - Full Stack Developer"
        },
        "jobTitle": [
          "Full Stack Developer",
          "Web Developer", 
          "Software Engineer",
          "React Developer"
        ],
        "description": "Passionate Full Stack Developer specializing in React, JavaScript, and modern web technologies. Experienced in building responsive web applications with elegant solutions to complex problems.",
        "email": "pemarinchen12.31.2002@gmail.com",
        "sameAs": [
          "https://github.com/PemaRinchen-DarkPulse",
          "https://www.linkedin.com/in/pema-rinchen-305558264/",
          "https://www.facebook.com/BlazePknight",
          "https://www.instagram.com/blazepknight/"
        ],
        "knowsAbout": [
          "React",
          "JavaScript", 
          "Node.js",
          "Full Stack Development",
          "Web Development",
          "Software Engineering",
          "Bootstrap",
          "HTML5",
          "CSS3",
          "MongoDB",
          "Express.js",
          "RESTful APIs"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full Stack Developer",
          "occupationLocation": {
            "@type": "Country",
            "name": "Global"
          },
          "skills": [
            "React Development",
            "JavaScript Programming", 
            "Backend Development",
            "Database Design",
            "API Development",
            "Responsive Web Design"
          ]
        },
        "alumniOf": {
          "@type": "Organization",
          "name": "Educational Institution"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.pemarinchen.dev/#website",
        "url": "https://www.pemarinchen.dev",
        "name": "Pema Rinchen - Full Stack Developer Portfolio",
        "description": "Professional portfolio showcasing web development projects, skills, and expertise in React, JavaScript, and modern web technologies.",
        "publisher": {
          "@id": "https://www.pemarinchen.dev/#person"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.pemarinchen.dev/{search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.pemarinchen.dev/#webpage",
        "url": "https://www.pemarinchen.dev",
        "name": "Pema Rinchen - Full Stack Developer | React & Web Development Expert",
        "isPartOf": {
          "@id": "https://www.pemarinchen.dev/#website"
        },
        "about": {
          "@id": "https://www.pemarinchen.dev/#person"
        },
        "description": "Pema Rinchen is a passionate Full Stack Developer specializing in React, JavaScript, and modern web technologies. Experienced in building responsive web applications with elegant solutions to complex problems.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.pemarinchen.dev/"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "About",
              "item": "https://www.pemarinchen.dev/about"
            },
            {
              "@type": "ListItem",
              "position": 3, 
              "name": "Resume",
              "item": "https://www.pemarinchen.dev/resume"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Portfolio", 
              "item": "https://www.pemarinchen.dev/portfolio"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Projects",
              "item": "https://www.pemarinchen.dev/projects"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Contact",
              "item": "https://www.pemarinchen.dev/contact"
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;