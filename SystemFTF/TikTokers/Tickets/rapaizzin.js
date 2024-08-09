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