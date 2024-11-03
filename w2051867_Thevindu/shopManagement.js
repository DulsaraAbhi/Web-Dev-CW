let shop = document.getElementById("products");
let container = document.getElementById("container");



/**productsInfo array contains product objects used in shop.*/
const productsInfo = [{
    id: "1",
    title: "The 5 AM Club",
    price: 8.45,
    image: "w2051867_Thevindu/images/5_am_c.jpg",
    category: "selfhelp"
},
{
    id: "2",
    title: "The 4-hour Workweek",
    price: 5.25,
    image: "w2051867_Thevindu/images/4hr_w_week.jpg",
    category: "selfhelp"
},
{
    id: "3",
    title: "Atomic Habits",
    price: 7.40,
    image: "w2051867_Thevindu/images/a_habits.jpg",
    category: "selfhelp"
},
{
    id: "4",
    title: "Complete English Grammar Rules",
    price: 3.00,
    image: "w2051867_Thevindu/images/complete_E_grammar.jpg",
    category: "language"
},
{
    id: "5",
    title: "Computer Science Principles",
    price: 5.90,
    image: "w2051867_Thevindu/images/cs_principles.jpg",
    category: "cs"
},
{
    id: "6",
    title: "English Grammar in Use",
    price: 3.20,
    image: "w2051867_Thevindu/images/e_grammar.jpg",
    category: "language"
},
{
    id: "7",
    title: "Collins Advanced French Grammar",
    price: 4.50,
    image: "w2051867_Thevindu/images/french_grammar.jpg",
    category: "language"
},
{
    id: "8",
    title: "Introductory Physics",
    price: 6.00,
    image: "w2051867_Thevindu/images/introductory_physics.jpg",
    category: "physiscs"
},
{
    id: "9",
    title: "Oxford Maths 8",
    price: 3.45,
    image: "w2051867_Thevindu/images/maths_8.jpg",
    category: "math"
},
{
    id: "10",
    title: "Oxford Maths 9",
    price: 4.10,
    image: "w2051867_Thevindu/images/maths_9.jpg",
    category: "math"
},
{
    id: "11",
    title: "University Physics",
    price: 6.40,
    image: "w2051867_Thevindu/images/uni_physics.png",
    category: "physiscs"
},
{
    id: "12",
    title: "Python for Computer Science",
    price: 5.35,
    image: "w2051867_Thevindu/images/python_for_cs.jpg",
    category: "cs"
},
{
    id: "13",
    title: "Principles of Mechanics",
    price: 8.40,
    image: "w2051867_Thevindu/images/mechanics.jpg",
    category: "physiscs"
},
{
    id: "14",
    title: "Rich Dad Poor Dad",
    price: 5.25,
    image: "w2051867_Thevindu/images/Rich_Dad_Poor_Dad.jpg",
    category: "selfhelp"
},
{
    id: "15",
    title: "Networking for Beginners",
    price: 9.25,
    image: "w2051867_Thevindu/images/networking_cs.jpg",
    category: "cs"

},
{
    id: "16",
    title: "Top Maths",
    price: 2.84,
    image: "w2051867_Thevindu/images/top_maths.jpg",
    category: "math"
}]



/**cart array stores product objects which are added to cart. */
let cart = [];



/**displayProducts function renders product cards in shop page by retrieving product object properties from
 * productsInfo array. It initially displays products of all categories. Once the user provides a selection 
 * it will only display products of that category.
 * */
function displayProducts(category = "all") {

    const filtered = category === "all" ? productsInfo : productsInfo.filter(x => x.category === category);

    shop.innerHTML = filtered.map(function (x) {
        return `
        <div class="product" id="${x.id}">
            <img src="${x.image}" alt="${x.title}">
            <div class="productTitle" >${x.title}</div>
            <button class="addToCart" onclick="addToCart(${x.id})">Add to Cart</button>
            <div class="productPrice">$${x.price.toFixed(2)}</div>
        </div>`;
    }).join('');
}



