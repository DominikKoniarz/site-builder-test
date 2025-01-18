git stash
git pull
git stash drop
pnpm install
pnpm prisma generate
pnpm run build
# pnpm run pm2 delete nextjs-app
pm2 start ecosystem.config.js