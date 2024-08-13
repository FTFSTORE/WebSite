const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

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



Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});

function OpenAdmModal() {
  const btn = document.querySelector('.three-lines');
  const modal = document.querySelector('.modal-adm');
  const closeModal = document.querySelector('.modal-adm-content'); // Adicione um botão de fechar se necessário

  // Mostrar o modal
  function showModal() {
      modal.style.display = 'flex';
  }

  // Ocultar o modal
  function hideModal() {
      modal.style.display = 'none';
  }

  // Adicionar event listener ao botão para abrir o modal
  btn.addEventListener('click', showModal);

  // Adicionar event listener ao modal para fechá-lo ao clicar fora do conteúdo
  modal.addEventListener('click', hideModal);

  // Adicionar event listener ao conteúdo do modal para evitar o fechamento ao clicar dentro
  if (closeModal) {
      closeModal.addEventListener('click', function(event) {
          event.stopPropagation(); // Impede que o clique dentro do modal feche o modal
      });
  }
}

// Chamar a função para ativar a funcionalidade
OpenAdmModal();

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 4; // Total de passos do tutorial

  function showModal(step) {
      // Oculta todos os modais
      document.querySelectorAll('.tutorial-modal').forEach(modal => {
          modal.style.display = 'none';
      });
      // Mostra o modal do passo atual
      document.querySelector(`.tutorial-modal-step${step}`).style.display = 'flex';
  }

  function handleNextStep(event) {
      const nextStep = parseInt(event.target.getAttribute('data-next'));
      if (nextStep <= totalSteps) {
          currentStep = nextStep;
          showModal(currentStep);
      }
  }

  // Exibir o primeiro passo do tutorial
  showModal(currentStep);

  // Adicionar event listeners aos botões de próximo e finalizar
  document.querySelectorAll('.tutorial-next').forEach(button => {
      button.addEventListener('click', handleNextStep);
  });

  document.querySelector('.tutorial-finish').addEventListener('click', () => {
      // Oculta todos os modais e pode adicionar lógica adicional aqui
      document.querySelectorAll('.tutorial-modal').forEach(modal => {
          modal.style.display = 'none';
      });
  });
});

function closeAlert() {
  const noti = document.querySelector('.noti');
  if (noti) {
    noti.classList.add('hidden'); // Adiciona a classe 'hidden' para ocultar a notificação

    // Remove o elemento da tela após a transição
    setTimeout(() => {
      noti.style.display = 'none';
    }, 490); // Tempo deve coincidir com a duração da animação de saída
  }
}

