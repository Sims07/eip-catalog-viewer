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

  return `<svg viewBox="0 0 ${maxX} ${maxY}" class="tech-architecture-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Schéma d'architecture technique">
    <defs>
      <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
      </marker>
    </defs>
    ${edgesSvg}
    ${nodesSvg}
  </svg>`;
}


// ============================================================
// EIP catalog data
// The complete repository lives in data/eips.json.
// app.js only contains UI behavior and diagram rendering.
// ============================================================
let patternsData = [];
let catalogData = null;
let categoryDefinitions = [];

function normalizePattern(pattern, categoriesById) {
  const category = categoriesById.get(pattern.category);

  return {
    ...pattern,
    category: category ? category.name : pattern.category,
    officialUrl: pattern.official?.url || '',
    techImplementation: pattern.technical
      ? {
          description: pattern.technical.description || '',
          nodes: pattern.technical.diagram?.nodes || [],
          edges: pattern.technical.diagram?.edges || []
        }
      : null
  };
}

async function loadEipCatalog() {
  const response = await fetch('./eips.json', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Impossible de charger le référentiel EIP (HTTP ${response.status}).`);
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.patterns)) {
    throw new Error('Le fichier data/eips.json est invalide.');
  }

  catalogData = data;
  categoryDefinitions = Array.isArray(data.categories) ? data.categories : [];

  const categoriesById = new Map(
    categoryDefinitions.map(category => [category.id, category])
  );

  patternsData = data.patterns.map(pattern =>
    normalizePattern(pattern, categoriesById)
  );

  console.info(`EIP catalog loaded from JSON: ${patternsData.length} patterns`);

  return data;
}

function showCatalogError(error) {
  console.error(error);

  if (!patternsGrid) return;

  patternsGrid.innerHTML = `
    <div class="col-span-full flex justify-center py-16">
      <div class="max-w-xl rounded-2xl border-2 border-red-200 bg-white p-6 shadow-sm">
        <div class="mb-2 text-base font-bold text-red-700">Référentiel EIP indisponible</div>
        <p class="text-sm leading-6 text-slate-600">
          Impossible de charger <code class="rounded bg-slate-100 px-1.5 py-0.5">data/eips.json</code>.
          Lancez l'application via un serveur HTTP local plutôt qu'en ouvrant directement
          le fichier HTML avec <code>file://</code>.
        </p>
        <p class="mt-3 text-xs text-slate-400">
          Détail : ${error?.message || 'erreur inconnue'}
        </p>
      </div>
    </div>`;
}

let currentSearch = '';
let currentCategory = 'All';

const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const patternsGrid = document.getElementById('patternsGrid');

const techModal = document.getElementById('techModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalSummary = document.getElementById('modalSummary');
const modalProblem = document.getElementById('modalProblem');
const modalSolution = document.getElementById('modalSolution');
const modalTags = document.getElementById('modalTags');
const modalDescription = document.getElementById('modalDescription');
const modalDiagram = document.getElementById('modalDiagram');
const modalOfficialImage = document.getElementById('modalOfficialImage');
const modalOfficialLink = document.getElementById('modalOfficialLink');
const modalCopyButton = document.getElementById('modalCopyButton');

let activeModalPatternId = null;

function initFilters() {
  const categoryOrder = [
    'All',
    'Integration Styles',
    'Messaging Channels',
    'Message Construction',
    'Message Routing',
    'Message Transformation',
    'Messaging Endpoints',
    'System Management'
  ];
  const categories = categoryOrder.filter(cat => cat === 'All' || patternsData.some(p => p.category === cat));
  
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
    const search = currentSearch.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(search) ||
      p.summary.toLowerCase().includes(search) ||
      p.problem.toLowerCase().includes(search) ||
      p.tags.some(t => t.toLowerCase().includes(search)) ||
      (p.aliases || []).some(alias => alias.toLowerCase().includes(search));

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
    const imageUrl = pattern.official?.diagram || '';

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
              onerror="this.onerror=null; this.outerHTML=getFallbackSVG();"
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
              <span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">
                #${tag}
              </span>
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
          <!-- Accès à la fiche technique plein écran -->
          <div class="mt-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onclick="openTechModal('${pattern.id}')"
              class="tech-open-button w-full flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left transition hover:border-brand-500 hover:bg-brand-50"
            >
              <span class="flex items-center gap-2">
                <span class="text-sm">⚙️</span>
                <span>
                  <span class="block text-[11px] font-bold text-slate-700">
                    Voir l'implémentation technique
                  </span>
                  <span class="block mt-0.5 text-[10px] text-slate-400">
                    Kafka + Spring Boot
                  </span>
                </span>
              </span>

              <span class="text-brand-800 text-sm font-bold" aria-hidden="true">
                →
              </span>
            </button>
          </div>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

function openTechModal(patternId) {
  const pattern = patternsData.find(p => p.id === patternId);

  if (!pattern || !pattern.techImplementation || !techModal) {
    return;
  }

  activeModalPatternId = patternId;

  modalTitle.textContent = pattern.name;
  modalCategory.textContent = pattern.category;
  modalSummary.textContent = pattern.summary;
  modalProblem.textContent = pattern.problem;
  modalSolution.textContent = pattern.solution;

  modalTags.innerHTML = pattern.tags.map(tag => `
    <span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-1 rounded border border-slate-200">
      #${tag}
    </span>
  `).join('');

  modalDescription.textContent = pattern.techImplementation.description;
  modalDiagram.innerHTML = renderArchDiagram(pattern.techImplementation);

  const imageUrl = pattern.official?.diagram || '';

  if (imageUrl) {
    modalOfficialImage.innerHTML = `
      <img src="${imageUrl}" alt="Schéma ${pattern.name}" class="max-h-[260px] max-w-full object-contain md:max-h-[320px]" onerror="this.onerror=null; this.parentElement.innerHTML=getFallbackSVG();" />
    `;
  } else {
    modalOfficialImage.innerHTML = getFallbackSVG();
  }

  modalOfficialLink.href = pattern.officialUrl;
  modalCopyButton.onclick = () => copyMarkdownFromModal(patternId);

  // Popup statique : aucune animation, aucun clone, aucun déplacement de la carte.
  techModal.classList.remove('hidden');
  document.body.classList.add('tech-scroll-locked');

  techModal.querySelector('button[aria-label="Fermer"]')?.focus();
}

function closeModal() {
  if (!techModal) {
    return;
  }

  techModal.classList.add('hidden');
  document.body.classList.remove('tech-scroll-locked');
  activeModalPatternId = null;
}

function copyMarkdownFromModal(patternId) {
  const pattern = patternsData.find(p => p.id === patternId);
  if (!pattern) return;

  const imageUrl = pattern.official?.diagram || '';
  const md = `### Pattern EIP : ${pattern.name}\n\n![${pattern.name}](${imageUrl})\n\n**Problème :** ${pattern.problem}\n\n**Solution :** ${pattern.solution}\n\n*Source : [Enterprise Integration Patterns](${pattern.officialUrl})*`;

  navigator.clipboard.writeText(md).then(() => {
    const originalText = modalCopyButton.innerHTML;

    modalCopyButton.innerHTML = '✅ Copié !';
    modalCopyButton.classList.add('text-green-600', 'border-green-200');

    setTimeout(() => {
      modalCopyButton.innerHTML = originalText;
      modalCopyButton.classList.remove('text-green-600', 'border-green-200');
    }, 2000);
  });
}

techModal?.addEventListener('click', (event) => {
  if (event.target === techModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && techModal && !techModal.classList.contains('hidden')) {
    closeModal();
  }
});

function copyMarkdown(patternId) {
  const pattern = patternsData.find(p => p.id === patternId);
  if (!pattern) return;

  const imageUrl = pattern.official?.diagram || '';
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

loadEipCatalog()
  .then(() => {
    initFilters();
    renderPatterns();
  })
  .catch(showCatalogError);
