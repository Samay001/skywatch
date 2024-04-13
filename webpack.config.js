import Dotenv from 'dotenv-webpack';

export const entry = './index.tsx';
export const plugins = [
    new Dotenv({
        path: './.env', // Path to your .env file
    }),
];
