# PADEL — Mon carnet personnel de progression

Padel est une application web progressive (PWA) destinée à enregistrer ses matchs de padel, conserver un historique local, consulter des statistiques et produire un bilan fondé sur les réponses réellement saisies.

## Démarrage rapide

Le projet est statique : aucun serveur backend, compte utilisateur ou abonnement n’est nécessaire. Tous les fichiers livrés, y compris le logo et les icônes, sont directement à la racine du ZIP ; aucun dossier imbriqué n’est nécessaire.

1. Décompresse `padel-v2.zip`.
2. Pour tester localement, sers le dossier avec un petit serveur HTTP local (par exemple `python -m http.server 8000`), puis ouvre `http://localhost:8000`. IndexedDB et le service worker nécessitent un contexte sécurisé : `localhost` convient.
3. Pour publier, importe tous les fichiers et dossiers de l’archive à la racine de ton dépôt GitHub.
4. Dans GitHub : **Settings → Pages → Deploy from a branch**, sélectionne la branche voulue et le dossier `/ (root)`.
5. Attends la publication puis ouvre l’adresse GitHub Pages fournie.

> Important : ouvrir directement `index.html` en `file://` n’est pas une méthode de test valide pour la PWA et le service worker.

## Installation sur téléphone et ordinateur

- **iPhone/iPad** : ouvre l’URL publiée dans Safari → bouton Partager → **Sur l’écran d’accueil** → Ajouter.
- **Android** : ouvre l’URL dans Chrome → menu ⋮ → **Installer l’application** ou **Ajouter à l’écran d’accueil**.
- **Ordinateur** : selon le navigateur, utilise l’icône Installer dans la barre d’adresse ou le menu du navigateur.

Le nom affiché de l’application et son icône installée sont simplement « Padel » ; la version technique est indiquée séparément dans les réglages. L’icône est générée à partir du logo officiel fourni, également utilisé dans l’en-tête.

## Utiliser l’accueil

L’accueil calcule automatiquement les matchs, victoires, taux de victoire parmi les matchs décidés, durée de jeu, joueurs, partenaires et clubs. Le sélecteur d’année filtre les statistiques globales. La zone **10 derniers matchs** est une fenêtre glissante : elle prend les dix matchs les plus récents, tandis que l’historique complet conserve les anciens matchs. Les indicateurs verts, rouges et gris distinguent victoires, défaites et matchs non comptabilisés.

Un graphique mensuel en colonnes empilées présente visuellement victoires et défaites des six derniers mois. Les comparaisons avec les dix matchs précédents ne sont affichées que lorsque cette période existe et contient des résultats décidés. Les durées inconnues ne sont pas assimilées à zéro dans les informations de durée cumulée.

## Créer un match

Touche le bouton **+** au centre de la navigation inférieure. Le formulaire se déroule en trois étapes. Date et durée sont empilées sur petit écran et passent en deux colonnes uniquement lorsque la largeur le permet. Partenaire et adversaires acceptent un nom libre : créer une fiche joueur n’est jamais obligatoire pour enregistrer un match.

1. **Informations générales** : date, durée, lieu, type, partenaire, adversaires et raquette.
2. **Score** : saisis jusqu’à trois sets, choisis le résultat et le format. En format classique, un set doit être gagné 6-x avec deux jeux d’écart jusqu’à 6-4, 7-5 ou 7-6 après tie-break. Pour un set 7-6, saisis les points du tie-break. Les formats alternatifs peuvent être conservés en texte libre sans être transformés en score classique.
3. **Statistiques et ressenti** : renseigne les fourchettes estimatives, qualités, difficultés, moments forts et objectif du prochain match. Les champs laissés vides restent inconnus.

Tu peux revenir à l’étape précédente : les réponses sont conservées dans le formulaire. À l’enregistrement, l’application valide les données et écrit le match dans IndexedDB avant d’annoncer le succès.

## Scores et règles de validation

Les champs numériques utilisent un clavier adapté sur mobile. Les validations classiques vérifient notamment les entiers positifs, l’absence d’égalité dans un set, les scores de set standards, la présence d’un tie-break en 7-6, l’ordre des sets et la cohérence victoire/défaite. Les règles de certaines compétitions diffèrent : sélectionne **Format alternatif / score non standard** si le format joué ne correspond pas au format classique, et conserve le score en texte libre. Dans ce mode, le score n’entre pas dans les calculs de sets.

## Statistiques et analyses

Les statistiques offensives, défensives, service/retour, filet et vitres sont saisies sous forme de fourchettes personnelles. Elles ne sont jamais converties en nombres exacts. Les qualités utilisent une échelle qualitative. L’analyse individuelle sépare points forts, difficultés, plan d’action et notes. Les conseils sont déterminés par les difficultés déclarées ; s’il n’y a pas assez de données, l’application le signale plutôt que d’inventer une tendance.

Les analyses sont des aides à la réflexion, pas une mesure instrumentée de la performance. Les fourchettes sont subjectives. Une association statistique ne démontre pas une causalité.

## Historique, modification et suppression

L’onglet **Matchs** permet de rechercher par joueur ou club, filtrer par résultat et année, et consulter les fiches. Chaque carte donne accès au bilan et à la modification. La modification réutilise le même identifiant et remplace l’enregistrement existant : elle ne crée pas de doublon. La suppression demande confirmation et les statistiques sont recalculées à partir des données restantes.

