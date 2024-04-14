## This project generates Twitter (X) and LinkedIn bios for you using AI.

[![Twitter Bio Generator](./public/screenshot.jpg)](https://ai-twitter-bio.pages.dev)


## How it works

This project uses both [Mixtral](https://mistral.ai/news/mixtral-of-experts/) and [Llama](https://openai.com/api/) with / *without* streaming to generate a Twitter bio. It constructs a prompt based on the form and user input, sends it either to the Mixtral API or Llama API through [Cloudflare Worker AI](https://developers.cloudflare.com/workers-ai/), then streams the response back to the application.

### Repo cloned from [twitterbio.io](https://www.twitterbio.io/)

