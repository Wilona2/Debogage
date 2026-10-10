/**
 * Le panier d'achats comporte trois propriétés : pommes, poires, prunes.
 * Chaque propriété représente un type de fruits et est un objet.
 * Pour chaque type de fruits, on stocke son prix, son poids et sa quantité.
 *
 * @param nbPommes le nombre de pommes dans le panier à la construction du panier (entier)
 * @param nbPoires le nombre de poires dans le panier à la construction du panier (entier)
 * @param nbPrunes le nombre de prunes dans le panier à la construction du panier (entier)
 * @constructor
 */
function Panier(nbPommes, nbPoires, nbPrunes) {
    this.pommes = new Sacsfruit('pommes', 13.50, 10, nbPommes);
    this.poires = new Sacsfruit('poires', 20, 12, nbPoires);
    this.prunes = new Sacsfruit('prunes', 22, 15, nbPrunes);
}

/**
 * Le sac de fruits représente un sac d'une sorte de fruits donnée.
 * Il est responsable de retourner toutes les informations à propos des sacs de fruits de ce type.
 *
 * @param type le type de fruits sous forme d'une chaîne de caractères (ex. 'Pommes')
 * @param prix le prix pour un sac de ce type de fruits (float)
 * @param poids le poids d'un sac de ce type de fruits (lbs)
 * @param qte la quantité achetée de sacs de ce type
 * @constructor
 */
function Sacsfruit(type = 'fruits', prix = 0, poids = 0, qte = 0){
    this.type = type;
    this.prix = prix; // poids --> prix
    this.poids = poids;
    this.qte = qte;
}

const panier = new Panier(0,0,0);
const fruits = ["pommes", "poires", "prunes"];

/**
 * Fonction qui retourne la propriété d'un fruit passé en paramètre. Par exemple si 'pommes' et 'prix' sont passés
 * en paramètres, la fonction retournera le coût total des sacs de pommes achetés.
 *
 * @param fruit le fruit (en chaîne de caractère) pour lequel on veut connaître la propriété passée en paramètre
 * @param propriete la propriété qu'on veut connaître (en chaîne de caractères) : qte, prix ou poids
 * @returns {number} le total pour la propriété du fruit passé en paramètre
 */
function getTotalFruit(fruit, propriete = "qte") {
    return propriete === "qte" ? panier[fruit]["qte"] : (panier[fruit][propriete] * panier[fruit]["qte"]);
}

/**
 * Fonction qui retourne le total du panier pour la propriété passée en paramètre, tous fruits confondus.
 *
 * @param propriete la propriété qu'on veut connaître en chaîne de caractères : qte, prix ou poids
 * @returns {number} le total de la propriété passée en paramètre pour l'ensemble du panier
 */
function getTotal(propriete = "qte") {
    let total = 0;
    for (let fruit in fruits) {
        total += getTotalFruit(fruits[fruit], propriete); //fruit est l'index, pas un élément de la liste
    }
    return total;
}

/**
 * Fonction qui modifie les données dans la page.
 * Les prix sont affichés avec deux décimales.
 */
function mettreAJour() {
    const props = ["prix", "qte", "poids"];
    for (let prop of props) {
        // Mettre à jour chaque propriété de chaque fruit
        for (let fruit of fruits) {
            const total = getTotalFruit(fruit, prop);
            document.querySelector(`#${prop}_${fruit}`).textContent =
                prop === "prix" ? total.toFixed(2) : total.toString(10);
        }
        // Pour chaque propriété on met à jour le total
        let total = getTotal(prop);
        document.querySelector(`#${prop}_total`).textContent =
            prop === "prix" ? total.toFixed(2) : total.toString(10);
    }
}

/**
 * Fonction qui permet d'ajouter un sac du fruit passé en paramètre au panier
 * et qui met à jour le panier après l'achat.
 *
 * @param fruit le fruit acheté
 */
function achatFruit(fruit) {
    panier[fruit].qte++;
    mettreAJour();
}

// Ajouter la fonction achatFruit à chaque bouton de fruit. Utilisation de la forme fléchée dans le forEach
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', function () {
        //Extraire le nom du fruit (ex. pommes dans btn-pommes) et le passer en paramètre à la fonction achatFruit
        const fruit = this.id.substring(4);
        //Le fruit doit être connu
        if (fruits.includes(fruit)) {
            achatFruit(fruit);
        }
    })
})
