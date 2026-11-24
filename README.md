# UltraNX world — сайт

Статическая адаптивная страница на HTML, CSS и JavaScript. Никаких библиотек и сборки не требуется.

## Структура

```text
ultranx-world/
├── index.html
├── styles.css
├── script.js
├── downloads/
│   └── horizon-nx.zip  # положите сюда архив для скачивания
└── assets/
    ├── backgrounds/
    │   ├── hero-bg.png
    │   └── install-bg.png
    ├── ui/
    │   ├── btn-telegram.png
    │   ├── btn-install.png
    │   ├── btn-ip.png
    │   ├── step-1.png
    │   ├── step-2.png
    │   ├── step-3.png
    │   └── step-4.png
    └── characters/
        └── steve.png
```

Скопируйте свои PNG-файлы в каталоги `assets`, сохранив имена из списка. Положите архив для скачивания в `downloads/horizon-nx.zip`. В архиве оставлены `.gitkeep`-файлы, чтобы каталоги не потерялись.

## Что настроить перед публикацией

1. В `index.html` замените `https://t.me/` на ссылку вашего Telegram-чата.
2. Поместите архив в `downloads/horizon-nx.zip` (сейчас самого архива в исходных материалах нет).
3. Проверьте адрес `c14.play2go.cloud:20044` в `index.html` и замените порт, если сервер использует другой.
4. При необходимости поменяйте ссылки GitHub в подвале.

## Запуск

Откройте `index.html` в браузере или загрузите всю папку на GitHub Pages / любой статический хостинг. Для корректного копирования IP в буфер обмена сайт должен быть открыт по HTTPS (или на localhost).
