pnpm -v
pnpm install --frozen-lockfile
pnpm prisma generate
pnpm run build
pnpm add pm2
/root/.local/share/pnpm/pm2 start ecosystem.config.js