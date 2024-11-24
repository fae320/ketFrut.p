document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    function updateCart() {
        cartItemsContainer.innerHTML = ''; 
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price} (x${item.quantity})</span>
                <button class="remove" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total}`;
        attachRemoveHandlers();
    }

    function addToCart(id, name, price) {
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    }

    function removeOneFromCart(index) {
        const item = cartItems[index];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cartItems.splice(index, 1); 
        }
        updateCart();
    }

    function attachRemoveHandlers() {
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                removeOneFromCart(index);
            });
        });
    }

    document.querySelectorAll('.add').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);

            addToCart(id, name, price);
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Muchs gracias por su compra!');
            cartItems.length = 0; 
            updateCart();
        } else {
            alert('El carrito está vacío.');
        }
    });
});
