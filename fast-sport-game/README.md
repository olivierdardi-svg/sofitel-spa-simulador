# FAST SPORT — THE GAME

> Du sport. Du business. Du chaos.

Mini-jeu arcade de 60 secondes pour [fast-sport.fr](https://www.fast-sport.fr/).
Le joueur enchaîne des épreuves sportives jouables (basket, tennis, rugby) et
des situations de sport business (marketing sportif, anglais du sport, droit
du sport), en alternance, avec score, combos et record local.

React 19 + Vite + TypeScript. Aucun backend, aucune API, aucun script tiers.
La police (Archivo) est embarquée dans le build.

---

## Lancer le projet

```bash
cd fast-sport-game
npm install
npm run dev        # http://localhost:5173
```

| Commande            | Rôle                                             |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | serveur de développement                         |
| `npm run build`     | vérification TypeScript + build dans `dist/`     |
| `npm run preview`   | sert le build de production (port 4173)          |
| `npm run typecheck` | TypeScript seul                                  |
| `npm test`          | tests unitaires (Vitest)                         |

Node 20.19+ ou 22+ requis (Vite 8).

---

## Le jeu

| Défi                    | Famille            | Geste                                                                 | Ce qui fait le score                                      |
| ----------------------- | ------------------ | --------------------------------------------------------------------- | --------------------------------------------------------- |
| **SHOOT!**              | Basket             | glisser / survoler pour viser, relâcher ou cliquer pour tirer (← → + Espace) | distance au centre du cercle, défenseur qui contre, panier mobile |
| **PERFECT TIMING**      | Tennis             | toucher / Espace quand la balle entre dans la zone                    | rallye de 3 balles de plus en plus rapides, fenêtre de timing |
| **KICK IT!**            | Rugby              | 1er tap : direction (aiguille), 2e tap : puissance (jauge)            | précision entre les perches, puissance minimale, vent      |
| **SPONSOR PANIC**       | Marketing sportif  | 3 choix (clic ou touches 1·2·3)                                       | meilleure option + rapidité                                |
| **LOST IN TRANSLATION** | Anglais du sport   | 3 choix                                                               | idem                                                       |
| **CONTRACT CRISIS**     | Droit du sport     | 3 choix                                                               | idem, avec mention « situations fictives, pas un conseil juridique » |

- Sport et business **alternent strictement**, et un même défi ne revient jamais deux fois de suite.
- La **difficulté** suit le temps écoulé : panier qui bouge puis accélère, défenseur plus rapide,
  balles plus rapides et fenêtres plus étroites, perches plus serrées, vent, chronos de défi plus courts.
- **Chrono** : 60 s de jeu. Il continue pendant le court feedback sportif (600 ms) et
  **s'arrête pendant l'explication d'un défi business** : lire n'est jamais pénalisé.
  Une partie réelle dure donc environ 65 à 75 s. Pour un format strictement de 60 s, voir `useGameSession.ts`
  (condition `phase === 'reveal' && !business`).
- **Pause** : bouton ou Échap / P. Pause automatique si l'onglet ou l'iframe est masqué.
- **Son** : effets synthétisés (Web Audio, aucun fichier), coupables via le bouton ou la touche M,
  préférence mémorisée. Le jeu se joue entièrement sans son.

### Score

| Résultat  | Points de base | Combo                     |
| --------- | -------------- | ------------------------- |
| PERFECT!  | 150 + bonus    | +1                        |
| NICE!     | 100 + bonus    | +1                        |
| GOOD      | 50 + bonus     | +1                        |
| ALMOST    | 25 fixes       | remis à zéro              |
| MISS      | 0              | remis à zéro              |

- Bonus de précision (sport) ou de rapidité (business) : jusqu'à +50.
- Multiplicateur : x2 dès 2 réussites d'affilée, x3 dès 4, x4 dès 6 (appliqué aux réussites).
- Chaque feedback affiche le résultat, les points et la raison (« Contré par le défenseur », « Trop court »,
  « 3/3 retours · 2 parfaits », « Meilleure option · rapidité +38 »…).
- Rangs : Rookie (< 1 200), Rising Talent (≥ 1 200), Sport Business Pro (≥ 2 600), Fast Sport Legend (≥ 4 200).
  Seuils calibrés avec un bot aléatoire (≈ 1 000 à 1 700 pts) et un bot au timing parfait (≈ 3 200 à 6 200 pts).
- Record stocké dans `localStorage` (clé `fastsport-game:best`). Si le stockage est bloqué, le jeu fonctionne quand même.

---

## Architecture

```
fast-sport-game/
├── index.html                 point d'entrée (lang fr, meta)
├── public/favicon.svg
├── docs/embed-example.html    page hôte de test pour l'iframe
├── src/
│   ├── main.tsx               montage React + import des styles
│   ├── App.tsx                navigation accueil / jeu / résultats, record
│   ├── game/
│   │   ├── types.ts           types partagés (Tier, Outcome…)
│   │   ├── config.ts          durées, chronos par défi, textes des missions
│   │   ├── scoring.ts         score, combo, rangs, résultat business (pur, testé)
│   │   ├── sequence.ts        ordre des défis, difficulté (pur, testé)
│   │   └── useGameSession.ts  machine d'états : intro → live → reveal → timeup, chronos, pause
│   ├── data/business.ts       contenus des défis business (18 situations)
│   ├── challenges/
│   │   ├── Basketball.tsx     SVG + boucle d'animation
│   │   ├── Tennis.tsx
│   │   ├── Rugby.tsx
│   │   └── ChoiceChallenge.tsx  défis business (3 choix + explication)
│   ├── screens/               Home, Game, Results
│   ├── components/            HUD, feedback, particules, logo, son, illustration
│   ├── audio/sfx.ts           sons Web Audio + préférence
│   ├── lib/                   localStorage sécurisé, boucle rAF, reduced motion
│   └── styles/                tokens.css (thème), base, screens, game, challenges
└── tests/                     Vitest : scoring, séquence, contenus business
```

Ajouter une situation business : ajouter un objet dans `src/data/business.ts`
(1 seule réponse `best`, 3 choix maximum). Les tests vérifient ces règles.

---

## Charte graphique : à valider

Le site fast-sport.fr **n'était pas accessible** depuis l'environnement de développement
(blocage réseau). Je n'ai donc pas pu relever ses couleurs, sa typographie ni son logo.
Ce que j'ai pu confirmer via une recherche web : Fast Sport forme depuis 2007 les
professionnels du sport business en langues (anglais du sport), marketing sportif et droit du sport.
Le contenu du jeu s'appuie sur ce positionnement.

La palette actuelle (bleu nuit `#0b1424` + orange signal `#ff5a1f`) est une **proposition provisoire**.
Pour l'aligner sur la marque :

1. Remplacer les valeurs de `src/styles/tokens.css` (`--fsg-accent`, `--fsg-ink`, `--fsg-blue`, etc.).
   Tous les composants lisent ces variables.
2. Remplacer la police : `--fsg-font` + l'import `@fontsource-variable/...` dans `src/main.tsx`.
3. Remplacer le logo : `src/components/BrandMark.tsx` (un seul composant utilisé partout).

---

## Mise en ligne

`npm run build` produit un site **100 % statique** dans `dist/` (≈ 85 Ko de JS gzip + polices).
Les chemins sont relatifs (`base: './'`) : le dossier fonctionne à la racine d'un domaine
comme dans un sous-dossier.

Options d'hébergement, de la plus intégrée à la plus autonome :

1. **Sous-dossier du site Fast Sport** (recommandé) : copier le contenu de `dist/` par FTP/SFTP
   dans par exemple `/jeu/` à la racine du site → `https://www.fast-sport.fr/jeu/`.
   Même domaine, donc aucun service tiers et pas de problème de cookies ou de stockage.
2. **Sous-domaine** (`jeu.fast-sport.fr`) ou hébergeur statique gratuit (Netlify, Vercel,
   Cloudflare Pages, GitHub Pages) : dossier de publication `dist`, commande `npm run build`.

---

## Intégration au site (iframe)

L'iframe isole totalement le jeu : aucun conflit de CSS ou de JavaScript avec le thème du site,
et le jeu ne dépend d'aucun style global. Toutes les classes sont de plus préfixées `fsg-`.

**WordPress (Gutenberg)** : ajouter un bloc *HTML personnalisé* et coller :

```html
<div style="position:relative;width:100%;max-width:1000px;height:min(85vh,720px);min-height:540px;margin:0 auto;">
  <iframe
    src="https://www.fast-sport.fr/jeu/"
    title="Fast Sport, The Game : mini-jeu arcade"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:16px;"
    allow="autoplay"
    loading="lazy"></iframe>
</div>
```

Avec Elementor ou Divi : widget *HTML* / module *Code*, même code.
Je n'ai pas pu vérifier quel CMS ou constructeur de pages utilise fast-sport.fr : adapter le bloc si besoin.

Notes :
- Le jeu s'adapte à la taille de l'iframe (testé de 390×844 à 1280×800, et 860×420 en paysage).
  Hauteur conseillée : 540 à 720 px sur ordinateur.
- Le bouton « DISCOVER FAST SPORT » ouvre `https://www.fast-sport.fr/` dans la page principale
  (`target="_top"`). Si vous ajoutez un attribut `sandbox` à l'iframe, incluez
  `allow-scripts allow-same-origin allow-top-navigation-by-user-activation`.
- Le défilement tactile n'est bloqué **que** dans la zone de jeu sportive (`touch-action: none`) :
  la page hôte et les écrans d'accueil, de questions et de résultats défilent normalement.
- Pour un test local : `npm run build && npm run preview`, puis ouvrir `docs/embed-example.html`.

Alternative sans iframe : une page WordPress dédiée en pleine largeur qui pointe vers `/jeu/`
(lien de menu ou bouton). C'est la meilleure expérience sur mobile (plein écran).

---

## Accessibilité et confort

- Souris, tactile et clavier partout (Espace / Entrée, flèches, 1·2·3, Échap, M).
- `prefers-reduced-motion` : animations décoratives et confettis désactivés. Le mouvement
  nécessaire au gameplay (balles) est conservé.
- Focus visibles, boutons de 44 px minimum, libellés ARIA sur le son, la pause et le score.
