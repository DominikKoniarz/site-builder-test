module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "./node_modules/next/dist/bin/next",
            args: "start",
            exec_mode: "cluster",
            instances: 2,
            instance_var: "INSTANCE_ID",
            env: {
                PORT: 3000,
                NODE_ENV: "production",
            },
        },
    ],
};
