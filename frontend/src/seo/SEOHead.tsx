import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateOrganizationSchema } from './schema';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  schema?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'ByteBuilders | AI-Powered Web Development & Digital Solutions',
  description = 'ByteBuilders builds modern websites, AI applications, SaaS platforms, business software, and scalable digital solutions.',
  image = 'https://bytebuilders.pages.dev/logo.png',
  schema
}) => {
  const location = useLocation();
  const canonicalUrl = `https://bytebuilders.pages.dev${location.pathname}`;
  const targetSchema = schema || generateOrganizationSchema();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ByteBuilders" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(targetSchema)}
      </script>
    </Helmet>
  );
};
