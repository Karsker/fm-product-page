let imgIndex = 0;
let lightboxIndex = 0;
let images = document.getElementsByClassName('carouselImage');
let cartMobile = document.getElementById('divCartMobile');
let itemCnt = document.getElementById('spanItemCount');
let cartItems = document.getElementById('divCartItems');
let thumbnailButtons = document.getElementsByClassName('thumbnail-button');
let lightboxImages = document.getElementsByClassName('lightbox-image');
let lightboxThumbnailButtons = document.getElementsByClassName('lightbox-thumbnail-button')
let navLinks = document.getElementById('nav-links');

let lightboxGallery = document.getElementById('lightbox-gallery');
let cart = {}
updateImage(0);
console.log(cart);

// Array to store the product descriptions
products = {
    1: {
        itemName: "Fall Limited Edition Sneakers",
        price: 250,
        image: 'image-product-1-thumbnail.jpg'
    }
};


// Function to update the image carousel
function updateImage(num) {
    let newImageIndex = (imgIndex + num)%images.length;
    // Check if new image index is negative
    if (newImageIndex < 0) {
        newImageIndex = images.length - 1;
    }

    images[imgIndex].classList.add('hidden');
    images[newImageIndex].classList.remove('hidden');

    // Set the new image index as the current image index
    imgIndex = newImageIndex;
}

// Function to update the lightbox carousel
function updateLightbox(num) {
    let newImageIndex = (lightboxIndex + num)%lightboxImages.length;
    // Check if new image index is negative
    if (newImageIndex < 0) {
        newImageIndex = lightboxImages.length - 1;
    }

    lightboxImages[lightboxIndex].classList.add('hidden');
    lightboxImages[newImageIndex].classList.remove('hidden');

    // Set the new image index as the current image index
    lightboxIndex = newImageIndex;
}


// Function to show or hide the cart
function toggleDisplayCart() {
    cartMobile.classList.toggle('hidden');
}

// Function to control the item count
function changeCnt(val) {
    // Check if the quantity goes below 0
    if (itemCnt.innerText == 0 && val == -1) {
        return;
    }
    itemCnt.innerText = Number(itemCnt.innerText) + val;
}

// Function to add an item to the cart
function addToCart(itemId) {
    if (itemCnt.innerText == 0) {
        alert('Please choose at least one product to add to cart');
        return;
    }
    // Check if item is already in the cart
    if (cart.hasOwnProperty(itemId)) {
        cart[itemId].qnt += Number(itemCnt.innerText);
        cart[itemId].amount = cart[itemId].price * cart[itemId].qnt;
    } else {
        
        cart[itemId] = products[itemId];
        cart[itemId].qnt = Number(itemCnt.innerText);
        cart[itemId].amount = cart[itemId].qnt*cart[itemId].price; 
    }
    console.log(cart);
    updateCart();
}

// Function to delete item from cart
function removeFromCart(itemId) {
    delete cart[itemId];
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    cartItems.innerHTML = '';
    if (Object.keys(cart).length == 0) {
        cartItems.innerHTML = `
            <span class="font-bold text-stone-500">
                    Your cart is empty.
                </span>
        `;
        return;
    }
    for (let itemId in cart) {
        let newCartItem = document.createElement('div');
        newCartItem.className = "flex gap-2";
        newCartItem.innerHTML = `
         <img src="assets/images/sneakers/thumbnails/${cart[itemId].image}" alt="" class="size-12 rounded-md">
                    <div class="flex flex-col">
                        <span class="text-lg font-semibold text-stone-500">
                            ${cart[itemId].itemName}
                        </span>
                        <div>
                            <span class="text-md font-semibold text-stone-500">
                                $${cart[itemId].price} x ${cart[itemId].qnt}
                            </span>
                            <span class="text-md font-bold text-black">
                                $${cart[itemId].amount}
                            </span>
                        </div>
                        
                        
                    </div>
                    <button onclick="removeFromCart(${itemId})">
                            <img src="assets/images/icons/trash.png" class="size-5">
                        </button>
        `

        cartItems.appendChild(newCartItem);

    }
    let checkoutBtn = document.createElement('div');
    checkoutBtn.innerHTML = `<button
            class="bg-[#ff7d1a] w-full hover:bg-orange-300 p-3 rounded-md font-bold shadow-md"
            "
          >
            Checkout
          </button>`
    checkoutBtn.classList.add('w-full');
    cartItems.appendChild(checkoutBtn);
    
}

// Function for changing image when a thumbnail is clicked
function thumbnailHandler(index) {

    // Remove highlighting from all other thumbnails except current one

    for (let i = 0; i < thumbnailButtons.length; i++) {
        thumbnailButtons[i].classList.remove('border-2','border-orange-500', 'opacity-30');  
    }

    event.currentTarget.classList.add('border-2', 'border-orange-500', 'opacity-30');


    // Update the carousel to show the selected image
    images[imgIndex].classList.add('hidden');
    images[index].classList.remove('hidden');   
    imgIndex = index;
}

// Function to shoe the lightbox gallery
function toggleLightboxGallery() {
    if (screen.width <= 1024) {
        return;
    }
    console.log('button clicked');
    
    lightboxGallery.classList.toggle('hidden');
    document.getElementsByTagName('main')[0].classList.toggle('opacity-20');
}


// Function for changing image when a lighbox thumbnail is clicked
function lightboxThumbnailHandler(index) {

    // Remove highlighting from all other thumbnails except current one

    for (let i = 0; i < lightboxThumbnailButtons.length; i++) {
        lightboxThumbnailButtons[i].classList.remove('border-2','border-orange-500', 'opacity-30');  
    }

    event.currentTarget.classList.add('border-2', 'border-orange-500', 'opacity-30');


    // Update the carousel to show the selected image
    lightboxImages[lightboxIndex].classList.add('hidden');
    lightboxImages[index].classList.remove('hidden');   
    lightboxIndex = index;
}

// Function to open and close the sidebar
function toggleSidebar() {
    if (navLinks.classList.contains('left-[-100%]')) {
        navLinks.classList.remove('left-[-100%]');
        navLinks.classList.add('left-0');
    } else {
        navLinks.classList.remove('left-[0]');
        navLinks.classList.add('left-[-100%]');
    }
}


