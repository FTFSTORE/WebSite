// Gerenciar a adição de produtos e cálculo do total
let productCount = 1;

function addProduct() {
    productCount++;
    const productDiv = document.createElement('div');
    productDiv.className = 'form-group product-row';
    productDiv.innerHTML = `
        <input type="text" placeholder="Nome do Produto">
        <input type="number" placeholder="Valor R$" step="0.01" min="0">
    `;
    document.getElementById('products').appendChild(productDiv);

    // Verificar se o número de produtos é 5 ou mais
    if (productCount >= 5) {
        document.body.style.overflowY = 'visible';
    }
}

function calculateTotal() {
    const prices = document.querySelectorAll('#products input[type="number"]');
    let total = 0;
    prices.forEach(priceInput => {
        const value = parseFloat(priceInput.value) || 0;
        total += value;
    });
    document.getElementById('total').value = total.toFixed(2);
}

function generateNote() {
    const name = document.getElementById('name').value;
    const productRows = document.querySelectorAll('#products .product-row');
    let productDetails = '';
    let totalPrice = 0;

    productRows.forEach((row, index) => {
        const productName = row.querySelector('input[type="text"]').value;
        const productPrice = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        totalPrice += productPrice;
        productDetails += `<p><strong>Produto ${index + 1}:</strong> ${productName} - R$${productPrice.toFixed(2)}</p>`;
    });

    // Armazenar dados no localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('productDetails', productDetails);
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    // Redirecionar para a página de carregamento
    window.location.href = 'loading.html';
}

// Recalcular o total quando os preços forem alterados
document.addEventListener('input', calculateTotal);
