function openModal(plan) {
    document.getElementById('planModal').style.display = 'block';
    document.getElementById('planType').value = plan;
}

function closeModal() {
    document.getElementById('planModal').style.display = 'none';
}

document.getElementById('acquisitionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const memberName = document.getElementById('memberName').value;
    const discordId = document.getElementById('discordId').value;
    const planType = document.getElementById('planType').value;
    const planValue = document.getElementById('planValue').value;
    
    const webhookURL = 'https://discord.com/api/webhooks/1269340201688240250/lO6uMcb2E9tkOpzZ9G59ISJryFHpBK5PgW0mAQw5JaUaX_qGyF7Lk9WtWoB30jPMSpkf'; // Substitua com seu URL de webhook do Discord
    
    const embed = {
        embeds: [{
            title: 'Nova Aquisição',
            color: 3447003, // Azul
            fields: [
                { name: 'Nome Do Membro', value: memberName, inline: false },
                { name: 'Id do Discord', value: discordId, inline: false },
                { name: 'Plano Adquirido', value: planType, inline: false },
                { name: 'Valor', value: planValue, inline: false }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Sistema de Aquisição'
            }
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(embed)
    })
    .then(response => {
        if (response.ok) {
            alert('Dados enviados com sucesso!');
            closeModal();
        } else {
            alert('Erro ao enviar dados.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar dados.');
    });
});

// Carregar os dados e criar partículas quando a página for carregada
window.onload = function() {
    // Verificar se a senha já foi inserida anteriormente
    const isRegistered = localStorage.getItem('Register');
    if (isRegistered !== 'true') {
        // Exibir o modal de senha se a senha não foi inserida
        document.getElementById('password-modal2').style.display = 'flex';
    }
};

function moveFocus(event, nextFieldId) {
    const input = event.target;
    if (input.value.length >= input.maxLength) {
        const nextField = document.getElementById(nextFieldId);
        if (nextField) nextField.focus();
    }
}

function checkPassword2() {
    const correctPassword2 = '0868';
    const digito1 = document.getElementById('digito1').value;
    const digito2 = document.getElementById('digito2').value;
    const digito3 = document.getElementById('digito3').value;
    const digito4 = document.getElementById('digito4').value;
    const enteredPassword2 = digito1 + digito2 + digito3 + digito4;

    if (enteredPassword2 === correctPassword2) {
        document.getElementById('password-modal2').style.display = 'none';
        localStorage.setItem('Register', 'true'); // Salvar em memória local
    } else {
        document.getElementById('error-message2').textContent = 'Senha incorreta. Você não tem permissão.';
    }
}