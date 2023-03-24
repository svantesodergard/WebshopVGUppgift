loadJSON()

function loadJSON() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET",
        "https://fakestoreapi.com/products");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response); // OBS! En sträng

            const json = JSON.parse(xhr.response);
            console.log(json); // JSON-objekt

            json.forEach(element => {
                buildProduktCard(element)
            });
        }
    };
}


function buildProduktCard(json) {
    document.getElementById("output").innerHTML += `
    <div class="col-md-3 mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src=${json.image} alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${json.title}</h5>
                <!-- Product price-->
                ${json.description}
                <br>
                $${json.price} 
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="orderConfirmation(${json.id})">Buy Product</a></div>
        </div>
    </div>
</div>
`;
    }




// Jump to confirmation page
  function  orderConfirmation(id){

        window.open('confirmation-page.html', '_blank')


    }