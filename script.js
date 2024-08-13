// Função para exibir o modal personalizado
function showAlert(message) {
    const modal = document.getElementById('custom-alert');
    const messageSpan = document.getElementById('alert-message');
    messageSpan.textContent = message;
    modal.style.display = 'block';

    // Fecha o modal ao clicar no botão de fechar
    document.getElementById('close-alert').onclick = function() {
        modal.style.display = 'none';
    };

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Variável global de controle para ativar o bloco else
let enableElse = true; // Definido como true para que as inscrições estejam fechadas por padrão

function staff() {
    // Verifica se o bloco else deve ser executado
    if (enableElse) {
        // Código a ser executado se o bloco else estiver ativado
        showAlert('Inscrições Fechadas');
    } else {
        showAlert('As Inscrições de Staffs foram abertas! Redirecionando...');
        // Atraso de 3 segundos antes de redirecionar
        setTimeout(function() {
            window.location.href = './forms/'; // Substitua pelo URL da página para a qual deseja redirecionar
        }, 3000);
    }
}





// Função para alternar o estado do aviso
function aviseMe() {
    const link = document.getElementById('notify-link');
    const isActive = link.classList.contains('active');

    if (isActive) {
        // Se já estiver ativo, remova a classe e atualize o título
        link.classList.remove('active');
        link.innerHTML = 'Me avise <i class="fa-solid fa-bell"></i>';
        link.title = 'Me avise'; // Atualiza o título do link
        localStorage.removeItem('notifyActive'); // Remove o estado ativo da memória local
        showAlert('Você saiu da lista de avisos.'); // Exibe o alerta personalizado
    } else {
        // Se não estiver ativo, adicione a classe e atualize o título
        link.classList.add('active');
        link.innerHTML = 'Cancelar Aviso <i class="fa-solid fa-bell-slash"></i>';
        link.title = 'Cancelar Aviso'; // Atualiza o título do link
        localStorage.setItem('notifyActive', 'true'); // Armazena o estado ativo na memória local
        showAlert('Você entrou na lista de avisos.'); // Exibe o alerta personalizado
    }

    // Atualiza a visibilidade do ícone de notificações
    updateNotificationIcon();
}

// Função para atualizar a visibilidade do ícone de notificações
function updateNotificationIcon() {
    const notificationsIcon = document.getElementById('notifications');
    const notifyActive = localStorage.getItem('notifyActive');
    
    if (notifyActive) {
        notificationsIcon.style.display = 'inline-flex'; // Exibe o ícone de notificações
        document.getElementById('mensage-counter').textContent = '0'; // Ajuste conforme a lógica para contagem de notificações
    } else {
        notificationsIcon.style.display = 'none'; // Oculta o ícone de notificações
    }
}

// Função para abrir o modal de notificações
function openNotifications() {
    const modal = document.getElementById('notifications-modal');
    modal.style.display = 'block';
}

// Função para fechar o modal de notificações
function closeNotifications() {
    const modal = document.getElementById('notifications-modal');
    modal.style.display = 'none';
}

// Fecha o modal ao clicar no botão de fechar
document.getElementById('close-notifications').onclick = function() {
    closeNotifications();
};

// Fecha o modal ao clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('notifications-modal');
    if (event.target == modal) {
        closeNotifications();
    }
};


// Verifica o estado armazenado na memória local e atualiza o link e o ícone ao carregar a página
window.onload = function() {
    const link = document.getElementById('notify-link');
    const notificationsIcon = document.getElementById('notifications');
    
    if (localStorage.getItem('notifyActive')) {
        link.classList.add('active');
        link.innerHTML = 'Cancelar Aviso <i class="fa-solid fa-bell-slash"></i>';
        link.title = 'Cancelar Aviso'; // Atualiza o título do link
    }
    
    // Atualiza a visibilidade do ícone de notificações
    updateNotificationIcon();
};
