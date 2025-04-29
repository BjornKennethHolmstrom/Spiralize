// src/lib/data/examplesSchema.ts

export interface ExampleSubcategory {
  id: string;
  nameEn: string;
  nameSv: string;
  icon?: string;
}

export interface ExampleCategory {
  id: string;
  nameEn: string;
  nameSv: string;
  icon: string;
  subcategories: ExampleSubcategory[];
}

export const examplesSchema: ExampleCategory[] = [
  {
    id: 'society',
    nameEn: 'Society & Culture',
    nameSv: 'Samhälle & Kultur',
    icon: '🎭',
    subcategories: [
      { 
        id: 'art', 
        nameEn: 'Art & Literature', 
        nameSv: 'Konst & Litteratur' 
      },
      { 
        id: 'media', 
        nameEn: 'Media & Entertainment', 
        nameSv: 'Media & Underhållning' 
      },
      { 
        id: 'design', 
        nameEn: 'Fashion & Design', 
        nameSv: 'Mode & Design' 
      },
      { 
        id: 'movements', 
        nameEn: 'Cultural Movements', 
        nameSv: 'Kulturella Rörelser' 
      }
    ]
  },
  {
    id: 'politics',
    nameEn: 'Politics & Governance',
    nameSv: 'Politik & Styrning',
    icon: '🏛️',
    subcategories: [
      { 
        id: 'systems', 
        nameEn: 'Political Systems', 
        nameSv: 'Politiska System' 
      },
      { 
        id: 'leaders', 
        nameEn: 'Leaders & Leadership Styles', 
        nameSv: 'Ledare & Ledarstilar' 
      },
      { 
        id: 'movements', 
        nameEn: 'Social Movements', 
        nameSv: 'Sociala Rörelser' 
      },
      { 
        id: 'policy', 
        nameEn: 'Policy Approaches', 
        nameSv: 'Policymetoder' 
      }
    ]
  },
  {
    id: 'economics',
    nameEn: 'Economics & Business',
    nameSv: 'Ekonomi & Näringsliv',
    icon: '💼',
    subcategories: [
      { 
        id: 'corporate', 
        nameEn: 'Corporate Cultures', 
        nameSv: 'Företagskulturer' 
      },
      { 
        id: 'systems', 
        nameEn: 'Economic Systems', 
        nameSv: 'Ekonomiska System' 
      },
      { 
        id: 'leadership', 
        nameEn: 'Leadership & Management', 
        nameSv: 'Ledarskap & Management' 
      },
      { 
        id: 'organizations', 
        nameEn: 'Organizational Structures', 
        nameSv: 'Organisationsstrukturer' 
      }
    ]
  },
  {
    id: 'education',
    nameEn: 'Education & Knowledge',
    nameSv: 'Utbildning & Kunskap',
    icon: '🎓',
    subcategories: [
      { 
        id: 'systems', 
        nameEn: 'Educational Systems', 
        nameSv: 'Utbildningssystem' 
      },
      { 
        id: 'methods', 
        nameEn: 'Teaching Methodologies', 
        nameSv: 'Undervisningsmetoder' 
      },
      { 
        id: 'science', 
        nameEn: 'Scientific Paradigms', 
        nameSv: 'Vetenskapliga Paradigm' 
      },
      { 
        id: 'knowledge', 
        nameEn: 'Knowledge Systems', 
        nameSv: 'Kunskapssystem' 
      }
    ]
  },
  {
    id: 'technology',
    nameEn: 'Technology & Innovation',
    nameSv: 'Teknik & Innovation',
    icon: '💻',
    subcategories: [
      { 
        id: 'cultures', 
        nameEn: 'Tech Cultures', 
        nameSv: 'Teknikkulturer' 
      },
      { 
        id: 'design', 
        nameEn: 'Product Design', 
        nameSv: 'Produktdesign' 
      },
      { 
        id: 'innovation', 
        nameEn: 'Innovation Philosophies', 
        nameSv: 'Innovationsfilosofier' 
      },
      { 
        id: 'communities', 
        nameEn: 'Digital Communities', 
        nameSv: 'Digitala Gemenskaper' 
      }
    ]
  },
  {
    id: 'spirituality',
    nameEn: 'Religion & Spirituality',
    nameSv: 'Religion & Andlighet',
    icon: '✨',
    subcategories: [
      { 
        id: 'traditions', 
        nameEn: 'Religious Traditions', 
        nameSv: 'Religiösa Traditioner' 
      },
      { 
        id: 'practices', 
        nameEn: 'Spiritual Practices', 
        nameSv: 'Andliga Praktiker' 
      },
      { 
        id: 'communities', 
        nameEn: 'Faith Communities', 
        nameSv: 'Trosgemenskaper' 
      },
      { 
        id: 'ethics', 
        nameEn: 'Ethical Frameworks', 
        nameSv: 'Etiska Ramverk' 
      }
    ]
  },
  {
    id: 'everyday',
    nameEn: 'Everyday Life',
    nameSv: 'Vardagsliv',
    icon: '🏡',
    subcategories: [
      { 
        id: 'family', 
        nameEn: 'Family Dynamics', 
        nameSv: 'Familjedynamik' 
      },
      { 
        id: 'community', 
        nameEn: 'Community Structures', 
        nameSv: 'Gemenskapsstrukturer' 
      },
      { 
        id: 'identity', 
        nameEn: 'Personal Identity', 
        nameSv: 'Personlig Identitet' 
      },
      { 
        id: 'practices', 
        nameEn: 'Daily Practices', 
        nameSv: 'Dagliga Praktiker' 
      }
    ]
  }
];
