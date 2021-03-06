let productLocalStorage 
function initCart () {
productLocalStorage = JSON.parse(localStorage.getItem("product"))
}
initCart()
console.log(productLocalStorage)
const positionEmptyCart = document.querySelector("#cart__items")
let cartPrice = document.querySelector(".cart__price")
let form = document.querySelector(".cart__order__form")

// Si le panier est vide
function getCart(){
if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>VOTRE PANIER EST VIDE</p>`
    positionEmptyCart.innerHTML = emptyCart
    positionEmptyCart.style.fontSize = '50px'
    positionEmptyCart.style.textAlign = 'center'
    positionEmptyCart.style.fontWeight = '600'
    form.style.display = 'none'
    cartPrice.style.display = 'none'
} else {
for (let product in productLocalStorage){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article")
    document.querySelector("#cart__items").appendChild(productArticle)
    productArticle.className = "cart__item"
    productArticle.setAttribute('data-id', productLocalStorage[product].productId)

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div")
    productArticle.appendChild(productDivImg)
    productDivImg.className = "cart__item__img"

    // Insertion de l'image
    let productImg = document.createElement("img")
    productDivImg.appendChild(productImg)
    productImg.src = productLocalStorage[product].productImage
    productImg.alt = productLocalStorage[product].productAltTxt

    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div")
    productArticle.appendChild(productItemContent)
    productItemContent.className = "cart__item__content"

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div")
    productItemContent.appendChild(productItemContentTitlePrice)
    productItemContentTitlePrice.className = "cart__item__content__titlePrice"
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2")
    productItemContentTitlePrice.appendChild(productTitle)
    productTitle.innerHTML = productLocalStorage[product].productName

    // Insertion de la couleur
    let productColors = document.createElement("p")
    productTitle.appendChild(productColors)
    productColors.innerHTML = productLocalStorage[product].productColor
    productColors.style.fontSize = "20px"

    // Insertion du prix
    let productPrices = document.createElement("p")
    productItemContentTitlePrice.appendChild(productPrices)
    productPrices.innerHTML = productLocalStorage[product].productPrice + " €"

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div")
    productItemContent.appendChild(productItemContentSettings)
    productItemContentSettings.className = "cart__item__content__settings"

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsQuantity)
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity"
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p")
    productItemContentSettingsQuantity.appendChild(productQte)
    productQte.innerHTML = "Qté : "

    // Insertion de la quantité
    let productQtty = document.createElement("input")
    productItemContentSettingsQuantity.appendChild(productQtty)
    productQtty.value = productLocalStorage[product].productQuantity
    productQtty.className = "itemQuantity"
    productQtty.setAttribute("type", "number")
    productQtty.setAttribute("min", "1")
    productQtty.setAttribute("max", "100")
    productQtty.setAttribute("name", "itemQuantity")

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsDelete)
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p")
    productItemContentSettingsDelete.appendChild(productSupprimer)
    productSupprimer.className = "deleteItem"
    productSupprimer.innerHTML = "Supprimer"
}
}}

function getTotals(){
    // Récupération du total des quantités
    let totalQuantity = 0
    for (index = 0; index < productLocalStorage.length; index++) {
    totalQuantity += productLocalStorage[index].productQuantity

    let productTotalQuantity = document.getElementById('totalQuantity')
    productTotalQuantity.innerHTML = totalQuantity
    console.log(totalQuantity)
    }
    // Récupération du prix total
    totalPrice = 0
    for (let index = 0; index < productLocalStorage.length; index++) {
    totalPrice += (productLocalStorage[index].productQuantity * productLocalStorage[index].productPrice)
    
    let productTotalPrice = document.getElementById('totalPrice')
    productTotalPrice.innerHTML = totalPrice
    console.log(totalPrice)
    }
}

function addEventListennerQuantityChange() {
    let elementModif = document.querySelectorAll(".itemQuantity")

    for (let indexModif = 0; indexModif < elementModif.length; indexModif++){
        elementModif[indexModif].addEventListener("change" , (event) => {
            event.preventDefault()

            let elementModifValue = elementModif[indexModif].valueAsNumber
            
            productLocalStorage[indexModif].productQuantity = elementModifValue

            localStorage.setItem("product", JSON.stringify(productLocalStorage))

            location.reload()
        
            
        })
    }
}

function deleteProduct() {
    const deleteButton = document.querySelectorAll(".deleteItem")

    for (let indexDelete = 0; indexDelete < deleteButton.length; indexDelete++){
        deleteButton[indexDelete].addEventListener("click" , (event) => {
            event.preventDefault()

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productLocalStorage[indexDelete].productId
            let colorDelete = productLocalStorage[indexDelete].productColor

            productLocalStorage = productLocalStorage.filter(element => element.productId !== idDelete || element.productColor !== colorDelete)
            
            localStorage.setItem("product", JSON.stringify(productLocalStorage))

            //Alerte produit supprimé et refresh
            location.reload()
        })
    }
}

let emailRegExp = new RegExp ('^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$')
let charRegExp = new RegExp ("^[A-Za-z-' ']")
let addressRegExp = new RegExp("^[a-zA-Z0-9\s,' '-]*$")

function getForm() {

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', inputFirstName)

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', inputLastName)

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', inputAddress)

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', inputCity)

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', inputEmail)

}

    //validation du prénom
    function inputFirstName(event) {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
        
        if (charRegExp.test(event.target.value)) {
            console.log(charRegExp.test(event.target.value))
            firstNameErrorMsg.innerHTML = ''
        } else {
            console.log(charRegExp.test(event.target.value))
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.'
        }
    }
    
    //validation du nom
    function inputLastName(event) {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')

        if (charRegExp.test(event.target.value)) {
            console.log(charRegExp.test(event.target.value))
            lastNameErrorMsg.innerHTML = ''
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.'
        }
    }

    //validation de l'adresse
    function inputAddress(event) {
        let addressErrorMsg = document.getElementById('addressErrorMsg')
    
        if (addressRegExp.test(event.target.value)) {
            console.log(addressRegExp.test(event.target.value))
            addressErrorMsg.innerHTML = ''
        } else {
            console.log(addressRegExp.test(event.target.value))
            addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.'
        }
    }

    //validation de la ville
    function inputCity(event) {
        let cityErrorMsg = document.getElementById('cityErrorMsg')

        if (charRegExp.test(event.target.value)) {
            console.log(charRegExp.test(event.target.value))
            cityErrorMsg.innerHTML = ''
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.'
        }
    }

    //validation de l'email
    function inputEmail(event) {
        let emailErrorMsg = document.getElementById('emailErrorMsg')

        if (emailRegExp.test(event.target.value)) {
            console.log(emailRegExp.test(event.target.value))
            emailErrorMsg.innerHTML = ''
        } else {
            console.log(emailRegExp.test(event.target.value))
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
        }
    }

function postForm(){
    const buttonOrder = document.getElementById("order")

    //Ecouter le panier
    buttonOrder.addEventListener("click", (event)=>{
    
        event.preventDefault()
        //Récupération des coordonnées du formulaire client
        let inputFirstName = document.getElementById('firstName')
        let inputLastName = document.getElementById('lastName')
        let inputAdress = document.getElementById('address')
        let inputCity = document.getElementById('city')
        let inputEmail = document.getElementById('email')

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let index = 0; index < productLocalStorage.length; index++) {
            idProducts.push(productLocalStorage[index].productId)
        }
        console.log(idProducts)

        const order = {
            contact : {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products: idProducts,
        } 
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        }

        fetch("http://localhost:3000/api/products/order", options)
        .then(res => {           
            if (res.ok === true) {         //Si la réccupération est un succès
            return res.json()         //l'API est en transcrite en format .JSON
        }
            throw new Error ('Oops ! La récupération des produits a echoué !')
        })
        .then(data => {
            console.log(data)
            localStorage.clear()
            localStorage.setItem("orderId", data.orderId)
            document.location.href = "confirmation.html"
        })
        .catch(err => {
            alert ("Problème avec fetch : " + err.message)
        })
        })
}


getCart()
getTotals()
addEventListennerQuantityChange()
deleteProduct()
getForm()
postForm()


