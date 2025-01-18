git stash
git pull
git stash drop
export PATH=/root/.local/share/pnpm:$PATH
export PATH=/root/.local/share/pnpm/pnpm:$PATH
pnpm -v
pnpm install
pnpm prisma generate
pnpm run build
# pm2 start ecosystem.config.js
pm2 start npm --name "nextjs-app" -- start
# pnpm start