import React from 'react'

export default function SEO({ title, description, image, url }: { title?: string; description?: string; image?: string; url?: string }) {
  const site = 'GamingOP'
  const t = title ? `${title} | ${site}` : site
  return (
    <>
      <title>{t}</title>
      <meta name="description" content={description || 'GamingOP — YouTube creator and community hub'} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={description || ''} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
