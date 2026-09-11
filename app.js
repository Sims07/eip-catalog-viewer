// URLs officielles corrigées sur enterpriseintegrationpatterns.com
const officialImages = {
  // Messaging Channels
  "point-to-point-channel": "https://www.enterpriseintegrationpatterns.com/img/PointToPointSolution.gif",
  "publish-subscribe": "https://www.enterpriseintegrationpatterns.com/img/PublishSubscribeSolution.gif",
  "datatype-channel": "https://www.enterpriseintegrationpatterns.com/img/DatatypeSolution.gif",
  "invalid-message-channel": "https://www.enterpriseintegrationpatterns.com/img/InvalidMessageSolution.gif",
  "dead-letter-channel": "https://www.enterpriseintegrationpatterns.com/img/DeadLetterChannelSolution.gif",
  "guaranteed-delivery": "https://www.enterpriseintegrationpatterns.com/img/GuaranteedMessagingSolution.gif",
  "message-bus": "https://www.enterpriseintegrationpatterns.com/img/MessageBusSolution.gif",

  // Message Routing
  "message-router": "https://www.enterpriseintegrationpatterns.com/img/MessageRouter.gif",
  "content-based-router": "https://www.enterpriseintegrationpatterns.com/img/ContentBasedRouter.gif",
  "message-filter": "https://www.enterpriseintegrationpatterns.com/img/MessageFilter.gif",
  "dynamic-router": "https://www.enterpriseintegrationpatterns.com/img/DynamicRouter.gif",
  "recipient-list": "https://www.enterpriseintegrationpatterns.com/img/RecipientList.gif",
  "splitter": "https://www.enterpriseintegrationpatterns.com/img/Sequencer.gif",
  "aggregator": "https://www.enterpriseintegrationpatterns.com/img/Aggregator.gif",
  "resequencer": "https://www.enterpriseintegrationpatterns.com/img/Resequencer.gif",
  "composed-message-processor": "https://www.enterpriseintegrationpatterns.com/img/ComposedMessageProcessor.gif",

  // Message Transformation
  "message-translator": "https://www.enterpriseintegrationpatterns.com/img/MessageTranslator.gif",
  "envelope-wrapper": "https://www.enterpriseintegrationpatterns.com/img/EnvelopeWrapperIcon.gif",
  "content-enricher": "https://www.enterpriseintegrationpatterns.com/img/DataEnricher.gif",
  "content-filter": "https://www.enterpriseintegrationpatterns.com/img/ContentFilter.gif",
  "claim-check": "https://www.enterpriseintegrationpatterns.com/img/StoreInLibrary.gif",

  // Messaging Endpoints & System Management
  "polling-consumer": "https://www.enterpriseintegrationpatterns.com/img/PollingConsumerSolution.gif",
  "event-driven-consumer": "https://www.enterpriseintegrationpatterns.com/img/EventDrivenConsumerSolution.gif",
  "competing-consumers": "https://www.enterpriseintegrationpatterns.com/img/CompetingConsumers.gif",
  "idempotent-receiver": "https://www.enterpriseintegrationpatterns.com/img/IdempotentReceiver.gif",
  "wire-tap": "https://www.enterpriseintegrationpatterns.com/img/WireTap.gif"
};

// Fallback SVG si une image échoue à charger
function getFallbackSVG() {
  return `<svg viewBox="0 0 320 100" class="w-full h-28">
    <defs>
      <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#cbd5e1" />
        <stop offset="50%" stop-color="#f1f5f9" />
        <stop offset="100%" stop-color="#94a3b8" />
      </linearGradient>
      <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
      </marker>
    </defs>
    <rect x="10" y="38" width="85" height="24" rx="3" fill="url(#pipeGrad)" stroke="#475569" stroke-width="1.5" />
    <path d="M 100 50 L 125 50" stroke="#64748b" stroke-width="2" marker-end="url(#arr)" />
    <rect x="125" y="25" width="70" height="50" rx="4" fill="#bef264" stroke="#3f6212" stroke-width="1.5" />
    <text x="160" y="53" font-family="sans-serif" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">EIP Pattern</text>
    <path d="M 195 50 L 220 50" stroke="#64748b" stroke-width="2" marker-end="url(#arr)" />
    <rect x="220" y="38" width="85" height="24" rx="3" fill="url(#pipeGrad)" stroke="#475569" stroke-width="1.5" />
  </svg>`;
}

// ============================================================
// Schémas d'architecture "Implémentation technique"
// Stack de référence : Microservices / Kafka / Java / Spring Boot
// Chaque nœud représente un composant technique typé ; le rendu
// SVG est généré dynamiquement à partir de nodes + edges.
// ============================================================

