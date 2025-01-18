module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "pnpm start",
            // args: "start",
            exec_mode: "cluster",
            instances: 1,
        },
    ],
};
