# Résumé

Dans le cadre d'une mission sur Cactomain, nous devons vérifier que le candidat ait les connaissances nécessaires :

- Une certaine aisance en JS
- Notion d'APIs

Objectifs :
=========

Créer une application NodeJS qui communique avec des APIs.
Le test est volontairement difficile, il permettra de rapidement identifier les points sur lesquels travailler.

Sujet :
======

Vous développez un micro-service qui permettra de calculer la TVA et d'effectuer un achat sur Stripe.

Les services externes à utiliser :

- Stripe pour l'achat
- Octobat pour le calcul de TVA

Ce qu'il faut faire :
====================

Créer une app NodeJS qui acceptera comme entrée :

- un prix HT : entier exprimé en centime
- les informations bancaire pour effectuer le paiement : Numéro / Expiration / CVV
- Le pays où ce trouve l'utilisateur (pour calcul de TVA)

Et qui renvoi en sortie :

- Le token Stripe (si pas d'erreur)
- Une erreur si elle existe

En bonus, créer une page web permettant d'entrée les inputs et d'afficher l'output.

Pour réaliser ce test, il conviendra de créer des comptes sur ces services.

Je vous conseil dans l'ordre :

1. Créer le projet NodeJS qui prend les entrées ci-dessus (Définission de comment les entrées et sorties sont passées)
2. Effectuer un achat sur Stripe, sous la forme d'une Charge
3. Appliquer la TVA en communicant avec Octobat
4. Ajouter un `express` like, pour mettre à diposition ce micro-service sous forme d'api HTTP
5. Créer la page web qui acceptera les entrées et affichera les sorties

Il ne faut pas se focaliser sur le bon fonctionnement total de l'application mais plutôt bien structurer le code afin qu'il soit lisible et compréhensible et le candidat doit montrer qu'il a bien essayé de lire et comprendre la documentation de ces services. Vous devez être pro-actif et communicant.

N'essayez pas d'over-engineer, restez simple, découper le projet par bloc simple à réaliser et me contacter quand après vos recherche vous bloquez.

Si des difficultés existent, il est très important de m'avertir afin que je puisse aider dans la réalisation, savoir demander de l'aide fait partie du test, et ce quelque soit la question (il n'y a pas de mauvaise question).

Il n'y a pas de deadline quant à la réalisation du test, vous ne serez pas juger dessus.

Il est a minimum demandé de maitriser Git, d'avoir un peu de documentation afin que je puisse aisément lancer le projet.

Lien utiles:

- [Octobat](https://www.octobat.com/)
- [Stripe](https://stripe.com/fr)
- [Stripe API Reference](https://stripe.com/docs/api)
- [NodeJS](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o)
