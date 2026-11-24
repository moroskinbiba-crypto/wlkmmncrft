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

        // Фаза 1: каждый алмаз плавно разлетается в собственном направлении.
        const angle = randomBetween(0, Math.PI * 2);
        const distance = randomBetween(75, 155);
        const scatterX = Math.cos(angle) * distance;
        const scatterY = Math.sin(angle) * distance;
        const rotation = randomBetween(-300, 300);
        const scatterDuration = randomBetween(300, 440);
        const delay = randomBetween(0, 75);

        const scatter = diamond.animate(
          [
            {
              opacity: 0,
              transform: 'translate3d(0, 0, 0) rotate(0deg) scale(.55)'
            },
            {
              opacity: 1,
              transform: `translate3d(${scatterX}px, ${scatterY}px, 0) rotate(${rotation * .55}deg) scale(1)`
            }
          ],
          {
            duration: scatterDuration,
            delay,
            fill: 'forwards',
            easing: 'cubic-bezier(.16, .72, .25, 1)'
          }
        );

        // Фаза 2: после разлёта алмаз продолжает путь вниз под действием гравитации.
        scatter.onfinish = () => {
          const fallX = scatterX + randomBetween(-38, 38);
          const fallY = scatterY + randomBetween(125, 205);
          const fall = diamond.animate(
            [
              {
                opacity: 1,
                transform: `translate3d(${scatterX}px, ${scatterY}px, 0) rotate(${rotation * .55}deg) scale(1)`
              },
              {
                opacity: 0,
                transform: `translate3d(${fallX}px, ${fallY}px, 0) rotate(${rotation}deg) scale(.72)`
              }
            ],
            {
              duration: randomBetween(520, 760),
              fill: 'forwards',
              easing: 'cubic-bezier(.35, 0, .85, .55)'
            }
          );
          fall.onfinish = () => diamond.remove();
        };
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
