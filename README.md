# 🧩 Enterprise Integration Patterns (EIP) — Catalog

Un catalogue web interactif et moderne répertoriant les principaux **Enterprise Integration Patterns (EIP)** (basé sur les travaux de Gregor Hohpe & Bobby Woolf). 

Conçu pour les architectes logicielle, développeurs et tech leads souhaitant consulter, filtrer et documenter rapidement leurs architectures d'intégration.

---

## 🚀 Fonctionnalités

- **🔍 Recherche instantanée** : Filtrage en temps réel par nom, problème, solution ou tags (`#Queue`, `#Topic`, `#DLQ`...).
- **🏷️ Filtres par catégories** : Navigation fluide parmi les grandes familles d'EIP (*Messaging Channels*, *Message Routing*, *Message Transformation*, *Messaging Endpoints*, *System Management*).
- **📋 Copie Markdown en 1 clic** : Génère directement le snippet Markdown d'un pattern (titre, schéma officiel, problème, solution et lien) pour enrichir tes documentations d'architecture (Architecture Decision Records, wikis, README).
- **🎨 Design System Moderne & Adaptatif** : Interface épurée avec contrastes optimisés, concue en Tailwind CSS.
- **⚡ 100 % Autonome (Zero Build)** : Fonctionne directement dans le navigateur via Tailwind CDN, sans étape de compilation ni dépendance lourde.

---

## 🛠️ Stack Technique

* **HTML5 / JavaScript (ES6+)** — Logique applicative et rendu dynamique.
* **Tailwind CSS (via CDN)** — Styling utility-first et thématisation.
* **EIP Official Assets** — Schémas officiels issus de [enterpriseintegrationpatterns.com](https://www.enterpriseintegrationpatterns.com).

---

## 📂 Structure du projet

```text
.
├── index.html   # Structure HTML5 & configuration Tailwind CSS
├── app.js       # Base de données des patterns, logique de recherche & rendu JS
└── README.md    # Documentation du projet
