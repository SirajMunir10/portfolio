import type { ContentTranslation } from './types'

/** German page content, layered over the English base content. */
export const de: ContentTranslation = {
  profile: {
    role: 'AI Engineer · LLM Engineer',
    headline: 'Ich entwickle LLM-, RAG- und Sprach-KI-Produkte, die Menschen wirklich nutzen.',
    headlineHighlight: 'LLM-, RAG- und Sprach-KI-Produkte',
    intro:
      'Softwareentwickler mit Schwerpunkt auf Large Language Models, Retrieval-Augmented Generation und Backend-Systemen. Ich bringe KI-Produkte von der Idee bis in die Produktion: die Dialog- und Sprachpipeline, das Retrieval dahinter sowie Backend, Tests und Admin-Tools, die alles zuverlässig am Laufen halten.',
    quote: 'KI sollte ehrlich sagen, was sie weiß, und jede Zahl sollte aus dem Code kommen, nicht aus einer Schätzung.',
    about: [
      'Bei Xoto habe ich XO entwickelt, einen Chat- und Sprachassistenten für Immobilien und Hypotheken in den VAE. Er antwortet in 21 Sprachen, durchsucht aktuelle Immobilienangebote, prüft die Finanzierungsfähigkeit mit einer regelbasierten Engine, damit das Modell nie selbst rechnet, und übergibt ernsthafte Kaufinteressenten an einen Berater. Außerdem habe ich das Admin-Portal gebaut, mit dem das Team Gespräche prüft, die Wissensdatenbank aktualisiert und Kreditregeln ändert, ohne auf einen Entwickler warten zu müssen.',
      'Mein Software-Engineering-Studium an der Foundation University Islamabad habe ich mit einem CGPA von 3.68 und zwei Leistungsstipendien abgeschlossen. Meine Forschungsarbeit im letzten Studienjahr zur Alarmmüdigkeit auf der Intensivstation senkte die Fehlalarme um 37.7%, ohne ein einziges echtes Ereignis zu übersehen, und mein Abschlussprojekt AVAGuard automatisiert Cloud-Sicherheitsaudits nach CIS-Benchmarks mit KI-generierten Empfehlungen zur Behebung.',
      'Mir ist wichtig, dass KI ehrlich sagt, was sie weiß, dass Zahlen aus dem Code statt aus Schätzungen kommen und dass Produkte getestet sind, bevor sich jemand auf sie verlässt.',
    ],
    availability: 'Offen für Rollen als AI Engineer',
    photoAlt: 'Siraj Munir in einem dunklen Anzug, an einer Bar sitzend, in sanftem Licht',
    focusAreas: [
      {
        title: 'LLM-Anwendungen',
        description: 'Function Calling, mehrstufige Tool-Loops, gestreamte Antworten, Prompt-Design und Guardrails.',
      },
      {
        title: 'Retrieval (RAG)',
        description: 'Embeddings, Vektorsuche und fundierte Antworten mit einem ehrlichen „Das weiß ich nicht“.',
      },
      {
        title: 'Sprach-KI',
        description: 'Live-Spracherkennung über WebSockets und Sprachausgabe mit Timing auf Wortebene.',
      },
      {
        title: 'Machine Learning',
        description: 'Anomalieerkennung, Modellevaluierung und Benchmarking an realen Zielvorgaben.',
      },
    ],
  },
  highlights: [
    { label: 'Sprachen', detail: 'spricht und schreibt XO, mein Assistent im Produktivbetrieb' },
    { label: 'automatisierte Tests', detail: 'sichern das XO-Backend ab' },
    { label: 'weniger Fehlalarme', detail: 'in meiner Forschung zum Monitoring auf der Intensivstation' },
    { label: 'CGPA', detail: 'BS Software Engineering, zwei Leistungsstipendien' },
  ],
  languageLevels: ['Verhandlungssicher', 'Muttersprache', 'Verhandlungssicher', 'Fließend'],
  experience: {
    Xoto: {
      role: 'AI Engineer / LLM Engineer',
      summary:
        'Entwicklung von XO, dem LLM-gestützten Dialogassistenten des Unternehmens für Immobilienkäufer, Makler, Broker und Hypothekenberater.',
      highlights: [
        'Entwicklung von XO von Grund auf mit RAG, Embeddings, Vektorsuche und LLM-Orchestrierung über einen mehrstufigen Tool-Loop.',
        'Mehrsprachige Voice- und Text-Workflows in 21 Sprachen, mit Multi-Intent-Erkennung und kontextbezogener Gesprächsführung.',
        'Benchmarking und Optimierung von LLM-, Speech-to-Text- und Text-to-Speech-Modellen hinsichtlich Latenz und Antwortqualität.',
        'Keine Zahl stammt vom Modell: Eine deterministische Hypotheken-Engine liest versionierte Regeltabellen, und Leads gehen erst nach Einwilligung an CRM-Gateways.',
        'Entwicklung des Admin-Portals: rollenbasierter Zugriff, Analytics, Gesprächsprüfung, Bearbeitung der Wissensdatenbank und versionierte Geschäftsregeln.',
        'Erstellung von 223 Backend-Tests sowie Playwright-End-to-End-Tests für Desktop, Android und iPhone.',
      ],
    },
    'Crater Code': {
      role: 'Softwareentwickler',
      summary:
        'Mitarbeit an einem Echtzeitsystem zur Katastrophenüberwachung, das KI-Chatbots mit Geodaten verbindet.',
      highlights: [
        'Mitarbeit an einem Echtzeitsystem zur Katastrophenüberwachung mit integrierten KI-Chatbots und Geodaten.',
        'Unterstützung bei Backend-Entwicklung und Systemintegration für niedrige Latenzen.',
        'Arbeit an KI-gestützten Funktionen, die Echtzeit-Überwachungsdaten leichter zugänglich machten.',
      ],
    },
    Excelerate: {
      role: 'Praktikant Projektmanagement',
      employment: 'Praktikum · Remote',
      summary: 'Leitung eines internationalen Teams, das KI-Tools für reale Geschäftsabläufe bewertete.',
      highlights: [
        'Leitung eines 9-köpfigen internationalen Teams, das KI-Tools für Aufgabenautomatisierung, Ressourcenmanagement und Risikominderung bewertete.',
        'Präsentation der Ergebnisse in einem quantitativen Analysebericht, der auch ethische und Nachhaltigkeitsaspekte behandelte.',
      ],
    },
    'Tech Net Group': {
      role: 'Webentwickler',
      employment: 'Praktikum',
      summary: 'Frontend-Entwicklung eines Echtzeit-Web-Dashboards.',
      highlights: [
        'Entwicklung eines Echtzeit-Wetter-Dashboards mit der OpenWeather API.',
        'Umsetzung interaktiver Frontend-Funktionen mit React.js und Redux.',
        'Optimierung von Funktionalität und Performance, bewertet mit der Projektnote A+.',
      ],
    },
  },
  projects: {
    xo: {
      tagline: 'Mehrsprachiger KI-Chat- und Sprachassistent für Immobilien und Hypotheken in den VAE',
      category: 'Conversational AI · Produktivsystem',
      team: 'Komplett bei Xoto entwickelt',
      summary:
        'Ein Assistent im Produktivbetrieb, mit dem Käufer Immobilien suchen, ihre Finanzierungsfähigkeit prüfen, Raten und Gebühren abschätzen, Fragen zum Unternehmen stellen und einen Rückruf durch einen Berater anfordern können, per Text oder Sprache, in 21 Sprachen.',
      problem:
        'Immobilienkäufer in den VAE vergleichen Angebote, rechnen aus, wie viel eine Bank ihnen leiht, und addieren Gebühren, oft in einer Fremdsprache. Makler und Berater beantworten dieselben Fragen von Hand, und eine falsche Zahl kostet Vertrauen.',
      built: [
        'LLM mit Function Calling und einem mehrstufigen Tool-Loop über 18 Tools: Immobiliensuche, Vergleiche, Hypothekenrechner, Wissensabruf und Übergabe an Berater.',
        'RAG über die Wissensdatenbank des Unternehmens mit dem Fallback „Das weiß ich nicht, ich verbinde Sie mit einem Berater“, statt zu raten.',
        'Live-Sprache: Speech-to-Text per WebSockets gestreamt, gesprochene Antworten mit Hervorhebung des aktuellen Worts und Umgang mit Unterbrechungen.',
        'Eine deterministische Hypotheken-Engine, die versionierte Regel-, Gebühren- und Zinstabellen liest, damit das Modell nie selbst rechnet.',
        'Beraterrückrufe nur mit Einwilligung, gespeichert in PostgreSQL, bevor sie an das zuständige Team weitergeleitet werden.',
        'Ein Admin-Portal mit vier Rollen: Analytics, Gesprächsprüfung, Bearbeitung der Wissensdatenbank sowie Entwurf, Veröffentlichung und Wiederherstellung für Regeln und Prompts.',
      ],
      results: [
        'Sprachen, auch von rechts nach links',
        'Backend-Tests bestanden',
        'genehmigte Hypothekenfälle auf den Dirham genau getroffen',
      ],
      imageAlts: [
        'XO-Startseite mit geöffnetem Chat-Widget',
        'XO zeigt aktuelle Off-Plan- und bezugsfertige Immobilien im Chat',
        'XO-Karte zur Finanzierungsfähigkeit mit Erklärung der engsten Kreditgrenze',
        'XO im Sprachmodus, während es eine Antwort spricht',
        'XO auf einem Smartphone auf Arabisch mit Layout von rechts nach links',
        'XO-Karte für den Beraterrückruf, die den Besucher bittet, seine Angaben zu bestätigen',
        'Anmeldeseite des XO-Admin-Backoffice',
      ],
    },
    avaguard: {
      tagline: 'KI-gestützte Cloud-Security-Compliance für Microsoft Azure',
      category: 'KI · Cloud-Sicherheit · Abschlussprojekt',
      team: 'Team-Abschlussprojekt, entwickelt für Agency VA',
      summary:
        'Verbindet sich ohne Agent-Installation mit einem Tenant in Microsoft Entra ID, führt CIS-Benchmark-Prüfungen aus, bewertet das Risiko und erklärt jede nicht bestandene Kontrolle mit maßgeschneiderten, KI-generierten Empfehlungen zur Behebung.',
      problem:
        'Manuelle Compliance-Audits für Azure AD waren langsam und uneinheitlich. Security-Teams mussten jede Kontrolle von Hand prüfen und dann lange Benchmark-Dokumente auslegen, um herauszufinden, was zu beheben ist.',
      built: [
        'Eine agentenlose Assessment-Pipeline, die sich per MSAL bei Microsoft Entra ID anmeldet und 10 CIS-Benchmark-Prüfungen parallel ausführt.',
        'Nach Schweregrad gewichtete Risikobewertung (kritisch 10×, hoch 7×, mittel 4×, niedrig 1×) und Zuordnung der Ergebnisse zu NIST 800-53 und ISO 27001.',
        'Eine auf der CIS-Dokumentation trainierte RAG-Engine, die jeder nicht bestandenen Kontrolle kontextbezogene Behebungsschritte zuordnet.',
        'Auditfähige Berichte in HTML, PDF, CSV und JSON, Scan-Vergleiche und rollenbasierte Dashboards.',
        'Drei Nutzungswege: ein Kommandozeilen-Scanner, eine PyQt6-Desktop-App und ein Django-Webportal mit MFA und hash-verketteten Audit-Logs.',
      ],
      results: [
        'CIS-Benchmark-Prüfungen, parallel ausgeführt',
        'Frameworks zugeordnet: CIS, NIST 800-53, ISO 27001',
        'Berichtsformate für Auditoren und Teams',
      ],
      imageAlts: [
        'AVAGuard-Startseite mit Vorschau des Compliance-Scores',
        'AVAGuard-Pipeline in fünf Schritten: verbinden, analysieren, bewerten, zuordnen und berichten',
        'AVAGuard-Liste der automatisierten CIS-Benchmark-Prüfungen',
        'Anmeldung zum Enterprise-Sicherheitsportal von AVAGuard',
        'AVAGuard-Startseite auf einem Smartphone',
      ],
    },
    'icu-alarm-fatigue': {
      tagline: 'Eine mehrstufige Lambda-Architektur für Echtzeit- und historische Vitaldaten',
      category: 'Forschung · Machine Learning · Gesundheitswesen',
      team: 'Forschungspaper mit 2 Co-Autoren',
      summary:
        'Monitore auf der Intensivstation lösen in 80 bis 99% der Fälle Fehlalarme aus, sodass das klinische Personal sie irgendwann ausblendet. Diese Forschung validiert die Daten vor der Machine-Learning-Inferenz und ergänzt den Patientenkontext, sodass weniger Fehlalarme entstehen, ohne echte Ereignisse zu übersehen.',
      problem:
        'Echtzeit-Vitaldatenströme werden getrennt von historischen Akten und klinischem Kontext verarbeitet, sodass Alarme auf Basis unvollständiger und oft fehlerhafter Sensordaten entstehen.',
      built: [
        'Ein Speed Layer, der Sensorartefakte und unmögliche Messwerte in unter einer Millisekunde verwirft.',
        'Ein Hybrid Layer, der kontextbezogene Anomalieerkennung mit einem Isolation-Forest-Modell unter strikten Latenzvorgaben ausführt.',
        'Ein Serving Layer, der Echtzeit-Alarme mit historischen Gesundheitsdaten zu einer abfragbaren Patientenansicht zusammenführt.',
        'Eine Evaluation an 5000 Herzfrequenz-Datensätzen aus der klinischen Datenbank MIMIC-III im Vergleich zu einer regelbasierten Schwellenwert-Baseline.',
      ],
      results: [
        'weniger Fehlalarme (310 → 193)',
        'Recall: keine echte Anomalie übersehen',
        'durchschnittliche Verarbeitungszeit pro Datensatz',
      ],
      imageAlts: [],
    },
    'al-safwa': {
      tagline: 'Mobile-first B2B-Katalog- und Anfrage-Website für einen Stofflieferanten',
      category: 'Web · SEO · Kundenprojekt',
      team: 'Allein umgesetzt: Design, Entwicklung und Tests',
      summary:
        'Ein Verkäufer, der rund um die Uhr arbeitet, für einen Stofflieferanten in Pakistan: Jeder Stoff hat eine eigene Seite mit genauen Spezifikationen, Einkäufer filtern den Katalog in Sekunden auf dem Smartphone, und bestellt wird über WhatsApp mit einer vorausgefüllten Nachricht.',
      problem:
        'Stoffeinkäufer stöbern auf dem Smartphone und bestellen über WhatsApp, und jeder stellt dieselben Fragen zu GSM, Breite, Farben und Mindestbestellmenge, die der Lieferant Chat für Chat beantwortete.',
      built: [
        'Sechs kombinierbare Katalogfilter, die auch ohne JavaScript funktionieren, mit teilbaren URLs.',
        'Stoffseiten mit allen Spezifikationen als crawlbarem Text, einer wischbaren Galerie sowie Angebots- oder Musteranfragen.',
        'Ein 9-seitiger PDF-Katalog im Markendesign, aus denselben Daten generiert, mit einem QR-Code für jeden Stoff.',
        'SEO für Suchmaschinen und KI-Assistenten: Metadaten pro Seite, Sitemap, strukturierte Daten und eine llms.txt-Zusammenfassung.',
      ],
      results: ['automatisierte Tests bestanden', 'Lighthouse-SEO-Score', 'Lighthouse-Score für Barrierefreiheit'],
      imageAlts: [
        'Startseite von Al Safwa Fabrics',
        'Katalog von Al Safwa mit kombinierbaren Stofffiltern',
        'Stoffseite von Al Safwa mit Galerie, wichtigsten Spezifikationen und Angebotsanfrage',
        'Seiten von Al Safwa auf Smartphones',
        'Seiten des generierten PDF-Katalogs mit QR-Codes',
      ],
    },
    edenbridge: {
      tagline: 'Responsive, SEO-optimierte Website für eine Schule in Pakistan',
      category: 'Web · WordPress',
      team: 'Umgesetzt mit dem CEO der Schule, dem Lehrplanverantwortlichen und einem Entwicklungsteam',
      summary:
        'Eine Schulwebsite, die die Sichtbarkeit im Netz verbessert und Informationen für Eltern leicht auffindbar gemacht hat, umgesetzt mit agiler Anforderungserhebung und Feedback-Zyklen.',
      problem:
        'Die Schule brauchte einen stärkeren Online-Auftritt, damit Eltern Informationen zu Aufnahme und Lehrplan schnell finden.',
      built: [
        'Eine responsive WordPress-Website mit individuell angepasstem Layout auf Basis von Elementor.',
        'Suchmaschinenoptimierung für bessere Sichtbarkeit.',
        'Deployment und Hosting bei Hostinger.',
      ],
      results: [],
      imageAlts: [],
    },
    'hotel-reservation': {
      tagline: 'Full-Stack-Buchungssystem mit Authentifizierung',
      category: 'Web · Full Stack · Universitätsprojekt',
      team: 'Studienprojekt im fünften Semester',
      summary:
        'Ein responsives Hotelreservierungssystem mit Buchungsabläufen, Benutzerauthentifizierung und Datenbankoperationen.',
      problem: 'Gäste brauchten eine einfache Möglichkeit, Zimmer anzusehen und online zu buchen, auf jedem Gerät.',
      built: [
        'React-Frontend, responsiv auf jedem Gerät.',
        'PHP-Backend mit Authentifizierung und strukturierten Datenbankoperationen.',
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
        'Abschlussprojekt: AVAGuard, KI-gestützte Cloud-Security-Compliance für Agency VA.',
        'Forschung: Reduzierung der Alarmmüdigkeit auf der Intensivstation mit einer mehrstufigen Lambda-Architektur.',
        'Kurssprecher und studentischer Koordinator, Leitung von Hochschulteams bei hochschulübergreifenden Wettbewerben.',
      ],
    },
    'Intermediate in Computer Science': {
      degree: 'Intermediate in Informatik',
      school: 'Pakistan School Muscat',
      details: [],
    },
  },
  awards: [
    {
      title: 'Leistungsstipendium, 3. Platz',
      issuer: 'Foundation University Islamabad',
      description: '3. Platz meines Jahrgangs im 5. Semester, mit einem Semester-GPA von 3.9.',
    },
    {
      title: 'Leistungsstipendium, 2. Platz',
      issuer: 'Foundation University Islamabad',
      description: '2. Platz meines Jahrgangs im 3. Semester, mit einem Semester-GPA von 3.9.',
    },
    {
      title: 'CodeWar Season 2, hochschulübergreifender Programmierwettbewerb',
      issuer: 'HITEC University Taxila',
      description:
        'Teilnahme an einem zeitlich begrenzten, hochschulübergreifenden Programmierwettbewerb der HITEC University.',
    },
  ],
  skillGroupTitles: {
    'ai-systems': 'KI-Systeme',
    ml: 'Machine Learning',
    languages: 'Programmiersprachen und Bibliotheken',
    backend: 'Backend und Daten',
    frontend: 'Frontend',
    delivery: 'Testing und Delivery',
    research: 'Forschung',
  },
  research: {
    affiliation:
      'Fachbereich Software Engineering, Foundation University School of Science and Technology, Rawalpindi',
    abstract:
      'Alarmmüdigkeit auf Intensivstationen ist ein erhebliches Problem für die Patientensicherheit: 80 bis 99% der Monitoralarme sind Fehlalarme, was zu Abstumpfung und verzögerten Reaktionen führt. Ein Teil der Ursache ist architektonisch, denn physiologische Echtzeitdatenströme werden getrennt von historischen Akten und klinischem Kontext verarbeitet. Das Paper schlägt eine mehrstufige Lambda-Architektur vor, die Echtzeit- und Batch-Verarbeitung kombiniert und die Datenqualität vor der Machine-Learning-Inferenz validiert. Getestet an 5000 Herzfrequenz-Datensätzen aus der Datenbank MIMIC-III im Vergleich zu einem regelbasierten Schwellenwertsystem zeigt sie, dass die Priorisierung von Datenqualität und Kontext die Alarmmüdigkeit stärker reduziert als Modellkomplexität allein.',
    results: [
      'weniger Fehlalarme (310 → 193)',
      'Falsch-Positiv-Rate',
      'Precision',
      'Recall, keine echte Anomalie übersehen',
      'fehlerhafte Datensätze frühzeitig gefiltert',
      'durchschnittliche End-to-End-Latenz pro Datensatz',
    ],
    method: [
      'Speed Layer: physiologische und zeitliche Validierung, die Sensorartefakte in unter einer Millisekunde verwirft.',
      'Hybrid Layer: kontextbezogene Anomalieerkennung mit einem Isolation-Forest-Modell unter strikten Latenzvorgaben.',
      'Serving Layer: Echtzeit-Alarme kombiniert mit historischen Gesundheitsdaten in einer konsistenten Patientenansicht.',
    ],
  },
  callouts: [
    { label: 'RAG-Pipelines', detail: 'fundierte Antworten, ehrliches „Weiß ich nicht“' },
    { label: '21 Sprachen', detail: 'XO, live im Einsatz' },
    { label: 'Sprach-KI', detail: 'Live-Spracherkennung und Sprachausgabe' },
    { label: 'LLM-Loop, 18 Tools', detail: 'Function Calling in XO' },
    { label: '223 Tests', detail: 'sichern das XO-Backend ab' },
    { label: '−37.7% Fehlalarme', detail: 'Forschung zum Intensiv-Monitoring' },
    { label: 'LangChain · KI-Agenten', detail: 'Orchestrierung und Tools' },
    { label: 'FastAPI · Python', detail: 'Backends im Produktivbetrieb' },
    { label: 'PyTorch · Hugging Face', detail: 'Deep-Learning-Stack' },
    { label: 'Vektordatenbanken', detail: 'Embeddings und Suche' },
    { label: 'Oracle AI Foundations', detail: 'zertifizierter Associate' },
    { label: 'IBM Machine Learning', detail: 'zertifiziert mit Python' },
    { label: 'CGPA 3.68', detail: 'zwei Leistungsstipendien' },
    { label: 'Standort Dubai', detail: 'offen für Stellen: VAE, USA, DE, NL' },
  ],
  formations: [
    { name: 'Wissen', detail: 'ein vernetztes Modell der Domäne' },
    { name: 'Retrieval', detail: 'Dokumente nach Bedeutung gruppiert (RAG)' },
    { name: 'Stimme', detail: 'Sprache rein, Sprache raus, in Echtzeit' },
    { name: 'Reasoning', detail: 'mehrstufige LLM-Tool-Loops' },
  ],
}
