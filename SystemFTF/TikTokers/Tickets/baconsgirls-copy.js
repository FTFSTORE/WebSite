document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.dark-mode');
    const body = document.body;
  
    // Função para alternar o tema e armazenar a preferência no localStorage
    const toggleDarkMode = () => {
      body.classList.toggle('dark-mode-variables');
      darkModeButton.querySelector('span:nth-child(1)').classList.toggle('active');
      darkModeButton.querySelector('span:nth-child(2)').classList.toggle('active');
  
      if (body.classList.contains('dark-mode-variables')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    };
  
    // Verifica o tema armazenado no localStorage e aplica o tema correspondente ao carregar a página
    const applyStoredTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        body.classList.add('dark-mode-variables');
        darkModeButton.querySelector('span:nth-child(1)').classList.remove('active');
        darkModeButton.querySelector('span:nth-child(2)').classList.add('active');
      } else {
        body.classList.remove('dark-mode-variables');
        darkModeButton.querySelector('span:nth-child(1)').classList.add('active');
        darkModeButton.querySelector('span:nth-child(2)').classList.remove('active');
      }
    };
  
    // Adiciona o evento de clique ao botão de alternância de tema
    darkModeButton.addEventListener('click', toggleDarkMode);
  
    // Aplica o tema armazenado no localStorage ao carregar a página
    applyStoredTheme();
  });

// Função para enviar a mensagem
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const messageText = messageInput.value.trim();
  const messageType = document.getElementById('options').value;

  if (messageText === '') return;

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let messageTemplate = '';

  switch (messageType) {
    case 'system-message':
      messageTemplate = `
        <div class="system-message">
            <p>${messageText}</p>
        </div>
      `;
      break;
    case 'admin-message':
      messageTemplate = `
        <div class="message">
            <div class="profile-photo">MD</div>
            <div class="message-content">
                <p>${messageText}</p>
                <small>${currentTime}</small>
            </div>
        </div>
      `;
      break;
      case 'close-ticket':
      messageTemplate = `
        <div class="system-message">
        <p>Ticket was closed due to <b>inactivity</b>.</p>
        </div>
      `;
      break;
    default:
      messageTemplate = `
        <div class="message member">
            <div class="profile-photo">BG</div>
            <div class="message-content">
                <p>${messageText}</p>
                <small>${currentTime}</small>
            </div>
        </div>
      `;
  }

  const messageContainer = document.getElementById('menssages');
  messageContainer.innerHTML += messageTemplate;

  saveMessageToLocalStorage(messageTemplate);
  messageInput.value = '';
}

// Função para salvar a mensagem na memória local
function saveMessageToLocalStorage(message) {
  const existingMessages = localStorage.getItem('chatMessages') || '';
  localStorage.setItem('chatMessages', existingMessages + message);
}

// Função para carregar mensagens da memória local
function loadMessagesFromLocalStorage() {
  const savedMessages = localStorage.getItem('chatMessages');
  const messageContainer = document.getElementById('menssages');

  if (savedMessages) {
      messageContainer.innerHTML = savedMessages;
  }

  // Verifica se a mensagem do sistema já foi enviada
  if (!localStorage.getItem('systemMessageSent')) {
      const systemMessage = `
          <div class="system-message">
              <p>The ticket was opened by <b>BaconsGirls</b> <i class="fa-solid fa-circle-check" style="color: var(--color-primary);"></i>.</p>
          </div>
          <div class="message member">
              <div class="profile-photo">BG</div>
              <div class="message-content">
                  <p>Olá, me chamo <b>BaconsGirls</b>! Gostaria de falar com um(a) administrador(a).</p>
                  <small>Automática</small>
              </div>
          </div>
      `;

      // Adiciona a mensagem do sistema ao container
      messageContainer.innerHTML = systemMessage + messageContainer.innerHTML;

      // Marca a mensagem do sistema como enviada
      localStorage.setItem('systemMessageSent', 'true');

      // Salva a mensagem do sistema no localStorage
      saveMessageToLocalStorage(systemMessage);
  }
}

// Função para verificar a URL e habilitar as opções no select
function checkURLForAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('adm-medu');

  if (isAdmin) {
      const selectElement = document.getElementById('options');

      // Adicionar opção "System Message" se não estiver presente
      if (![...selectElement.options].some(option => option.value === 'system-message')) {
          const systemOption = document.createElement('option');
          systemOption.value = 'system-message';
          systemOption.textContent = 'System Message';
          selectElement.appendChild(systemOption);
      }

      // Adicionar opção "Admin Message" se não estiver presente
      if (![...selectElement.options].some(option => option.value === 'admin-message')) {
          const adminOption = document.createElement('option');
          adminOption.value = 'admin-message';
          adminOption.textContent = 'Admin Message';
          selectElement.appendChild(adminOption);
      }

      // Adicionar opção "Admin Message" se não estiver presente
      if (![...selectElement.options].some(option => option.value === 'close-ticket')) {
        const closedOption = document.createElement('option');
        closedOption.value = 'close-ticket';
        closedOption.textContent = 'Close Ticket';
        selectElement.appendChild(closedOption);
    }
  }
}

// Adicionar evento ao botão de envio
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Adicionar evento de teclado para enviar mensagem ao pressionar "Enter"
document.getElementById('message-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed'); // Depuração
    sendMessage();
    event.preventDefault(); // Evita que o "Enter" cause uma nova linha
  }
});

// Carregar mensagens e verificar a URL ao carregar a página
window.onload = () => {
  loadMessagesFromLocalStorage();
  checkURLForAdmin();
};


// Função para alterar o texto quando o input ganhar foco
document.getElementById('message-input').addEventListener('focus', () => {
  const statusText = document.getElementById('status-text');
  statusText.innerText = 'Digitando';
  statusText.classList.add('typing');
});

// Função para restaurar o texto quando o input perder foco
document.getElementById('message-input').addEventListener('blur', () => {
  const statusText = document.getElementById('status-text');
  statusText.innerText = 'Online';
  statusText.classList.remove('typing');
});