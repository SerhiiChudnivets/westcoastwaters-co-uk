import React, { useEffect, useState } from 'react'
import Head from 'next/head'

interface MediaFile {
  id?: number
  name?: string
  url?: string
  formats?: any
}

interface MenuItem {
  id?: number
  label: string
  url?: string
  link?: string
  open_in_new_tab?: boolean
  openInNewTab?: boolean
  submenu?: MenuItem[]
}

interface FooterImage {
  id?: number
  link?: string
  image?: string | MediaFile | MediaFile[] | null
}

interface PageData {
  title: string
  slug: string
  content?: string
  seo_title?: string
  seoTitle?: string
  seo_description?: string
  seoDescription?: string
  html_head?: string
  htmlHead?: string
  htmlhead?: string
  hero_title?: string
  heroTitle?: string
  hero_subtitle?: string
  heroSubtitle?: string
  hero_badge?: string
  heroImage?: string | MediaFile | MediaFile[] | null
  hero_image?: string | MediaFile | MediaFile[] | null
  cta_text?: string
  cta_link?: string
  login_text?: string
  register_text?: string
  redirect_link?: string
  main_background?: string
  secondary_background?: string
  button_background?: string
  button_text?: string
  text_color?: string
  color_highlight_text?: string
  color_main_btn_text?: string
  cta_background?: string
  tagline?: string
  header_menu?: MenuItem[]
  footer_menu?: MenuItem[]
  footer_images?: FooterImage[]
  footerImages?: FooterImage[]
  popup_logo?: any
  popup_text?: string
  get_bonus_btn_text?: string
  logo?: any
  [key: string]: any
}

