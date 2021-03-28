let url = "http://localhost:3000/products";
// const axios = require('axios');

const displayItem = document.querySelector(".display__item");
const cart = document.querySelector(".cart");
const aside = document.querySelector(".aside");
const shoppingCard = document.querySelector(".shopping-cart");
const aside_close = document.querySelector(".fa-times-circle");
const cart__total = document.querySelector(".cart__total");
const display = document.querySelector(".display");
const displayImg = document.querySelector(".cart__image");
const displayTitle = document.querySelector(".display__title");
const displayPrice = document.querySelector(".display__price");
const upArrow = document.querySelector(".fa-sort-up");
const downArrow = document.querySelector(".fa-sort-down");
const cartItem = document.querySelector(".cart__item");

// another list
let url2 = "http://localhost:3000/cartedData";
// classes
class Display {
    async getData() {
        let response = await axios.get(url);
        let data = await response.data;
        return data;
    }
}
class UI {
    createUi(response) {
        let result = "";
        response.map((sin) => {
            result += `<div class="display__item">
                    <div class="display__image">
                        <img class='cart__image' src=${sin.image} width='300px' height='200px' alt="bed-image">
                    </div>
                    <div class="display__desc">
                        <h4 class='display__title'>${sin.name}</h4>
                        <div class="display__price">${sin.price}</div>
                    </div>
                    <button class='addToCart' id=${sin.id}>Add To Cart</button>
                </div>`;
        });
        return result;
    }
}
class AddToServer {
    getData(res) {
        let data = {
            id: res.id,
            price: res.price,
            amount: res.amount,
            image: res.image,
            name: res.name,
        };
        return data;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let add1 = new AddToServer();
    let display1 = new Display();
    let ui = new UI();
    display1
        .getData()
        .then((res) => {
            let result = ui.createUi(res);
            display.innerHTML = result;
        })
        .then(() => {
            axios
                .get(url)
                .then((res) => {
                    res.data.forEach((sin) => {
                        let btnCart = document.getElementById(sin.id);
                        let id = sin.id;
                        btnCart.addEventListener("click", function (e) {
                            axios.get(url).then((res) => {
                                res.data.forEach((sin) => {
                                    if (sin.id === id && this.innerText != "In Cart") {
                                        let dataA = add1.getData(sin);
                                        // post request
                                        axios
                                            .post(url2, dataA)
                                            .then((res) => {
                                                axios
                                                    .get(url2)
                                                    .then((res) => {
                                                        res.data.forEach((sin) => {
                                                            let image = sin.image;
                                                            let price = sin.price;
                                                            let amount = sin.amount;
                                                            let name = sin.name;
                                                            let id = sin.id
                                                            let cart__item = document.createElement("div");
                                                            cart__item.className = `cart__item ${id}`;
                                                            cart__item.innerHTML = `
                                                                <div class="cart__image">
                                                                <img src=${image} alt="">
                                                                </div>
                                                                <div class="cart__desc">
                                                                <h5>${name}</h5>
                                                                </div>
                                                                <div class="cart__count">
                                                                <span class='remove-data'><i class="fas fa-times-circle"></i></span>
                                                                <i class="fas fa-sort-up"></i>
                                                                <span>${amount}</span>
                                                                <i class="fas fa-sort-down"></i>
                                                                </div>
                                                                `;
                                                            cart.insertAdjacentElement(
                                                                "afterbegin",
                                                                cart__item
                                                            );
                                                            aside.style.visibility = "visible";
                                                            aside.style.transform = "translateX(0)";
                                                            this.innerText = "In Cart";
                                                            this.disabled = true;
                                                        });
                                                        // setting items
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    });
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                    }
                                });
                            });
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .then(() => {
            axios
                .get(url2)
                .then((res) => {
                    res.data.forEach((sin) => {
                        let button = document.getElementById(sin.id);
                        button.innerText = "In Cart";
                        button.disabled = true;
                        // showing carted data
                        let name = sin.name;
                        let price = sin.price;
                        let id = sin.id;
                        let image = sin.image;
                        let amount = sin.amount;

                        let cart__item = document.createElement("div");
                        cart__item.className = `cart__item ${id}`;
                        cart__item.innerHTML = `
            <div class="cart__image">
            <img src=${image} alt="">
            </div>
            <div class="cart__desc"
            <h5>${name}</h5>
            </div>
            <div class="cart__count">
            <span class='remove-data'><i class="fasfa-times-circle"></i></span>
            <i class="fas fa-sort-up"></i>
            <span>${amount}</span>
            <i class="fas fa-sort-down"></i>
            </div>
            `;
                        cart.insertAdjacentElement("afterbegin", cart__item);
                        let child = cart.children
                        for (let i = 0; i < child.length - 1; i++) {
                            let classes = child[i].classList
                            //?starting from here 
                            //! problem == when clicking the card it duplicates.
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});
// requesting and changing buttons innerText
shoppingCard.addEventListener("click", function (e) {
    aside.classList.add("open");
    aside.classList.remove("close");
});
aside_close.addEventListener("click", function (e) {
    aside.classList.add("close");
    aside.classList.remove("open");
});
// single button

/**
 * 1.------
 * let cart__item = document.createElement('div')
                                            cart__item.className = 'cart__item'
                                            cart__item.innerHTML = outPut
                                            cart.insertAdjacentElement('afterbegin', cart__item)
                                            aside.style.visibility = "visible";
                                            aside.style.transform = "translateX(0)";
 * 2.---
    axios.post(url2, data)
            .then(res => {
                console.log(res.data.id)
                res.data.forEach(sin => {
                    let image = sin.image
                    let price = sin.price
                    let amount = sin.amount
                    let name = sin.name
                    outPut += `
                    <div class="cart__image">
                    <img src=${image} alt="">
                    </div>
                    <div class="cart__desc">
                    <h5>${name}</h5>
                    </div>
                    <div class="cart__count">
                    <span class='remove-data'><i class="fas fa-times-circle"></i></span>
                    <i class="fas fa-sort-up"></i>
                    <span>${amount}</span>
                    <i class="fas fa-sort-down"></i>
                    </div>
                    `
                    console.log(outPut)
                })
            }
            ).catch(err => {
                console.log(err)
            })

 */

// let outPut = add1.getData(sin)
// let cart__item = document.createElement('div')
// cart__item.className = 'cart__item'
// cart__item.innerHTML = outPut
// cart.insertAdjacentElement('afterbegin', cart__item)
// // aside styling
// aside.style.visibility = "visible";
// aside.style.transform = "translateX(0)";
// // reassigning button value

/**
 * 1.---
 * let sin = res.data
                                                    let image = sin.image
                                                    let price = sin.price
                                                    let amount = sin.amount
                                                    let name = sin.name
                                                    console.log(name)
                                                    let cart__item = document.createElement('div')
                                                    cart__item.className = 'cart__item'
                                                    cart__item.innerHTML = `
                                                        <div class="cart__image">
                                                        <img src=${image} alt="">
                                                        </div>
                                                        <div class="cart__desc">
                                                        <h5>${name}</h5>
                                                        </div>
                                                        <div class="cart__count">
                                                        <span class='remove-data'><i class="fas fa-times-circle"></i></span>
                                                        <i class="fas fa-sort-up"></i>
                                                        <span>${amount}</span>
                                                        <i class="fas fa-sort-down"></i>
                                                        </div>
                                                        `
                                                    cart.insertAdjacentElement('afterbegin', cart__item)
                                                    aside.style.visibility = "visible";
                                                    aside.style.transform = "translateX(0)";
 */
