(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const serverAddress = document.querySelector('.server-address');
  const serverText = serverAddress?.querySelector('.server-address__text');
  const hint = serverAddress?.querySelector('.server-address__hint');

  if (serverAddress && serverText) {
    serverAddress.addEventListener('click', async (event) => {
      event.preventDefault();
      const value = serverText.textContent.trim();
      try {
        await navigator.clipboard.writeText(value);
        if (hint) hint.textContent = 'IP скопирован!';
      } catch {
        // Clipboard API может быть недоступен на HTTP или в старом браузере.
        if (hint) hint.textContent = value;
      }
      if (hint) {
        hint.style.opacity = '1';
        window.setTimeout(() => {
          hint.style.opacity = '';
          hint.textContent = 'Нажмите, чтобы скопировать IP';
        }, 1800);
      }
    });
  }
})();
