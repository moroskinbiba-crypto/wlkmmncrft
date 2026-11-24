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

  // Клик по Стиву выбрасывает небольшую россыпь алмазов.
  const steve = document.querySelector('#steve-character');

  if (steve) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const dropDiamonds = (x, y) => {
      const count = 11;

      for (let index = 0; index < count; index += 1) {
        const diamond = document.createElement('span');
        diamond.className = 'diamond-particle';
        diamond.setAttribute('aria-hidden', 'true');
        diamond.innerHTML = `
          <svg viewBox="0 0 24 28" role="presentation">
            <path d="M12 1 22 8 12 27 2 8 12 1Z" fill="#20d9ed" stroke="#e4ffff" stroke-width="1.1" stroke-linejoin="round"/>
            <path d="m2 8 7-1 3 20L2 8Z" fill="#9cffff"/>
            <path d="m9 7 13 1-10 19L9 7Z" fill="#168fce"/>
            <path d="m2 8 7-1 3-6 3 6 7 1" fill="none" stroke="#d9ffff" stroke-width=".8" stroke-linejoin="round"/>
          </svg>`;
        const size = 17 + Math.random() * 17;
        const duration = reducedMotion.matches ? 450 : 850 + Math.random() * 650;
        const offsetX = (Math.random() - .5) * 46;
        const offsetY = (Math.random() - .5) * 24;

        diamond.style.left = `${x + offsetX}px`;
        diamond.style.top = `${y + offsetY}px`;
        diamond.style.setProperty('--size', `${size}px`);
        diamond.style.setProperty('--dx', `${(Math.random() - .5) * 190}px`);
        diamond.style.setProperty('--dy', `${110 + Math.random() * 190}px`);
        diamond.style.setProperty('--spin', `${Math.random() * 560 - 280}deg`);
        diamond.style.setProperty('--duration', `${duration}ms`);
        document.body.appendChild(diamond);
        window.setTimeout(() => diamond.remove(), duration + 80);
      }
    };

    const mine = (x, y) => {
      steve.classList.remove('is-mining');
      void steve.offsetWidth;
      steve.classList.add('is-mining');
      window.setTimeout(() => steve.classList.remove('is-mining'), 320);
      dropDiamonds(x, y);
    };

    steve.addEventListener('click', (event) => {
      mine(event.clientX, event.clientY);
    });

    steve.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const bounds = steve.getBoundingClientRect();
        mine(bounds.left + bounds.width * .55, bounds.top + bounds.height * .58);
      }
    });
  }

})();
