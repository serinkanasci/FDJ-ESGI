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

