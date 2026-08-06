import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'

import DefaultTemplate from '../templates/DefaultTemplate'
import BlogTemplate from '../templates/BlogTemplate'
import LandingTemplate from '../templates/LandingTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import FullWidthTemplate from '../templates/FullWidthTemplate'
import HomepageTemplate from '../templates/HomepageTemplate'

interface MediaFile {
  id?: number
  name?: string
  url?: string
}

interface ContentSection {
  id?: number
  heading?: string
  text?: string
  image?: MediaFile
  cta_text?: string
  cta_link?: string
  layout?: string
}

interface PageData {
  title: string
  slug: string
  content?: string
  seo_title?: string
  seo_description?: string
  html_head?: string
  htmlHead?: string
  htmlhead?: string
  hero_title?: string
  hero_subtitle?: string
  hero_badge?: string
  hero_image?: MediaFile
  cta_text?: string
  cta_link?: string
  sections?: ContentSection[]
  template?: 'default' | 'blog' | 'landing' | 'minimal' | 'full-width' | 'homepage'
}

interface SiteData {
  name: string
  url: string
  site_name?: string
  accent_color?: string
  footer_text?: string
  allow_indexing?: boolean
  logo?: MediaFile
  login_text?: string
  register_text?: string
  redirect_link?: string
  pages?: PageData[]
  header_menu?: any[]
  footer_menu?: any[]
  [key: string]: any
}

const templates = {
  default: DefaultTemplate,
  blog: BlogTemplate,
  landing: LandingTemplate,
  minimal: MinimalTemplate,
  'full-width': FullWidthTemplate,
  homepage: HomepageTemplate,
}

export default function DynamicPage({ page, site }: { page: PageData; site: SiteData }) {
  const siteName = site.site_name || site.name

  const Template = (templates[page.template || 'default'] || templates.default) as React.ComponentType<{
    page: PageData
    site: SiteData
  }>

  return (
    <>
      <Template page={page} site={site} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), 'data.json')
  const data: SiteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  const paths = data.pages?.map(page => ({
    params: { slug: page.slug.replace(/^\/|\/$/g, '') }
  })) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataPath = path.join(process.cwd(), 'data.json')
  const data: SiteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  const slugParam = (params?.slug as string || '').replace(/^\/|\/$/g, '')
  const page = data.pages?.find(p => p.slug.replace(/^\/|\/$/g, '') === slugParam)

  if (!page) {
    return {
      notFound: true
    }
  }

  const pageProps = Object.fromEntries(
    Object.entries(page).filter(([key, value]) =>
      !['htmlHead', 'html_head', 'htmlhead'].includes(key) && value !== undefined
    )
  )

  const site = {
    name: data.name,
    url: data.url,
    site_name: data.site_name,
    accent_color: data.accent_color,
    footer_text: data.footer_text,
    allow_indexing: data.allow_indexing,
    logo: data.logo,
    login_text: data.login_text,
    register_text: data.register_text,
    redirect_link: data.redirect_link,
    header_menu: data.header_menu,
    footer_menu: data.footer_menu,
    hero_title: data.hero_title,
    heroTitle: data.heroTitle,
    hero_subtitle: data.hero_subtitle,
    heroSubtitle: data.heroSubtitle,
    hero_badge: data.hero_badge,
    hero_image: data.hero_image,
    heroImage: data.heroImage,
    breadcrumbs: data.breadcrumbs,
    home_name: data.home_name,
    cta_text: data.cta_text,
    cta_background: data.cta_background,
    tagline: data.tagline,
    features_list: data.features_list,
    content: data.content,
    seo_title: data.seo_title,
    seoTitle: data.seoTitle,
    seo_description: data.seo_description,
    seoDescription: data.seoDescription,
    popup_text: data.popup_text,
    faq_title: data.faq_title,
    faqTitle: data.faqTitle,
    faq: data.faq,
    FAQ: data.FAQ,
    slots_title: data.slots_title,
    bonus_title: data.bonus_title,
    get_bonus_btn_text: data.get_bonus_btn_text,
    main_background: data.main_background,
    secondary_background: data.secondary_background,
    button_background: data.button_background,
    button_text: data.button_text,
    text_color: data.text_color,
    color_highlight_text: data.color_highlight_text,
    color_main_btn_text: data.color_main_btn_text,
    Slots: data.Slots,
    Bonuses: data.Bonuses,
    main_background_img: data.main_background_img,
    popup_logo: data.popup_logo,
    footer_images: data.footer_images,
    footerImages: data.footerImages,
    faq_schema: data.faq_schema,
  }

  return {
    props: {
      page: pageProps,
      site: Object.fromEntries(Object.entries(site).filter(([, value]) => value !== undefined))
    }
  }
}
