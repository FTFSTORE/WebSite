document.addEventListener('DOMContentLoaded', () => {
    const optionMenu = document.querySelector(".select-menu");
    const selectBtn = document.querySelector(".select-btn");
    const options = document.querySelectorAll(".option");
    const sBtn_text = document.querySelector(".sBtn-text");

    const loadingModal = document.getElementById("loading-modal");
    const modals = document.querySelectorAll(".specific-modal");
    const closeButtons = document.querySelectorAll(".close-btn");

    // Mostrar/ocultar o menu de seleção ao clicar no botão
    selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

    // Quando uma opção for clicada
    options.forEach(option => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text").innerText;
            sBtn_text.innerText = selectedOption;

            // Exibir o modal de carregamento
            loadingModal.style.display = "flex";

            // Simular um atraso para o modal de carregamento
            setTimeout(() => {
                // Esconder o modal de carregamento
                loadingModal.style.display = "none";

                // Obter o id do modal específico a ser exibido
                const modalId = option.getAttribute("data-modal");
                const specificModal = document.getElementById(modalId);

                // Fechar o menu de seleção
                optionMenu.classList.remove("active");

                // Exibir o modal específico
                specificModal.style.display = "flex";
            }, 1000); // Tempo do carregamento em milissegundos (ajuste conforme necessário)
        });
    });

    // Fechar os modais específicos ao clicar no botão de fechar
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".specific-modal").style.display = "none";
        });
    });

    // Fechar modais ao clicar fora do conteúdo do modal
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
