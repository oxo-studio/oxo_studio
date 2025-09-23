import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const SeoMetaTags = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage,
  pageType
}) => {
  // Configurazioni base
  const siteConfig = {
    name: "OXO Studio",
    url: "https://www.oxostudio.it",
    defaultTitle: "OXO Studio - Agenzia Sviluppo Web e Design alla Spezia",
    defaultDescription: "Sviluppo siti web, SEO e design grafico a La Spezia. Servizi professionali per Liguria e 5 Terre.",
    twitterHandle: "@oxostudio"
  }

  // Titolo e URL canonico
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
  const pageDescription = description || siteConfig.defaultDescription
  const canonical = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url
  const ogImageUrl = `${siteConfig.url}${ogImage}`

  // Keywords ottimizzate per OXO Studio
  const keywords = [
    "agenzia sviluppo web La Spezia",
    "web design Liguria", 
    "sviluppo siti web 5 Terre",
    "SEO ottimizzazione siti",
    "creazione siti internet",
    "design grafico La Spezia",
    "app development",
    "e-commerce solutions",
    "digital marketing Liguria",
    "brand identity design"
  ].join(', ')

  return (
    <Helmet>
      {/* === TITLE & DESCRIPTION === */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* === OPEN GRAPH === */}
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="it_IT" />

      {/* === TWITTER === */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />

      {/* === ROBOTS & GEO === */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteConfig.name} />
      
      {/* Localizzazione */}
      <meta name="geo.region" content="IT-SP" />
      <meta name="geo.placename" content="La Spezia" />
      <meta name="geo.position" content="44.108030;9.828880" />
      <meta name="ICBM" content="44.108030, 9.828880" />

      {/* === STRUCTURED DATA === */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "description": siteConfig.defaultDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "logo": `${siteConfig.url}/logo.png`,
          "description": siteConfig.defaultDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "La Spezia",
            "addressRegion": "Liguria",
            "addressCountry": "IT"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "info@oxostudio.it"
          },
          "sameAs": [
            "https://www.facebook.com/oxostudio",
            "https://www.instagram.com/oxostudio",
            "https://www.linkedin.com/company/oxostudio"
          ]
        })}
      </script>
    </Helmet>
  )
}

// Validazione delle props
SeoMetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  pageType: PropTypes.string
}

// Valori di default
SeoMetaTags.defaultProps = {
  title: '',
  description: '',
  canonicalUrl: '',
  ogImage: '/og-default.jpg',
  pageType: 'website'
}

export default SeoMetaTags