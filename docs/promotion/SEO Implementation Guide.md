# Spiralize SEO Implementation Guide

## Files to Create

### 1. SEO Component
**File:** `src/lib/components/SEO.svelte`
- Use the SEO component from artifact "SEO.svelte for Spiralize"

### 2. robots.txt
**File:** `static/robots.txt`
- Use the robots.txt from artifact "robots.txt for Spiralize"

### 3. Sitemap Generator
**File:** `src/routes/sitemap.xml/+server.ts`
- Use the sitemap generator from artifact "sitemap.xml Generator for Spiralize"

## Quick Reference: Common SEO Patterns

### Main Pages (Already Done ✅)
- Homepage (`/+page.svelte`) - See examples above
- About (`/about/+page.svelte`)
- Contact (`/contact/+page.svelte`)
- Origins (`/origins/+page.svelte`)
- Spiral (`/spiral/+page.svelte`)

### Quiz Page
```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  $: title = $language === 'en' 
    ? 'Spiral Dynamics Assessment Quiz'
    : 'Spiral Dynamics Bedömningstest';
    
  $: description = $language === 'en'
    ? 'Take our comprehensive 60-question Spiral Dynamics assessment to discover your center of gravity. Get personalized insights into your values and worldview.'
    : 'Ta vårt omfattande 60-fråga Spiral Dynamics-test för att upptäcka ditt gravitationscentrum. Få personliga insikter om dina värderingar och världsbild.';
</script>

<SEO 
  {title}
  {description}
  keywords="spiral dynamics quiz, values assessment, consciousness test, worldview questionnaire, personal development test"
  type="website"
/>
```

### Insights Pages Pattern
```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  $: title = $language === 'en' 
    ? 'Global Perspectives - Spiral Dynamics'
    : 'Globala Perspektiv - Spiral Dynamics';
    
  $: description = $language === 'en'
    ? 'Explore how Spiral Dynamics illuminates global challenges: climate change, inequality, politics. Understand different worldviews shaping our collective future.'
    : 'Utforska hur Spiral Dynamics belyser globala utmaningar: klimatförändringar, ojämlikhet, politik. Förstå olika världsbilder som formar vår kollektiva framtid.';
</script>

<SEO 
  {title}
  {description}
  keywords="spiral dynamics global, climate change worldviews, inequality perspectives, political consciousness, global challenges"
  type="article"
  section="Insights"
/>
```

### Guide Overview Pages Pattern
```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  $: title = $language === 'en' 
    ? 'Communicating Across the Spiral - Guide'
    : 'Kommunicera Över Spiralen - Guide';
    
  $: description = $language === 'en'
    ? 'Master cross-stage communication in Spiral Dynamics. Learn practical strategies for connecting with people at different consciousness levels.'
    : 'Bemästra kommunikation över stadier i Spiral Dynamics. Lär dig praktiska strategier för att ansluta med människor på olika medvetandenivåer.';
</script>

<SEO 
  {title}
  {description}
  keywords="spiral dynamics communication, cross-stage dialogue, effective communication, consciousness-aware speaking, developmental language"
  type="article"
  section="Guides"
/>
```

### Guide Article Pages Pattern
```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  // Example for a specific guide article
  $: title = 'Stage Blue Communication - Communicating Across the Spiral';
  $: description = 'Learn effective communication strategies for engaging with Blue stage (order, tradition, authority) consciousness in Spiral Dynamics.';
</script>

<SEO 
  {title}
  {description}
  keywords="blue stage communication, traditional values, authority respect, order-based dialogue"
  type="article"
  section="Communication Guide"
  publishedTime="2024-02-01"
/>
```

### Stage Pages Pattern
```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  // Example for Orange stage
  $: title = $language === 'en'
    ? 'Orange Stage - Achievement & Success'
    : 'Orange Stadium - Prestation & Framgång';
    
  $: description = $language === 'en'
    ? 'Explore Orange stage in Spiral Dynamics: achievement, success, rational thinking, and scientific worldview. Learn characteristics, motivations, and healthy expressions.'
    : 'Utforska Orange-stadiet i Spiral Dynamics: prestation, framgång, rationellt tänkande och vetenskaplig världsbild. Lär dig egenskaper, motivationer och friska uttryck.';
</script>

<SEO 
  {title}
  {description}
  keywords="orange stage, achievement motivation, success orientation, rational worldview, scientific thinking, spiral dynamics orange"
  type="article"
  section="Spiral Stages"
/>
```

## Priority Implementation Order

### High Priority (Do First) ✅
1. Homepage
2. Quiz page
3. Spiral stages overview
4. About page

### Medium Priority
1. All 8 guide overview pages
2. Major insights pages (global, peace, governance)
3. Origins page
4. Contact page

### Lower Priority (Gradual Implementation)
1. Individual guide articles (~80 articles)
2. Individual stage pages (~10 pages)
3. Less-visited insights pages

## Testing Your SEO

After implementation, test with:

1. **Google Search Console** - Submit your sitemap
2. **Rich Results Test** - https://search.google.com/test/rich-results
3. **Social Media Debugger**:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## Common Keywords by Category

### Spiral Dynamics Core
- spiral dynamics
- consciousness development
- value systems evolution
- worldview stages
- developmental psychology
- clare w graves

### Stages
- beige purple red blue orange green yellow turquoise coral
- first tier second tier
- survival tribal power order achievement community systemic

### Applications
- personal development
- leadership development
- organizational culture
- conflict resolution
- communication strategies
- global perspectives

### Specific Topics
- consciousness evolution
- values assessment
- worldview transformation
- developmental stages
- integral theory
- adult development
