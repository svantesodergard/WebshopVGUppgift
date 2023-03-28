

function loadJSON() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET",
        "https://fakestoreapi.com/products");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            

            const json = JSON.parse(xhr.response);
            

            json.forEach(element => {
                buildProduktCard(element)
            });
        }
    };
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


function buildProduktCard(json) {
    document.getElementById("output").innerHTML += `
    <div class="col-md-3 mb-5">
    <div class="card h-100">

        <!-- Product image-->
        <a target="_blank" href="${json.image}">
        <img class="our-images card-img-top" src=${json.image} alt="..." />
        </a>

        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${json.title}</h5>

            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">

        <!--Product Info-->
        <div class="overflow"> ${json.description}</div>
            
             <br>
             <!-- Product price-->
             <div class="text-center">$${json.price}</div> 
             
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="orderConfirmation(${json.id})">Buy Product</a></div>
        </div>
    </div>
</div>
`;
}




// Jump to confirmation page
function orderConfirmation(id) {

    window.open('order.html', '_blank')


}

document.getElementById("submit").addEventListener("click", save);

function validate(){

    if (document.getElementById("name").value.length<2 ||
    document.getElementById("name").value.length>50) {
        console.log("namn fel");
        document.getElementById("name").value="fel";
        return false;
    } 

    const mailPattern = /@/;

    if (!mailPattern.test(document.getElementById("e-mail").value)||
    document.getElementById("e-mail").value.length>50) {
        console.log("mail fel");
        return false;
    }

    const pattern = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;

    if (!pattern.test(document.getElementById("phone").value)){
        console.log("nummer fel");
        document.getElementById("phone").value="fel";
        return false
    }

    if(document.getElementById("address").value.length<4||
    document.getElementById("address").value.length>50) {
        console.log("adress fel");
        return false; 
    }

    const zipPattern = /^\d{3}\s\d{2}$/;

    if(!zipPattern.test(document.getElementById("zip-code").value)) {
        console.log("zip fel")
        return false;
    }

    if(document.getElementById("city").value.length<4||
    document.getElementById("city").value.length>50) {
        console.log("city fel");
        return false; 
    }

console.log("rätt");

return true
    
}

function save() {
    if(validate()){
    
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("e-mail", document.getElementById("e-mail").value);
    localStorage.setItem("phone", document.getElementById("phone").value);
    localStorage.setItem("address", document.getElementById("address").value);
    localStorage.setItem("zip-code", document.getElementById("zip-code").value);
    localStorage.setItem("city", document.getElementById("city").value);
    }

    
}