/**showCart function makes cart div visible. */
function showCart() {
    let cartBox = document.getElementById("cart");
    cartBox.style.display = "block";
}



/**updateCart function displays properties of product objects in cart array inside cart div.
 * It returns the total price and number of items added to cart. 
 */
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const updatetotal = document.getElementById("totalDisplay");

    cartItems.innerHTML = '';

    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        itemCount += item.quantity;

        const createCartItem = `
        <div class="cartItem">
            <img src="${item.image}">
            <p>${item.title}</p>
            <h4>$${item.price.toFixed(2)}</h4>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `

        cartItems.innerHTML += createCartItem;

    });

    updatetotal.textContent = `$${total.toFixed(2)}`;

    return [total, itemCount];
}



/**addToCart function adds a product object to cart array or increase the qunantity of a product object
 * alredy in cart array.
 */
function addToCart(productId) {

    const product = productsInfo.find(p => p.id == productId);
    //find the product ibject in prodcutsInfo array and assign it to constatnt product.

    if (!product) {
        console.log("Not found")
        return;
    }

    const cartItem = cart.find(item => item.id == productId);
    // find whether the product object is already in cart array.

    if (cartItem) {
        cartItem.quantity += 1; //if it is in cart array increase quantity propertie's value by 1.
    } else {
        const newItem = { ...product, quantity: 1 };
        cart.push(newItem); //add the product object to cart array
    }

    console.log(cart); //logs cart to console to test
    updateCart();
}



/**reomoveFromCart function removes the product which has the matching id property value from cart array. */
function removeFromCart(id) {
    cart = cart.filter(product => product.id != id);
    updateCart();
}



/**clearCart function empties the cart array. */
function clearCart() {
    cart = [];
    updateCart();
}



/**checkOut function loads checkout form if the cart array is not empty. */
function checkOut() {

    if (cart.length != 0) {
        container.innerHTML = `
        <div class="checkout">
    
            <div class="title">
                Order Checkout
                <p>Fill in the details requested below to confirm your order.</p>
            </div>
    
            <div class="detailspane">
    
                <div class="summary">
    
                    <fieldset>
                        <legend>Order Summary</legend>
                        <h3>Reference Number:&nbsp;<span id="refno">${generateRefNumber()}</span></h3>
                        <h3>Total Payable:&nbsp;<span id="amount">$${updateCart()[0].toFixed(2)}</span></h3>
                        <h3>Number of Items:&nbsp;<span>${updateCart()[1]}</span></h3>
                    </fieldset>
    
                </div>
    
                <form id="customerDetails" method=""post action="#">

                    <p>* Indicates Required Information</p>

                    <fieldset class="contact">
    
                        <legend>Contact Details</legend>
    
                        <div class="row">
                            <label for="firstName"> First Name* :</label>
                            <input type="text" id="firstName" required>
                        </div>
    
                        <div class="row">
                            <label for="lastName"> Last Name* :</label>
                            <input type="text" id="lastName" required>
                        </div>
    
                        <div class="row">
                            <label for="phone"> Phone* :</label>
                            <input type="tel" id="phone" required>
                        </div>
    
                        <div class="row">
                            <label for="email"> Email address* :</label>
                            <input type="email" id="email" required>
                        </div>
    
                    </fieldset>
    
                    <fieldset class="address">
    
                        <legend>Billing Address</legend>
    
                        <div class="row">
                            <label for="houseNo"> House Number* :</label>
                            <input type="text" id="houseNo" required>
                        </div>
    
                        <div class="row">
                            <label for="street"> Street* :</label>
                            <input type="text" id="street" required>
                        </div>
    
                        <div class="row">
                            <label for="city"> City* :</label>
                            <input type="text" id="city" required>
                        </div>
    
                        <div class="row">
                            <label for="zipCode"> Zip Code* :</label>
                            <input type="text" id="zipCode" required>
                        </div>
    
                        <div class="row">
                            <label for="country"> Country* :</label>
                            <select name="country" id="country">
                                <option value="sl">Sri Lanka</option>
                                <option value="in">India</option>
                                <option value="ml">Maldives</option>
                                <option value="uk">United Kingdom</option>
                                <option value="it">Italy</option>
                            </select>
                        </div>
    
                    </fieldset>
    
                    <fieldset class="card">
    
                        <legend>Card Details</legend>
    
                        <div class="row">
                            <label for="cardNo"> Card Number* :</label>
                            <input type="text" id="cardNo" required>
                        </div>
    
                        <div class="row">
                            <label for="holderName"> Cardholder Name* :</label>
                            <input type="text" id="holderName" required>
                        </div>
    
                        <div class="row">
                            <label for="cvn"> CVN* :</label>
                            <input type="text" id="cvn" required>
                        </div>
    
                        <div class="row">
                            <label for="expDate"> Date of Expiry* :</label>
                            <input type="date" id="expDate" required>
                        </div>
                    </fieldset>
    
                    <button type="reset" value="Reset">Reset Form</button>
                    <button type="submit" value="Submit" id="confirm">Confirm Order</button>

                </form>

            </div>
    
        </div>`;

        document.getElementById("customerDetails").addEventListener("submit", confirmOrder);
    }
    else {
        container.innerHTML = `
        <div class="checkout">
    
            <div class="emptyMessage">
                <h2>Your cart is empty.</h2>
                <p>Add products to cart before proceeding to checkout.</p>
                <button onclick="document.location='shop.html'">Back to Shop</button>
            </div>

        </div>`;
    }
}



