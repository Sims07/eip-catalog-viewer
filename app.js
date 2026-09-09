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
    tags: ["Queue", "Unicast", "1-to-1"]
  },
  {
    id: "publish-subscribe",
    name: "Publish-Subscribe Channel",
    category: "Messaging Channels",
    summary: "Diffuse un message à tous les consommateurs abonnés au canal.",
    problem: "Comment délivrer la même information à plusieurs destinataires simultanément ?",
    solution: "Envoyer le message sur un canal Pub/Sub (Topic) qui le duplique vers chaque abonné.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html",
    tags: ["Topic", "Broadcast", "Event-Driven"]
  },
  {
    id: "datatype-channel",
    name: "Datatype Channel",
    category: "Messaging Channels",
    summary: "Dédie un canal spécifique à un type de donnée particulier.",
    problem: "Comment s'assurer qu'un consommateur ne reçoit que des messages qu'il sait traiter ?",
    solution: "Créer des canaux séparés pour chaque structure de payload ou type de contrat.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DatatypeChannel.html",
    tags: ["Typage", "Routing", "Schema"]
  },
  {
    id: "invalid-message-channel",
    name: "Invalid Message Channel",
    category: "Messaging Channels",
    summary: "Isole les messages malformés ou ne respectant pas le schéma attendu.",
    problem: "Que faire lorsqu'un message reçu est illisible ou invalide ?",
    solution: "Dérouter immédiatement le message vers un canal dédié aux erreurs de formatage.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/InvalidMessageChannel.html",
    tags: ["Validation", "Error", "Parsing"]
  },
  {
    id: "dead-letter-channel",
    name: "Dead Letter Channel",
    category: "Messaging Channels",
    summary: "Capture les messages impossibles à traiter après plusieurs tentatives.",
    problem: "Où stocker les messages rejetés par l'application pour rejeu ou analyse ultérieure ?",
    solution: "Rediriger automatiquement les messages en échec vers une file d'attente Morte (DLQ).",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html",
    tags: ["DLQ", "Retry", "Fault Tolerance"]
  },
  {
    id: "guaranteed-delivery",
    name: "Guaranteed Delivery",
    category: "Messaging Channels",
    summary: "Assure la persistance du message même en cas de panne du serveur.",
    problem: "Comment garantir qu'un message ne sera pas perdu si le broker redémarre ?",
    solution: "Écrire le message sur un stockage persistant avant d'en accuser réception.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/GuaranteedDelivery.html",
    tags: ["Persistence", "Reliability", "Store-and-Forward"]
  },
  {
    id: "message-bus",
    name: "Message Bus",
    category: "Messaging Channels",
    summary: "Fournit une infrastructure commune de découplage pour toutes les applications.",
    problem: "Comment faire interagir N applications hétérogènes sans créer de liens point-à-point ?",
    solution: "Combiner un schéma canonique, un bus de messages et des adaptateurs par application.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html",
    tags: ["ESB", "Architecture", "Decoupling"]
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
    tags: ["Routing", "Decoupling"]
  },
  {
    id: "content-based-router",
    name: "Content-Based Router",
    category: "Message Routing",
    summary: "Régit l'aiguillage d'un message en fonction du contenu de son payload.",
    problem: "Comment router un message lorsque le destinataire dépend de données métier ?",
    solution: "Inspecter les champs du message (JSON, XML, FHIR) et évaluer des règles métier.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html",
    tags: ["Payload", "Rules Engine", "Routing"]
  },
  {
    id: "message-filter",
    name: "Message Filter",
    category: "Message Routing",
    summary: "Élimine les messages qui ne satisfont pas à certains critères.",
    problem: "Comment ignorer les messages non pertinents sur un canal ?",
    solution: "Évaluer un prédicat et détruire le message s'il ne remplit pas la condition.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html",
    tags: ["Filter", "Predicate", "Drop"]
  },
  {
    id: "dynamic-router",
    name: "Dynamic Router",
    category: "Message Routing",
    summary: "Modifie les règles de routage au fil du temps sans redémarrer le système.",
    problem: "Comment mettre à jour les routes en temps réel selon l'état du système ?",
    solution: "Consulter une table ou un annuaire de règles externe mis à jour dynamiquement.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DynamicRouter.html",
    tags: ["Dynamic", "Rules", "Config"]
  },
  {
    id: "recipient-list",
    name: "Recipient List",
    category: "Message Routing",
    summary: "Transmet un message à une liste de destinataires calculée à la volée.",
    problem: "Comment diffuser un message à plusieurs consommateurs dont la liste varie selon le contexte ?",
    solution: "Inspecter le message pour établir la liste des canaux cibles et y publier le message.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html",
    tags: ["Multicast", "Dynamic", "List"]
  },
  {
    id: "splitter",
    name: "Splitter",
    category: "Message Routing",
    summary: "Divise un message composite contenant plusieurs éléments en sous-messages.",
    problem: "Comment traiter les éléments d'une liste ou d'un lot de manière individuelle ?",
    solution: "Iterer sur la collection et émettre N messages simples vers le canal de traitement.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html",
    tags: ["Batch", "Decompose", "Loop"]
  },
  {
    id: "aggregator",
    name: "Aggregator",
    category: "Message Routing",
    summary: "Combine une série de messages individuels en un seul message composite.",
    problem: "Comment regrouper les résultats de traitements parallèles pour émettre une synthèse ?",
    solution: "Stocker les messages partageant une même Correlation ID et publier le tout au complet.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html",
    tags: ["Join", "Stateful", "Correlation"]
  },
  {
    id: "resequencer",
    name: "Resequencer",
    category: "Message Routing",
    summary: "Réordonne des messages arrivés dans le désordre.",
    problem: "Comment garantir le traitement séquentiel lorsque le réseau réordonne les paquets ?",
    solution: "Tamponner les messages, les trier selon leur numéro de séquence et les réémettre ordonnés.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html",
    tags: ["Ordering", "Buffer", "Sequence"]
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
    tags: ["Mapping", "Format", "Converter"]
  },
  {
    id: "envelope-wrapper",
    name: "Envelope Wrapper",
    category: "Message Transformation",
    summary: "Enveloppe des données dans un en-tête d'infrastructure (wrapper).",
    problem: "Comment ajouter des métadonnées de transport sans altérer le payload applicatif ?",
    solution: "Encapsuler le message d'origine dans un enveloppe contenant les en-têtes requis.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html",
    tags: ["Header", "Encapsulation", "Wrapper"]
  },
  {
    id: "content-enricher",
    name: "Content Enricher",
    category: "Message Transformation",
    summary: "Complète un message avec des informations récupérées sur une source externe.",
    problem: "Que faire lorsqu'un message entrant manque de données pour être traité ?",
    solution: "Interroger un système tiers ou une base de données pour enrichir le payload.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html",
    tags: ["Lookup", "Enrichment", "Database"]
  },
  {
    id: "content-filter",
    name: "Content Filter",
    category: "Message Transformation",
    summary: "Supprime les données superflues ou confidentielles d'un message.",
    problem: "Comment sécuriser ou alléger un message avant de le transmettre à un tiers ?",
    solution: "Filtrer les champs inutiles ou sensibles du payload pour ne conserver que l'essentiel.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html",
    tags: ["Privacy", "Security", "Pruning"]
  },
  {
    id: "claim-check",
    name: "Claim Check",
    category: "Message Transformation",
    summary: "Stocke un payload volumineux hors du bus et ne fait circuler qu'une référence.",
    problem: "Comment faire circuler de gros fichiers sans engorger le broker de messages ?",
    solution: "Persister le payload dans un store externe et passer un jeton (Claim Check) dans le message.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/StoreInLibrary.html",
    tags: ["Large Payload", "Blob Storage", "Reference"]
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
    tags: ["Pull", "Scheduled", "Sync"]
  },
  {
    id: "event-driven-consumer",
    name: "Event-Driven Consumer",
    category: "Messaging Endpoints",
    summary: "Consommateur réactif réveillé automatiquement à l'arrivée d'un message.",
    problem: "Comment traiter les messages instantanément dès leur disponibilité avec un impact CPU minimal ?",
    solution: "Enregistrer un callback/listener (Push) déclenché automatiquement par le broker.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventDrivenConsumer.html",
    tags: ["Push", "Reactive", "Listener"]
  },
  {
    id: "competing-consumers",
    name: "Competing Consumers",
    category: "Messaging Endpoints",
    summary: "Multiplie les consommateurs sur un même canal pour répartir la charge.",
    problem: "Comment traiter en parallèle un volume élevé de messages arrivant sur une file ?",
    solution: "Attacher plusieurs instances de consommateurs concurrents sur la même Queue.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html",
    tags: ["Scaling", "Parallelism", "Queue"]
  },
  {
    id: "idempotent-receiver",
    name: "Idempotent Receiver",
    category: "Messaging Endpoints",
    summary: "Gère la réception de doublons sans altérer l'état du système.",
    problem: "Comment éviter d'exécuter deux fois la même opération si un message est délivré en double ?",
    solution: "Conserver un registre des Message IDs déjà traités pour ignorer les rejeux.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html",
    tags: ["Deduplication", "Exactly-Once", "Safety"]
  },
  {
    id: "wire-tap",
    name: "Wire Tap",
    category: "System Management",
    summary: "Détourne une copie d'un message vers un canal secondaire sans perturber le flux principal.",
    problem: "Comment auditer, journaliser ou analyser le trafic d'un canal en toute transparence ?",
    solution: "Insérer un composant Point d'Écoute qui duplique le message vers un canal d'audit.",
    officialUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/WireTap.html",
    tags: ["Audit", "Monitoring", "Logging"]
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
        </div>
      </article>
    `;
  }).join('');
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
