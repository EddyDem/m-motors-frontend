# M-Motors — Application web (front-end)

Interface client de la refonte M-Motors : recherche de véhicules, espace client, dépôt et suivi de dossier, souscription LOA. Consomme l'API du dépôt `m-motors-backend`. Le back-office est dans l'admin Django (côté back).

## Stack

React 19 + Vite - React Router - Axios (token JWT par intercepteur) - Sentry.

## Ecrans

| Ecran | Route | Accès | EPIC |
| --- | --- | --- | --- |
| Catalogue | `/catalogue` | public | E1 |
| Connexion / Inscription | `/login`, `/register` | public | E2 |
| Profil | `/profil` | connecté | E2 |
| Mes dossiers | `/dossiers` | connecté | E3 / E4 |
| Souscription | `/souscription` | connecté | E5 |

Routes privées protégées par `RequireAuth` (redirige vers `/login`).

## Lancer en local

```bash
npm install
copy .env.example .env      # renseigner VITE_API_URL
npm run dev
```

Scripts : `dev`, `build`, `preview`, `lint`. Variables : voir `.env.example`.

## Git et branches

- Dépôt public. `main` stable, alimentée par Pull Request.
- Une branche par EPIC : `feature/E<n>-front-<sujet>`, commits `feat:`/`chore:`.
