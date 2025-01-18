git add .
git stash
git stash drop
git pull
pnpm install
pnpm prisma generate
pnpm run build
pm2 delete ecosystem.config.js
sleep 1
pm2 start ecosystem.config.js