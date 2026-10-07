function Jeu(maxEssais) {
    this.nombre = Math.ceil(Math.random()*100);
    this.nbEssais = 0;
    this.maxEssais = 10; // max essais était à 0
}

let jeu = new Jeu(10);
const messageHTML = document.querySelector('#message');
const nombresHTML = Array.from(document.querySelectorAll('.nombre'));
const button = document.querySelector('#essais button');
button.addEventListener("click", essai);


function essai() {
    const essai = parseInt(document.querySelector('#essai').value);
    document.querySelector('#essai').value = '';
    document.querySelector('#essais p').textContent += `${essai.toString()}, `;
    jeu.nbEssais++;

    if(essai === jeu.nombre) {
        messageHTML.textContent = "Bravo !";
        messageHTML.classList.add('succes');
        messageHTML.classList.remove('erreur');
        fin();
    }
    else {
        let message = essai > jeu.nombre ? "Trop haut": "Trop bas;"; // Changé < pour >
        if(jeu.nbEssais >= jeu.maxEssais) {
            message = 'Vous avez perdu la partie </3';
            fin();
        }
        else if(essai < jeu.nombre){
            nombresHTML.filter((element)=>parseInt(element.id) <= essai).forEach( // Changé jeu.nombre pour essai
                (nombre) => nombre.classList.add('cache')
            )
        }
        else {
            nombresHTML.filter((element)=>parseInt(element.id) >= essai).forEach(
                nombre => nombre.classList.add('cache')
            )
        }
        messageHTML.textContent = `Ah non :(  ${message}`
        messageHTML.classList.add('erreur');
    }
}

function fin(){
    //document.querySelector('#essais div').classList.add('cache');
    const button = document.querySelector('#essais button');
    button.textContent = "Jouer une nouvelle partie";
    button.removeEventListener('click', essai);
    button.addEventListener("click", nouveauJeu);
}

function nouveauJeu() {
    jeu = new Jeu();
    //document.querySelector('#essais button').remove();
    document.querySelector('#essai').value = '';
    document.querySelector('#essais p').textContent = '';

    document.querySelector('#message').classList.remove('succes');
    document.querySelector('#message').textContent = '';
    document.querySelector('#message').classList.remove('erreur');

    document.querySelectorAll('.nombre').forEach(nombre => nombre.classList.remove('cache'));
    const button = document.querySelector('#essais button');
    button.removeEventListener('click', nouveauJeu);
    button.addEventListener('click', essai);
    button.textContent = "Soumettre";
}
