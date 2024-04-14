/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/theanilsomani/ai-twitter-bio-generator",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://ai-twitter-bio.pages.dev/",
        permanent: false,
      },
    ];
  },
};