/**generateRefNumber function generates a reference number for order which consists of
 * current date, current hour, current minutes and current seconds. */
function generateRefNumber() {

    const currentTime = new Date();

    const time = currentTime.getDate() + "-" + currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();

    const refNumber = "#" + time;
    return refNumber;
}



/**confirmOrder function validates form inputs and submits it. */
function confirmOrder(event) {

    const form = document.getElementById("customerDetails");

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNo = document.getElementById("phone").value.trim();
    const eMail = document.getElementById("email").value.trim();

    const houseNo = document.getElementById("houseNo").value.trim();
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const zipCode = document.getElementById("zipCode").value.trim();
    const country = document.getElementById("country").value.trim();

    const cardNo = document.getElementById("cardNo").value.trim();
    const holderName = document.getElementById("holderName").value.trim();
    const cvn = document.getElementById("cvn").value.trim();
    const expDate = document.getElementById("expDate").value.trim();

    //These regular expressions were created by refering online resources which are referenced in my individual report.
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNoRegex = /^[0-9]{16}$/;
    const cvnRegex = /^[0-9]{3}$/;

    if (firstName === "" || lastName === "" || phoneNo === "" || eMail === "" || houseNo === "" || street === "" || city === "" || zipCode === "" || country === "" || cardNo === "" || holderName === "" || cvn === "" || expDate === "") {
        alert("All fields are required.");
        return false;
    }

    if (!phoneNo.match(phoneRegex)) {
        alert("Invalid phone number.");
        return false;
    }

    if (eMail !== "" && !eMail.match(emailRegex)) {
        alert("Invalid email address.");
        return false;
    }

    if (!cardNo.match(cardNoRegex)) {
        alert("Invalid card Number.");
        return false;
    }

    if (!cvn.match(cvnRegex)) {
        alert("Invalid CVN.");
        return false;
    }

    alert("Order Confirmed");
    container.innerHTML = `
    <div class="successMessage">

        <h2>Order placed successfully.</h2>
        <p>Thank you for Shopping with us!</p>
        <button onclick="document.location='shop.html'">Place Another Order</button>

    </div>`;
    form.submit();
    /**this submit does not happen because I have added a message using innerhtml befor this and I haven't provided a form action.
    Did this because if I added this submit before innerhtml, innerhtml will not load since submit triggers a redirection.
    (I'm not passing form data to a back-end) */
}



displayProducts();
