# ʕ •́؈•̀) `cloudflare-workers-airtable-template`

A Cloudflare worker project to use as an Airtable proxy for any **Airtable Base**.

## Note: You must use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) 1.17 or newer to use this template.

## 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate my-ts-project https://github.com/waptik/cloudflare-workers-airtable-template
```

## 👩 💻 Developing

### Installing dependancies

You first need to install the dependencies. Here i am using yarn but you can use any nodejs package manager

Run the following command

```sh
yarn install

# or

yarn
```

### 🔑 Setup wrangler config

After installing the dependancies, you need to setup a local wrangler configuration for the worker to deployed smoothly. Make sure you authenticated wrangler with your cloudflare account as mentionned in **Getting Started**

- Copy `wrangler.example.toml` to `wrangler.toml` using

```sh
cp wrangler.example.toml wrangler.toml
```

- Open `wrangler.toml` and only rename the name `cloudflare-workers-airtable-template` to whatever name of your choice.

### Add environemts Secrets

For the worker to communicate with Airtable's api server, you need to add your api token to cloudflare workers environment secrets.
Run the command below in your terminal and follow the prompt

```sh
yarn wrangler secret put AIRTABLE_API_KEY

#or

wrangler secret put AIRTABLE_API_KEY
```

After add your secret, you are noe good to start playing around with the serverless function.

### 🧲 Local development

> **Notice**: The [`src/index.ts`](./src/index.ts) file calls the request handler in [`src/handler.ts`](./src/handler.ts), and will return the [request method](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) for the given request.

You can try out the worker locally using either `httpie`, `curl`, `postman`, `[your frontend app]`, etc.

First of all, start the local server using

```sh
yarn dev
```

Now, copy and paste the url any medium of your choice where you can test the endpoint. The fastest way is to use `curl` inside your terminal:

```sh
# Replace [my_apy_key], 8787, [my_database_id],[my_table_id] with their respctive valid values
curl "http://localhost:8787/v0/[my_database_id]/[my_table_id]?maxRecords=10" \   -H "Authorization: Bearer [my_apy_key]"

```

After pressing enter, you see the response printed in your terminal.

## 🚀 Deployment

### Using GitHub Actions

First, commit and push your changes to Github.
Then, go to your repository's environments settings. There, you should create a new environment called `production`.
After that, create a secret for that environment called `CF_API_TOKEN` with the value of **your cloudflare account api token**

When you are done, go to actions and restart the failed action. You should see the serverless worker being deployed successfully.

### Using your terminal

On your terminal, all you have to do is run the command below and you are good to go

```sh
yarn deploy
```

### 🧪 Testing

This template comes with jest tests which simply test that the request handler can handle each request method. `yarn test` will run your tests.

### ✏️ Formatting

This template uses [`prettier`](https://prettier.io/) to format the project. To invoke, run `yarn format`.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

## 🤢 Issues

If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/cloudflare/worker-typescript-template/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/wrangler/issues).

## ⚠️ Caveats

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/waptik/cloudflare-workers-airtable-template)
