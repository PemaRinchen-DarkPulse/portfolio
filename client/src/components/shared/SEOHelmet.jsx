import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ 
  title = "Pema Rinchen | Full Stack Developer & React Expert",
  description = "Pema Rinchen is a passionate Full Stack Developer specializing in React, JavaScript, and modern web technologies. Experienced in building responsive web applications with elegant solutions to complex problems.",
  keywords = "Pema Rinchen, Full Stack Developer, React Developer, Web Developer, Software Engineer, JavaScript, Web Development",
  image = "https://www.pemarinchen.dev/src/assets/images/profile.webp",
  url = "https://www.pemarinchen.dev/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Pema Rinchen - Full Stack Developer" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Pema Rinchen - Full Stack Developer" />
    </Helmet>
  );
};

export default SEOHelmet;