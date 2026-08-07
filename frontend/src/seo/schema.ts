/**
 * JSON-LD Schema.org Generators for Enterprise SEO & AI Search Engines
 */

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ByteBuilders',
  url: 'https://bytebuilders.pages.dev',
  logo: 'https://bytebuilders.pages.dev/logo.png',
  description: 'Flagship digital growth agency building high-performance web applications, client intake engines, and custom software platforms.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Indore, Madhya Pradesh',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452001',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-415-890-3420',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://linkedin.com/company/bytebuilders',
    'https://github.com/kanishkjn13/ByteBuildr',
    'https://twitter.com/bytebuilders'
  ]
});

export const generateServiceSchema = (name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'ByteBuilders',
    url: 'https://bytebuilders.pages.dev'
  },
  serviceType: 'Web Engineering & UI/UX Design'
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer
    }
  }))
});

export const generateArticleSchema = (title: string, description: string, author: string, datePublished: string, image: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  author: {
    '@type': 'Person',
    name: author
  },
  datePublished,
  image,
  publisher: {
    '@type': 'Organization',
    name: 'ByteBuilders',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bytebuilders.pages.dev/logo.png'
    }
  }
});
