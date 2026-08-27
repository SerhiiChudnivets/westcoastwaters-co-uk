import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {array} from "prop-types";

interface MediaFile {
  id?: number
  name?: string
  url?: string
  formats?: any
}

interface Slot {
  id?: number
  Name?: string
  logo?: MediaFile | MediaFile[] | string
  link?: string
}

interface SubmenuItem {
  id?: number
  label: string
  url: string
  link?: string
  open_in_new_tab?: boolean
  openInNewTab?: boolean
}

interface MenuItem {
  id?: number
  label: string
  url: string
  link?: string
  open_in_new_tab?: boolean
  openInNewTab?: boolean
  submenu?: SubmenuItem[]
}

interface Bonus {
  id?: number
  Name?: string
  logo?: MediaFile | MediaFile[] | string
  link?: string
}

interface ReviewItem {
  name?: string
  logo?: string | MediaFile | MediaFile[]
  bonus?: string
  rating?: string
  link?: string
}

interface FaqItem {
  id?: number
  question: string
  answer: string
}

interface FooterImage {
  id?: number
  link?: string
  image?: string | MediaFile | MediaFile[] | null
}

interface CasinoData {
  // Базові поля
  name: string
  html_head?: string
  htmlHead?: string
  seoTitle?: string
  seo_title?: string
  seoDescription?: string
  seo_description?: string
  url: string
  template?: string
  language_code: string
  allow_indexing: boolean
  redirect_404s_to_homepage: boolean
  use_www_version: boolean
  
  // Уніфіковані поля шаблонів
  site_name?: string
  hero_title?: string
  hero_subtitle?: string
  hero_badge?: string
  cta_text?: string
  logo?: { url: string; name?: string } | null
  accent_color?: string
  tagline?: string
  features_list?: string
  footer_text?: string
  popup_text?: string
  faq_title?:string
  login_text?: string
  register_text?: string
  slots_title?: string
  bonus_title?: string
  get_bonus_btn_text?: string
  redirect_link?: string
  
  // Колірні теми
  main_background?: string
  secondary_background?: string
  button_background?: string
  button_text?: string
  text_color?: string
  color_highlight_text?: string
  color_main_btn_text?: string
  
  // Rich text content
  content?: string
  
  // Repeatable components
  Slots?: Slot[]
  Bonuses?: Bonus[]
  Reviews?: ReviewItem[]
  header_menu?: MenuItem[]
  footer_menu?: MenuItem[]
  footer_images?: FooterImage[]
  footerImages?: FooterImage[]
  
  // Metadata
  _generated_at?: string
  _version?: string
  
  // Allow any other fields
  [key: string]: any
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
  
