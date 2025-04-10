class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
        this.updateCartUI();
    }

    addItem(id, name, price) {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ id, name, price, quantity: 1 });
        }
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index > -1) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity -= 1;
            } else {
                this.items.splice(index, 1);
            }
        }
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    clearCart() {
        this.items = [];
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const cartItems = document.getElementById('cart-items');

        if (!cartCount || !cartTotal) return;

        const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;

        if (cartItems) {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="cart.removeItem('${item.id}')" class="remove-item">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button onclick="cart.addItem('${item.id}', '${item.name}', ${item.price})" class="add-item">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}


const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartUI();
});

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('show');
} 