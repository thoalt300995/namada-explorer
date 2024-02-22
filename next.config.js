/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_RPC: process.env.REACT_APP_RPC,
    REACT_APP_INDEXER: process.env.REACT_APP_INDEXER,
    REACT_APP_EXTERNAL_RPC: process.env.REACT_APP_EXTERNAL_RPC,
    REACT_APP_TOKEN: process.env.REACT_APP_TOKEN,
  },
}

module.exports = nextConfig
