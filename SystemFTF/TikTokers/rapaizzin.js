 // Simulando dados que podem ser carregados dinamicamente
 const data = {
    baseCommission: 0.00,
    tiktokerName: '@Rapaizzin',
    cupomBase: 'RPZZ',
    users: [],
    PaymentRequest: 'Sem Data',
    FormaPayment: `<i class="fa-brands fa-pix"></i> Pix`,
    Multiplicador: 'R$0.20 x Usuário'
};

// Variável para armazenar a comissão total paga
let totalPaidCommission = 0;

// Função para carregar os dados na página
function loadData() {
    const userCount = data.users.length;
    const additionalCommission = (userCount * 0.20) - totalPaidCommission;
    const totalCommission = data.baseCommission + additionalCommission;

    document.getElementById('total-commission').textContent = `R$${totalCommission.toFixed(2)}`;
    document.getElementById('tiktoker-name').textContent = data.tiktokerName;
    document.getElementById('cupom').textContent = data.cupomBase;
    document.getElementById('payment').textContent = data.PaymentRequest;
    document.getElementById('multiplicador').textContent = data.Multiplicador;
    document.getElementById('pix').innerHTML = data.FormaPayment;
    document.getElementById('qnts-cupom').textContent = userCount;

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    // Exibir apenas os primeiros 6 usuários
    const visibleUsers = data.users.slice(0, 6);
    visibleUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `@${user}`;
        userList.appendChild(listItem);
    });

    // Adicionar mensagem se houver mais de 6 usuários
    if (userCount > 6) {
        const moreUsersText = document.createElement('p');
        moreUsersText.textContent = `E mais ${userCount - 6} usuário(s)`;
        moreUsersText.style.fontStyle = 'italic';
        userList.appendChild(moreUsersText);
    }
}

// Função para registrar o pagamento da comissão e resetar a comissão base
function payCommission() {
    totalPaidCommission += data.users.length * 2.50;
    data.baseCommission = 0;
    loadData();
}

// Função para criar partículas animadas
function createParticles() {
    const container = document.querySelector('.particles');
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(particle);
    }
}

// Carregar os dados e criar partículas quando a página for carregada
window.onload = function() {
    loadData();
    createParticles();

    // Sempre exibir o modal de senha
    document.getElementById('password-modal').style.display = 'flex';
};

function moveFocus(event, nextFieldId) {
    const input = event.target;
    if (input.value.length >= input.maxLength) {
        const nextField = document.getElementById(nextFieldId);
        if (nextField) nextField.focus();
    }
}

function checkPassword() {
    const correctPassword = '171122';
    const digit1 = document.getElementById('digit1').value;
    const digit2 = document.getElementById('digit2').value;
    const digit3 = document.getElementById('digit3').value;
    const digit4 = document.getElementById('digit4').value;
    const digit5 = document.getElementById('digit5').value;
    const digit6 = document.getElementById('digit6').value;
    const enteredPassword = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    if (enteredPassword === correctPassword) {
        document.getElementById('password-modal').style.display = 'none';
    } else {
        document.getElementById('error-message').textContent = 'Senha incorreta. Você não tem permissão.';
    }
}

function sPayment() {
    // Exibir o modal de carregamento
    document.getElementById('loading-modal').style.display = 'flex';
    document.getElementById('text').textContent = 'Conectando ao Servidor...'
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('text').textContent = 'Pronto.'
    }, 5000); // 4000 milissegundos = 4 segundos

    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.info').style.display = 'block';
        document.getElementById('text').style.display = 'none';
    }, 5500); // 4000 milissegundos = 4 segundos
}

function avancar() {
    document.querySelector('.info').style.display = 'none';
    document.querySelector('.spinner').style.display = 'block';
    document.getElementById('text').style.display = 'block';
    document.getElementById('text').textContent = 'Criando  Solicitação...'
     // Simulação de carregamento (substitua isso com sua lógica de jogo)
     setTimeout(() => {
         document.getElementById('text').textContent = 'Recebemos sua Solicitação!'
    }, 4000); // 4000 milissegundos = 4 segundos
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('loading-modal').style.display = 'none';

        sendDiscordWebhook();
   }, 5000); // 4000 milissegundos = 4 segundos
}


