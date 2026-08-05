import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateOrganizationSchema } from './schema';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  schema?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Byte Build | Flagship Web Development & Growth Agency',
  description = 'Byte Build engineers custom high-performance web software, client intake engines, and soft neomorphic platforms.',
  image = 'https://bytebuild.com/og-image.png',
  schema
}) => {
  const location = useLocation();
  const canonicalUrl = `https://bytebuild.com${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Canonical Tag
    let canonicalTag = document.querySelector("link[rel='canonical']");
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Inject JSON-LD Schema
    const targetSchema = schema || generateOrganizationSchema();
    let scriptTag = document.querySelector('#json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('id', 'json-ld-schema');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(targetSchema);

  }, [title, description, canonicalUrl, image, schema]);

  return null;
};
