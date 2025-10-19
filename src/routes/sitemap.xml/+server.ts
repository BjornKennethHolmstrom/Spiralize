// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

const site = 'https://spiralize.org';

// Define all static pages with priorities and change frequencies
const staticPages = [
  // Main pages
  { url: '', changefreq: 'weekly', priority: 1.0 },
  { url: '/spiral', changefreq: 'monthly', priority: 0.9 },
  { url: '/quiz', changefreq: 'monthly', priority: 0.9 },
  { url: '/origins', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  
  // Insights pages
  { url: '/insights', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/personal', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/spiral-psychology', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/global', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/governance', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/peace', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/spiritual', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/ai-assistants', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/investing', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/poetry', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/examples', changefreq: 'weekly', priority: 0.8 },
  { url: '/insights/gallery', changefreq: 'weekly', priority: 0.8 },
  
  // Guide overview pages
  { url: '/guide-communication', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-personal', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-parenting', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-leadership', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-organizations', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-psychological', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-spiritual', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide-governance', changefreq: 'weekly', priority: 0.8 },
];

// Spiral stages
const stages = [
  'beige', 'purple', 'red', 'blue', 'orange', 'green', 
  'yellow', 'turquoise', 'coral', 'teal'
];

// Guide slugs for each guide type
const guideSlugs = {
  communication: [
    'introduction',
    'beige-purple',
    'red',
    'blue',
    'orange',
    'green',
    'yellow',
    'turquoise',
    'coral-teal',
    'integration'
  ],
  personal: [
    'introduction',
    'self-awareness',
    'values-evolution',
    'shadow-work',
    'integration-practices',
    'healthy-transitions',
    'growth-challenges',
    'beyond-stages'
  ],
  parenting: [
    'introduction',
    'developmental-stages',
    'age-appropriate',
    'beige-purple-parenting',
    'red-parenting',
    'blue-parenting',
    'orange-parenting',
    'green-parenting',
    'yellow-plus-parenting',
    'challenges-solutions'
  ],
  leadership: [
    'introduction',
    'assessment-diagnosis',
    'stage-specific-coaching',
    'transition-support',
    'team-dynamics',
    'organizational-development',
    'conflict-resolution',
    'integration-practices'
  ],
  organizations: [
    'introduction',
    'organizational-assessment',
    'culture-transformation',
    'leadership-development',
    'team-dynamics',
    'change-management',
    'conflict-resolution',
    'integration-sustainability'
  ],
  psychological: [
    'introduction',
    'assessment-intake',
    'stage-specific-approaches',
    'therapeutic-interventions',
    'crisis-support',
    'integration-healing',
    'ethical-considerations',
    'resources'
  ],
  spiritual: [
    'introduction',
    'states-stages',
    'beige-purple-spiritual',
    'red-blue-spiritual',
    'orange-green-spiritual',
    'yellow-turquoise-spiritual',
    'coral-teal-spiritual',
    'integration-practice'
  ],
  governance: [
    'introduction',
    'current-systems',
    'evolutionary-governance',
    'implementation-strategies',
    'case-studies',
    'challenges-solutions',
    'future-visions',
    'action-steps'
  ]
};

export const GET: RequestHandler = async () => {
  const lastmod = new Date().toISOString().split('T')[0];
  
  // Add stage pages
  const stagePages = stages.map(stage => ({
    url: `/insights/stages/${stage}`,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod
  }));
  
  // Add beyond_spiral page
  stagePages.push({
    url: '/insights/stages/beyond_spiral',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod
  });
  
  // Add guide article pages
  const guidePages: any[] = [];
  
  // Communication guide
  guideSlugs.communication.forEach(slug => {
    guidePages.push({
      url: `/guide-communication/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Personal guide
  guideSlugs.personal.forEach(slug => {
    guidePages.push({
      url: `/guide-personal/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Parenting guide
  guideSlugs.parenting.forEach(slug => {
    guidePages.push({
      url: `/guide-parenting/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Leadership guide
  guideSlugs.leadership.forEach(slug => {
    guidePages.push({
      url: `/guide-leadership/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Organizations guide
  guideSlugs.organizations.forEach(slug => {
    guidePages.push({
      url: `/guide-organizations/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Psychological guide
  guideSlugs.psychological.forEach(slug => {
    guidePages.push({
      url: `/guide-psychological/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Spiritual guide
  guideSlugs.spiritual.forEach(slug => {
    guidePages.push({
      url: `/guide-spiritual/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Governance guide
  guideSlugs.governance.forEach(slug => {
    guidePages.push({
      url: `/guide-governance/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod
    });
  });
  
  // Combine all pages
  const allPages = [
    ...staticPages.map(p => ({ ...p, lastmod })),
    ...stagePages,
    ...guidePages
  ];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};

export const prerender = true;
