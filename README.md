# Portfolio (React + Vite)

    npm install
    npm run dev      # локально
    npm run build    # сборка в dist/

Контент — в начале `src/App.jsx`. Фон hero: положите фото в `public/hero.jpg` (необязательно).

## Деплой
1. Создайте репозиторий на GitHub и запушьте код в ветку `main`.
2. Cloudflare Pages → Create project → Direct Upload, имя проекта: `portfolio`.
3. В GitHub: Settings → Secrets → Actions добавьте `CLOUDFLARE_API_TOKEN` и `CLOUDFLARE_ACCOUNT_ID`.
4. Каждый push в `main` автоматически публикует сайт.

Альтернатива: подключить репозиторий в Cloudflare Pages напрямую (build: `npm run build`, output: `dist`) и удалить `.github/workflows/deploy.yml`.