## Joueurs, équipes et clubs

L’onglet **Joueurs** permet de créer des profils avec niveau estimé, main dominante, côté préféré et notes. Les joueurs sont proposés dans le formulaire. Les clubs saisis sur un match sont ajoutés automatiquement et proposés ensuite. Les associations d’équipes sont réservées à une évolution ultérieure ; les associations partenaires sont néanmoins visibles via les matchs enregistrés.

## Matériel

Tu peux ajouter une raquette via le formulaire de match uniquement si elle existe dans les données importées. L’architecture JSON conserve une collection `equipment`, mais l’interface de création/gestion complète du matériel est une limite connue de cette version initiale.

## Personnaliser l’application

Dans **Réglages**, sélectionne le thème clair, sombre ou crème et une couleur principale. Le choix est sauvegardé dans IndexedDB et réappliqué au prochain lancement.

## Exporter et importer une sauvegarde JSON

- **Exporter** télécharge un fichier contenant matchs, joueurs, clubs, équipes, équipements, préférences et version de schéma.
- **Importer** valide la structure, les identifiants, les résultats et les scores classiques avant de proposer le remplacement des données existantes.
- Le remplacement nécessite une confirmation explicite. Un fichier invalide est refusé avant toute suppression des données actuelles.

Fais des exports réguliers et conserve-les dans un endroit sûr.

## Fonctionnement hors connexion et stockage

Après un premier chargement réussi sur une URL HTTPS, le service worker met en cache les ressources statiques nécessaires à l’application. Les données personnelles ne sont pas placées dans le cache de ressources : elles sont enregistrées dans IndexedDB. Le navigateur peut proposer un stockage persistant, sans que cela garantisse une conservation absolue si l’utilisateur efface les données du site ou désinstalle le navigateur.

**Attention au stockage séparé :** Safari et une PWA installée peuvent parfois utiliser des espaces de stockage différents. L’application ne synchronise pas les appareils et ne dispose pas de compte cloud. Pour déplacer ses données, exporter le JSON depuis le premier environnement puis l’importer dans l’autre.

## Sécurité et limites connues

- Toutes les données sont locales à l’appareil et au navigateur ; aucun serveur ne reçoit les matchs.
- Il n’y a pas de synchronisation multi-appareils.
- L’analyse est déterministe et fondée sur les réponses saisies ; ce n’est pas un modèle d’IA ni une analyse vidéo.
- Les statistiques par mois, par partenaire, par club, les objectifs, les bilans mensuels et les défis ne sont pas encore proposés comme tableaux dédiés.
- La gestion avancée des équipes et l’éditeur de matériel sont des évolutions prévues.
- Les scores classiques sont validés ; les formats alternatifs sont conservés en texte libre sans calcul de sets.
- Le cache du service worker porte un nom versionné. Lors d’une mise à jour, incrémente `CACHE` dans `service-worker.js` pour renouveler les ressources statiques.

## Nouveautés de Padel

- Navigation mobile fixe à quatre onglets et création rapide par bouton central ; accès Réglages unique en bas de l’écran.
- Création de match en trois étapes.
- Validation des sets classiques et cohérence du résultat.
- Fourchettes statistiques qui préservent l’état inconnu.
- Analyse individuelle et plan d’action fondé sur les difficultés déclarées.
- Fenêtre glissante des dix derniers matchs.
- Historique avec recherche, filtres, modification et suppression.
- Carnet de joueurs et mémorisation des clubs.
- Thèmes clair, sombre et crème, couleurs personnalisables.
- Export/import JSON versionné.
- PWA avec manifeste, icônes issues du logo fourni et cache hors connexion.

## Vérifications réalisées et limites de test

Les fichiers sont livrés avec une structure statique, les ressources PWA et un stockage IndexedDB. Les contrôles de cohérence sont intégrés au formulaire et à l’import JSON. Le ZIP est construit avec les fichiers principaux à sa racine.

Les tests réels sur iPhone physique, PWA installée et hors connexion ne peuvent pas être simulés intégralement dans cet environnement de génération. Il faut effectuer ces vérifications après publication HTTPS sur l’appareil cible. Les tests automatisés de règles de score et d’import ne remplacent pas les essais d’acceptation sur Safari/Chrome.

## Structure de l’archive

```text
padel-v2.zip
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── README.md
├── logo-officiel.jpg
├── icon-192.png
├── icon-512.png
└── tests-smoke.js
```

Tous les fichiers sont directement à la racine du ZIP : aucun dossier de projet imbriqué et aucun sous-dossier dans l’archive.


### Correctifs de la version 6.0.0

- Nom affiché et nom d’installation simplifiés : **Padel**.
- Tie-break facultatif pour un set 7-6 ; champ texte libre si renseigné.
- Correctifs de largeur mobile : champs de score et date/durée contraints à la largeur disponible, sans débordement horizontal.
- Cache PWA renouvelé pour forcer le chargement des correctifs.


**Nom de l’application :** le nom visible dans l’en-tête, le titre du navigateur et le manifeste d’installation est désormais « Padel » (sans suffixe de version). La version technique actuelle est 6.0.0.


## Version V6

Archive de livraison : `padel-v6.zip`. Le nom affiché de l’application reste **Padel** ; V6 désigne la version du projet et de l’archive, pas le nom affiché sous l’icône.
