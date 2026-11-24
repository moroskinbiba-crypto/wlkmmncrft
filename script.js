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


  // Нажатие на Стива выпускает россыпь алмазов с индивидуальными траекториями.
  const steve = document.querySelector('.hero__character');

  if (steve) {
    const diamondAsset = 'assets/ui/11-2-minecraft-diamond-png.png';
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const randomBetween = (min, max) => min + Math.random() * (max - min);

    const releaseDiamonds = (originX, originY) => {
      const count = reducedMotion ? 3 : Math.floor(randomBetween(8, 11));
      const existing = document.querySelectorAll('.diamond-particle');

      if (existing.length + count > 64) {
        Array.from(existing).slice(0, existing.length + count - 64).forEach((item) => item.remove());
      }

      for (let index = 0; index < count; index += 1) {
        const diamond = document.createElement('img');
        diamond.className = 'diamond-particle';
        diamond.src = diamondAsset;
        diamond.alt = '';
        diamond.setAttribute('aria-hidden', 'true');

        const startX = originX + randomBetween(-15, 15);
        const startY = originY + randomBetween(-12, 12);
        diamond.style.left = `${startX}px`;
        diamond.style.top = `${startY}px`;
        diamond.style.width = `${randomBetween(25, 43)}px`;
        document.body.appendChild(diamond);

        if (reducedMotion) {
          const fade = diamond.animate(
            [
              { opacity: 0, transform: 'scale(.55)' },
              { opacity: 1, transform: 'scale(1)' },
              { opacity: 0, transform: 'scale(.8)' }
            ],
            { duration: 420, easing: 'ease-out' }
          );
          fade.onfinish = () => diamond.remove();
          continue;
        }

        // У каждой частицы свой боковой снос, высота прыжка, падение и вращение.
        const drift = randomBetween(-190, 190);
        const lift = randomBetween(105, 215);
        const fall = randomBetween(105, 245);
        const launchX = drift * .2 + randomBetween(-24, 24);
        const middleX = drift * .58 + randomBetween(-35, 35);
        const twist = randomBetween(-420, 420);
        const duration = randomBetween(820, 1280);
        const delay = randomBetween(0, 110);

        const flight = diamond.animate(
          [
            {
              offset: 0,
              opacity: 0,
              transform: 'translate3d(0, 0, 0) rotate(0deg) scale(.42)'
            },
            {
              offset: .2,
              opacity: 1,
              transform: `translate3d(${launchX}px, ${-lift}px, 0) rotate(${twist * .18}deg) scale(1.08)`,
              easing: 'cubic-bezier(.12, .72, .22, 1)'
            },
            {
              offset: .58,
              opacity: .98,
              transform: `translate3d(${middleX}px, ${-lift * .42}px, 0) rotate(${twist * .58}deg) scale(.82)`,
              easing: 'cubic-bezier(.42, 0, .7, .45)'
            },
            {
              offset: 1,
              opacity: 0,
              transform: `translate3d(${drift}px, ${fall}px, 0) rotate(${twist}deg) scale(.18)`
            }
          ],
          { duration, delay, fill: 'forwards', easing: 'ease-out' }
        );

        flight.onfinish = () => diamond.remove();
      }
    };

    steve.addEventListener('click', (event) => {
      const bounds = steve.getBoundingClientRect();
      const x = event.detail === 0 ? bounds.left + bounds.width * .68 : event.clientX;
      const y = event.detail === 0 ? bounds.top + bounds.height * .43 : event.clientY;
      releaseDiamonds(x, y);

      if (!reducedMotion) {
        steve.animate(
          [
            { transform: 'translateY(-50%) rotate(0deg) scale(1)' },
            { transform: 'translateY(-50%) rotate(-.8deg) scale(.985)', offset: .4 },
            { transform: 'translateY(-50%) rotate(.35deg) scale(1.005)', offset: .72 },
            { transform: 'translateY(-50%) rotate(0deg) scale(1)' }
          ],
          { duration: 230, easing: 'ease-out' }
        );
      }
    });

    steve.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
        event.preventDefault();
        const bounds = steve.getBoundingClientRect();
        releaseDiamonds(bounds.left + bounds.width * .68, bounds.top + bounds.height * .43);
      }
    });
  }

})();
