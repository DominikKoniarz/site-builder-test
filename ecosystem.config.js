module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "./node_modules/next/dist/bin/next start",
            //script: "'pnpm start'",
            // args: "start",
            exec_mode: "cluster",
            instances: 2,
            increment_var: "PORT",
            env: {
                PORT: 3000,
                NODE_ENV: "production",
            },
        },
    ],
};
