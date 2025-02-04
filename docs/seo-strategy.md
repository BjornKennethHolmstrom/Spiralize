# SEO Content for Spiralize

## Global Meta Tags (for app.html)

```html
<!-- Primary Meta Tags -->
<meta name="title" content="Spiralize - Discover Your Spiral Dynamics Profile">
<meta name="description" content="Take our comprehensive assessment to understand your values and worldview through Spiral Dynamics. Get personalized insights and practical guidance for personal growth.">

<!-- Keywords -->
<meta name="keywords" content="Spiral Dynamics, personal development, consciousness evolution, values assessment, personality test, developmental psychology, Clare Graves, Don Beck, worldview analysis, human consciousness, personal growth">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="Spiralize - Discover Your Spiral Dynamics Profile">
<meta property="og:description" content="Take our comprehensive assessment to understand your values and worldview through Spiral Dynamics. Get personalized insights and practical guidance for personal growth.">
<meta property="og:image" content="%sveltekit.assets%/social-preview.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="Spiralize - Discover Your Spiral Dynamics Profile">
<meta property="twitter:description" content="Take our comprehensive assessment to understand your values and worldview through Spiral Dynamics. Get personalized insights and practical guidance for personal growth.">
<meta property="twitter:image" content="%sveltekit.assets%/social-preview.png">

<!-- Additional Meta Tags -->
<meta name="author" content="Björn Kenneth Holmström">
<meta name="language" content="English">
<meta name="robots" content="index, follow">
<meta name="revisit-after" content="7 days">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Page-Specific Meta Descriptions

### Homepage
```html
<title>Spiralize - Discover Your Spiral Dynamics Profile</title>
<meta name="description" content="Explore Spiral Dynamics through our interactive assessment. Understand your values, worldview, and developmental stage. Get personalized insights and practical guidance for growth.">
```

### Quiz Page
```html
<title>Spiral Dynamics Assessment | Spiralize</title>
<meta name="description" content="Take our comprehensive Spiral Dynamics assessment. 25 carefully designed questions to discover your center of gravity and understand your values system.">
```

### Results Page
```html
<title>Your Spiral Dynamics Profile Results | Spiralize</title>
<meta name="description" content="View your personalized Spiral Dynamics profile results. Understand your dominant stages, get detailed insights, and discover paths for personal development.">
```

### Explore the Spiral Page
```html
<title>Understanding Spiral Dynamics Stages | Spiralize</title>
<meta name="description" content="Learn about all stages of Spiral Dynamics from Beige to Ultraviolet. Explore how human consciousness evolves through different value systems and worldviews.">
```

### Insights Page
```html
<title>Spiral Dynamics Insights & Practical Applications | Spiralize</title>
<meta name="description" content="Get practical insights and applications for each Spiral Dynamics stage. Learn how to integrate different value systems and foster personal growth.">
```

### About Page
```html
<title>About Spiralize | Your Guide to Spiral Dynamics</title>
<meta name="description" content="Learn about the mission and purpose of Spiralize. Discover how we help individuals and organizations understand and apply Spiral Dynamics principles.">
```

## URL Structure

Recommended URL structure for optimal SEO:

- Homepage: /
- Quiz: /quiz
- Results: /quiz/results
- Explore: /spiral
- Insights: /insights
- Stages: /insights/stages/[stage-name]
- About: /about
- Contact: /contact

## Content Strategy

### Target Keywords by Page

1. Homepage:
   - spiral dynamics test
   - spiral dynamics assessment
   - what is spiral dynamics
   - spiral dynamics quiz
   - consciousness evolution test

2. Quiz Page:
   - spiral dynamics test free
   - spiral dynamics assessment online
   - find my spiral dynamics stage
   - spiral dynamics quiz online
   - spiral dynamics profile test

3. Results Page:
   - spiral dynamics results
   - spiral dynamics profile analysis
   - spiral dynamics stages explanation
   - spiral dynamics interpretation
   - spiral dynamics personal profile

4. Explore Page:
   - spiral dynamics stages
   - spiral dynamics levels
   - spiral dynamics explanation
   - spiral dynamics theory
   - spiral dynamics model explained

5. Insights Page:
   - spiral dynamics applications
   - spiral dynamics practical uses
   - spiral dynamics development
   - spiral dynamics growth
   - spiral dynamics integration

### Heading Structure

Maintain consistent H1-H6 hierarchy across pages:
- H1: Main page title
- H2: Major section headings
- H3: Subsection headings
- H4: Minor section headings
- H5/H6: Additional subheadings as needed

## Technical SEO Recommendations

1. Performance Optimization:
   - Implement lazy loading for images
   - Minimize initial bundle size
   - Use appropriate image formats and sizes
   - Implement caching strategies

2. Mobile Optimization:
   - Ensure responsive design
   - Optimize touch targets
   - Maintain readable font sizes
   - Test on various devices

3. Accessibility:
   - Maintain proper ARIA labels
   - Ensure keyboard navigation
   - Provide alt text for images
   - Use semantic HTML

4. Structured Data:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Spiralize",
  "description": "Interactive Spiral Dynamics assessment and learning platform",
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0"
  },
  "author": {
    "@type": "Person",
    "name": "Björn Kenneth Holmström"
  }
}
```

5. XML Sitemap Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/quiz</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://your-domain.com/spiral</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.com/insights</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.com/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://your-domain.com/contact</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

## Implementation Checklist

1. [ ] Update global meta tags in app.html
2. [ ] Add page-specific meta tags to each route
3. [ ] Implement structured data
4. [ ] Create and add sitemap.xml
5. [ ] Optimize images and implement lazy loading
6. [ ] Add alt text to all images
7. [ ] Implement proper heading hierarchy
8. [ ] Test mobile responsiveness
9. [ ] Verify accessibility compliance
10. [ ] Set up analytics tracking
