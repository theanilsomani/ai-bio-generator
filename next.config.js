/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/theanilsomani/ai-bio-generator",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://ai-bio-gen.pages.dev",
        permanent: false,
      },
    ];
  },
};
