<!-- src/lib/components/WorldSpiralMap.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';
  import { stages } from '$lib/data/stages';
  import languageStore from '$lib/stores/languageStore';
  import { feature } from 'topojson-client';

  const { language } = languageStore;
  $: currentLanguage = $language;

  let mapContainer: HTMLDivElement;
  let isLoading = true;
  let error = null;
  let selectedCountry = null;
  let geoData = null;
  let renderAttempts = 0;
  const MAX_RENDER_ATTEMPTS = 3;

  // Translation object
  const translations = {
    en: {
      title: "Global Spiral Dynamics Map",
      description: "Explore the dominant Spiral Dynamics stage for different countries and regions around the world.",
      shortDisclaimer: "Note: This map shows approximations - countries contain multiple stages across regions and demographics.",
      disclaimer: "Disclaimer: This visualization offers a simplified representation of complex social dynamics. Countries contain diverse populations operating at multiple stages simultaneously, with significant regional, generational, and sector-based variations. Urban centers often exhibit different value systems than rural areas, with cities frequently showing later-stage dynamics compared to more traditional rural communities. The data presented represents broad generalizations that may not reflect rapid social changes, economic disparities, or the full spectrum of values present. This map is intended as an educational starting point rather than a definitive analysis.",
      countryInfo: "Country Information",
      stage: "Dominant Stage",
      secondaryStage: "Secondary Stage",
      tertiaryStage: "Tertiary Stage",
      note: "Click on a country to see more details",
      loading: "Loading map data...",
      notSelected: "No country selected",
      legend: "Legend",
      predominant: "Predominant Stage",
      noData: "No data available"
    },
    sv: {
      title: "Global Spiral Dynamics Karta",
      description: "Utforska det dominerande Spiral Dynamics-stadiet för olika länder och regioner runt om i världen.",
      shortDisclaimer: "Obs: Denna karta visar approximationer - länder innehåller flera stadier över regioner och demografier.",
      disclaimer: "Observera: Denna visualisering erbjuder en förenklad representation av komplexa sociala dynamiker. Länder innehåller olika befolkningsgrupper som verkar på flera stadier samtidigt, med betydande regionala, generationsmässiga och sektorbaserade variationer. Urbana centra uppvisar ofta andra värdesystem än landsbygdsområden, där städer frekvent visar senare-stadiedynamik jämfört med mer traditionella landsbygdssamhällen. De presenterade uppgifterna representerar breda generaliseringar som kanske inte återspeglar snabba sociala förändringar, ekonomiska skillnader, eller hela spektrumet av värderingar som finns. Denna karta är avsedd som en pedagogisk utgångspunkt snarare än en definitiv analys.",
      countryInfo: "Landsinformation",
      stage: "Dominerande Stadium",
      secondaryStage: "Sekundärt Stadium",
      tertiaryStage: "Tertiärt Stadium",
      note: "Klicka på ett land för att se mer information",
      loading: "Laddar kartdata...",
      notSelected: "Inget land valt",
      legend: "Teckenförklaring",
      predominant: "Dominerande Stadium",
      noData: "Ingen data tillgänglig"
    }
  };

  $: t = translations[currentLanguage];

  // Function to get stage color
  function getStageColor(stage) {
    if (!stage || stage === 'nodata') return "#CCCCCC";
    return stages[stage]?.color || "#CCCCCC";
  }

  // Define spiral dynamics data by country
  // This is a simplified dataset - in a real application, 
  // this would ideally come from an API or separate data file
  const countrySpiralData = {
    // Data using numeric country IDs (as used in the world-atlas TopoJSON)
    // NORTH AMERICA
    // United States
    "840": { primaryStage: 'orange', secondaryStage: 'blue', tertiaryStage: 'green', name: { en: 'United States', sv: 'USA' } },
    // Canada
    "124": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Canada', sv: 'Kanada' } },
    // Mexico
    "484": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Mexico', sv: 'Mexiko' } },
    // Greenland
    "304": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Greenland', sv: 'Grönland' } },
    
    // CENTRAL AMERICA
    // Belize
    "084": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Belize', sv: 'Belize' } },
    // Costa Rica
    "188": { primaryStage: 'blue', secondaryStage: 'green', name: { en: 'Costa Rica', sv: 'Costa Rica' } },
    // El Salvador
    "222": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'El Salvador', sv: 'El Salvador' } },
    // Guatemala
    "320": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Guatemala', sv: 'Guatemala' } },
    // Honduras
    "340": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Honduras', sv: 'Honduras' } },
    // Nicaragua
    "558": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Nicaragua', sv: 'Nicaragua' } },
    // Panama
    "591": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Panama', sv: 'Panama' } },

    // CARIBBEAN
    // Antigua and Barbuda
    "028": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Antigua and Barbuda', sv: 'Antigua och Barbuda' } },
    // Bahamas
    "044": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Bahamas', sv: 'Bahamas' } },
    // Barbados
    "052": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Barbados', sv: 'Barbados' } },
    // Cuba
    "192": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Cuba', sv: 'Kuba' } },
    // Dominica
    "212": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Dominica', sv: 'Dominica' } },
    // Dominican Republic
    "214": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Dominican Republic', sv: 'Dominikanska republiken' } },
    // Grenada
    "308": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Grenada', sv: 'Grenada' } },
    // Haiti
    "332": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Haiti', sv: 'Haiti' } },
    // Jamaica
    "388": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Jamaica', sv: 'Jamaica' } },
    // Saint Kitts and Nevis
    "659": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Saint Kitts and Nevis', sv: 'Saint Kitts och Nevis' } },
    // Saint Lucia
    "662": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Saint Lucia', sv: 'Saint Lucia' } },
    // Saint Vincent and the Grenadines
    "670": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Saint Vincent and the Grenadines', sv: 'Saint Vincent och Grenadinerna' } },
    // Trinidad and Tobago
    "780": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Trinidad and Tobago', sv: 'Trinidad och Tobago' } },
    
    // SOUTH AMERICA
    // Argentina
    "032": { primaryStage: 'orange', secondaryStage: 'red', name: { en: 'Argentina', sv: 'Argentina' } },
    // Bolivia
    "068": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Bolivia', sv: 'Bolivia' } },
    // Brazil
    "076": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Brazil', sv: 'Brasilien' } },
    // Chile
    "152": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Chile', sv: 'Chile' } },
    // Colombia
    "170": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Colombia', sv: 'Colombia' } },
    // Ecuador
    "218": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Ecuador', sv: 'Ecuador' } },
    // Guyana
    "328": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Guyana', sv: 'Guyana' } },
    // Paraguay
    "600": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Paraguay', sv: 'Paraguay' } },
    // Peru
    "604": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Peru', sv: 'Peru' } },
    // Suriname
    "740": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Suriname', sv: 'Suriname' } },
    // Uruguay
    "858": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Uruguay', sv: 'Uruguay' } },
    // Venezuela
    "862": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Venezuela', sv: 'Venezuela' } },
    
    // EUROPE
    // United Kingdom
    "826": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'United Kingdom', sv: 'Storbritannien' } },
    // France
    "250": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'France', sv: 'Frankrike' } },
    // Germany
    "276": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Germany', sv: 'Tyskland' } },
    // Sweden
    "752": { primaryStage: 'green', secondaryStage: 'orange', tertiaryStage: 'yellow', name: { en: 'Sweden', sv: 'Sverige' } },
    // Norway
    "578": { primaryStage: 'green', secondaryStage: 'orange', tertiaryStage: 'yellow', name: { en: 'Norway', sv: 'Norge' } },
    // Denmark
    "208": { primaryStage: 'green', secondaryStage: 'orange', tertiaryStage: 'yellow', name: { en: 'Denmark', sv: 'Danmark' } },
    // Finland
    "246": { primaryStage: 'green', secondaryStage: 'orange', tertiaryStage: 'yellow', name: { en: 'Finland', sv: 'Finland' } },
    // Czech Republic
    "203": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'Czech Republic', sv: 'Tjeckien' } },
    // Poland
    "616": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Poland', sv: 'Polen' } },
    // Hungary
    "348": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Hungary', sv: 'Ungern' } },
    // Spain
    "724": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Spain', sv: 'Spanien' } },
    // Portugal
    "620": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Portugal', sv: 'Portugal' } },
    // Italy
    "380": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'Italy', sv: 'Italien' } },
    // Greece
    "300": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Greece', sv: 'Grekland' } },
    // Belarus
    "112": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Belarus', sv: 'Vitryssland' } },
    // Ukraine
    "804": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Ukraine', sv: 'Ukraina' } },
    // Netherlands
    "528": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Netherlands', sv: 'Nederländerna' } },
    // Belgium
    "056": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Belgium', sv: 'Belgien' } },
    // Switzerland
    "756": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Switzerland', sv: 'Schweiz' } },
    // Austria
    "040": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Austria', sv: 'Österrike' } },
    // Albania
    "008": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Albania', sv: 'Albanien' } },
    // Andorra
    "020": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Andorra', sv: 'Andorra' } },
    // Armenia
    "051": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Armenia', sv: 'Armenien' } },
    // Azerbaijan
    "031": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Azerbaijan', sv: 'Azerbajdzjan' } },
    // Bosnia and Herzegovina
    "070": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Bosnia and Herzegovina', sv: 'Bosnien och Hercegovina' } },
    // Bulgaria
    "100": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Bulgaria', sv: 'Bulgarien' } },
    // Croatia
    "191": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Croatia', sv: 'Kroatien' } },
    // Cyprus
    "196": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Cyprus', sv: 'Cypern' } },
    // Estonia
    "233": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Estonia', sv: 'Estland' } },
    // Georgia
    "268": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Georgia', sv: 'Georgien' } },
    // Iceland
    "352": { primaryStage: 'green', secondaryStage: 'yellow', name: { en: 'Iceland', sv: 'Island' } },
    // Ireland
    "372": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Ireland', sv: 'Irland' } },
    // Latvia
    "428": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Latvia', sv: 'Lettland' } },
    // Liechtenstein
    "438": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Liechtenstein', sv: 'Liechtenstein' } },
    // Lithuania
    "440": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Lithuania', sv: 'Litauen' } },
    // Luxembourg
    "442": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'Luxembourg', sv: 'Luxemburg' } },
    // Malta
    "470": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Malta', sv: 'Malta' } },
    // Monaco
    "492": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'Monaco', sv: 'Monaco' } },
    // Moldava
    "498": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Moldova', sv: 'Moldavien' } },
    // Montenegro
    "499": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Montenegro', sv: 'Montenegro' } },
    // North Macedonia
    "807": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'North Macedonia', sv: 'Nordmakedonien' } },
    // Romania
    "642": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Romania', sv: 'Rumänien' } },
    // San Marino
    "674": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'San Marino', sv: 'San Marino' } },
    // Serbia
    "688": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Serbia', sv: 'Serbien' } },
    // Slovakia
    "703": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Slovakia', sv: 'Slovakien' } },
    // Slovenia
    "705": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Slovenia', sv: 'Slovenien' } },
    // Vatican City
    "336": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Vatican City', sv: 'Vatikanstaten' } },
    
    // ASIA
    // Japan
    "392": { primaryStage: 'blue', secondaryStage: 'orange/green', name: { en: 'Japan', sv: 'Japan' } },
    // South Korea
    "410": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'South Korea', sv: 'Sydkorea' } },
    // China
    "156": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'China', sv: 'Kina' } },
    // India
    "356": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'India', sv: 'Indien' } },
    // Russia
    "643": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Russia', sv: 'Ryssland' } },
    // Saudi Arabia
    "682": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Saudi Arabia', sv: 'Saudiarabien' } },
    // Israel
    "376": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'Israel', sv: 'Israel' } },
    // Iran
    "364": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Iran', sv: 'Iran' } },
    // Turkey
    "792": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Turkey', sv: 'Turkiet' } },
    // Indonesia
    "360": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Indonesia', sv: 'Indonesien' } },
    // Thailand
    "764": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Thailand', sv: 'Thailand' } },
    // Vietnam
    "704": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Vietnam', sv: 'Vietnam' } },
    // Iraq
    "368": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Iraq', sv: 'Irak' } },
    // Afghanistan
    "004": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Afghanistan', sv: 'Afghanistan' } },
    // Pakistan
    "586": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Pakistan', sv: 'Pakistan' } },
    // Bangladesh
    "050": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Bangladesh', sv: 'Bangladesh' } },
    // Singapore
    "702": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Singapore', sv: 'Singapore' } },
    // Malaysia
    "458": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Malaysia', sv: 'Malaysia' } },
    // Philippines
    "608": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Philippines', sv: 'Filippinerna' } },
    // Kazakhstan
    "398": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Kazakhstan', sv: 'Kazakstan' } },
    // Uzbekistan
    "860": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Uzbekistan', sv: 'Uzbekistan' } },
    // Bhutan
    "064": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Bhutan', sv: 'Bhutan' } },
    // Brunei
    "096": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Brunei', sv: 'Brunei' } },
    // Cambodia
    "116": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Cambodia', sv: 'Kambodja' } },
    // East Timor
    "626": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'East Timor', sv: 'Östtimor' } },
    // Kyrgyzstan
    "417": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Kyrgyzstan', sv: 'Kirgizistan' } },
    // Laos
    "418": { primaryStage: 'red', secondaryStage: 'purple', name: { en: 'Laos', sv: 'Laos' } },
    // Maldives
    "462": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Maldives', sv: 'Maldiverna' } },
    // Mongolia
    "496": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Mongolia', sv: 'Mongoliet' } },
    // Myanmar
    "104": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Myanmar', sv: 'Myanmar' } },
    // Nepal
    "524": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Nepal', sv: 'Nepal' } },
    // North Korea
    "408": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'North Korea', sv: 'Nordkorea' } },
    // Oman
    "512": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Oman', sv: 'Oman' } },
    // Palestine
    "275": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Palestine', sv: 'Palestina' } },
    // Qatar
    "634": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Qatar', sv: 'Qatar' } },
    // Sri Lanka
    "144": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Sri Lanka', sv: 'Sri Lanka' } },
    // Syria
    "760": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Syria', sv: 'Syrien' } },
    // Taiwan
    "158": { primaryStage: 'orange', secondaryStage: 'blue', name: { en: 'Taiwan', sv: 'Taiwan' } },
    // Tajikistan
    "762": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Tajikistan', sv: 'Tadzjikistan' } },
    // Turkmenistan
    "795": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Turkmenistan', sv: 'Turkmenistan' } },
    // United Arab Emirates
    "784": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'United Arab Emirates', sv: 'Förenade Arabemiraten' } },
    // Yemen
    "887": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Yemen', sv: 'Jemen' } },
    // Jordan
    "400": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Jordan', sv: 'Jordanien' } },
    // Kuwait
    "414": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Kuwait', sv: 'Kuwait' } },
    // Lebanon
    "422": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Lebanon', sv: 'Libanon' } },

    // OCEANIA
    // Australia
    "036": { primaryStage: 'orange', secondaryStage: 'green', name: { en: 'Australia', sv: 'Australien' } },
    // New Zealand
    "554": { primaryStage: 'green', secondaryStage: 'orange', name: { en: 'New Zealand', sv: 'Nya Zeeland' } },
    // Fiji
    "242": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Fiji', sv: 'Fiji' } },
    // Papua New Guinea
    "598": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Papua New Guinea', sv: 'Papua Nya Guinea' } },
    // Solomon Islands
    "090": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Solomon Islands', sv: 'Salomonöarna' } },
    // Vanuatu
    "548": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Vanuatu', sv: 'Vanuatu' } },
    // Samoa
    "882": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Samoa', sv: 'Samoa' } },
    // Kiribati
    "296": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Kiribati', sv: 'Kiribati' } },
    // Tonga
    "776": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Tonga', sv: 'Tonga' } },
    // Micronesia
    "583": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Micronesia', sv: 'Mikronesien' } },
    // Marshall Islands
    "584": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Marshall Islands', sv: 'Marshallöarna' } },
    // Palau
    "585": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Palau', sv: 'Palau' } },
    // Nauru
    "520": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Nauru', sv: 'Nauru' } },
    // Tuvalu
    "798": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Tuvalu', sv: 'Tuvalu' } },

    
    // AFRICA
    // South Africa
    "710": { primaryStage: 'purple', secondaryStage: 'orange/red', name: { en: 'South Africa', sv: 'Sydafrika' } },
    // Nigeria
    "566": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Nigeria', sv: 'Nigeria' } },
    // Egypt
    "818": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Egypt', sv: 'Egypten' } },
    // Ethiopia
    "231": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Ethiopia', sv: 'Etiopien' } },
    // Kenya
    "404": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Kenya', sv: 'Kenya' } },
    // Uganda
    "800": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Uganda', sv: 'Uganda' } },
    // Algeria
    "012": { primaryStage: 'blue', secondaryStage: 'red', name: { en: 'Algeria', sv: 'Algeriet' } },
    // Angola
    "024": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Angola', sv: 'Angola' } },
    // Benin
    "204": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Benin', sv: 'Benin' } },
    // Botswana
    "072": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Botswana', sv: 'Botswana' } },
    // Burkina Faso
    "854": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Burkina Faso', sv: 'Burkina Faso' } },
    // Burundi
    "108": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Burundi', sv: 'Burundi' } },
    // Cameroon
    "120": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Cameroon', sv: 'Kamerun' } },
    // Cape Verde
    "132": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Cape Verde', sv: 'Kap Verde' } },
    // Central African Republic
    "140": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Central African Republic', sv: 'Centralafrikanska republiken' } },
    // Chad
    "148": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Chad', sv: 'Tchad' } },
    // Comoros
    "174": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Comoros', sv: 'Komorerna' } },
    // Congo (Republic)
    "178": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Congo', sv: 'Kongo-Brazzaville' } },
    // Congo (Democratic Republic)
    "180": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'DR Congo', sv: 'Kongo-Kinshasa' } },
    // Djibouti
    "262": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Djibouti', sv: 'Djibouti' } },
    // Equatorial Guinea
    "226": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Equatorial Guinea', sv: 'Ekvatorialguinea' } },
    // Eritrea
    "232": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Eritrea', sv: 'Eritrea' } },
    // Eswatini (formerly Swaziland)
    "748": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Eswatini', sv: 'Eswatini' } },
    // Gabon
    "266": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Gabon', sv: 'Gabon' } },
    // Gambia
    "270": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Gambia', sv: 'Gambia' } },
    // Ghana
    "288": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Ghana', sv: 'Ghana' } },
    // Guinea
    "324": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Guinea', sv: 'Guinea' } },
    // Guinea-Bissau
    "624": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Guinea-Bissau', sv: 'Guinea-Bissau' } },
    // Ivory Coast
    "384": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Ivory Coast', sv: 'Elfenbenskusten' } },
    // Lesotho
    "426": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Lesotho', sv: 'Lesotho' } },
    // Liberia
    "430": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Liberia', sv: 'Liberia' } },
    // Libya
    "434": { primaryStage: 'red', secondaryStage: 'blue', name: { en: 'Libya', sv: 'Libyen' } },
    // Madagascar
    "450": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Madagascar', sv: 'Madagaskar' } },
    // Malawi
    "454": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Malawi', sv: 'Malawi' } },
    // Mali
    "466": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Mali', sv: 'Mali' } },
    // Mauritania
    "478": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Mauritania', sv: 'Mauretanien' } },
    // Mauritius
    "480": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Mauritius', sv: 'Mauritius' } },
    // Morocco
    "504": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Morocco', sv: 'Marocko' } },
    // Mozambique
    "508": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Mozambique', sv: 'Moçambique' } },
    // Namibia
    "516": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Namibia', sv: 'Namibia' } },
    // Niger
    "562": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Niger', sv: 'Niger' } },
    // Rwanda
    "646": { primaryStage: 'blue', secondaryStage: 'purple', name: { en: 'Rwanda', sv: 'Rwanda' } },
    // Sao Tome and Principe
    "678": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Sao Tome and Principe', sv: 'São Tomé och Príncipe' } },
    // Senegal
    "686": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Senegal', sv: 'Senegal' } },
    // Seychelles
    "690": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Seychelles', sv: 'Seychellerna' } },
    // Sierra Leone
    "694": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Sierra Leone', sv: 'Sierra Leone' } },
    // Somalia
    "706": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Somalia', sv: 'Somalia' } },
    // South Sudan
    "728": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'South Sudan', sv: 'Sydsudan' } },
    // Sudan
    "729": { primaryStage: 'purple', secondaryStage: 'blue', name: { en: 'Sudan', sv: 'Sudan' } },
    // Tanzania
    "834": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Tanzania', sv: 'Tanzania' } },
    // Togo
    "768": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Togo', sv: 'Togo' } },
    // Tunisia
    "788": { primaryStage: 'blue', secondaryStage: 'orange', name: { en: 'Tunisia', sv: 'Tunisien' } },
    // Zambia
    "894": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Zambia', sv: 'Zambia' } },
    // Zimbabwe
    "716": { primaryStage: 'purple', secondaryStage: 'red', name: { en: 'Zimbabwe', sv: 'Zimbabwe' } }
  };

  onMount(async () => {
    try {
      isLoading = true;
      
      // Load data
      const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      
      if (!world) {
        throw new Error("Failed to load world data");
      }

      geoData = world;
      
      // Set a short timeout to ensure the DOM is ready
      setTimeout(() => {
        renderMap();
        isLoading = false;
      }, 100);
      
    } catch (err) {
      console.error("Error loading map data:", err);
      error = err.message;
      isLoading = false;
    }
  });

  // This will run after each update
  afterUpdate(() => {
    if (!isLoading && geoData && !error && renderAttempts < MAX_RENDER_ATTEMPTS) {
      renderAttempts++;
      renderMap();
    }
  });

  // Reactive rendering when language changes
  $: if (geoData && currentLanguage && !isLoading) {
    renderMap();
  }

  function renderMap() {
    if (!mapContainer) {
      console.error("Map container not found - will retry");
      return;
    }

    if (!geoData) {
      console.error("No geo data available");
      return;
    }

    try {
      // Get container width for responsive sizing
      const width = mapContainer.clientWidth;
      const height = Math.max(400, width * 0.5); // Adjust height based on width

      // Clear previous content
      d3.select(mapContainer).selectAll("*").remove();

      // Create SVG
      const svg = d3.select(mapContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      // Create projection - Natural Earth projection works well for world maps
      const projection = d3.geoNaturalEarth1()
        .fitSize([width, height - 20], feature(geoData, geoData.objects.countries));

      // Create path generator
      const path = d3.geoPath().projection(projection);

      // Get countries feature
      const countries = feature(geoData, geoData.objects.countries);

      // Draw countries
      svg.append("g")
        .selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
          // The id in the topojson is a string numeric code
          const countryData = countrySpiralData[d.id];
          return countryData ? getStageColor(countryData.primaryStage) : "#CCCCCC";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .on("click", (event, d) => {
          // Set selected country when clicked
          const countryIso = d.id;
          const spiralData = countrySpiralData[countryIso];
          
          selectedCountry = {
            id: countryIso,
            name: d.properties.name,
            spiralData: spiralData
          };
        })
        .append("title")
        .text(d => {
          const countryIso = d.id;
          const countryData = countrySpiralData[countryIso];
          return countryData?.name?.[currentLanguage] || d.properties.name || "Unknown";
        });

      console.log("Map rendered successfully");
      renderAttempts = 0; // Reset attempts counter on success
    } catch (err) {
      console.error("Error rendering map:", err);
      if (renderAttempts < MAX_RENDER_ATTEMPTS) {
        setTimeout(renderMap, 100 * renderAttempts);
      } else {
        error = "Failed to render map after multiple attempts";
      }
    }
  }

  function handleWindowResize() {
    if (!isLoading && geoData) {
      renderMap();
    }
  }
</script>

<svelte:window on:resize={handleWindowResize} />

<div class="world-spiral-map bg-white rounded-xl shadow-sm p-4 md:p-6">
  <h2 class="text-xl font-semibold mb-2">{t.title}</h2>
  <p class="text-gray-600 mb-4">{t.description}</p>
  <p class="text-sm text-gray-500 italic mb-4">{t.shortDisclaimer}</p>

  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-gray-500">{t.loading}</p>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-50 p-4 rounded-lg text-center text-red-600">
      <p>Error: {error}</p>
    </div>
  {:else}
    <!-- Map container - now full width -->
    <div class="mb-6">
      <div bind:this={mapContainer} class="border border-gray-200 rounded-lg overflow-hidden w-full min-h-[400px]"></div>
      <p class="text-sm text-gray-500 mt-2 italic text-center">{t.note}</p>
    </div>
    
    <!-- Grid layout with legend and country info side by side -->
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Legend -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-medium mb-3">{t.legend}</h3>
        <div class="grid grid-cols-2 gap-2">
          {#each Object.entries(stages) as [stage, info]}
            <div class="flex items-center">
              <div 
                class="w-4 h-4 mr-2 rounded-sm" 
                style="background-color: {info.color}"
              ></div>
              <span class="text-sm capitalize">{stage} - {info.name[currentLanguage]}</span>
            </div>
          {/each}
          <div class="flex items-center">
            <div class="w-4 h-4 mr-2 rounded-sm bg-gray-300"></div>
            <span class="text-sm">{t.noData}</span>
          </div>
        </div>
      </div>
      
      <!-- Country info -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-medium mb-3">{t.countryInfo}</h3>
        
        {#if selectedCountry}
          <div>
            <h4 class="font-medium mb-2">
              {selectedCountry.spiralData?.name?.[currentLanguage] || selectedCountry.name || t.notSelected}
            </h4>
            
            <div class="space-y-2">
              <!-- Primary Stage -->
              <div>
                <p class="text-sm font-medium text-gray-600">{t.stage}:</p>
                {#if selectedCountry.spiralData?.primaryStage}
                  <div class="flex items-center mt-1">
                    <div 
                      class="w-3 h-3 mr-2 rounded-sm" 
                      style="background-color: {getStageColor(selectedCountry.spiralData.primaryStage)}"
                    ></div>
                    <span class="text-sm capitalize">
                      {selectedCountry.spiralData.primaryStage} - {stages[selectedCountry.spiralData.primaryStage]?.name[currentLanguage]}
                    </span>
                  </div>
                {:else}
                  <p class="text-sm text-gray-500 italic">{t.noData}</p>
                {/if}
              </div>
              
              <!-- Secondary Stage -->
              <div>
                <p class="text-sm font-medium text-gray-600">{t.secondaryStage}:</p>
                {#if selectedCountry.spiralData?.secondaryStage}
                  <div class="flex items-center mt-1">
                    <div 
                      class="w-3 h-3 mr-2 rounded-sm" 
                      style="background-color: {getStageColor(selectedCountry.spiralData.secondaryStage)}"
                    ></div>
                    <span class="text-sm capitalize">
                      {selectedCountry.spiralData.secondaryStage} - {stages[selectedCountry.spiralData.secondaryStage]?.name[currentLanguage]}
                    </span>
                  </div>
                {:else}
                  <p class="text-sm text-gray-500 italic">{t.noData}</p>
                {/if}
              </div>
              
              <!-- Tertiary Stage (new) -->
              {#if selectedCountry.spiralData?.tertiaryStage}
                <div>
                  <p class="text-sm font-medium text-gray-600">{t.tertiaryStage}:</p>
                  <div class="flex items-center mt-1">
                    <div 
                      class="w-3 h-3 mr-2 rounded-sm" 
                      style="background-color: {getStageColor(selectedCountry.spiralData.tertiaryStage)}"
                    ></div>
                    <span class="text-sm capitalize">
                      {selectedCountry.spiralData.tertiaryStage} - {stages[selectedCountry.spiralData.tertiaryStage]?.name[currentLanguage]}
                    </span>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <p class="text-sm text-gray-500 italic">{t.notSelected}</p>
        {/if}
      </div>
    </div>
  {/if}
  
  <div class="mt-6">
    <p class="text-sm text-gray-500 italic">{t.disclaimer}</p>
  </div>
</div>

<style>
  /* Additional styles can be added here if needed */
</style>