function sendDiscordWebhook() {
    const webhookUrl = 'https://discord.com/api/webhooks/1270166242543665162/b0Uvv7MuPiwFniTsBnFemUV1rjhKm83nU0sEz8x330BJHc7g-EJmq4wdk-bFeit_d9_g';

    const embed = {
        title: "Informações de Comissão",
        description: "Aqui estão as informações atualizadas.",
        color: 0x3498db, // Cor da barra lateral da embed
        fields: [
            {
                name: "Tiktoker",
                value: data.tiktokerName,
                inline: false
            },
            {
                name: "Comissão Total",
                value: data.baseCommission,
                inline: false
            },
            {
                name: "Cupom",
                value: data.cupomBase,
                inline: false
            }
        ],
        footer: {
            text: "Gerado automaticamente pelo sistema"
        }
    };

    const payload = JSON.stringify({ embeds: [embed] });

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar webhook: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Webhook enviado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar webhook:', error);
    });
}

function History() {
    // Exibir o modal de carregamento
    document.getElementById('loading-modal').style.display = 'flex';
    document.getElementById('text').textContent = 'Conectando ao Servidor...'
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('text').textContent = 'Pronto.'
    }, 5000); // 4000 milissegundos = 4 segundos

    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.historico').style.display = 'block';
        document.getElementById('text').style.display = 'none';
    }, 5500); // 4000 milissegundos = 4 segundos
}

function closeHistory() {
    document.querySelector('.historico').style.display = 'none';
    document.querySelector('.spinner').style.display = 'block';
    document.getElementById('text').style.display = 'block';
    document.getElementById('text').textContent = 'Fechando Histórico...'
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('text').textContent = 'Pronto.'
    }, 5000); // 4000 milissegundos = 4 segundos

    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('loading-modal').style.display = 'none';
    }, 5500); // 4000 milissegundos = 4 segundos
}

function Suporte() {
    // Exibir o modal de carregamento
    document.getElementById('loading-modal').style.display = 'flex';
    document.getElementById('text').textContent = 'Conectando ao Servidor...'
    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('text').textContent = 'Pronto.'
    }, 5000); // 4000 milissegundos = 4 segundos

    // Simulação de carregamento (substitua isso com sua lógica de jogo)
    setTimeout(() => {
        document.getElementById('text').textContent = 'Procurando ADMS...';
    }, 5500); // 4000 milissegundos = 4 segundos

    setTimeout(() => {
        document.getElementById('text').textContent = 'Achamos um ADM.';
    }, 9500); // 4000 milissegundos = 4 segundos

    setTimeout(() => {
        document.getElementById('text').textContent = 'Pedindo Suporte..';
    }, 11500); // 4000 milissegundos = 4 segundos

    setTimeout(() => {
        document.getElementById('text').textContent = 'Suporte foi acionado.';
    }, 16500); // 4000 milissegundos = 4 segundos

    setTimeout(() => {
        document.getElementById('text').textContent = 'Você receberá uma mensagem em algumas horas.';
        sendSuporte();
    }, 17500); // 4000 milissegundos = 4 segundos

    setTimeout(() => {
        document.getElementById('text').style.display = 'none';
        document.getElementById('loading-modal').style.display = 'none';
    }, 20500); // 4000 milissegundos = 4 segundos
}

function sendSuporte() {
    const webhookUrl = 'https://discord.com/api/webhooks/1270437711303544913/fo3jgZdV0RvD_eoexZyzSf4_G34UyzcVgd0O2nJ434MyGsuV1puYqgGccI2912gR1UN_';

    const embed = {
        title: "Suporte TikTokers",
        description: "Aqui está algumas informações:",
        color: 0x3498db, // Cor da barra lateral da embed
        fields: [
            {
                name: "Tiktoker",
                value: data.tiktokerName,
                inline: false
            },
        ],
        footer: {
            text: "Gerado por um tiktoker no sistema."
        }
    };

    const payload = JSON.stringify({ embeds: [embed] });

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar webhook: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Webhook enviado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar webhook:', error);
    });
}