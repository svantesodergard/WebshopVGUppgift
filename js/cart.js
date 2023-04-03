function addToCart(id) {
    editItemInCart(id);
}

function removeFromCart(id) {
    editItemInCart(id, -1)
}

function editItemInCart(id, change=1) {
    let cart = new Map()
    if (localStorage.getItem("cart") !== null) {
        cart = new Map(JSON.parse(localStorage.getItem("cart")))
    }

    if (!cart.has(id)) {
        cart.set(id, 0)
    }

    cart.set(id, cart.get(id) + change)

    if (cart.get(id) < 1) {
        cart.delete(id);
    }

    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())))
    getCartHTML(true)
    document.getElementById("cart").style.display = "block";
    cartOn = true;
}

function getCartHTML(editable = false) {
    let totalCount = 0, totalPrice = 0;
    if (localStorage.getItem("cart") === null) {
        document.getElementById("cart-items").innerHTML = "<p class='text-center'>Your Cart is Empty</p>"
        document.getElementById("cart-count").innerHTML = "-"
        document.getElementById("cart-total").innerHTML = "-"
        return
    }
    
    cart = new Map(JSON.parse(localStorage.getItem("cart")))

    document.getElementById("cart-items").innerHTML = "";
    cart.forEach((count, id) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://fakestoreapi.com/products/"+id);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const item = JSON.parse(xhr.response)
                totalCount += count;
                totalPrice += count * item.price;
                //Display item
                const editButtons = {minus : "", plus : ""}
                if (editable) {
                    editButtons.minus = "<button class='btn btn-light rounded-circle' onclick='removeFromCart("+item.id+")'>-</button>"
                    editButtons.plus = "<button class='btn btn-light rounded-circle' onclick='addToCart("+item.id+")'>+</button>"
                }

                document.getElementById("cart-items").innerHTML += "<div class='row mt-1 pb-1 border-bottom'>"
                    + "<img class='col-2' style='width: 80px;' src='"+item.image+"'>"
                    + "<div class='d-flex align-items-center col-6'>"+item.title+"</div>"
                    + "<div class='d-flex align-items-center col-2'>"+editButtons.minus
                    +count+editButtons.plus+"</div>"
                    + "<div class='d-flex align-items-center col-2'>$"+item.price*count+"</div>";
                document.getElementById("cart-count").innerHTML = totalCount
                document.getElementById("cart-total").innerHTML = "$"+totalPrice
            }
            }
    })
}

cartOn = false
document.getElementById("btn-cart").addEventListener('click', function () {
    const cart = document.getElementById("cart");
    if (!cartOn) {
        cart.style.display = "block";
    } else {
        cart.style.display = "none";
    }
    cartOn = !cartOn;
})

document.getElementById("clear-cart").addEventListener('click', function () {
    localStorage.removeItem("cart");
    getCartHTML(true)
    document.getElementById("cart").style.display = "block";
    cartOn = true;
})