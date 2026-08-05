/**
 * JSON-LD Schema.org Generators for Enterprise SEO & AI Search Engines
 */

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Byte Build',
  url: 'https://bytebuild.com',
  logo: 'https://bytebuild.com/logo.png',
  description: 'Flagship digital growth agency building high-performance web applications, client intake engines, and custom software platforms.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '500 Howard Street, Suite 400',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-415-890-3420',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://linkedin.com/company/bytebuild',
    'https://github.com/bytebuild',
    'https://twitter.com/bytebuild'
  ]
});

export const generateServiceSchema = (name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Byte Build',
    url: 'https://bytebuild.com'
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
    name: 'Byte Build',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bytebuild.com/logo.png'
    }
  }
});
