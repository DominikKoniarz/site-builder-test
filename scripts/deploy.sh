git stash
git pull
git stash drop
pnpm install
pnpm prisma generate
pnpm run build
pm2 delete nextjs-app
pm2 start ecosystem.config.js