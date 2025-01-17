module.exports = {
    apps: [
        {
            name: "nextjs-app",
            script: "pnpm",
            args: "start",
            instances: 1, // Liczba instancji
            exec_mode: "cluster", // Tryb klastrowy
            env: {
                NODE_ENV: "production",
                PORT: 3000, // Startowy port (będzie automatycznie zwiększany)
            },
            increment_var: "PORT", // Zwiększaj PORT dla każdej instancji
        },
    ],
};
