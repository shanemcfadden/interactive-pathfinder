import React from 'react';
import Helmet from 'react-helmet';
import ogImage from '../images/screencap.jpg';

const SEO = () => {
  const url = 'https://shanemcfadden.dev/interactive-pathfinder';
  const title = 'Interactive Pathfinder';
  const description =
    'Find the easiest path! Select a starting block and an ending block. Add some challenges like water and swamp for the pathfinder to avoid. Make a guess, and see if you can beat the computer at its own game!';
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