interface SiteData {
  name: string
  url: string
  site_name?: string
  footer_text?: string
  allow_indexing?: boolean
  logo?: any
  login_text?: string
  register_text?: string
  redirect_link?: string
  pages?: PageData[]
  header_menu?: MenuItem[]
  footer_menu?: MenuItem[]
  hero_title?: string
  heroTitle?: string
  hero_subtitle?: string
  heroSubtitle?: string
  hero_badge?: string
  cta_text?: string
  tagline?: string
  content?: string
  main_background?: string
  secondary_background?: string
  button_background?: string
  button_text?: string
  text_color?: string
  color_highlight_text?: string
  color_main_btn_text?: string
  cta_background?: string
  main_background_img?: any
  footer_images?: FooterImage[]
  footerImages?: FooterImage[]
  popup_logo?: any
  popup_text?: string
  get_bonus_btn_text?: string
  html_head?: string
  htmlHead?: string
  htmlhead?: string
  seo_title?: string
  seoTitle?: string
  seo_description?: string
  seoDescription?: string
  [key: string]: any
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; }

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--background);
    color: var(--foreground);
    line-height: 1.6;
  }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

  header {
    position: sticky; top: 0; z-index: 50;
    background: var(--secondary); backdrop-filter: blur(12px);
  }

  .header-content {
    display: flex; align-items: center; justify-content: space-between; padding: 1rem 0;
  }

  .logo { display: flex; align-items: center; gap: 0.5rem; }
  .logo-image { width: 100%; height: 45px; object-fit: contain; }
  .logo-text { font-size: 1.5rem; font-weight: 700; color: var(--primary); text-decoration: none; }
  .header-buttons { display: flex; gap: 0.75rem; }

  .burger-button,
  .nav-close {
    display: none; align-items: center; justify-content: center;
    width: 2.5rem; height: 2.5rem; border: 1px solid var(--border);
    border-radius: 0.5rem; background: transparent; color: var(--foreground); cursor: pointer;
  }

  .btn {
    padding: 0.5rem 1.5rem; font-weight: 600; border-radius: calc(var(--radius) * 1);
    cursor: pointer; transition: all 0.3s; border: none; font-size: 0.95rem;
  }
  .btn-outline { background: transparent; border: 1px solid var(--primary); color: var(--primary); }
  .btn-outline:hover { background: var(--primary); color: var(--primary-foreground); }
  .btn-primary { background: var(--button-bg); color: var(--primary-foreground); }
  .btn-primary:hover { opacity: 0.9; }
  .btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
  .btn-hero { background: var(--cta-bg); box-shadow: 0 0 30px hsla(var(--button-bg), 0.4); }
  .bonus-popup .color-main-btn { background: var(--cta-bg); }
  .color-main-btn { color: var(--color-main-btn); box-shadow: 0 0 10px var(--primary); }

  .nav-content {
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    overflow-x: auto; color: var(--primary);
  }
  .nav-content li { list-style-type: none; }
  .menu-item { position: relative; }
  .nav-link {
    color: var(--muted-foreground); text-decoration: none; font-weight: 500;
    white-space: nowrap; transition: color 0.3s; display: flex; align-items: center; gap: 0.25rem;
  }
  .nav-link:hover { color: var(--primary); }
  .menu-arrow { font-size: 10px; transition: transform 0.3s; }
  .menu-item:hover .menu-arrow { transform: rotate(180deg); }
  .submenu {
    position: absolute; top: 100%; left: 0; background: var(--secondary);
    border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem 0;
    min-width: 200px; z-index: 1000; opacity: 0; visibility: hidden;
    transform: translateY(-10px); transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  .menu-item:hover .submenu { opacity: 1; visibility: visible; transform: translateY(0); }
  .submenu a {
    display: block; color: var(--muted-foreground); text-decoration: none;
    padding: 0.5rem 1rem; transition: all 0.3s; white-space: nowrap;
  }
  .submenu a:hover { background: var(--background); color: var(--primary); }

  .hero-section {
    position: relative; width: 100%; height: auto; overflow: hidden;
    padding: 5rem; background-size: cover; background-position: center center;
  }
  .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .hero-overlay { position: absolute; inset: 0; }
  .header__gradient {
    position: absolute; background: linear-gradient(180deg, rgba(25, 25, 25, 0.00) 0%, #191919 100%);
    height: 30px; width: 100%; bottom: -1px; left: 0; z-index: 1;
  }
  .hero-content {
    position: relative; height: 100%; display: flex; flex-direction: column;
    justify-content: center; max-width: 40rem;
  }
  .hero-badge {
    display: inline-block; background: color-mix(in srgb, var(--primary) 40%, transparent);
    color: var(--muted-foreground); padding: 0.25rem 1rem; border-radius: 9999px;
    font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; width: fit-content;
  }
  .hero-background {
    background: #00000070; padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem;
  }
  .hero-title {
    font-size: 3.5rem; font-weight: 700; color: var(--primary);
    margin-bottom: 1rem; line-height: 1.1;
  }
  .hero-subtitle { font-size: 1.25rem; color: var(--primary); margin-bottom: 0.5rem; }
  .hero-description { color: var(--muted-foreground); margin-bottom: 2rem; }

  .content-section { padding: 2rem 0; background: var(--background); }
  .content-wrapper {
    max-width: 56rem; margin: 0 auto; color: var(--foreground);
    line-height: 1.8; font-size: 1.125rem;
  }
  .content-wrapper h1, .content-wrapper h2, .content-wrapper h3, .content-wrapper h4 {
    color: var(--primary); margin: 2rem 0 1rem; font-weight: 700; text-align: center;
  }
  .content-wrapper h1 { font-size: 2.5rem; }
  .content-wrapper h2 { font-size: 2rem; }
  .content-wrapper h3 { font-size: 1.5rem; }
  .content-wrapper p {
    margin-bottom: 1.5rem; color: var(--muted-foreground);
    line-height: 1.75rem; font-size: 1.125rem; font-weight: 200;
  }
  .content-wrapper a { color: var(--button-bg); text-decoration: underline; }
  .content-wrapper a:hover { opacity: 0.8; }
  .content-wrapper img {
    display: block; max-width: 100%; height: auto; object-fit: contain; border-radius: 0.5rem;
  }
  .content-wrapper ul, .content-wrapper ol {
    margin: 1.5rem 0; padding-left: 2rem; color: var(--muted-foreground);
  }
  .content-wrapper li { margin-bottom: 0.5rem; }
  .content-wrapper table {
    width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.5rem 0;
    background: var(--background); border-radius: 10px; overflow: hidden;
  }
  .content-wrapper thead th {
    background: var(--secondary); color: var(--primary); text-align: left;
    font-weight: 700; font-size: 1rem; line-height: 1.4; padding: 1rem;
  }
  .content-wrapper tbody td {
    color: var(--muted-foreground); font-size: 1.05rem; line-height: 1.45;
    padding: 0.95rem 1rem; vertical-align: top; transition: background-color 0.2s ease;
  }
  .content-wrapper thead tr { border-bottom: 1px solid var(--border); }
  .content-wrapper tbody tr:not(:last-child) td { border-bottom: 1px solid var(--border); }
  .content-wrapper tbody tr:hover td {
    background: var(--secondary); box-shadow: inset 0 0 0 9999px rgba(255, 255, 255, 0.06);
    color: var(--foreground);
  }
  .content-wrapper blockquote {
    border-left: 4px solid var(--primary); padding-left: 1.5rem;
    margin: 1.5rem 0; font-style: italic; color: var(--muted-foreground);
  }

  footer {
    background: var(--secondary); border-top: 1px solid var(--border); padding: 2rem 0 7rem 0;
  }
  .footer-content { display: flex; flex-direction: column; gap: 1.5rem; }
  .footer-top {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;
  }
  .footer-certifications { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .footer-certification-link { display: flex; align-items: center; line-height: 0; transition: opacity 0.2s ease; }
  .footer-certification-link:hover { opacity: 0.8; }
  .footer-certification-image { display: block; max-width: 160px; max-height: 42px; object-fit: contain; }
  .cert-item { display: flex; align-items: center; gap: 0.5rem; color: var(--muted-foreground); font-size: 0.875rem; }
  .age-badge {
    display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem;
    border-radius: 50%; border: 2px solid hsl(0 84% 60%); color: hsl(0 84% 60%);
    font-weight: 700; font-size: 0.875rem;
  }
  .footer-links { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .footer-link {
    color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem; transition: color 0.3s;
  }
  .footer-link:hover { color: var(--primary); }
  .footer-menu-item { position: relative; list-style-type: none; }
  .footer-submenu {
    position: absolute; top: 100%; left: 0; background: var(--secondary);
    border-radius: 8px; padding: 0.5rem 0; min-width: 160px; z-index: 1000;
    opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  .footer-menu-item:hover .footer-submenu { opacity: 1; visibility: visible; transform: translateY(0); }
  .footer-submenu a {
    display: block; color: var(--muted-foreground); text-decoration: none;
    padding: 0.5rem 1rem; transition: all 0.3s; white-space: nowrap;
  }
  .footer-submenu a:hover { background: var(--background); color: var(--primary); }
  .footer-bottom { padding-top: 1.5rem; border-top: 1px solid var(--border); text-align: center; }
  .footer-copyright { color: var(--muted-foreground); font-size: 0.875rem; }

  .bonus-popup {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
    background: var(--card); border-top: 1px solid hsla(var(--primary), 0.3);
    box-shadow: 0 -2px 15px var(--primary); animation: slideUp 0.3s ease-out;
  }
  .bonus-popup.hidden { display: none; }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .popup-content {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem; gap: 1rem;
  }

  .popup-text {
    font-size: 1.125rem; font-weight: 700; color: var(--primary);
    flex: 1; text-align: center;
  }

  .popup-buttons { display: flex; align-items: center; gap: 0.5rem; }

  .btn-close {
    padding: 0.25rem; color: var(--muted-foreground); background: transparent;
    border: none; cursor: pointer; transition: color 0.3s;
  }
  .btn-close:hover { color: var(--foreground); }

  @media (max-width: 768px) {
    html, body { overflow-x: hidden; }
    header {
      position: fixed; top: 0; left: 0; right: 0;
      backdrop-filter: none; z-index: 6000;
    }
    header + * { margin-top: 150px; }
    .header-content {
      position: relative; flex-direction: column; justify-content: center;
      gap: 0.75rem; padding: 1rem 3.25rem 1rem;
    }
    .header-content .logo { justify-content: center; }
    .header-buttons { justify-content: center; flex-wrap: wrap; order: 2; }
    .burger-button {
      display: flex; position: absolute; top: 1rem; right: 0; z-index: 1001;
    }
    .nav-bar {
      position: fixed; top: 0; right: -100%; bottom: 0;
      width: min(82vw, 320px); height: 100vh; min-height: 100dvh; max-height: 100dvh;
      padding: 4.5rem 1.25rem 1.25rem;
      background: color-mix(in srgb, var(--secondary) 92%, #000);
      border-left: 1px solid var(--border);
      box-shadow: -18px 0 40px rgba(0, 0, 0, 0.35);
      transition: right 0.25s ease; z-index: 5000; isolation: isolate; overflow-y: auto;
    }
    .nav-bar::before {
      content: ''; position: absolute; inset: 0;
      background: color-mix(in srgb, var(--secondary) 92%, #000); z-index: -1;
    }
    .nav-bar.open { right: 0; }
    .nav-close { display: flex; position: absolute; top: 1rem; right: 1rem; }
    .nav-content {
      flex-direction: column; align-items: flex-start; justify-content: flex-start;
      gap: 1rem; overflow: visible; position: relative; z-index: 1;
      background: color-mix(in srgb, var(--secondary) 92%, #000);
    }
    .menu-item { width: 100%; }
    .nav-link { width: 100%; font-size: 1.05rem; }
    .submenu {
      position: static; min-width: 0; margin-top: 0.5rem; padding: 0 0 0 1rem;
      background: transparent; border: 0; border-radius: 0; box-shadow: none;
      opacity: 1; visibility: visible; transform: none;
    }
    .hero-section { padding: 2rem; }
    .hero-title { font-size: 2.5rem; }
    .popup-content { padding: 1rem 0; }
    .popup-content .logo-image { height: 30px; }
    .popup-text { font-size: 0.775rem; }
    .popup-content .btn { font-size: 0.75rem; }
    .content-wrapper { font-size: 1rem; }
    .content-wrapper table { overflow-x: auto; white-space: nowrap; display: block; text-align: left; }
    .content-wrapper img {
      float: none !important; margin: 1.25rem auto !important;
      max-width: 100%; height: auto;
    }
    .header-buttons .btn { padding: 0.375rem 1rem; font-size: 0.875rem; }
  }
`

export default function MinimalTemplate({ page, site }: { page: PageData; site: SiteData }) {
  const data: SiteData = require('../data.json')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [isPopupDismissed, setIsPopupDismissed] = useState(false)

  const getMediaUrl = (media?: MediaFile | MediaFile[] | string | null) => {
    if (!media) return ''
    if (typeof media === 'string') return media
    if (Array.isArray(media) && media.length > 0) return media[0].url || ''
    if (typeof media === 'object' && 'url' in media) return media.url || ''
    return ''
  }

  const normalizeUrl = (url?: string) => {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }

  const getHtmlHeadContent = () => {
    const pageSlug = page.slug?.replace(/^\/|\/$/g, '')
    const sourcePage = Array.isArray(data.pages)
      ? data.pages.find((item) => item.slug?.replace(/^\/|\/$/g, '') === pageSlug)
      : undefined
    const pageHtmlHead = [sourcePage?.htmlHead, sourcePage?.html_head, sourcePage?.htmlhead, page.htmlHead, page.html_head, page.htmlhead]
      .find((value) => typeof value === 'string' && value.trim())
    const dataHtmlHead = [data.html_head, data.htmlHead, data.htmlhead]
      .find((value) => typeof value === 'string' && value.trim())

    return pageHtmlHead || dataHtmlHead || ''
  }

  const extractMetaDescription = (html: string): string => {
    if (!html) return ''
    const descriptionMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i)
    return descriptionMatch?.[1]?.trim() || ''
  }

  const renderHeadTags = (html: string) => {
    const normalizeAttributeName = (name: string) => {
      if (name === 'charset') return 'charSet'
      if (name === 'http-equiv') return 'httpEquiv'
      if (name === 'crossorigin') return 'crossOrigin'
      return name
    }

    const parseAttributes = (source: string) => {
      const attrs: Record<string, string | boolean> = {}
      const attrRegex = /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
      let match: RegExpExecArray | null

      while ((match = attrRegex.exec(source)) !== null) {
        const name = normalizeAttributeName(match[1].toLowerCase())
        attrs[name] = match[2] ?? match[3] ?? match[4] ?? true
      }

      return attrs
    }

    const tags: React.ReactNode[] = []
    const seenHeadTags = new Set<string>()
    const tagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>|<(meta|link)\b([^>]*)\/?>/gi
    let match: RegExpExecArray | null

    while ((match = tagRegex.exec(html)) !== null) {
      const isScript = match[1] !== undefined
      const tagName = isScript ? 'script' : match[3]?.toLowerCase()
      const attrs = parseAttributes(isScript ? match[1] : match[4])
      const key = tags.length

      if (tagName === 'meta') {
        const metaName = typeof attrs.name === 'string' ? attrs.name.toLowerCase() : ''
        const metaProperty = typeof attrs.property === 'string' ? attrs.property.toLowerCase() : ''
        const metaHttpEquiv = typeof attrs.httpEquiv === 'string' ? attrs.httpEquiv.toLowerCase() : ''
        const metaKey = metaName || metaProperty || metaHttpEquiv || (attrs.charSet ? 'charset' : '')
        if (metaName === 'description') continue
        if (metaKey && seenHeadTags.has(`meta:${metaKey}`)) continue
        if (metaKey) seenHeadTags.add(`meta:${metaKey}`)
        tags.push(<meta key={metaKey ? `meta:${metaKey}` : key} {...attrs} />)
      }

      if (tagName === 'link') {
        const linkRel = typeof attrs.rel === 'string' ? attrs.rel.toLowerCase() : ''
        const linkKey = linkRel === 'canonical' ? 'link:canonical' : `link:${linkRel}:${attrs.href || key}`
        if (seenHeadTags.has(linkKey)) continue
        seenHeadTags.add(linkKey)
        tags.push(<link key={linkKey} {...attrs} />)
      }

      if (tagName === 'script') {
        tags.push(
          <script
            key={key}
            {...attrs}
            dangerouslySetInnerHTML={{ __html: match[2] || '' }}
          />
        )
      }
    }

    return tags
  }

  const htmlHeadContent = getHtmlHeadContent()
  const mainBackground = page.main_background || site.main_background || '#1a202c'
  const secondaryBackground = page.secondary_background || site.secondary_background || '#2d3748'
  const buttonBackground = page.button_background || site.button_background || '#f59e0b'
  const ctaBackground = page.cta_background || site.cta_background || buttonBackground
  const buttonText = page.button_text || site.button_text || '#1a202c'
  const textColor = page.text_color || site.text_color || '#f7fafc'
  const colorHighlightText = page.color_highlight_text || site.color_highlight_text || '#f59e0b'
  const colorMainBtnText = page.color_main_btn_text || site.color_main_btn_text || '#fff'
  const siteName = site.site_name || site.name || 'LuckySpin'
  const pageSeoDescription = page.seoDescription || page.seo_description || site.seoDescription || site.seo_description || ''
  const pageSeoTitle = page.seoTitle || page.seo_title || site.seoTitle || site.seo_title || ''
  const metaDescription = pageSeoDescription || extractMetaDescription(htmlHeadContent)
  const heroTitle = page.heroTitle || page.hero_title || site.heroTitle || site.hero_title || page.title || siteName
  const heroSubtitle = page.heroSubtitle || page.hero_subtitle || site.heroSubtitle || site.hero_subtitle || ''
  const heroBadge = page.hero_badge || site.hero_badge || ''
  const ctaText = page.cta_text || site.cta_text || ''
  const redirectLink = page.cta_link || page.redirect_link || site.redirect_link || '/'
  const loginText = page.login_text || site.login_text
  const registerText = page.register_text || site.register_text
  const headerMenu = Array.isArray(page.header_menu) && page.header_menu.length > 0 ? page.header_menu : site.header_menu || []
  const footerMenu = Array.isArray(page.footer_menu) && page.footer_menu.length > 0 ? page.footer_menu : site.footer_menu || []
  const urlSite = site.url || '/'
  const year = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      if (!isPopupDismissed && window.scrollY > window.innerHeight * 0.5) {
        setShowPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPopupDismissed])

  const replaceVariables = (content: string): string => {
    if (!content) return content
    return content.replace(/\{\{([^}]+)\}\}/g, (match, variableName) => {
      const trimmedName = variableName.trim()
      const pageValue = page[trimmedName]
      const siteValue = site[trimmedName]

      if (pageValue !== undefined && pageValue !== null) return String(pageValue)
      if (siteValue !== undefined && siteValue !== null) return String(siteValue)
      return match
    })
  }

  const processedContent = page.content ? replaceVariables(page.content) : site.content ? replaceVariables(site.content) : ''
  const backgroundImage = getMediaUrl(page.heroImage || page.hero_image || site.heroImage || site.hero_image || site.main_background_img)
  const popupLogo = getMediaUrl(page.popup_logo || site.popup_logo)
  const popupText = page.popup_text || site.popup_text || page.tagline || site.tagline || ''
  const popupButtonText = page.get_bonus_btn_text || site.get_bonus_btn_text || ctaText
  const footerImagesSource = Array.isArray(page.footer_images) && page.footer_images.length > 0
    ? page.footer_images
    : Array.isArray(page.footerImages) && page.footerImages.length > 0
      ? page.footerImages
      : Array.isArray(site.footer_images) && site.footer_images.length > 0
        ? site.footer_images
        : site.footerImages || []
  const footerImages = footerImagesSource
    .map((item) => ({ ...item, imageUrl: getMediaUrl(item.image || undefined) }))
    .filter((item) => item.imageUrl)

  const dynamicStyles = `
    :root {
      --background: ${mainBackground};
      --foreground: ${textColor};
      --card: ${secondaryBackground};
      --primary: ${colorHighlightText};
      --primary-foreground: ${buttonText};
      --secondary: ${secondaryBackground};
      --muted: ${mainBackground};
      --muted-foreground: ${textColor}cc;
      --border: ${colorHighlightText}33;
      --radius: 0.5rem;
      --button-bg: ${buttonBackground};
      --cta-bg: ${ctaBackground};
      --button-text: ${buttonText};
      --color-main-btn: ${colorMainBtnText};
    }
  `

  return (
    <>
      <Head>
        <title>{pageSeoTitle || page.title || site.site_name || site.name}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        <meta name="robots" content={site.allow_indexing ? 'index,follow' : 'noindex,nofollow'} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {htmlHeadContent && renderHeadTags(htmlHeadContent)}
      </Head>
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div>
        <header>
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <a href={normalizeUrl(urlSite)}>
                  {getMediaUrl(page.logo || site.logo) ? (
                    <img src={getMediaUrl(page.logo || site.logo)} alt={siteName} className="logo-image" />
                  ) : (
                    <span className="logo-text">{siteName}</span>
                  )}
                </a>
              </div>
              <nav className={`nav-bar ${isMobileMenuOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="nav-close"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <ul className="nav-content">
                  {headerMenu.map((item, index) => (
                    <li key={item.id || index} className="menu-item">
                      <a href={item.link && item.link.trim() ? item.link : redirectLink} className="nav-link">
                        {item.label}
                        {item.submenu && item.submenu.length > 0 && <span className="menu-arrow">{'\u25BC'}</span>}
                      </a>
                      {item.submenu && item.submenu.length > 0 && (
                        <div className="submenu">
                          {item.submenu.map((subitem, subindex) => (
                            <a
                              key={subitem.id || subindex}
                              href={subitem.link && subitem.link.trim() ? subitem.link : redirectLink}
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="header-buttons">
                {loginText && (
                  <button className="btn btn-outline" onClick={() => { window.location.href = redirectLink }}>
                    {loginText}
                  </button>
                )}
                {registerText && (
                  <button className="btn btn-primary" onClick={() => { window.location.href = redirectLink }}>
                    {registerText}
                  </button>
                )}
              </div>
              <button
                type="button"
                className="burger-button"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <section
          className="hero-section"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `linear-gradient(135deg, var(--secondary) 0%, var(--background) 100%)`,
          }}
        >
          <div className="header__gradient"></div>
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content">
              {heroBadge && <span className="hero-badge">{heroBadge}</span>}
              <div className="hero-background">
                <h1 className="hero-title">{heroTitle}</h1>
                {heroSubtitle && <p className="hero-subtitle">{heroSubtitle}</p>}
                {(page.tagline || site.tagline) && (
                  <p className="hero-description">{page.tagline || site.tagline}</p>
                )}
              </div>
              {ctaText && (
                <button
                  className="btn btn-primary btn-lg btn-hero color-main-btn"
                  onClick={() => { window.location.href = redirectLink }}
                >
                  {ctaText}
                </button>
              )}
            </div>
          </div>
        </section>

        {processedContent && (
          <section className="content-section">
            <div className="container">
              <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
          </section>
        )}

        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-top">
                <div className="logo">
                  <a href={normalizeUrl(urlSite)}>
                    {getMediaUrl(page.logo || site.logo) ? (
                      <img src={getMediaUrl(page.logo || site.logo)} alt={siteName} className="logo-image" />
                    ) : (
                      <span className="logo-text">{siteName}</span>
                    )}
                  </a>
                </div>
                <div className="footer-certifications">
                  {footerImages.length > 0 ? (
                    footerImages.map((item, index) => (
                      <a key={item.id || index} href={item.link || '#'} className="footer-certification-link" target="_blank" rel="nofollow">
                        <img src={item.imageUrl} alt={`Footer certification ${index + 1}`} className="footer-certification-image" />
                      </a>
                    ))
                  ) : (
                    <>
                      <div className="cert-item">FairPlay</div>
                      <div className="age-badge">18+</div>
                    </>
                  )}
                </div>
                <div className="footer-links">
                  {footerMenu.map((item, index) => (
                    <div key={item.id || index} className="footer-menu-item">
                      <a
                        href={item.link && item.link.trim() ? item.link : redirectLink}
                        className="footer-link"
                      >
                        {item.label}
                      </a>
                      {item.submenu && item.submenu.length > 0 && (
                        <div className="footer-submenu">
                          {item.submenu.map((subitem, subindex) => (
                            <a
                              key={subitem.id || subindex}
                              href={subitem.link && subitem.link.trim() ? subitem.link : redirectLink}
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="footer-bottom">
                <p className="footer-copyright">
                  {site.footer_text || `© ${year}. All rights reserved. ${siteName}.`}
                </p>
              </div>
            </div>
          </div>
        </footer>

        {(popupText || popupButtonText || popupLogo) && (
          <div className={`bonus-popup ${showPopup ? '' : 'hidden'}`}>
            <div className="container">
              <div className="popup-content">
                {popupLogo && (
                  <div className="logo">
                    <img src={popupLogo} alt="Logo" className="logo-image" />
                  </div>
                )}
                {popupText && <div className="popup-text">{popupText}</div>}

                <div className="popup-buttons">
                  {popupButtonText && (
                    <button
                      className="btn btn-primary color-main-btn"
                      onClick={() => { window.location.href = redirectLink }}
                    >
                      {popupButtonText}
                    </button>
                  )}
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowPopup(false)
                      setIsPopupDismissed(true)
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