  width: 100%;
}

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--background);
    color: var(--foreground);
    line-height: 1.6;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Header Styles */
  header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--secondary);
    border-bottom: 1px solid color-mix(in srgb, var(--secondary) 78%, #000);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 62px;
    gap: 24px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--foreground);
    text-decoration: none;
    font-size: 20px;
    font-weight: 800;
    white-space: nowrap;
  }

  .logo span {
    color: var(--primary);
  }

  .logo-image{
    max-width: 180px;
    height: 45px;
    object-fit: contain;
    display: block;
  }
  .logo-icon {
    width: 2rem;
    height: 2rem;
    color: var(--button-bg);
  }

  .logo-text {
    color: var(--foreground);
  }

  .header-buttons {
    display: flex;
    gap: 0.75rem;
  }

  .burger-button,
  .nav-close {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: transparent;
    color: var(--foreground);
    cursor: pointer;
  }

  .btn {
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    border-radius: calc(var(--radius) * 1);
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    font-size: 0.95rem;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
  }

  .btn-outline:hover {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  .btn-primary {
    background: var(--button-bg);
    color: var(--primary-foreground);
  }

  .btn-primary:hover {
    opacity: 0.9;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Navigation Styles */
  .nav-content li{
    list-style-type: none;
  }

  .nav-content {
    display: flex;
    align-items: center;
    gap: 22px;
    margin-left: auto;
    overflow-x: visible;
    color: var(--primary);
  }

  .menu-item {
    position: relative;
  }

  .nav-link {
    color: var(--muted-foreground);
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover {
    color: var(--foreground);
  }

  .menu-arrow {
    font-size: 10px;
    transition: transform 0.3s;
  }

  .menu-item:hover .menu-arrow {
    transform: rotate(180deg);
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .menu-item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .submenu a {
    display: block;
    color: var(--muted-foreground);
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .submenu a:hover {
    background: var(--accent);
    color: var(--primary);
  }

  footer .nav-content {
    padding: 1rem 0;
    font-size: 0.875rem;
  }

  footer .nav-link {
    font-size: 0.875rem;
  }


  /* Hero Banner Styles */
  .hero-section {
    background: color-mix(in srgb, var(--secondary) 82%, #000);
    color: var(--foreground);
    padding: 52px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--secondary) 72%, #000);
    box-shadow: inset 0 -60px 60px -60px rgba(0, 0, 0, 0.25);
  }

  .hero-content {
    position: relative;
    max-width: 660px;
  }

  .hero-title {
    font-size: 34px;
    line-height: 1.15;
    margin-bottom: 12px;
    max-width: 660px;
    font-weight: 800;
  }

  .hero-title em,
  .hero-accent {
    color: var(--primary);
    font-style: normal;
  }

  .hero-description {
    color: var(--muted-foreground);
    max-width: 600px;
    font-size: 17px;
  }

  .hero-facts {
    display: flex;
    gap: 10px 26px;
    flex-wrap: wrap;
    margin-top: 24px;
    font-size: 14.5px;
    color: var(--foreground);
  }

  .hero-facts span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-facts span::before {
    content: "✓";
    color: var(--primary);
    font-weight: 800;
  }

  .hero-updated {
    margin-top: 18px;
    color: var(--muted-foreground);
    font-size: 16px;
    font-style: italic;
  }

  .color-main-btn{
     color: var(--color-main-btn);
     box-shadow: 0 0 10px var(--primary);
  }

  /* Reviews Section */
  .reviews-section {
    padding: 4rem 0;
    background: var(--background);
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .review-card {
    display: grid;
    grid-template-columns: 38px 64px minmax(190px, 1fr) minmax(260px, 1.25fr) 52px 120px;
    align-items: center;
    gap: 16px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .review-card:hover {
    border-color: var(--primary);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }

  .review-card-index {
    font-size: 30px;
    font-weight: 800;
    color: var(--primary);
    width: 38px;
    text-align: center;
  }

  .review-card-logo {
    width: 64px;
    height: 50px;
    border-radius: 8px;
    object-fit: contain;
    background: color-mix(in srgb, var(--primary) 18%, var(--background));
  }

  .review-card-logo-placeholder {
    width: 64px;
    height: 50px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--primary) 18%, var(--background));
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
  }

  .review-card-info {
    min-width: 0;
  }

  .review-card-name {
    font-size: 17px;
    font-weight: 700;
    color: var(--foreground);
  }

  .review-card-bonus {
    min-width: 0;
    background: color-mix(in srgb, var(--primary) 18%, var(--background));
    border-radius: 8px;
    padding: 9px 14px;
    color: var(--primary);
    font-weight: 700;
    font-size: 15px;
  }

  .review-card-bonus:empty {
    visibility: hidden;
  }

  .review-card-score {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-foreground);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
  }

  .review-card-score:empty {
    visibility: hidden;
  }

  .review-stars {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .star {
    font-size: 1rem;
  }

  .star-full {
    color: var(--primary);
  }

  .star-half {
    color: var(--primary);
    opacity: 0.5;
  }

  .star-empty {
    color: var(--border);
  }

  .review-rating-num {
    display: none;
  }

  .review-card-action {
    min-width: 0;
  }

  .review-card-action .btn {
    width: 120px;
    white-space: nowrap;
    text-align: center;
  }

  .review-card-action:empty {
    visibility: hidden;
  }

  @media (max-width: 768px) {
    .review-card {
      grid-template-columns: 32px 50px minmax(0, 1fr) 42px;
      grid-template-areas:
        "index logo info score"
        "bonus bonus bonus bonus"
        "action action action action";
      gap: 10px 14px;
      padding: 14px 16px;
    }
    .review-card-index {
      grid-area: index;
      font-size: 24px;
      width: auto;
    }
    .review-card-logo,
    .review-card-logo-placeholder {
      grid-area: logo;
      width: 50px;
      height: 42px;
      font-size: 14px;
    }
    .review-card-info {
      grid-area: info;
      min-width: 0;
    }
    .review-card-score {
      grid-area: score;
      width: 42px;
      height: 42px;
      font-size: 15px;
    }
    .review-card-bonus {
      grid-area: bonus;
      min-width: 0;
    }
    .review-card-action {
      grid-area: action;
      width: 100%;
    }
    .review-card-action .btn {
      display: block;
      text-align: center;
      width: 100%;
      white-space: nowrap;
    }
  }

  /* Custom Content Section */
  .content-section {
    padding: 2rem 0;
    background: var(--background);
  }

  .content-wrapper {
    max-width: 56rem;
    margin: 0 auto;
    color: var(--foreground);
    line-height: 1.8;
    font-size: 1.125rem;
  }

  .content-wrapper h1, .content-wrapper h2, .content-wrapper h3, .content-wrapper h4 {
    color: var(--primary);
    margin: 2rem 0 1rem;
    font-weight: 700;
    text-align: center;
  }

  .content-wrapper h1 { font-size: 2.5rem; }
  .content-wrapper h2 { font-size: 2rem; }
  .content-wrapper h3 { font-size: 1.5rem; }

  .content-wrapper p {
    margin-bottom: 1.5rem;
    color: var(--muted-foreground);
    line-height: 1.75rem;
    font-size: 1.125rem;
    font-weight: 200;
  }

  .content-wrapper li p {
    margin-bottom: 0;
  }

  .content-wrapper a {
    color: var(--button-bg);
    text-decoration: underline;
  }

  .content-wrapper a:hover {
    opacity: 0.8;
  }

  .content-wrapper img {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 0.5rem;
  }

  .content-wrapper ul {
    margin: 1.5rem 0;
    padding-left: 2rem;
    color: var(--muted-foreground);
  }

  .content-wrapper ol {
    counter-reset: content-step;
    list-style: none;
    max-width: 720px;
    margin: 1.5rem 0;
    padding-left: 0;
    color: var(--muted-foreground);
  }

  .content-wrapper ol li {
    counter-increment: content-step;
    position: relative;
    padding: 12px 0 12px 46px;
    border-bottom: 1px solid var(--border);
  }

  .content-wrapper ol li:last-child {
    border-bottom: none;
  }

  .content-wrapper ol li::before {
    content: counter(content-step);
    position: absolute;
    left: 0;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--primary) 18%, var(--background));
    color: var(--primary);
    font-weight: 800;
    display: grid;
    place-items: center;
  }

  .content-wrapper ol li strong,
  .content-wrapper ol li b {
    display: block;
    color: var(--foreground);
  }

  .content-wrapper .table-scroll {
    width: 100%;
    margin: 1.5rem 0;
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  .content-wrapper table {
    width: 100%;
    min-width: 640px;
    border-collapse: collapse;
    background: var(--background);
    overflow: hidden;
  }

  .content-wrapper thead th {
    background: var(--secondary);
    color: var(--primary);
    text-align: left;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.78rem;
    letter-spacing: 0.4px;
    line-height: 1.4;
    padding: 13px 16px;
  }

  .content-wrapper tbody td {
    color: var(--muted-foreground);
    font-size: 0.9rem;
    line-height: 1.45;
    padding: 13px 16px;
    vertical-align: top;
  }

  .content-wrapper th,
  .content-wrapper td {
    border-bottom: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }

  .content-wrapper th:last-child,
  .content-wrapper td:last-child {
    border-right: none;
  }

  .content-wrapper tr:last-child td {
    border-bottom: none;
  }

  .content-wrapper td b,
  .content-wrapper td strong {
    color: var(--foreground);
  }

 

  .content-wrapper li {
    margin-bottom: 0.5rem;
  }

  .content-wrapper blockquote {
    border-left: 4px solid var(--primary);
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--muted-foreground);
  }
  .faq-section {
    padding: 0 0 4rem 0;
    background: var(--background);
  }
  .faq-section .content-wrapper{
    line-height: unset;
  } 
  
  .faq-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
  }
  
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .faq-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-left: 4px solid var(--primary);
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
  }
  
  .faq-question {
    font-size: 1rem;
    font-weight: 600;
    color: var(--foreground);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 15px 18px;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  
  .faq-question:hover {
    color: var(--primary);
  }
  
  .faq-answer {
    padding: 0 18px;
    color: var(--muted-foreground);
    line-height: 1.6;
    font-size: 0.9rem;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: height 0.2s ease-out, opacity 0.2s ease-out;
    max-height: 1000px; 
  }
  
  .faq-answer.open {
    height: auto;
    opacity: 1;
    padding-bottom: 16px;
  }
  
  .faq-toggle-icon {
    display: flex;
    margin-left: 1rem;
    color: var(--primary);
    font-weight: 800;
    transition: transform 0.2s ease;
  }
  
  
  
  .faq-toggle-icon.open {
    transform: rotate(90deg); 
  }


  /* Footer */
  footer {
    background: var(--secondary);
    border-top: 1px solid color-mix(in srgb, var(--secondary) 78%, #000);
    padding: 34px 0 22px;
    margin-top: 20px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    flex-wrap: wrap;
  }

  .footer-link {
    color: var(--muted-foreground);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s;
  }

  .footer-link:hover {
    color: var(--foreground);
  }
  
  .footer-menu-item {
    position: relative;
    list-style-type: none;
  }

  .footer-submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--secondary);
    
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 160px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .footer-menu-item:hover .footer-submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .footer-submenu a {
    display: block;
    color: var(--muted-foreground);
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    white-space: nowrap;
  }

  .footer-submenu a:hover {
    background: var(--accent);
    color: var(--primary);
  }

  .footer-bottom {
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent);
    text-align: center;
  }

  .footer-copyright {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    html,
    body {
      overflow-x: hidden;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 20;
    }

    .header-content {
      height: auto;
      flex-direction: column;
      gap: 10px;
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .nav-content {
      margin-left: 0;
      gap: 16px 18px;
      flex-wrap: wrap;
      justify-content: center;
      overflow: visible;
      position: relative;
      z-index: 1;
    }

    .nav-link {
      font-size: 15px;
    }

    .submenu {
      position: static;
      min-width: 0;
      margin-top: 0.5rem;
      padding: 0 0 0 1rem;
      background: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    .hero-title {
      font-size: 25px;
    }

    .hero-section {
      padding: 38px 0;
    }
    .content-wrapper .table-scroll {
      margin: 1.25rem 0;
    }

    .content-wrapper table {
      min-width: 620px;
      text-align: left;
    }

    .header-buttons .btn {
      padding: 0.375rem 1rem;
      font-size: 0.875rem;
    }

    .content-wrapper {
      font-size: 1rem;
    }

    .content-wrapper img {
      float: none !important;
      margin: 1.25rem auto !important;
      max-width: 100%;
      height: auto;
    }

    .faq-list, .section-title{
      width: 100%;
    }
    .faq-section .container{
      flex-direction: column;
    }
  }
`;
export default function TupchiyTemplate() {
  const data: CasinoData = require('../data.json')
  const htmlHeadContent = data.html_head || data.htmlHead || '';
  const extractMetaDescription = (html: string): string => {
    if (!html) return ''
    const descriptionMatch =
        html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i)
    return descriptionMatch?.[1]?.trim() || ''
  }
  const pageSeoDescription = data.seoDescription || data.seo_description || ''
  const pageSeoTitle = data.seoTitle || data.seo_title || ''
  const metaDescription = pageSeoDescription || extractMetaDescription(htmlHeadContent)

  // Функція для парсингу htmlHeadContent
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
    const tagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>|<(meta|link)\b([^>]*)\/?>/gi
    let match: RegExpExecArray | null

    while ((match = tagRegex.exec(html)) !== null) {
      const isScript = match[1] !== undefined
      const tagName = isScript ? 'script' : match[3]?.toLowerCase()
      const attrs = parseAttributes(isScript ? match[1] : match[4])
      const key = tags.length

      if (tagName === 'meta') {
        const metaName = typeof attrs.name === 'string' ? attrs.name.toLowerCase() : ''
        if (metaName === 'description') continue
        tags.push(<meta key={key} {...attrs} />)
      }

      if (tagName === 'link') {
        tags.push(<link key={key} {...attrs} />)
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
  };
  // Отримуємо кольори з data або використовуємо дефолтні
  const mainBackground = data.main_background || '#1a202c' // default dark blue
  const secondaryBackground = data.secondary_background || '#2d3748' // default darker blue
  const buttonBackground = data.button_background || '#f59e0b' // default amber
  const ctaBackground = data.cta_background || buttonBackground
  const buttonText = data.button_text || '#1a202c' // default dark
  const textColor = data.text_color || '#f7fafc' // default light
  const colorHighlightText = data.color_highlight_text || '#f59e0b'
  const colorMainBtnText = data.color_main_btn_text || 'fff'


  // Функція для заміни змінних у content
  const replaceVariables = (content: string): string => {
    if (!content) return content

    let result = content
    const variableRegex = /\{\{([^}]+)\}\}/g

    result = result.replace(variableRegex, (match, variableName) => {
      const trimmedName = variableName.trim()
      if (data[trimmedName] !== undefined && data[trimmedName] !== null) {
        return String(data[trimmedName])
      }
      return match
    })

    result = result.replace(/<table(\s|>)/gi, '<div class="table-scroll"><table$1')
    result = result.replace(/<\/table>/gi, '</table></div>')

    return result
  }

  const processedContent = data.content ? replaceVariables(data.content) : ''

  const siteName = data.site_name || data.name || 'LuckySpin'
  const heroTitle = data.hero_title || 'Get 200% Bonus'
  // New variable
  const normalizeUrl = (url?: string) => {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }
  const urlSite = data.url || '/'
  const year = new Date().getFullYear();
  const formatLastDeployDate = (value?: string) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  const lastDeployDate = formatLastDeployDate(data._last_deploy)
  const faqTitle = data.faq_title
  const faqs = Array.isArray(data.FAQ) ? data.FAQ : []
  const loginText = data.login_text
  const registerText = data.register_text
  const getBonusBtn = data.get_bonus_btn_text || 'Get Bonus'
  const redirectLink = data.redirect_link || ''



  // Генеруємо динамічні стилі з кольорами
  const dynamicStyles = `
    :root {
      --background: ${mainBackground};
      --foreground: ${textColor};
      --card: ${secondaryBackground};
      --primary: ${colorHighlightText};
      --primary-foreground: ${buttonText};
      --secondary: ${secondaryBackground};
      --muted: ${mainBackground};
      --muted-foreground: ${textColor}cc; /* with opacity */
      --border: ${colorHighlightText}33; /* with opacity */
      --radius: 0.5rem;
      --button-bg: ${buttonBackground};
      --cta-bg: ${ctaBackground};
      --button-text: ${buttonText};
      --color-main-btn: ${colorMainBtnText};
    }
  `;

  const reviews: ReviewItem[] = Array.isArray(data.Reviews) ? data.Reviews : []

  const getReviewLogoUrl = (logo?: string | MediaFile | MediaFile[]): string => {
    if (!logo) return ''
    if (typeof logo === 'string') return logo
    if (Array.isArray(logo) && logo.length > 0) return logo[0].url || ''
    if (typeof logo === 'object' && 'url' in logo) return (logo as MediaFile).url || ''
    return ''
  }

  const renderStars = (rating: string) => {
    const num = parseFloat(rating)
    if (isNaN(num)) return null
    const full = Math.floor(num)
    const hasHalf = num - full >= 0.3
    const empty = 5 - full - (hasHalf ? 1 : 0)
    return (
      <div className="review-stars">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className="star star-full">★</span>
        ))}
        {hasHalf && <span className="star star-half">★</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className="star star-empty">★</span>
        ))}
        <span className="review-rating-num">{num.toFixed(1)}</span>
      </div>
    )
  }

  const formatReviewRating = (rating?: string) => {
    if (!rating) return ''
    const num = parseFloat(rating)
    return isNaN(num) ? rating : num.toFixed(1)
  }

  const getMediaUrl = (media?: MediaFile | MediaFile[] | string) => {
    if (!media) return ''
    if (typeof media === 'string') return media
    if (Array.isArray(media) && media.length > 0) return media[0].url || ''
    if (typeof media === 'object' && 'url' in media) return media.url || ''
    return ''
  }
  const logoUrl = getMediaUrl(data.logo)

  useEffect(() => {
    if (data.faq_schema && typeof document !== 'undefined') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(faqSchema);
      document.head.appendChild(script);


      return () => {
        document.head.removeChild(script);
      };
    }
  }, [faqs, data.faq_schema]);


  return (
    <>
      <Head>
        <title>{pageSeoTitle || data.site_name || data.name}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        <meta
            name="robots"
            content={data.allow_indexing ? 'index,follow' : 'noindex,nofollow'}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Вставка всіх тегів з html_head */}
        {htmlHeadContent && renderHeadTags(htmlHeadContent)}
      </Head>


      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div>
        {/* Header */}
        <header>
          <div className="container">
            <div className="header-content">
              <a href={normalizeUrl(urlSite)} className="logo">
                {logoUrl ? (
                    <img src={logoUrl} alt={siteName} className="logo-image"/>
                ) : (
                    <>
                      {siteName}<span>.</span>
                    </>
                )}
              </a>
              <nav>
                <ul className="nav-content">
                  {data.header_menu && data.header_menu.length > 0 ? (
                      data.header_menu.map((item, index) => (
                          <li key={item.id || index} className="menu-item">
                            <a
                                href={item.link && item.link.trim() ? item.link : redirectLink}
                                className="nav-link"
                            >
                              {item.label}
                              {item.submenu && item.submenu.length > 0 && (
                                  <span className="menu-arrow">▼</span>
                              )}
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
                      ))
                  ) : (
                      <>
                        <li><a href="#reviews" className="nav-link">Casinos</a></li>

                        <li><a href="#faq" className="nav-link">FAQ</a></li>
                      </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>




        {/* Hero Banner */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="hero-accent">{heroTitle}</span>
              </h1>
              <p className="hero-description">
                {data.tagline || 'Start your winning journey today with the best welcome offer in online gaming!'}
              </p>
              <div className="hero-facts">
                <span>Only licensed sites</span>
                <span>Payouts from 10 minutes</span>
                <span>Updated weekly</span>
              </div>
              {lastDeployDate && (
                <p className="hero-updated">Last updated on {lastDeployDate}</p>
              )}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
            <section id="reviews" className="reviews-section">
              <div className="container">
                <h2 className="section-title">Casino Reviews</h2>
                <div className="reviews-list">
                  {reviews.map((review, index) => {
                    const logoUrl = getReviewLogoUrl(review.logo)
                    const ratingText = formatReviewRating(review.rating)
                    return (
                      <div key={index} className="review-card">
                        <div className="review-card-index">{index + 1}</div>
                        {logoUrl ? (
                          <img src={logoUrl} alt={review.name || `Casino ${index + 1}`} className="review-card-logo" />
                        ) : (
                          <div className="review-card-logo-placeholder">🎰</div>
                        )}
                        <div className="review-card-info">
                          <div className="review-card-name">{review.name || `Casino ${index + 1}`}</div>
                          {review.rating && renderStars(review.rating)}
                        </div>
                        <div className="review-card-bonus">{review.bonus || ''}</div>
                        <div className="review-card-score">{ratingText}</div>
                        <div className="review-card-action">
                          {review.link && (
                            <button
                              className="btn btn-primary"
                              onClick={() => window.location.href = review.link!}
                            >
                              {getBonusBtn}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
        )}

        {/* Custom Content Section */}
        {processedContent && (
          <section className="content-section">
            <div className="container">
              <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
            <section id="faq" className="faq-section">
              <div className="container">
                <div className="content-wrapper">
                  <h2 className="faq-title">{faqTitle}</h2>
                  <div className="faq-list">
                    {faqs.map((item, index) => {
                      const [isOpen, setIsOpen] = useState(false);
                      const toggleAnswer = () => {
                        setIsOpen(!isOpen);
                      };

                      return (
                          <div key={item.id || index} className="faq-item">
                            <div className="faq-question" onClick={toggleAnswer}>
                              {item.question}
                              <span className={`faq-toggle-icon ${isOpen ? 'open' : ''}`}>
                                ▸
                              </span>
                            </div>
                            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>{item.answer}</div>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
        )}

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-top">
                <a href={normalizeUrl(urlSite)} className="logo">
                  {logoUrl ? (
                      <img src={logoUrl} alt={siteName} className="logo-image"/>
                  ) : (
                      <>
                        {siteName}<span>.</span>
                      </>
                  )}
                </a>

                <nav className="footer-links" aria-label="Footer navigation">
                  {data.footer_menu && data.footer_menu.length > 0 ? (
                      data.footer_menu.map((item, index) => (
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
                      ))
                  ) : (
                      <>
                        <a href="#reviews" className="footer-link">Casinos</a>
                        <a href="#compare" className="footer-link">Table</a>
                        <a href="#how" className="footer-link">How to Start</a>
                        <a href="#faq" className="footer-link">FAQ</a>
                      </>
                  )}
                </nav>
              </div>

              <div className="footer-bottom">
                <p className="footer-copyright">
                  {data.footer_text ||
                      `© ${year}. All rights reserved. ${siteName} Casino.`}
                </p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}


