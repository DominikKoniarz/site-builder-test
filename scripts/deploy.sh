pnpm -v
pnpm install --frozen-lockfile
pnpm prisma generate
pnpm run build
# pm2 start ecosystem.config.js
pm2 start pnpm --name "nextjs-app" -- start