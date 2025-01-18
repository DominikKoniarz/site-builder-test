git stash
git pull
git stash drop
pnpm -v
pnpm install
pnpm prisma generate
pnpm run build
pnpm run pm2 delete nextjs-app
pnpm run pm2 start ecosystem.config.js