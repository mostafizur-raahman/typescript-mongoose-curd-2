declare namespace NodeJS {
    export type processEnv = {
        PORT: number;
        DATABASE_URL: string;
        NODE_ENV: string;
    };
}
