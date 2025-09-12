  // Select the toggle button
  const toggleBtn = document.querySelector('.switch_theme');
  const body = document.body;

  // Toggle dark mode class on body when button clicked
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Toggle icons visibility (optional)
    toggleBtn.querySelector('.icon-sun').classList.toggle('hidden');
    toggleBtn.querySelector('.icon-moon').classList.toggle('hidden');
  });



    // Hamburger menu toggle aria-expanded for accessibility
    const checkboxToggle = document.getElementById("checkbox-toggle");
    const hamburgerLabel = document.querySelector("label[for='checkbox-toggle']");
    checkboxToggle.addEventListener("change", () => {
      hamburgerLabel.setAttribute("aria-expanded", checkboxToggle.checked);
    });

    // Cart logic
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Cart state as array of objects {name, price, quantity}
    let cart = [];

    function updateCartUI() {
      cartItemsList.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
          <button class="remove-btn" data-index="${index}" aria-label="Remove ${item.name} from cart">&times;</button>
        `;
        cartItemsList.appendChild(li);
      });

      cartTotal.textContent = total.toFixed(2);
    }

    function addItemToCart(name, price) {
      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
      }
      updateCartUI();
    }

    addToCartButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        const price = btn.getAttribute("data-price");
        addItemToCart(name, price);
      });
    });

    cartItemsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartUI();
      }
    });

    // Order form submission
    const orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Your cart is empty! Please add items before ordering.");
        return;
      }
      alert("Thank you for your order! We will contact you soon.");
      // Reset cart and form
      cart = [];
      updateCartUI();
      orderForm.reset();
    });

    // Contact form submission (basic alert)
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you shortly.");
      contactForm.reset();
    });