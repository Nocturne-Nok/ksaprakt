const { PORT, HOST } = require("./config");

const { mongoDBAdapter } = require("./adapters/mongodb");
const { postgresAdapter } = require("./adapters/postgres");

const { bootstrapFastify } = require("./app");

let fastify

const startServer = async () => {
  try {
    await Promise.all([mongoDBAdapter.connect(), postgresAdapter.connect()]);

        fastify = bootstrapFastify();

        const port = PORT;
        const host = HOST;

        await fastify.listen({ port, host });
    }   catch (err) {
        if (fastify && fastify.log) {
            fastify.log.error(err);
        }   else {
            console.error ("Error starting server:", err)
        }
        process.exit(1);
    }
};


const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    if (fastify) {
        try {
            await fastify.close();
            console.log('Fastify server closed.');
            process.exit(0);
        }   catch (err) {
            console.error('Error during shutdown:', err);
            process.exit(1);
        }
    }   else {
        process.exit(0);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    shutdown('uncaughtException');
});

startServer();