const NODE_STYLES = {
  service:    { fill: '#ECFDF5', stroke: '#16A34A', text: '#065F46', badge: 'SPRING BOOT',     icon: '🍃' },
  topic:      { fill: '#FFFFFF', stroke: '#1E293B', text: '#1E293B', badge: 'KAFKA TOPIC',      icon: '📨' },
  dlq:        { fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B', badge: 'KAFKA DLQ',        icon: '☠️' },
  store:      { fill: '#F1F5F9', stroke: '#64748B', text: '#334155', badge: 'DATASTORE',        icon: '💾' },
  external:   { fill: '#F8FAFC', stroke: '#94A3B8', text: '#475569', badge: 'SYSTÈME EXT.',      icon: '🌐' },
  streams:    { fill: '#F5F3FF', stroke: '#7C3AED', text: '#5B21B6', badge: 'KAFKA STREAMS',     icon: '🌊' },
  cache:      { fill: '#FFF7ED', stroke: '#EA580C', text: '#9A3412', badge: 'REDIS CACHE',       icon: '⚡' },
  scheduler:  { fill: '#FFFBEB', stroke: '#D97706', text: '#92400E', badge: 'SCHEDULER',         icon: '⏱️' },
  registry:   { fill: '#ECFEFF', stroke: '#0891B2', text: '#155E75', badge: 'SCHEMA REGISTRY',   icon: '🗂️' },
  objectstore:{ fill: '#F0FDFA', stroke: '#0D9488', text: '#115E59', badge: 'OBJECT STORAGE',    icon: '🗄️' }
};

function archAnchor(node, side) {
  const w = node.w || 160, h = node.h || 64;
  if (side === 'right')  return { x: node.x + w,   y: node.y + h / 2 };
  if (side === 'left')   return { x: node.x,       y: node.y + h / 2 };
  if (side === 'top')    return { x: node.x + w/2, y: node.y };
  if (side === 'bottom') return { x: node.x + w/2, y: node.y + h };
  return { x: node.x, y: node.y };
}

function renderArchDiagram(spec) {
  const { nodes, edges } = spec;
  const maxX = Math.max(...nodes.map(n => n.x + (n.w || 160))) + 20;
  const maxY = Math.max(...nodes.map(n => n.y + (n.h || 64))) + 20;

  const edgesSvg = edges.map(e => {
    const from = nodes.find(n => n.id === e.from);
    const to = nodes.find(n => n.id === e.to);
    const p1 = archAnchor(from, e.fromSide || 'right');
    const p2 = archAnchor(to, e.toSide || 'left');
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    let path;
    if (Math.abs(dx) >= Math.abs(dy)) {
      const c = Math.max(30, Math.abs(dx) / 2);
      path = `M ${p1.x} ${p1.y} C ${p1.x + c} ${p1.y}, ${p2.x - c} ${p2.y}, ${p2.x} ${p2.y}`;
    } else {
      const c = Math.max(30, Math.abs(dy) / 2);
      path = `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + c}, ${p2.x} ${p2.y - c}, ${p2.x} ${p2.y}`;
    }
    const dash = e.style === 'dashed' ? 'stroke-dasharray="5,4"' : '';
    const color = e.color || '#94A3B8';
    const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
    const label = e.label ? `
      <rect x="${midX - e.label.length * 3.3 - 5}" y="${midY - 10}" width="${e.label.length * 6.6 + 10}" height="17" fill="#0F172A" rx="3"/>
      <text x="${midX}" y="${midY + 2}" font-size="9" fill="#E2E8F0" text-anchor="middle" font-family="monospace">${e.label}</text>` : '';
    return `<path d="${path}" fill="none" stroke="${color}" stroke-width="1.75" ${dash} marker-end="url(#arrowhead)"/>${label}`;
  }).join('');

  const nodesSvg = nodes.map(n => {
    const s = NODE_STYLES[n.type];
    const nw = n.w || 160, nh = n.h || 64;
    return `
      <g>
        <rect x="${n.x}" y="${n.y}" width="${nw}" height="${nh}" rx="8" fill="${s.fill}" stroke="${s.stroke}" stroke-width="1.5"/>
        <text x="${n.x + 10}" y="${n.y + 16}" font-size="8" font-weight="700" fill="${s.stroke}" font-family="monospace" letter-spacing="0.5">${s.icon} ${s.badge}</text>
        <text x="${n.x + nw / 2}" y="${n.y + (n.sub ? nh / 2 + 2 : nh / 2 + 5)}" font-size="12" font-weight="700" fill="${s.text}" text-anchor="middle" font-family="sans-serif">${n.label}</text>
        ${n.sub ? `<text x="${n.x + nw / 2}" y="${n.y + nh / 2 + 18}" font-size="9" fill="${s.text}" text-anchor="middle" font-family="monospace" opacity="0.8">${n.sub}</text>` : ''}
      </g>`;
  }).join('');

  return `<svg viewBox="0 0 ${maxX} ${maxY}" class="w-full h-auto">
    <defs>
      <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
      </marker>
    </defs>
    ${edgesSvg}
    ${nodesSvg}
  </svg>`;
}

const patternsData = [
  // --- MESSAGING CHANNELS ---
  {
    id: "point-to-point-channel",
    name: "Point-to-Point Channel",
    category: "Messaging Channels",
    summary: "Garantit qu'un seul consommateur traite chaque message envoyé.",
    problem: "Comment s'assurer qu'un message sur un canal n'est consommé que par un unique destinataire ?",
    solution: "Utiliser une file (Queue) où chaque message est extrait par un seul récepteur.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html",
    tags: ["Queue", "Unicast", "1-to-1"],
    techImplementation: {
      description: "Le canal Point-to-Point est réalisé par un topic Kafka consommé par un seul groupe de consommateurs (groupId unique). Même si le topic est partitionné pour absorber la charge, Kafka garantit qu'une partition — donc chaque message — n'est traitée que par une seule instance du groupe à la fois : la sémantique « un seul récepteur par message » est obtenue sans file dédiée par consommateur.",
      nodes: [
        { id: "p1", type: "service", label: "Order Service", x: 20, y: 40 },
        { id: "t1", type: "topic", label: "orders.created", sub: "3 partitions", x: 260, y: 40 },
        { id: "c1", type: "service", label: "Billing Service", sub: "groupId=billing-service", x: 500, y: 40 }
      ],
      edges: [
        { from: "p1", to: "t1", label: "produce" },
        { from: "t1", to: "c1", label: "consume (1 seul groupe)" }
      ]
    }
  },
  {
    id: "publish-subscribe",
    name: "Publish-Subscribe Channel",
    category: "Messaging Channels",
    summary: "Diffuse un message à tous les consommateurs abonnés au canal.",
    problem: "Comment délivrer la même information à plusieurs destinataires simultanément ?",
    solution: "Envoyer le message sur un canal Pub/Sub (Topic) qui le duplique vers chaque abonné.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html",
    tags: ["Topic", "Broadcast", "Event-Driven"],
    techImplementation: {
      description: "Le broadcast Pub/Sub est natif à Kafka : chaque groupe de consommateurs indépendant (groupId différent) reçoit sa propre copie complète du topic. Là où Point-to-Point utilise un seul groupe, ici on déclare autant de groupIds que de familles de consommateurs, sans dupliquer physiquement les données sur le broker.",
      nodes: [
        { id: "pub", type: "service", label: "Notification Service", x: 20, y: 140 },
        { id: "t", type: "topic", label: "notifications.events", sub: "topic partagé (broadcast)", x: 260, y: 140 },
        { id: "c1", type: "service", label: "Email Service", sub: "groupId=email-svc", x: 500, y: 20 },
        { id: "c2", type: "service", label: "SMS Service", sub: "groupId=sms-svc", x: 500, y: 140 },
        { id: "c3", type: "service", label: "Push Service", sub: "groupId=push-svc", x: 500, y: 260 }
      ],
      edges: [
        { from: "pub", to: "t", label: "produce" },
        { from: "t", to: "c1", label: "consume (groupe indép.)" },
        { from: "t", to: "c2", label: "consume (groupe indép.)" },
        { from: "t", to: "c3", label: "consume (groupe indép.)" }
      ]
    }
  },
  {
    id: "datatype-channel",
    name: "Datatype Channel",
    category: "Messaging Channels",
    summary: "Dédie un canal spécifique à un type de donnée particulier.",
    problem: "Comment s'assurer qu'un consommateur ne reçoit que des messages qu'il sait traiter ?",
    solution: "Créer des canaux séparés pour chaque structure de payload ou type de contrat.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DatatypeChannel.html",
    tags: ["Typage", "Routing", "Schema"],
    techImplementation: {
      description: "Chaque type de message correspond à un topic dédié et à un schéma déclaré dans le Schema Registry (Avro/Protobuf). Producteurs et consommateurs sérialisent/désérialisent selon ce contrat partagé : un message ne peut pas être publié sur le mauvais topic sans échouer la validation de schéma, ce qui matérialise le typage fort du canal.",
      nodes: [
        { id: "p1", type: "service", label: "Order Service", x: 20, y: 20 },
        { id: "t1", type: "topic", label: "orders.v1", sub: "Avro: OrderCreated", x: 260, y: 20 },
        { id: "c1", type: "service", label: "Order Consumer", x: 500, y: 20 },
        { id: "p2", type: "service", label: "Invoice Service", x: 20, y: 200 },
        { id: "t2", type: "topic", label: "invoices.v1", sub: "Avro: InvoiceIssued", x: 260, y: 200 },
        { id: "c2", type: "service", label: "Invoice Consumer", x: 500, y: 200 },
        { id: "reg", type: "registry", label: "Schema Registry", x: 260, y: 120 }
      ],
      edges: [
        { from: "p1", to: "t1", label: "produce" },
        { from: "t1", to: "c1", label: "consume" },
        { from: "p2", to: "t2", label: "produce" },
        { from: "t2", to: "c2", label: "consume" },
        { from: "t1", to: "reg", label: "schema check", fromSide: "bottom", toSide: "top", color: "#0891B2" },
        { from: "t2", to: "reg", label: "schema check", fromSide: "top", toSide: "bottom", color: "#0891B2" }
      ]
    }
  },
  {
    id: "invalid-message-channel",
    name: "Invalid Message Channel",
    category: "Messaging Channels",
    summary: "Isole les messages malformés ou ne respectant pas le schéma attendu.",
    problem: "Que faire lorsqu'un message reçu est illisible ou invalide ?",
    solution: "Dérouter immédiatement le message vers un canal dédié aux erreurs de formatage.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/InvalidMessageChannel.html",
    tags: ["Validation", "Error", "Parsing"],
    techImplementation: {
      description: "Un service de validation consomme le flux brut, applique les règles de schéma (Bean Validation / JSON Schema) et republie chaque message soit sur le topic valide, soit sur un topic dédié aux messages invalides, sans jamais laisser un message malformé atteindre les consommateurs métier.",
      nodes: [
        { id: "p", type: "service", label: "Orders API", x: 20, y: 100 },
        { id: "tin", type: "topic", label: "orders.raw", x: 250, y: 100 },
        { id: "val", type: "service", label: "Validation Service", sub: "JSON Schema / Bean Validation", x: 470, y: 100 },
        { id: "tok", type: "topic", label: "orders.valid", x: 710, y: 20 },
        { id: "terr", type: "topic", label: "orders.invalid", x: 710, y: 200 },
        { id: "cok", type: "service", label: "Order Processor", x: 940, y: 20 }
      ],
      edges: [
        { from: "p", to: "tin", label: "produce" },
        { from: "tin", to: "val", label: "consume" },
        { from: "val", to: "tok", label: "valide" },
        { from: "val", to: "terr", label: "invalide", style: "dashed", color: "#DC2626" },
        { from: "tok", to: "cok", label: "consume" }
      ]
    }
  },
  {
    id: "dead-letter-channel",
    name: "Dead Letter Channel",
    category: "Messaging Channels",
    summary: "Capture les messages impossibles à traiter après plusieurs tentatives.",
    problem: "Où stocker les messages rejetés par l'application pour rejeu ou analyse ultérieure ?",
    solution: "Rediriger automatiquement les messages en échec vers une file d'attente Morte (DLQ).",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html",
    tags: ["DLQ", "Retry", "Fault Tolerance"],
    techImplementation: {
      description: "Le traitement s'appuie sur le mécanisme d'erreur de Spring Kafka : un DefaultErrorHandler retente la consommation un nombre de fois configurable ; en cas d'échecs répétés, un DeadLetterPublishingRecoverer republie automatiquement le message en échec sur un topic dédié (suffixe .DLT), sans bloquer le reste de la partition. Le message reste disponible pour inspection ou rejeu ultérieur.",
      nodes: [
        { id: "p1", type: "service", label: "Payment Service", x: 20, y: 40 },
        { id: "t1", type: "topic", label: "payments.events", x: 260, y: 40 },
        { id: "c1", type: "service", label: "Payment Processor", sub: "retry x3 (backoff)", x: 500, y: 40 },
        { id: "dlq", type: "dlq", label: "payments.events.DLT", sub: "DeadLetterPublishingRecoverer", x: 500, y: 190 }
      ],
      edges: [
        { from: "p1", to: "t1", label: "produce" },
        { from: "t1", to: "c1", label: "consume" },
        { from: "c1", to: "dlq", label: "échec après 3 tentatives", fromSide: "bottom", toSide: "top", style: "dashed", color: "#DC2626" }
      ]
    }
  },
  {
    id: "guaranteed-delivery",
    name: "Guaranteed Delivery",
    category: "Messaging Channels",
    summary: "Assure la persistance du message même en cas de panne du serveur.",
    problem: "Comment garantir qu'un message ne sera pas perdu si le broker redémarre ?",
    solution: "Écrire le message sur un stockage persistant avant d'en accuser réception.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/GuaranteedDelivery.html",
    tags: ["Persistence", "Reliability", "Store-and-Forward"],
    techImplementation: {
      description: "La garantie de livraison Kafka repose sur trois réglages combinés : un producteur avec acks=all et idempotence activée, un topic répliqué sur plusieurs brokers (replication.factor≥3) pour survivre à une panne, et un consommateur qui ne committe son offset qu'après traitement complet du message (at-least-once).",
      nodes: [
        { id: "p", type: "service", label: "Payment Service", sub: "acks=all, idempotent", x: 20, y: 60 },
        { id: "t", type: "topic", label: "payments.events", sub: "replication.factor=3", x: 260, y: 60 },
        { id: "store", type: "store", label: "Log répliqué", sub: "3 brokers", x: 260, y: 220 },
        { id: "c", type: "service", label: "Ledger Service", sub: "commit manuel après traitement", x: 500, y: 60 }
      ],
      edges: [
        { from: "p", to: "t", label: "produce (acks=all)" },
        { from: "t", to: "store", label: "persisté + répliqué", fromSide: "bottom", toSide: "top" },
        { from: "t", to: "c", label: "consume + ack manuel" }
      ]
    }
  },
  {
    id: "message-bus",
    name: "Message Bus",
    category: "Messaging Channels",
    summary: "Fournit une infrastructure commune de découplage pour toutes les applications.",
    problem: "Comment faire interagir N applications hétérogènes sans créer de liens point-à-point ?",
    solution: "Combiner un schéma canonique, un bus de messages et des adaptateurs par application.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html",
    tags: ["ESB", "Architecture", "Decoupling"],
    techImplementation: {
      description: "Le Message Bus est matérialisé par le cluster Kafka lui-même : toutes les applications publient et consomment via un format canonique validé par un Schema Registry central, chaque système legacy étant isolé par un adaptateur Spring Boot dédié. Le bus ne connaît aucune application spécifique, seulement des topics et des contrats de schéma.",
      nodes: [
        { id: "s1", type: "service", label: "CRM Service", x: 20, y: 20 },
        { id: "s2", type: "service", label: "Billing Service", x: 20, y: 280 },
        { id: "hub", type: "topic", label: "Message Bus", sub: "Kafka Cluster", x: 380, y: 150, w: 200 },
        { id: "s3", type: "external", label: "Legacy ERP", sub: "via adaptateur", x: 740, y: 20 },
        { id: "s4", type: "service", label: "Analytics Service", x: 740, y: 280 },
        { id: "reg", type: "registry", label: "Schema Registry", sub: "format canonique", x: 380, y: 340, w: 200 }
      ],
      edges: [
        { from: "s1", to: "hub", label: "publie" },
        { from: "hub", to: "s2", label: "souscrit" },
        { from: "hub", to: "s3", label: "publie (adaptateur)" },
        { from: "s4", to: "hub", label: "souscrit", fromSide: "left", toSide: "right" },
        { from: "hub", to: "reg", label: "valide schéma", fromSide: "bottom", toSide: "top", style: "dashed", color: "#0891B2" }
      ]
    }
  },

  // --- MESSAGE ROUTING ---
  {
    id: "message-router",
    name: "Message Router",
    category: "Message Routing",
    summary: "Achemine un message vers sa destination en fonction de critères dynamiques.",
    problem: "Comment isoler l'émetteur de la topologie réseau des destinataires ?",
    solution: "Intercaler un composant qui inspecte le contexte et choisit le canal de sortie.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html",
    tags: ["Routing", "Decoupling"],
    techImplementation: {
      description: "Contrairement au Content-Based Router qui inspecte le payload métier, ce routeur générique s'appuie sur un header technique Kafka (ex. région) positionné en amont, ce qui permet de router sans désérialiser ni coupler le routeur au schéma métier du message.",
      nodes: [
        { id: "p", type: "service", label: "Shipment Gateway", x: 20, y: 100 },
        { id: "tin", type: "topic", label: "shipments.incoming", x: 250, y: 100 },
        { id: "r", type: "service", label: "Shipment Router", sub: "route sur header région", x: 470, y: 100 },
        { id: "tA", type: "topic", label: "shipments.eu", x: 710, y: 20 },
        { id: "tB", type: "topic", label: "shipments.us", x: 710, y: 200 },
        { id: "cA", type: "service", label: "EU Fulfillment Svc", x: 940, y: 20 },
        { id: "cB", type: "service", label: "US Fulfillment Svc", x: 940, y: 200 }
      ],
      edges: [
        { from: "p", to: "tin", label: "produce" },
        { from: "tin", to: "r", label: "consume" },
        { from: "r", to: "tA", label: "header.region=EU" },
        { from: "r", to: "tB", label: "header.region=US" },
        { from: "tA", to: "cA", label: "consume" },
        { from: "tB", to: "cB", label: "consume" }
      ]
    }
  },
  {
    id: "content-based-router",
    name: "Content-Based Router",
    category: "Message Routing",
    summary: "Régit l'aiguillage d'un message en fonction du contenu de son payload.",
    problem: "Comment router un message lorsque le destinataire dépend de données métier ?",
    solution: "Inspecter les champs du message (JSON, XML, FHIR) et évaluer des règles métier.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html",
    tags: ["Payload", "Rules Engine", "Routing"],
    techImplementation: {
      description: "Le routage est porté par un microservice Spring Boot dédié, stateless, qui consomme le topic d'entrée et republie chaque message vers l'un des topics de sortie selon une règle évaluée sur le contenu du payload (ex. champ type). Les microservices avals n'ont aucune connaissance du routage : ils s'abonnent uniquement au topic qui les concerne, ce qui découple émetteur, règles de routage et consommateurs.",
      nodes: [
        { id: "gw", type: "service", label: "Claims Gateway", x: 20, y: 140 },
        { id: "tin", type: "topic", label: "claims.incoming", x: 240, y: 140 },
        { id: "router", type: "service", label: "Claims Router", sub: "stateless, sans état métier", x: 460, y: 140 },
        { id: "th", type: "topic", label: "claims.health", x: 700, y: 20 },
        { id: "ta", type: "topic", label: "claims.auto", x: 700, y: 140 },
        { id: "to", type: "topic", label: "claims.other", x: 700, y: 260 },
        { id: "ch", type: "service", label: "Health Claims Svc", x: 940, y: 20 },
        { id: "ca", type: "service", label: "Auto Claims Svc", x: 940, y: 140 },
        { id: "co", type: "service", label: "Other Claims Svc", x: 940, y: 260 }
      ],
      edges: [
        { from: "gw", to: "tin", label: "produce" },
        { from: "tin", to: "router", label: "consume" },
        { from: "router", to: "th", label: "type=HEALTH" },
        { from: "router", to: "ta", label: "type=AUTO" },
        { from: "router", to: "to", label: "type=OTHER" },
        { from: "th", to: "ch", label: "consume" },
        { from: "ta", to: "ca", label: "consume" },
        { from: "to", to: "co", label: "consume" }
      ]
    }
  },
  {
    id: "message-filter",
    name: "Message Filter",
    category: "Message Routing",
    summary: "Élimine les messages qui ne satisfont pas à certains critères.",
    problem: "Comment ignorer les messages non pertinents sur un canal ?",
    solution: "Évaluer un prédicat et détruire le message s'il ne remplit pas la condition.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html",
    tags: ["Filter", "Predicate", "Drop"],
    techImplementation: {
      description: "Le filtre est un microservice Spring Boot sans état qui évalue un prédicat sur chaque message ; seuls les messages qui le valident sont republiés sur le topic de sortie. Les messages rejetés ne sont jamais écrits nulle part : ils sont simplement ignorés, sans commit de production inutile côté aval.",
      nodes: [
        { id: "p", type: "service", label: "Metrics Producer", x: 20, y: 60 },
        { id: "t", type: "topic", label: "metrics.raw", x: 260, y: 60 },
        { id: "f", type: "service", label: "Metrics Filter", sub: "predicate: value > seuil", x: 500, y: 60 },
        { id: "tout", type: "topic", label: "metrics.significant", x: 740, y: 60 },
        { id: "c", type: "service", label: "Alerting Service", x: 980, y: 60 }
      ],
      edges: [
        { from: "p", to: "t", label: "produce" },
        { from: "t", to: "f", label: "consume" },
        { from: "f", to: "tout", label: "publie si retenu" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "dynamic-router",
    name: "Dynamic Router",
    category: "Message Routing",
    summary: "Modifie les règles de routage au fil du temps sans redémarrer le système.",
    problem: "Comment mettre à jour les routes en temps réel selon l'état du système ?",
    solution: "Consulter une table ou un annuaire de règles externe mis à jour dynamiquement.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DynamicRouter.html",
    tags: ["Dynamic", "Rules", "Config"],
    techImplementation: {
      description: "Le routeur interroge à chaque message une table de règles externe (Postgres, rafraîchie sans redéploiement) pour déterminer dynamiquement le topic cible. Changer une règle de routage revient à modifier une ligne en base, pas à changer le code du microservice.",
      nodes: [
        { id: "p", type: "service", label: "Order Gateway", x: 20, y: 100 },
        { id: "tin", type: "topic", label: "orders.incoming", x: 250, y: 100 },
        { id: "r", type: "service", label: "Dynamic Router", sub: "consulte les règles à chaque message", x: 470, y: 100 },
        { id: "rules", type: "store", label: "routing_rules", sub: "PostgreSQL", x: 470, y: 260 },
        { id: "tdyn", type: "topic", label: "orders.* (cible résolue)", x: 730, y: 100 },
        { id: "c", type: "service", label: "Fulfillment Svc", x: 970, y: 100 }
      ],
      edges: [
        { from: "p", to: "tin", label: "produce" },
        { from: "tin", to: "r", label: "consume" },
        { from: "r", to: "rules", label: "lookup règle active", fromSide: "bottom", toSide: "top", style: "dashed" },
        { from: "r", to: "tdyn", label: "publie vers cible résolue" },
        { from: "tdyn", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "recipient-list",
    name: "Recipient List",
    category: "Message Routing",
    summary: "Transmet un message à une liste de destinataires calculée à la volée.",
    problem: "Comment diffuser un message à plusieurs consommateurs dont la liste varie selon le contexte ?",
    solution: "Inspecter le message pour établir la liste des canaux cibles et y publier le message.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html",
    tags: ["Multicast", "Dynamic", "List"],
    techImplementation: {
      description: "À la différence du Content-Based Router (un seul topic cible choisi), le Recipient List publie simultanément sur tous les topics correspondant à la liste de destinataires calculée pour ce message — liste elle-même déterminée par une table de souscriptions externe consultée à chaque événement.",
      nodes: [
        { id: "p", type: "service", label: "Alert Gateway", x: 20, y: 140 },
        { id: "tin", type: "topic", label: "alerts.incoming", x: 250, y: 140 },
        { id: "r", type: "service", label: "Recipient Resolver", sub: "consulte les abonnés concernés", x: 470, y: 140 },
        { id: "reg2", type: "store", label: "subscriptions", sub: "PostgreSQL", x: 470, y: 320 },
        { id: "t1", type: "topic", label: "alerts.ops-team", x: 730, y: 20 },
        { id: "t2", type: "topic", label: "alerts.oncall", x: 730, y: 140 },
        { id: "t3", type: "topic", label: "alerts.audit", x: 730, y: 260 }
      ],
      edges: [
        { from: "p", to: "tin", label: "produce" },
        { from: "tin", to: "r", label: "consume" },
        { from: "r", to: "reg2", label: "liste des destinataires", fromSide: "bottom", toSide: "top", style: "dashed" },
        { from: "r", to: "t1", label: "multicast" },
        { from: "r", to: "t2", label: "multicast" },
        { from: "r", to: "t3", label: "multicast" }
      ]
    }
  },
  {
    id: "splitter",
    name: "Splitter",
    category: "Message Routing",
    summary: "Divise un message composite contenant plusieurs éléments en sous-messages.",
    problem: "Comment traiter les éléments d'une liste ou d'un lot de manière individuelle ?",
    solution: "Iterer sur la collection et émettre N messages simples vers le canal de traitement.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html",
    tags: ["Batch", "Decompose", "Loop"],
    techImplementation: {
      description: "Le splitter est un microservice qui consomme un message composite et republie chacun de ses éléments comme message Kafka indépendant sur un topic de sortie, en propageant un Correlation ID commun (utile pour un Aggregator en aval). Les consommateurs avals peuvent alors scaler horizontalement sur ce flux plus granulaire.",
      nodes: [
        { id: "p", type: "service", label: "Batch Import Service", x: 20, y: 60 },
        { id: "tin", type: "topic", label: "orders.batch", sub: "1 message = N commandes", x: 260, y: 60 },
        { id: "s", type: "service", label: "Order Splitter", sub: "1 message émis par item", x: 500, y: 60 },
        { id: "tout", type: "topic", label: "orders.items", x: 740, y: 60 },
        { id: "c", type: "service", label: "Item Processor", sub: "x3, groupId=item-proc", x: 980, y: 60 }
      ],
      edges: [
        { from: "p", to: "tin", label: "produce" },
        { from: "tin", to: "s", label: "consume (1 batch)" },
        { from: "s", to: "tout", label: "publie N messages" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "aggregator",
    name: "Aggregator",
    category: "Message Routing",
    summary: "Combine une série de messages individuels en un seul message composite.",
    problem: "Comment regrouper les résultats de traitements parallèles pour émettre une synthèse ?",
    solution: "Stocker les messages partageant une même Correlation ID et publier le tout au complet.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html",
    tags: ["Join", "Stateful", "Correlation"],
    techImplementation: {
      description: "L'agrégation est implémentée avec Kafka Streams : les messages partageant le même Correlation ID sont accumulés dans un state store local (RocksDB, fenêtré dans le temps) jusqu'à ce que le groupe soit complet ou que la fenêtre expire, avant d'émettre un seul message consolidé en sortie.",
      nodes: [
        { id: "tin", type: "topic", label: "quotes.partial", sub: "même correlationId", x: 20, y: 100 },
        { id: "agg", type: "streams", label: "Quote Aggregator", sub: "state store, fenêtre 30s", x: 280, y: 100 },
        { id: "store", type: "store", label: "RocksDB", sub: "state store local", x: 280, y: 260 },
        { id: "tout", type: "topic", label: "quotes.complete", x: 560, y: 100 },
        { id: "c", type: "service", label: "Pricing Service", x: 800, y: 100 }
      ],
      edges: [
        { from: "tin", to: "agg", label: "consume" },
        { from: "agg", to: "store", label: "buffer par correlationId", fromSide: "bottom", toSide: "top", style: "dashed" },
        { from: "agg", to: "tout", label: "publie si groupe complet" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "resequencer",
    name: "Resequencer",
    category: "Message Routing",
    summary: "Réordonne des messages arrivés dans le désordre.",
    problem: "Comment garantir le traitement séquentiel lorsque le réseau réordonne les paquets ?",
    solution: "Tamponner les messages, les trier selon leur numéro de séquence et les réémettre ordonnés.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html",
    tags: ["Ordering", "Buffer", "Sequence"],
    techImplementation: {
      description: "Le réordonnancement est réalisé par un processeur Kafka Streams qui tamponne temporairement les messages dans son state store, les trie selon leur numéro de séquence, puis les republie dans l'ordre attendu sur le topic de sortie — un cas d'usage classique de state store fenêtré local à l'instance.",
      nodes: [
        { id: "tin", type: "topic", label: "events.unordered", sub: "multi-partitions", x: 20, y: 100 },
        { id: "rs", type: "streams", label: "Event Resequencer", sub: "state store, tri par séquence", x: 280, y: 100 },
        { id: "store", type: "store", label: "RocksDB", sub: "state store local", x: 280, y: 260 },
        { id: "tout", type: "topic", label: "events.ordered", x: 560, y: 100 },
        { id: "c", type: "service", label: "Audit Trail Service", x: 800, y: 100 }
      ],
      edges: [
        { from: "tin", to: "rs", label: "consume" },
        { from: "rs", to: "store", label: "buffer + tri", fromSide: "bottom", toSide: "top", style: "dashed" },
        { from: "rs", to: "tout", label: "publie dans l'ordre" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },

  // --- MESSAGE TRANSFORMATION ---
  {
    id: "message-translator",
    name: "Message Translator",
    category: "Message Transformation",
    summary: "Convertit le format ou la structure des données entre deux applications.",
    problem: "Comment connecter deux systèmes parlant des langages ou schémas différents ?",
    solution: "Intercaler un traducteur qui réalise le mapping entre la structure source et cible.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html",
    tags: ["Mapping", "Format", "Converter"],
    techImplementation: {
      description: "Le traducteur est un microservice Spring Boot qui consomme le format hérité (ici XML issu d'un adaptateur ERP), le convertit vers le schéma canonique de l'entreprise, l'enregistre/valide auprès du Schema Registry, puis republie l'événement au format cible que tous les systèmes modernes comprennent.",
      nodes: [
        { id: "ext", type: "external", label: "Legacy ERP", sub: "XML / SOAP", x: 20, y: 100 },
        { id: "tin", type: "topic", label: "erp.orders.xml", x: 280, y: 100 },
        { id: "tr", type: "service", label: "Order Translator", sub: "XML → Avro canonique", x: 520, y: 100 },
        { id: "reg", type: "registry", label: "Schema Registry", x: 520, y: 260 },
        { id: "tout", type: "topic", label: "orders.created", sub: "Avro", x: 780, y: 100 },
        { id: "c", type: "service", label: "Order Service", x: 1020, y: 100 }
      ],
      edges: [
        { from: "ext", to: "tin", label: "publie (adaptateur)" },
        { from: "tin", to: "tr", label: "consume" },
        { from: "tr", to: "reg", label: "enregistre / valide", fromSide: "bottom", toSide: "top", style: "dashed", color: "#0891B2" },
        { from: "tr", to: "tout", label: "publie format canonique" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "envelope-wrapper",
    name: "Envelope Wrapper",
    category: "Message Transformation",
    summary: "Enveloppe des données dans un en-tête d'infrastructure (wrapper).",
    problem: "Comment ajouter des métadonnées de transport sans altérer le payload applicatif ?",
    solution: "Encapsuler le message d'origine dans un enveloppe contenant les en-têtes requis.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html",
    tags: ["Header", "Encapsulation", "Wrapper"],
    techImplementation: {
      description: "L'enveloppe est réalisée avec les headers natifs de Kafka (ProducerRecord.headers()), positionnés par un intercepteur Spring Kafka commun à tous les producteurs : le payload métier n'est jamais modifié, seules des métadonnées de transport (corrélation, traçabilité, origine) sont ajoutées, lisibles par l'infrastructure sans désérialiser le message.",
      nodes: [
        { id: "p", type: "service", label: "Checkout Service", x: 20, y: 100 },
        { id: "w", type: "service", label: "Envelope Interceptor", sub: "ajoute headers : correlationId, traceId", x: 280, y: 100 },
        { id: "t", type: "topic", label: "checkout.events", sub: "payload + headers infra", x: 580, y: 100 },
        { id: "c", type: "service", label: "Fulfillment Service", sub: "lit les headers sans parser le payload", x: 820, y: 100 }
      ],
      edges: [
        { from: "p", to: "w", label: "message métier brut" },
        { from: "w", to: "t", label: "produce (payload+headers)" },
        { from: "t", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "content-enricher",
    name: "Content Enricher",
    category: "Message Transformation",
    summary: "Complète un message avec des informations récupérées sur une source externe.",
    problem: "Que faire lorsqu'un message entrant manque de données pour être traité ?",
    solution: "Interroger un système tiers ou une base de données pour enrichir le payload.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html",
    tags: ["Lookup", "Enrichment", "Database"],
    techImplementation: {
      description: "Le service consomme l'événement incomplet, appelle un référentiel externe (API REST ou base) pour récupérer les données manquantes, fusionne le résultat dans le payload, puis republie un message enrichi sur un nouveau topic — le microservice reste stateless, l'état vit uniquement dans le référentiel interrogé.",
      nodes: [
        { id: "tin", type: "topic", label: "customers.created", x: 20, y: 100 },
        { id: "en", type: "service", label: "Customer Enricher", sub: "appel REST si donnée manquante", x: 280, y: 100 },
        { id: "ext", type: "external", label: "Referential API", sub: "REST", x: 280, y: 260 },
        { id: "tout", type: "topic", label: "customers.enriched", x: 580, y: 100 },
        { id: "c", type: "service", label: "CRM Sync Service", x: 820, y: 100 }
      ],
      edges: [
        { from: "tin", to: "en", label: "consume" },
        { from: "en", to: "ext", label: "GET /customers/{id}", fromSide: "bottom", toSide: "top" },
        { from: "ext", to: "en", label: "données manquantes", fromSide: "top", toSide: "bottom", style: "dashed" },
        { from: "en", to: "tout", label: "publie message enrichi" },
        { from: "tout", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "content-filter",
    name: "Content Filter",
    category: "Message Transformation",
    summary: "Supprime les données superflues ou confidentielles d'un message.",
    problem: "Comment sécuriser ou alléger un message avant de le transmettre à un tiers ?",
    solution: "Filtrer les champs inutiles ou sensibles du payload pour ne conserver que l'essentiel.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html",
    tags: ["Privacy", "Security", "Pruning"],
    techImplementation: {
      description: "Avant d'exposer un flux à un consommateur externe ou partenaire, un microservice dédié republie une version réduite du message sur un topic distinct, en supprimant les champs sensibles ou non pertinents (RGPD, contrats de données) — le topic interne complet n'est jamais accessible en dehors du domaine.",
      nodes: [
        { id: "tin", type: "topic", label: "customers.internal", sub: "payload complet (PII incluse)", x: 20, y: 100 },
        { id: "f", type: "service", label: "PII Content Filter", sub: "retire les champs sensibles", x: 300, y: 100 },
        { id: "tout", type: "topic", label: "customers.partner-feed", sub: "payload réduit, sans PII", x: 600, y: 100 },
        { id: "ext", type: "external", label: "Partenaire externe", x: 880, y: 100 }
      ],
      edges: [
        { from: "tin", to: "f", label: "consume" },
        { from: "f", to: "tout", label: "publie payload filtré" },
        { from: "tout", to: "ext", label: "consume (flux exposé)" }
      ]
    }
  },
  {
    id: "claim-check",
    name: "Claim Check",
    category: "Message Transformation",
    summary: "Stocke un payload volumineux hors du bus et ne fait circuler qu'une référence.",
    problem: "Comment faire circuler de gros fichiers sans engorger le broker de messages ?",
    solution: "Persister le payload dans un store externe et passer un jeton (Claim Check) dans le message.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/StoreInLibrary.html",
    tags: ["Large Payload", "Blob Storage", "Reference"],
    techImplementation: {
      description: "Le payload volumineux est écrit dans un stockage objet (S3/MinIO) par le microservice producteur, qui ne publie sur Kafka qu'un message léger contenant la référence (claim check). Les consommateurs récupèrent le fichier directement depuis le stockage objet uniquement s'ils en ont réellement besoin, sans jamais engorger le broker.",
      nodes: [
        { id: "p", type: "service", label: "Document Service", x: 20, y: 100 },
        { id: "cc", type: "service", label: "Claim Check Service", sub: "publie la référence, pas le fichier", x: 280, y: 100 },
        { id: "obj", type: "objectstore", label: "S3 / MinIO Bucket", x: 280, y: 260 },
        { id: "t", type: "topic", label: "documents.uploaded", sub: "payload = token", x: 580, y: 100 },
        { id: "c", type: "service", label: "Document Indexer", sub: "récupère le fichier si besoin", x: 820, y: 100 }
      ],
      edges: [
        { from: "p", to: "cc", label: "fichier volumineux" },
        { from: "cc", to: "obj", label: "stocke le blob", fromSide: "bottom", toSide: "top" },
        { from: "cc", to: "t", label: "publie {claimCheckToken}" },
        { from: "t", to: "c", label: "consume" },
        { from: "c", to: "obj", label: "GET si nécessaire", fromSide: "top", toSide: "bottom", style: "dashed", color: "#0D9488" }
      ]
    }
  },

  // --- MESSAGING ENDPOINTS & SYSTEM MANAGEMENT ---
  {
    id: "polling-consumer",
    name: "Polling Consumer",
    category: "Messaging Endpoints",
    summary: "Consommateur qui interroge activement le canal pour vérifier la présence de messages.",
    problem: "Comment consommer des messages lorsque le client ne peut pas exposer d'écouteur actif ?",
    solution: "Lancer une boucle synchrone (Pull) venant interroger le canal à intervalles réguliers.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PollingConsumer.html",
    tags: ["Pull", "Scheduled", "Sync"],
    techImplementation: {
      description: "Le consommateur n'est pas déclenché par Kafka mais par un déclencheur temporel (@Scheduled Spring), qui va activement interroger un système qui ne sait pas notifier (FTP, base héritée...). Le résultat de ce polling est ensuite publié sur Kafka pour que le reste du système redevienne 100% événementiel en aval.",
      nodes: [
        { id: "sched", type: "scheduler", label: "@Scheduled (cron)", x: 20, y: 100 },
        { id: "poll", type: "service", label: "Legacy File Poller", sub: "interroge toutes les 60s", x: 260, y: 100 },
        { id: "ext", type: "external", label: "Legacy FTP / Base", x: 520, y: 100 },
        { id: "t", type: "topic", label: "legacy.files.detected", x: 780, y: 100 },
        { id: "c", type: "service", label: "File Processor", x: 1040, y: 100 }
      ],
      edges: [
        { from: "sched", to: "poll", label: "déclenche", color: "#D97706" },
        { from: "poll", to: "ext", label: "poll (pull)" },
        { from: "ext", to: "poll", label: "résultat", fromSide: "top", toSide: "top", style: "dashed" },
        { from: "poll", to: "t", label: "publie si nouveauté" },
        { from: "t", to: "c", label: "consume" }
      ]
    }
  },
  {
    id: "event-driven-consumer",
    name: "Event-Driven Consumer",
    category: "Messaging Endpoints",
    summary: "Consommateur réactif réveillé automatiquement à l'arrivée d'un message.",
    problem: "Comment traiter les messages instantanément dès leur disponibilité avec un impact CPU minimal ?",
    solution: "Enregistrer un callback/listener (Push) déclenché automatiquement par le broker.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventDrivenConsumer.html",
    tags: ["Push", "Reactive", "Listener"],
    techImplementation: {
      description: "Le consommateur ne fait aucune boucle active : un @KafkaListener Spring Kafka s'enregistre auprès du broker, qui pousse automatiquement chaque nouveau message dès sa disponibilité. C'est le mode par défaut et recommandé avec Kafka, à l'opposé du Polling Consumer réservé aux systèmes non événementiels.",
      nodes: [
        { id: "t", type: "topic", label: "orders.created", x: 20, y: 100 },
        { id: "c", type: "service", label: "Notification Service", sub: "@KafkaListener — push par le broker", x: 280, y: 100 },
        { id: "ext", type: "external", label: "Email Provider", sub: "API", x: 560, y: 100 }
      ],
      edges: [
        { from: "t", to: "c", label: "push automatique" },
        { from: "c", to: "ext", label: "déclenche l'envoi" }
      ]
    }
  },
  {
    id: "competing-consumers",
    name: "Competing Consumers",
    category: "Messaging Endpoints",
    summary: "Multiplie les consommateurs sur un même canal pour répartir la charge.",
    problem: "Comment traiter en parallèle un volume élevé de messages arrivant sur une file ?",
    solution: "Attacher plusieurs instances de consommateurs concurrents sur la même Queue.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html",
    tags: ["Scaling", "Parallelism", "Queue"],
    techImplementation: {
      description: "Trois instances du même microservice Spring Boot partagent le même groupId : Kafka répartit automatiquement les partitions du topic entre elles (rebalancing), chaque partition n'étant lue que par une seule instance à la fois — c'est le mécanisme natif de scaling horizontal d'un consommateur Kafka.",
      nodes: [
        { id: "p", type: "service", label: "Image Upload Service", x: 20, y: 140 },
        { id: "t", type: "topic", label: "images.uploaded", sub: "3 partitions", x: 260, y: 140 },
        { id: "c1", type: "service", label: "Thumbnail Worker #1", sub: "groupId=thumbnail-svc", x: 520, y: 20 },
        { id: "c2", type: "service", label: "Thumbnail Worker #2", sub: "groupId=thumbnail-svc", x: 520, y: 140 },
        { id: "c3", type: "service", label: "Thumbnail Worker #3", sub: "groupId=thumbnail-svc", x: 520, y: 260 }
      ],
      edges: [
        { from: "p", to: "t", label: "produce" },
        { from: "t", to: "c1", label: "partition 0" },
        { from: "t", to: "c2", label: "partition 1" },
        { from: "t", to: "c3", label: "partition 2" }
      ]
    }
  },
  {
    id: "idempotent-receiver",
    name: "Idempotent Receiver",
    category: "Messaging Endpoints",
    summary: "Gère la réception de doublons sans altérer l'état du système.",
    problem: "Comment éviter d'exécuter deux fois la même opération si un message est délivré en double ?",
    solution: "Conserver un registre des Message IDs déjà traités pour ignorer les rejeux.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html",
    tags: ["Deduplication", "Exactly-Once", "Safety"],
    techImplementation: {
      description: "Comme Kafka garantit au minimum une livraison (at-least-once), le consommateur vérifie systématiquement dans un registre rapide (Redis, avec expiration) si l'identifiant du message a déjà été traité avant de modifier l'état métier : un message rejoué est détecté et ignoré sans effet de bord.",
      nodes: [
        { id: "t", type: "topic", label: "payments.events", sub: "at-least-once", x: 20, y: 100 },
        { id: "c", type: "service", label: "Payment Processor", sub: "vérifie messageId avant traitement", x: 280, y: 100 },
        { id: "cache", type: "cache", label: "Redis", sub: "dedup store, TTL 24h", x: 280, y: 260 },
        { id: "store", type: "store", label: "PostgreSQL", sub: "état du paiement", x: 580, y: 100 }
      ],
      edges: [
        { from: "t", to: "c", label: "consume" },
        { from: "c", to: "cache", label: "SETNX messageId", fromSide: "bottom", toSide: "top", color: "#EA580C" },
        { from: "c", to: "store", label: "commit si inédit" }
      ]
    }
  },
  {
    id: "wire-tap",
    name: "Wire Tap",
    category: "System Management",
    summary: "Détourne une copie d'un message vers un canal secondaire sans perturber le flux principal.",
    problem: "Comment auditer, journaliser ou analyser le trafic d'un canal en toute transparence ?",
    solution: "Insérer un composant Point d'Écoute qui duplique le message vers un canal d'audit.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/WireTap.html",
    tags: ["Audit", "Monitoring", "Logging"],
    techImplementation: {
      description: "Un consommateur additionnel (le Wire Tap), avec son propre groupId, s'abonne au même topic sans interférer avec le flux principal, et republie une copie sur un topic d'audit dédié à des fins de journalisation ou d'observabilité — le service métier principal ignore totalement son existence.",
      nodes: [
        { id: "p", type: "service", label: "Order Service", x: 20, y: 100 },
        { id: "t", type: "topic", label: "orders.events", x: 260, y: 100 },
        { id: "c", type: "service", label: "Fulfillment Service", x: 500, y: 100 },
        { id: "tap", type: "service", label: "Wire Tap Interceptor", sub: "duplique sans bloquer le flux", x: 260, y: 260 },
        { id: "taudit", type: "topic", label: "orders.audit", x: 500, y: 260 },
        { id: "audit", type: "external", label: "Plateforme d'observabilité", x: 740, y: 260 }
      ],
      edges: [
        { from: "p", to: "t", label: "produce" },
        { from: "t", to: "c", label: "consume (flux principal)" },
        { from: "t", to: "tap", label: "copie asynchrone", fromSide: "bottom", toSide: "top", style: "dashed" },
        { from: "tap", to: "taudit", label: "publie copie" },
        { from: "taudit", to: "audit", label: "consume" }
      ]
    }
  }
];

let currentSearch = '';
let currentCategory = 'All';

const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const patternsGrid = document.getElementById('patternsGrid');

function initFilters() {
  const categories = ['All', ...new Set(patternsData.map(p => p.category))];
  
  categoryFilters.innerHTML = categories.map(cat => `
    <button 
      data-category="${cat}"
      class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
        cat === currentCategory 
          ? 'bg-brand-800 text-white border-brand-800 shadow-sm' 
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
      }"
    >
      ${cat}
    </button>
  `).join('');

  categoryFilters.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentCategory = e.target.getAttribute('data-category');
      initFilters();
      renderPatterns();
    });
  });
}

function renderPatterns() {
  const filtered = patternsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          p.summary.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          p.problem.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(currentSearch.toLowerCase()));
    
    const matchesCategory = currentCategory === 'All' || p.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    patternsGrid.innerHTML = `
      <div class="col-span-full text-center py-16 text-slate-500">
        <p class="text-base font-medium">Aucun pattern ne correspond à votre recherche.</p>
      </div>
    `;
    return;
  }

  patternsGrid.innerHTML = filtered.map(pattern => {
    const imageUrl = officialImages[pattern.id] || '';

    return `
      <article class="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-brand-500 transition-all flex flex-col justify-between overflow-hidden">
        <div>
          <!-- Visuel EIP sur fond blanc propre -->
          <div class="bg-white p-4 flex items-center justify-center border-b border-slate-100 min-h-[150px] relative">
            <img 
              src="${imageUrl}" 
              alt="Schéma ${pattern.name}" 
              class="max-h-28 object-contain"
              loading="lazy"
            />
          </div>

          <div class="p-5">
            <!-- Badge de catégorie lisible -->
            <span class="inline-block text-[11px] font-bold text-brand-800 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-md mb-3">
              ${pattern.category}
            </span>

            <h3 class="text-lg font-bold text-slate-900 mb-1 leading-snug">${pattern.name}</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">${pattern.summary}</p>

            <!-- Blocs Problème & Solution aérés -->
            <div class="space-y-2 text-xs">
              <div class="bg-slate-50 border-l-2 border-amber-500 p-3 rounded-r-md">
                <span class="font-bold text-slate-900 block mb-0.5">Problème</span>
                <p class="text-slate-600 leading-relaxed">${pattern.problem}</p>
              </div>
              <div class="bg-slate-50 border-l-2 border-emerald-500 p-3 rounded-r-md">
                <span class="font-bold text-slate-900 block mb-0.5">Solution</span>
                <p class="text-slate-600 leading-relaxed">${pattern.solution}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 pt-0">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${pattern.tags.map(tag => `
              <span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">#${tag}</span>
            `).join('')}
          </div>

          <!-- Actions bas de carte -->
          <div class="flex items-center justify-between border-t border-slate-100 pt-3 gap-2 text-xs">
            <button 
              onclick="copyMarkdown('${pattern.id}')"
              id="copy-btn-${pattern.id}"
              class="font-semibold text-slate-600 hover:text-brand-800 transition flex items-center gap-1"
            >
              📋 Copier MD
            </button>

            <a 
              href="${pattern.officialUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="font-bold text-brand-800 hover:text-brand-900 hover:underline flex items-center gap-1"
            >
              Fiche officielle ↗
            </a>
          </div>

          ${pattern.techImplementation ? `
          <!-- Implémentation technique (repliable) -->
          <div class="mt-3 pt-3 border-t border-slate-100">
            <button
              onclick="toggleImplementation('${pattern.id}')"
              id="impl-btn-${pattern.id}"
              class="w-full flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 transition"
            >
              <span>🏗️ Voir l'implémentation technique (Kafka + Spring Boot)</span>
              <span class="chevron text-slate-400 transition-transform">▼</span>
            </button>
            <div id="impl-${pattern.id}" class="hidden mt-3">
              <p class="text-xs text-slate-600 leading-relaxed mb-3">${pattern.techImplementation.description}</p>
              <div class="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                ${renderArchDiagram(pattern.techImplementation)}
              </div>
            </div>
          </div>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

function toggleImplementation(patternId) {
  const panel = document.getElementById(`impl-${patternId}`);
  const btn = document.getElementById(`impl-btn-${patternId}`);
  const isHidden = panel.classList.contains('hidden');
  panel.classList.toggle('hidden');
  btn.querySelector('.chevron').textContent = isHidden ? '▲' : '▼';
}

function copyMarkdown(patternId) {
  const pattern = patternsData.find(p => p.id === patternId);
  if (!pattern) return;

  const imageUrl = officialImages[pattern.id] || '';
  const md = `### Pattern EIP : ${pattern.name}\n\n![${pattern.name}](${imageUrl})\n\n**Problème :** ${pattern.problem}\n\n**Solution :** ${pattern.solution}\n\n*Source : [Enterprise Integration Patterns](${pattern.officialUrl})*`;

  navigator.clipboard.writeText(md).then(() => {
    const btn = document.getElementById(`copy-btn-${patternId}`);
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copié !';
    btn.classList.add('text-green-400');
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('text-green-400');
    }, 2000);
  });
}

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderPatterns();
});

initFilters();
renderPatterns();
