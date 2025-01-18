git stash
git pull
git stash drop
pnpm -v
pnpm install
pnpm prisma generate
pnpm run build
# pm2 start ecosystem.config.js
pm2 start npm --name "nextjs-app" -- start
# pnpm start