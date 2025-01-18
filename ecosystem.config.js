module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "pnpm",
            args: "start",
            exec_mode: "cluster",
            instances: "max",
        },
    ],
};
