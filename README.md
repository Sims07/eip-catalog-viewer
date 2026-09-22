# EIP Architecture Catalog

## Structure

Le catalogue sépare désormais le référentiel EIP du moteur de l'application :

```text
eip-catalog/
├── index.html
├── app.js
├── style.css
└── data/
    └── eips.json
```

- `app.js` : comportement de l'interface, recherche, filtres, popup et rendu des diagrammes.
- `style.css` : présentation.
- `data/eips.json` : source de vérité du catalogue EIP.

## Référentiel JSON

`data/eips.json` contient les 65 entrées du catalogue :

- 4 Integration Styles
- 10 Messaging Channels
- 10 Message Construction
- 14 Message Routing
- 7 Message Transformation
- 12 Messaging Endpoints
- 8 System Management

Chaque pattern contient :

- `id`, `name`, `category`
- `summary`, `problem`, `solution`
- `tags`, `aliases`
- `official.url`, `official.diagram`
- `technical.stack`, `technical.description`
- `technical.diagram.nodes`, `technical.diagram.edges`
- `negativeEffects` : liste de `{ title, description }` décrivant les inconvénients et coûts induits par l'emploi du pattern (4 par pattern) ; la section « Effets négatifs » de la popup est masquée si le champ est absent ou vide
- `relatedPatterns`

Les schémas techniques sont des adaptations Kafka + Spring Boot propres à cette application ; ils ne constituent pas le schéma officiel EIP.

## Lancement

Le navigateur doit charger `data/eips.json` via HTTP. L'ouverture directe de `index.html` avec `file://` peut bloquer `fetch()`.

Exemple avec Python :

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080/`.

## Source

Référentiel officiel : https://www.enterpriseintegrationpatterns.com/patterns/messaging/index.html
