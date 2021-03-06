
/* ------------------------- Constants and API connexion ------------------------- */

const product = document.querySelector('#product');
const section = document.getElementsByTagName('section');

const idUrl = new URL(window.location).searchParams.get('id');
const url = 'http://localhost:3000/api/teddies/' + idUrl // url + id définie en paramètre et initialisée dans la const idUrl
XMLRequest(url); // requête de connexion à l'api définie dans le fichier XMLHttpRequest.js

/* ------------------------- Localstorage and Cart ------------------------- */

function renderHTML(data) { //fonction servant à la création dynamique du contenu
    const div = document.createElement('div');
    const colors = data.colors; //récupère les couleurs disponibles du teddy dans l'API
    div.setAttribute('class', 'product');

    div.innerHTML += `<img class="teddyImage" src="${data.imageUrl}">
    <h1 class="teddyName">${data.name}</h1>
    <p class="teddyDescription">${data.description}</p>
    <p class ="teddyPrice">${data.price / 100} €</p>
    <select id="colorChoice"></select>`;
    product.appendChild(div); //crée du contenu en fonction de data (donc en fonction de l'ID présentée en paramètre dans l'URL)

    const form = document.getElementById('colorChoice');

    colors.forEach(displayColor); //Pour chaque couleur présente à l'URI ciblée, crée in input correspondant dans un formulaire déroulant, la fonction apparaît plus bas

    function displayColor(item) { //fonction en question qui affiche les couleurs
        document.getElementById("colorChoice").innerHTML += `<option>${item}</option>`;
    };

    div.appendChild(document.getElementById('addTeddy')); //attache le contenu créé au DOM
    div.appendChild(form);
};

/* ------------------------- Localstorage and Cart ------------------------- */

document.getElementById('addTeddy').addEventListener('click', function (a) {
    a.preventDefault(); //évite la redirection vers le panier pour faciliter la navigation
    const color = document.getElementById('colorChoice'); //pour cibler la couleur qui sera renvoyée à l'API dans la commande

    let teddies = { //création d'un objet teddy à renvoyer dans le localStorage puis en POST en vue de la création d'un panier
        id: response._id,
        name: response.name,
        color: color.value, //méthode différente pour la couleur dont on cherche la valeur dans le formulaire pour éviter de récupérer toutes les couleurs
        price: response.price,
        image: response.imageUrl
    }

    const teddiesAdded = localStorage.getItem('product');

    if (teddiesAdded) { //vérifie l'existence d'un panier, sinon le crée
        teddiesInCart = JSON.parse(teddiesAdded); //parse du JSON pour pouvoir accéder aux données
        teddiesInCart.push(teddies); //ajoute le teddy ayant les propriétés énumérées plus haut
        localStorage.setItem('product', JSON.stringify(teddiesInCart));
        alert('Ajouté au panier !'); //prévient l'utilisateur du bon déroulement de l'action
    } else {
        teddiesInCart = []; //si inexistant, crée un panier sous forme de tableau (format attendu par l'API)
        teddiesInCart.push(teddies); //ajoute le teddy au tableau
        localStorage.setItem('product', JSON.stringify(teddiesInCart)); //envoie les données obtenues dans le localStorage
        alert('Ajouté au panier !'); //prévient l'utilisateur du bon déroulement de l'action
    }

    displayQuantity();

    location.reload();
});