const responses = [
    { question: 'qual é o horário de funcionamento', answer: 'Estamos abertos de segunda a sexta, das 9h às 18h.' },
    { question: 'como posso entrar em contato com o suporte', answer: 'Você pode entrar em contato conosco pelo e-mail suporte@ftfstore.com.' },
    { question: 'onde fica a loja', answer: 'Nossa loja física está localizada na Rua Exemplo, 123, São Paulo.' },
    { question: 'qual é a política de devolução', answer: 'Você pode devolver os produtos em até 30 dias após a compra, desde que estejam em sua embalagem original.' },
    { question: 'vocês oferecem frete grátis', answer: 'Sim, oferecemos frete grátis em compras acima de R$150.' },
    { question: 'posso pagar com cartão de crédito', answer: 'Sim, aceitamos todos os principais cartões de crédito.' },
    { question: 'como faço para rastrear meu pedido', answer: 'Após o envio, você receberá um e-mail com o código de rastreamento do seu pedido.' },
    { question: 'vocês têm produtos em promoção', answer: 'Sim, verifique nossa seção de promoções no site para as ofertas atuais.' },
    { question: 'como faço para criar uma conta', answer: 'Clique em "Criar Conta" no canto superior direito do site e preencha os dados necessários.' },
    { question: 'posso cancelar um pedido', answer: 'Os pedidos podem ser cancelados até 24 horas após a compra. Entre em contato com o suporte para mais informações.' },
    { question: 'qual é o prazo de entrega', answer: 'O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização.' },
    { question: 'quais são as formas de pagamento disponíveis', answer: 'Aceitamos cartões de crédito, débito e pagamento via boleto.' },
    { question: 'como faço para alterar meus dados pessoais', answer: 'Você pode alterar seus dados pessoais na seção "Minha Conta" em nosso site.' },
    { question: 'vocês têm um programa de fidelidade', answer: 'Sim, nosso programa de fidelidade oferece pontos a cada compra que podem ser trocados por descontos.' },
    { question: 'como posso me inscrever para receber novidades', answer: 'Você pode se inscrever para nossa newsletter no rodapé do site.' },
    { question: 'vocês vendem produtos personalizados', answer: 'Sim, oferecemos uma seleção de produtos personalizados. Confira nossa seção de personalização.' },
    { question: 'onde posso encontrar o código de desconto', answer: 'Os códigos de desconto são enviados por e-mail para nossos assinantes e podem ser encontrados em promoções especiais em nosso site.' },
    { question: 'qual é a garantia dos produtos', answer: 'A maioria dos nossos produtos tem garantia de 1 ano contra defeitos de fabricação.' },
    { question: 'como posso devolver um produto', answer: 'Para devolver um produto, entre em contato com nosso suporte e siga as instruções enviadas por e-mail.' },
    { question: 'vocês têm uma loja física', answer: 'Sim, nossa loja física está localizada na Rua Exemplo, 123, São Paulo.' }
];

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const loadingModal = document.getElementById('loading-modal');

    // Função para alternar o tema claro/escuro
    const toggleTheme = () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.querySelector('.material-icons').textContent = isDarkMode ? 'brightness_7' : 'brightness_4';
    };

    // Inicializa o tema com base na preferência salva
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            themeToggle.querySelector('.material-icons').textContent = savedTheme === 'dark' ? 'brightness_7' : 'brightness_4';
        }
    };

    // Função para abrir e fechar o chat bot
    const toggleChat = () => {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.classList.toggle('open');
    };

    // Função para enviar uma mensagem para o chat bot
    const sendMessage = () => {
        const inputField = document.querySelector('.chat-footer input');
        const message = inputField.value.trim();
        if (message) {
            const chatBody = document.querySelector('.chat-body');
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.textContent = message;
            chatBody.appendChild(userMessage);
            inputField.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Resposta do bot
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');

            // Encontra a resposta do bot
            const response = responses.find(r => message.toLowerCase().includes(r.question.toLowerCase()));
            botMessage.textContent = response ? response.answer : 'Desculpe, não entendi a sua pergunta. Pode reformular?';

            setTimeout(() => {
                chatBody.appendChild(botMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    };

    // Função para exibir o modal de carregamento
    window.showLoadingModal = () => {
        loadingModal.style.display = 'flex';
        setTimeout(() => {
            loadingModal.style.display = 'none';
        }, 3000); // Simula um atraso de carregamento
    };

    // Adiciona os event listeners
    themeToggle.addEventListener('click', toggleTheme);
    document.querySelector('.floating-contact').addEventListener('click', toggleChat);
    document.querySelector('.chat-close').addEventListener('click', toggleChat);
    document.querySelector('.chat-footer button').addEventListener('click', sendMessage);
    document.querySelector('.chat-footer input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Inicializa o tema na carga da página
    initTheme();
});

