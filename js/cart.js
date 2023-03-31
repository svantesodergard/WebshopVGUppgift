getCartHTML()
function addToCart(id) {
    let cart = new Map()
    if (localStorage.getItem("cart") !== null) {
        cart = new Map(JSON.parse(localStorage.getItem("cart")))
    }

    if (!cart.has(id)) {
        cart.set(id, 0)
    }
    cart.set(id, cart.get(id) + 1)

    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())))
    getCartHTML()
    document.getElementById("cart").style.display = "block";
    cartOn = true;
}

function getCartHTML() {
    let totalCount = 0, totalPrice = 0;
    if (localStorage.getItem("cart") === null) {
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
                document.getElementById("cart-items").innerHTML += "<div class='row mt-1 pb-1 border-bottom'>"
                    + "<img class='col-2' style='width: 80px;' src='"+item.image+"'>"
                    + "<div class='d-flex align-items-center col-8'>"+item.title+"</div>"
                    + "<div class='d-flex align-items-center col-1'>"+count+"</div>"
                    + "<div class='d-flex align-items-center col-1'>$"+item.price*count+"</div>";
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