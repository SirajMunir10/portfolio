import type { ContentTranslation } from './types'

/** Dutch content. Figures, names and links come from the English base. */
export const nl: ContentTranslation = {
  profile: {
    role: 'AI Engineer · LLM Engineer',
    headline: 'Ik bouw LLM-, RAG- en spraak-AI-producten die mensen echt gebruiken.',
    headlineHighlight: 'LLM-, RAG- en spraak-AI',
    intro:
      'Software engineer, gespecialiseerd in large language models, retrieval-augmented generation en backendsystemen. Ik breng AI-producten van idee naar productie: de conversatie- en spraakpipeline, de retrieval erachter, en de backend, tests en beheertools die het geheel betrouwbaar houden.',
    quote: 'AI moet eerlijk zijn over wat het weet, en elk getal moet uit code komen, niet uit een gok.',
    about: [
      'Bij Xoto bouwde ik XO, een chat- en spraakassistent voor vastgoed en hypotheken in de VAE. XO antwoordt in 21 talen, doorzoekt live woningaanbod, bepaalt met een regelgebaseerde engine of iemand in aanmerking komt voor een hypotheek, zodat het model nooit zelf rekent, en draagt serieuze kopers over aan een adviseur. Ook bouwde ik het beheerportaal waarmee het team gesprekken beoordeelt, de kennisbank bijwerkt en kredietregels aanpast zonder op een developer te wachten.',
      'Ik ben afgestudeerd in Software Engineering aan Foundation University Islamabad, met een CGPA van 3.68 en twee prestatiebeurzen. Mijn afstudeeronderzoek naar alarmmoeheid op de IC verminderde valse alarmen met 37.7% zonder één echte gebeurtenis te missen, en mijn afstudeerproject, AVAGuard, automatiseert cloudbeveiligingsaudits volgens de CIS-benchmarks met door AI gegenereerde herstelinstructies.',
      'Ik vind het belangrijk dat AI eerlijk is over wat het weet, dat getallen uit code komen in plaats van uit gokwerk, en dat producten getest zijn voordat iemand erop vertrouwt.',
    ],
    availability: 'Open voor AI Engineer-functies',
    photoAlt: 'Siraj Munir in een donker pak, zittend aan een bar in zacht licht',
    focusAreas: [
      {
        title: 'LLM-toepassingen',
        description: 'Function calling, tool loops in meerdere stappen, streaming antwoorden, promptontwerp en guardrails.',
      },
      {
        title: 'Retrieval (RAG)',
        description: 'Embeddings, vector search en onderbouwde antwoorden, met een eerlijk "Dat weet ik niet".',
      },
      {
        title: 'Spraak-AI',
        description: 'Live spraak-naar-tekst via WebSockets en tekst-naar-spraak met timing per woord.',
      },
      {
        title: 'Machine learning',
        description: 'Anomaliedetectie, modelevaluatie en benchmarking tegen doelen uit de praktijk.',
      },
    ],
  },
  highlights: [
    { label: 'talen', detail: 'gesproken en geschreven door XO, mijn assistent in productie' },
    { label: 'geautomatiseerde tests', detail: 'bewaken de backend van XO' },
    { label: 'minder valse alarmen', detail: 'in mijn onderzoek naar IC-monitoring' },
    { label: 'CGPA', detail: 'BS Software Engineering, twee prestatiebeurzen' },
  ],
  languageLevels: ['Volledig professioneel', 'Moedertaal', 'Volledig professioneel', 'Professionele werkkennis'],
  experience: {
    Xoto: {
      role: 'AI Engineer / LLM Engineer',
      summary:
        'Ontwikkelde XO, de LLM-gestuurde conversatieassistent van het bedrijf voor vastgoedkopers, makelaars, brokers en hypotheekadviseurs.',
      highlights: [
        'Bouwde XO van begin tot eind met RAG, embeddings, vector search en LLM-orkestratie over een tool loop in meerdere stappen.',
        'Ontwikkelde meertalige spraak- en tekstworkflows in 21 talen, met afhandeling van meerdere intenties en contextbewuste gesprekken.',
        'Benchmarkte en optimaliseerde LLM-, spraak-naar-tekst- en tekst-naar-spraakmodellen op latency en antwoordkwaliteit.',
        'Hield elk getal buiten het model: een deterministische hypotheekengine leest geversioneerde regeltabellen, en leads gaan pas na toestemming naar CRM-gateways.',
        'Bouwde het beheerportaal: rolgebaseerde toegang, analytics, gespreksreview, beheer van de kennisbank en geversioneerde bedrijfsregels.',
        'Schreef 223 backendtests en end-to-end-tests met Playwright op desktop, Android en iPhone.',
      ],
    },
    'Crater Code': {
      role: 'Software Developer',
      summary: 'Werkte aan een realtime systeem voor rampenmonitoring dat AI-chatbots combineert met geolocatiedata.',
      highlights: [
        'Droeg bij aan een realtime systeem voor rampenmonitoring dat AI-chatbots en geolocatiedata integreert.',
        'Ondersteunde backendontwikkeling en systeemintegratie voor prestaties met lage latency.',
        'Werkte aan AI-functies die realtime monitoringinformatie toegankelijker maakten.',
      ],
    },
    Excelerate: {
      role: 'Stagiair projectmanager',
      employment: 'Stage · Remote',
      summary: 'Leidde een internationaal team dat AI-tools beoordeelde voor echte bedrijfsprocessen.',
      highlights: [
        'Leidde een internationaal team van 9 personen dat AI-tools beoordeelde voor taakautomatisering, resourcebeheer en risicobeperking.',
        'Presenteerde de bevindingen in een kwantitatief analyserapport, inclusief ethische en duurzaamheidsaspecten.',
      ],
    },
    'Tech Net Group': {
      role: 'Webdeveloper',
      employment: 'Stage',
      summary: 'Front-endontwikkeling van een realtime webdashboard.',
      highlights: [
        'Ontwikkelde een realtime weerdashboard met de OpenWeather API.',
        'Implementeerde interactieve front-endfuncties met React.js en Redux.',
        'Optimaliseerde functionaliteit en prestaties, beoordeeld met een A+ als projectcijfer.',
      ],
    },
  },
  projects: {
    xo: {
      tagline: 'Meertalige AI-chat- en spraakassistent voor vastgoed en hypotheken in de VAE',
      category: 'Conversationele AI · Productie',
      team: 'Van begin tot eind gebouwd bij Xoto',
      summary:
        'Een assistent in productie waarmee kopers woningen zoeken, nagaan of ze in aanmerking komen voor een hypotheek, maandlasten en kosten inschatten, vragen over het bedrijf stellen en een terugbelverzoek van een adviseur doen, via tekst of spraak, in 21 talen.',
      problem:
        'Woningkopers in de VAE vergelijken aanbod, rekenen uit hoeveel een bank wil lenen en tellen kosten bij elkaar op, vaak in een tweede taal. Makelaars en adviseurs beantwoorden steeds dezelfde vragen handmatig, en een verkeerd getal kost vertrouwen.',
      built: [
        'LLM met function calling en een tool loop in meerdere stappen over 18 tools: woningen zoeken, vergelijkingen, hypotheekcalculators, kennisretrieval en overdracht.',
        'RAG over de kennisbank van het bedrijf, met als terugvaloptie "Dat weet ik niet, ik breng je in contact met een adviseur" in plaats van te gokken.',
        'Live spraak: spraak-naar-tekst gestreamd via WebSockets, gesproken antwoorden waarbij het huidige woord oplicht, en afhandeling van onderbrekingen.',
        'Een deterministische hypotheekengine die geversioneerde tabellen met regels, kosten en rentes leest, zodat het model nooit zelf rekent.',
        'Terugbelverzoeken voor adviseurs, alleen met toestemming, opgeslagen in PostgreSQL voordat ze naar het juiste team gaan.',
        'Een beheerportaal met vier rollen: analytics, gespreksreview, beheer van de kennisbank, en concept-publiceren-herstellen voor regels en prompts.',
      ],
      results: [
        'talen, waaronder van rechts naar links',
        'backendtests geslaagd',
        'goedgekeurde hypotheekcases kloppen tot op de dirham',
      ],
      imageAlts: [
        'Landingspagina van XO met de chatwidget geopend',
        'XO toont live resultaten voor off-plan en direct beschikbare woningen in de chat',
        'Hypotheekkaart van XO met uitleg van de strengste leenlimiet',
        'XO in spraakmodus terwijl het een antwoord uitspreekt',
        'XO op een telefoon in het Arabisch, met een lay-out van rechts naar links',
        'Terugbelkaart van XO die de bezoeker vraagt de gegevens te bevestigen',
        'Inlogpagina van de backoffice van XO voor beheerders',
      ],
    },
    avaguard: {
      tagline: 'AI-ondersteunde compliance voor cloudbeveiliging in Microsoft Azure',
      category: 'AI · Cloudbeveiliging · Afstudeerproject',
      team: 'Afstudeerproject in teamverband, gebouwd voor Agency VA',
      summary:
        'Maakt zonder agents te installeren verbinding met een Microsoft Entra ID-tenant, voert CIS-benchmarkcontroles uit, berekent het risico en licht elke mislukte controle toe met op maat gemaakte, door AI gegenereerde herstelinstructies.',
      problem:
        'Handmatige compliance-audits van Azure AD waren traag en inconsistent. Securityteams moesten elke controle met de hand nalopen en daarna lange benchmarkdocumenten doorgronden om te bepalen wat er hersteld moest worden.',
      built: [
        'Een agentloze assessmentpipeline die via MSAL inlogt bij Microsoft Entra ID en 10 CIS-benchmarkcontroles gelijktijdig uitvoert.',
        'Risicoscore gewogen naar ernst (kritiek 10×, hoog 7×, gemiddeld 4×, laag 1×) en koppeling van resultaten aan NIST 800-53 en ISO 27001.',
        'Een RAG-engine getraind op CIS-documentatie die elke mislukte controle koppelt aan contextbewuste herstelstappen.',
        'Auditklare rapporten in HTML, PDF, CSV en JSON, vergelijking tussen scans en rolgebaseerde dashboards.',
        'Drie manieren om het te gebruiken: een command-line scanner, een PyQt6-desktopapp en een Django-webportaal met MFA en hash-chained auditlogs.',
      ],
      results: [
        'CIS-benchmarkcontroles gelijktijdig uitgevoerd',
        'frameworks gekoppeld: CIS, NIST 800-53, ISO 27001',
        'rapportformaten voor auditors en teams',
      ],
      imageAlts: [
        'Landingspagina van AVAGuard met een voorbeeld van de compliancescore',
        'Pipeline van AVAGuard in vijf stappen: verbinden, analyseren, scoren, koppelen en rapporteren',
        'Overzicht van geautomatiseerde CIS-benchmarkcontroles in AVAGuard',
        'Inlogpagina van het enterprise-securityportaal van AVAGuard',
        'Landingspagina van AVAGuard op een telefoon',
      ],
    },
    'icu-alarm-fatigue': {
      tagline: 'Een gelaagde Lambda-architectuur voor realtime en historische data over vitale functies',
      category: 'Onderzoek · Machine learning · Gezondheidszorg',
      team: 'Onderzoekspaper met 2 co-auteurs',
      summary:
        'IC-monitors geven in 80 tot 99% van de gevallen vals alarm, waardoor zorgverleners ze gaan negeren. Dit onderzoek valideert data vóór de machine-learning-inferentie en voegt patiëntcontext toe, waardoor valse alarmen afnemen zonder dat echte gebeurtenissen worden gemist.',
      problem:
        'Realtime streams van vitale functies worden los van historische dossiers en klinische context verwerkt, waardoor alarmen ontstaan op basis van onvolledige en vaak corrupte sensordata.',
      built: [
        'Een Speed Layer die sensorartefacten en onmogelijke metingen in minder dan een milliseconde verwijdert.',
        'Een Hybrid Layer die contextuele anomaliedetectie uitvoert met een Isolation Forest-model binnen strikte latencygrenzen.',
        'Een Serving Layer die realtime alarmen en historische gezondheidsdossiers samenbrengt in één doorzoekbaar patiëntoverzicht.',
        'Een evaluatie op 5000 hartslagrecords uit de klinische database MIMIC-III, vergeleken met een regelgebaseerde baseline met drempelwaarden.',
      ],
      results: [
        'minder valse alarmen (310 → 193)',
        'recall: geen enkele echte anomalie gemist',
        'gemiddelde verwerkingstijd per record',
      ],
      imageAlts: [],
    },
    'al-safwa': {
      tagline: 'Mobile-first B2B-catalogus en aanvraagwebsite voor een stoffenleverancier',
      category: 'Web · SEO · Klantproject',
      team: 'Solo: ontwerp, ontwikkeling en testen',
      summary:
        'Een verkoper die 24/7 werkt voor een stoffenleverancier in Pakistan: elke stof heeft een eigen pagina met exacte specificaties, kopers filteren de catalogus binnen enkele seconden op hun telefoon, en bestellen gaat via WhatsApp met een vooraf ingevuld bericht.',
      problem:
        'Inkopers van stoffen zoeken op hun telefoon en bestellen via WhatsApp, en elke koper stelt dezelfde vragen over GSM, breedte, kleuren en minimale afname, die de leverancier chat voor chat beantwoordde.',
      built: [
        "Zes combineerbare catalogusfilters die ook zonder JavaScript werken, met deelbare URL's.",
        "Stoffenpagina's met elke specificatie als indexeerbare tekst, een swipebare galerij en aanvragen voor offertes of stalen.",
        "Een PDF-catalogus van 9 pagina's in de huisstijl, gegenereerd uit dezelfde data, met een QR-code voor elke stof.",
        'SEO voor zoekmachines en AI-assistenten: metadata per pagina, sitemap, structured data en een samenvatting in llms.txt.',
      ],
      results: ['geautomatiseerde tests geslaagd', 'Lighthouse-score voor SEO', 'Lighthouse-score voor toegankelijkheid'],
      imageAlts: [
        'Homepage van Al Safwa Fabrics',
        'Catalogus van Al Safwa met combineerbare stoffenfilters',
        'Stoffenpagina van Al Safwa met galerij, belangrijkste specificaties en offerteknoppen',
        "Pagina's van Al Safwa op telefoons",
        "Pagina's van de gegenereerde PDF-catalogus met QR-codes",
      ],
    },
    edenbridge: {
      tagline: 'Responsieve, SEO-geoptimaliseerde website voor een school in Pakistan',
      category: 'Web · WordPress',
      team: 'Gebouwd met de CEO van de school, de curriculumontwerper en een ontwikkelteam',
      summary:
        'Een schoolwebsite die de online zichtbaarheid verbeterde en informatie voor ouders makkelijk vindbaar maakte, opgeleverd met Agile requirementsanalyse en feedbackrondes.',
      problem:
        'De school had een sterkere online aanwezigheid nodig, zodat ouders informatie over inschrijving en curriculum snel konden vinden.',
      built: [
        'Een responsieve WordPress-site met lay-outaanpassingen op basis van Elementor.',
        'Zoekmachineoptimalisatie voor betere zichtbaarheid.',
        'Deployment en hosting bij Hostinger.',
      ],
      results: [],
      imageAlts: [],
    },
    'hotel-reservation': {
      tagline: 'Full-stack boekingssysteem met authenticatie',
      category: 'Web · Full stack · Universiteitsproject',
      team: 'Studieproject in het vijfde semester',
      summary:
        'Een responsief reserveringssysteem voor hotels met boekingsflows, gebruikersauthenticatie en databasebewerkingen.',
      problem: 'Gasten hadden een eenvoudige manier nodig om kamers te bekijken en online te boeken, op elk apparaat.',
      built: [
        'Front-end in React, responsief op elk apparaat.',
        'Back-end in PHP met authenticatie en gestructureerde databasebewerkingen.',
      ],
      results: [],
      imageAlts: [],
    },
  },
  education: {
    'BS Software Engineering': {
      degree: 'BS Software Engineering',
      school: 'Foundation University Islamabad (FUSST campus)',
      grade: 'CGPA 3.68 / 4.00',
      details: [
        'Afstudeerproject: AVAGuard, AI-ondersteunde compliance voor cloudbeveiliging voor Agency VA.',
        'Onderzoek: alarmmoeheid op de IC verminderen met een gelaagde Lambda-architectuur.',
        'Klassenvertegenwoordiger en studentcoördinator; leidde universiteitsteams bij interuniversitaire wedstrijden.',
      ],
    },
    'Intermediate in Computer Science': {
      degree: 'Intermediate in Computer Science',
      school: 'Pakistan School Muscat',
      details: [],
    },
  },
  awards: [
    {
      title: 'Prestatiebeurs, 3e plaats',
      issuer: 'Foundation University Islamabad',
      description: 'Als 3e van mijn jaargang geëindigd in het 5e semester, met een semester-GPA van 3.9.',
    },
    {
      title: 'Prestatiebeurs, 2e plaats',
      issuer: 'Foundation University Islamabad',
      description: 'Als 2e van mijn jaargang geëindigd in het 3e semester, met een semester-GPA van 3.9.',
    },
    {
      title: 'CodeWar Season 2, interuniversitaire programmeerwedstrijd',
      issuer: 'HITEC University Taxila',
      description: 'Deelgenomen aan een interuniversitaire programmeerwedstrijd tegen de klok, georganiseerd door HITEC University.',
    },
  ],
  skillGroupTitles: {
    'ai-systems': 'AI-systemen',
    ml: 'Machine learning',
    languages: 'Talen en libraries',
    backend: 'Backend en data',
    frontend: 'Frontend',
    delivery: 'Testen en oplevering',
    research: 'Onderzoek',
  },
  research: {
    affiliation:
      'Afdeling Software Engineering, Foundation University School of Science and Technology, Rawalpindi',
    abstract:
      'Alarmmoeheid op de intensive care is een groot probleem voor de patiëntveiligheid: 80 tot 99% van de monitoralarmen is vals, wat leidt tot gewenning en vertraagde reacties. Een deel van de oorzaak is architectonisch, omdat realtime fysiologische datastromen los van historische dossiers en klinische context worden verwerkt. Het paper stelt een gelaagde Lambda-architectuur voor die realtime- en batchverwerking combineert en de datakwaliteit valideert vóór de machine-learning-inferentie. Getest op 5000 hartslagrecords uit de MIMIC-III-database en vergeleken met een regelgebaseerd systeem met drempelwaarden, laat het zien dat voorrang geven aan datakwaliteit en context alarmmoeheid sterker vermindert dan modelcomplexiteit alleen.',
    results: [
      'minder valse alarmen (310 → 193)',
      'fout-positieve ratio',
      'precisie',
      'recall, geen enkele echte anomalie gemist',
      'corrupte records vroegtijdig gefilterd',
      'gemiddelde end-to-end-latency per record',
    ],
    method: [
      'Speed Layer: fysiologische en temporele validatie die sensorartefacten in minder dan een milliseconde verwijdert.',
      'Hybrid Layer: contextuele anomaliedetectie met een Isolation Forest-model binnen strikte latencygrenzen.',
      'Serving Layer: realtime alarmen gecombineerd met historische gezondheidsdossiers in één consistent patiëntoverzicht.',
    ],
  },
  callouts: [
    { label: 'RAG-pipelines', detail: 'onderbouwde antwoorden, eerlijk "weet ik niet"' },
    { label: '21 talen', detail: 'XO, live in productie' },
    { label: 'Spraak-AI', detail: 'live spraak-naar-tekst en spraak' },
    { label: 'LLM-loop, 18 tools', detail: 'function calling in XO' },
    { label: '223 tests', detail: 'bewaken de backend van XO' },
    { label: '−37.7% valse alarmen', detail: 'onderzoek naar IC-monitoring' },
    { label: 'LangChain · AI-agents', detail: 'orkestratie en tools' },
    { label: 'FastAPI · Python', detail: 'backends in productie' },
    { label: 'PyTorch · Hugging Face', detail: 'deep-learningstack' },
    { label: 'Vectordatabases', detail: 'embeddings en zoeken' },
    { label: 'Oracle AI Foundations', detail: 'gecertificeerd Associate' },
    { label: 'IBM Machine Learning', detail: 'gecertificeerd met Python' },
    { label: 'CGPA 3.68', detail: 'twee prestatiebeurzen' },
    { label: 'Gevestigd in Dubai', detail: 'open voor functies in VAE, VS, DE, NL' },
  ],
  formations: [
    { name: 'Kennis', detail: 'één samenhangend model van het domein' },
    { name: 'Retrieval', detail: 'documenten geclusterd op betekenis (RAG)' },
    { name: 'Spraak', detail: 'spraak erin, spraak eruit, in realtime' },
    { name: 'Redeneren', detail: 'LLM-tool loops in meerdere stappen' },
  ],
}
