# Padel Track — application web

Application personnelle de suivi de padel, responsive, en HTML/CSS/JavaScript.

## Fonctions incluses
- Tableau de bord saison : matchs, victoires, taux de victoire, durée, partenaires.
- Historique des matchs : date, durée, lieu, résultat, équipes, score, partenaire, notes et moments forts.
- Profils simples des joueurs.
- Fiche matériel : raquette, chaussures et accessoires.
- Recherche/filtre des matchs et export des données au format JSON.
- Logo fourni intégré à l'application.

## Lancer en local
Décompresse le ZIP et ouvre `index.html` dans un navigateur.

## Publier sur GitHub Pages
1. Crée un dépôt public nommé `padel-track`.
2. Décompresse le ZIP.
3. Envoie tous les fichiers et le dossier `assets` à la racine du dépôt (pas le ZIP).
4. Clique sur **Commit changes**.
5. Va dans **Settings → Pages**.
6. Choisis **Deploy from a branch**, branche `main`, dossier `/(root)`, puis **Save**.
7. Attends la publication. L'adresse sera de la forme `https://TON-PSEUDO.github.io/padel-track/`.

## Important : stockage des données
Cette première version sauvegarde les informations dans le stockage local du navigateur (`localStorage`) sur l'appareil utilisé. Les données ne sont pas automatiquement synchronisées entre téléphone et ordinateur et peuvent être perdues si les données du navigateur sont effacées. Utilise **Exporter mes données** régulièrement pour conserver une sauvegarde JSON.
Pour une vraie synchronisation multi-appareils, comptes utilisateurs et sauvegarde en ligne, il faudra ajouter un backend (par exemple Supabase ou Firebase) dans une prochaine version.

Le formulaire de match est utilisable immédiatement ; aucun compte ni serveur n'est nécessaire pour cette version.
