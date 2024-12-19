# Ethereum Block Explorer

This project is a simple Ethereum block explorer using the Alchemy API and ethers.js.

## Installation 

```bash
npm install
```

## Usage

```bash
node script.js
node exercise.js
```

## Exercise
Tu vas envoyer plusieurs transactions comme celles qu’on a déjà faites, pour transférer de l’ether.

Pour ces transactions tu vas à chaque fois spécifier manuellement tous les champs dont on a parlé : nonce, type, gas, gasLimit.

Tu vas remplir chacun des critères suivants :

- Envoyer une transaction de type 0
- Envoyer une transaction de type 2
- Envoyer une transaction avec un nonce trop petit
- Envoyer une transaction avec un nonce trop grand
- Envoyer une transaction en diminuant le prix pour chaque gas
- Envoyer une transaction en augmentant le prix pour chaque gas
- Envoyer une transaction avec un gasLimit trop bas

Utilise le hash de ces transactions pour aller les voir sur Etherscan. Tu verras que tu pourras retrouver tous ces champs sur la page de la transaction (clique bien sur “+ Click to show more” en bas de la page)

Envoie-moi les liens Etherscan vers les transactions pour chacun de ces critères.

## License

[MIT](LICENSE)