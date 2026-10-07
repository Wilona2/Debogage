function Jeu(maxEssais) {
    this.nombre = Math.ceil(Math.random()*100);
    this.nbEssais = 0;
    this.maxEssais = 0;
}

let jeu = new Jeu(10);
const messageHTML = document.querySelector('#message');
const nombresHTML = document.querySelectorAll('.nombre');
const button = document.querySelector('#essais button');
button.addEventListener("click", essai);


function essai() {
    const essai = parseInt(document.querySelector('#essai').value);
    document.querySelector('#essais p').textContent = essai.toString();
    jeu.nbEssais++;

    if(essai === jeu.nombre) {
        messageHTML.textContent = "Bravo !";
        messageHTML.classList.add('succes');
        fin();
    }
    else {
        const message = essai < jeu.nombre ? "Trop haut": "Trop bas;";
        if(jeu.nbEssais > jeu.maxEssais) {
            fin();
        }
        else if(essai < jeu.nombre){
            nombresHTML.filter((index, element)=>parseInt(element.id,10) < jeu.nombre).forEach(
                (nombre) => nombre.classList.add('cache')
            )
        }
        else {
            nombresHTML.filter((element)=>parseInt(element.attr('id'),10) > jeu.nombre).forEach(
                nombre => nombre.classList.add('cache')
            )
        }
        messageHTML.textContent = `Ah non :(  ${message}`
        messageHTML.classList.add('erreur');
    }
}

function fin(){
    document.querySelector('#essais div').classList.add('cache');
    const button = document.querySelector('#essais button');
    button.textContent = "Jouer une nouvelle partie";
    button.addEventListener("click", nouveauJeu);
}

function nouveauJeu() {
    jeu = new Jeu();
    document.querySelector('#essais button').remove();
    document.querySelector('#essai').value = 0;
    document.querySelector('#essais p').textContent = '';
    document.querySelector('#message').classList.remove('succes');
}
