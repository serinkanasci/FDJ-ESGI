# FDJ-ESGI

Déployer le projet:
=======

- truffle console --network <nom_du_réseau> - "development" dans notre projet en local
- truffle compile - Si tout se passe bien
- truffle deploy

Tester le smart contrat
=======

Les comptes Ganache
-----------

- let accounts = web3.eth.getAccounts() : Permet de récupérer tous les comptes sur le réseau local
- accounts affichera la liste des comptes

Le déploiement du contrat
-----------

- let instance = <nom_du_contrat>.deployed()
- instance devrait afficher l'abi du contrat (c'est illisible mais c'est bon signe si vous reconnaissez vos fonctions dans le terminal)

A DEMANDER A CHARAF QUI REPOND PAS LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
=======

- Est-ce qu'on avance dans le bon sens ? Déjà
- Est-ce qu'il faut faire un contrat abstract pour la lotterie et les paris?
- Si on veut une mise fixe d'un € convertit en ETH est-ce que ça va le coup de faire un oracle?
- Y a-t-il des APIs pour ça ? (source, ref..., etc...)