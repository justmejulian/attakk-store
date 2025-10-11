# Attakk Store

## Introduction

Attakk Store is an e-commerce platform designed for selling cycling apparel and accessories. Built with Astro, Preact, and TailwindCSS.

## Installation

To set up the project locally, follow these steps:

1. Install dependencies:

   ```bash
   nvm install
   npm install
   ```

1. Configure environment variables:
   Copy the `.env.example` file to `.env` and fill in the required values:

   ```
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   PUBLIC_STRIPE_KEY=<your-public-stripe-key>
   ```

1. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

- **Development**: Use `npm run dev` to start the development server.
- **Build**: Use `npm run build` to create a production build.
- **Preview**: Use `npm run preview` to preview the production build.

## Docker

To run the project using Docker:

1. Build the Docker image:

   ```bash
   docker build -t attakk-store .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 4321:4321 attakk-store
   ```

The application will be accessible at `http://localhost:4321`.

## Deployment

Deployed using Dokku.

### Initial Setup Dokku

On Dokku Host:

```
dokku apps:create attakk-store
dokku ports:add attakk-store http:80:4321 https:443:4321
dokku domains:add attakk-store atk-collective.ch
dokku letsencrypt:enable attakk-store


dokku config:set attakk-store STRIPE_SECRET_KEY=sk_..
dokku config:set attakk-store PUBLIC_STRIPE_KEY=pk_..

dokku docker-options:add attakk-store build '--build-arg PUBLIC_STRIPE_KEY'
dokku docker-options:add attakk-store build '--build-arg STRIPE_SECRET_KEY'
```

[Build-time configuration variables](https://dokku.com/docs/deployment/builders/dockerfiles/#build-time-configuration-variables)

On Local Machine:

```
git remote add dokku dokku@atk-collective.ch:attakk-store
```

### Deployment

#### Automatic Deployment (GitHub Actions)

Pushing to the `main` branch automatically deploys to Dokku via GitHub Actions.

**Setup:**

1. Generate SSH key on the Dokku server:

   ```bash
   ssh-keygen -t ed25519 -f dokku_github_actions
   ```

2. Add public key to authorized_keys:

   ```bash
   cat dokku_github_actions.pub >> ~/.ssh/authorized_keys
   ```

3. Add public key to Dokku:

   ```bash
   cat dokku_github_actions.pub | sudo dokku ssh-keys:add github_actions
   dokku ssh-keys:list
   ```

4. Add private key to GitHub repository secrets as `SSH_PRIVATE_KEY`:
   - Go to repository Settings → Secrets and variables → Actions
   - Add new repository secret named `SSH_PRIVATE_KEY`
   - Paste contents of `dokku_github_actions` (private key)

#### Manual Deployment

```
git push dokku main
```

Make sure you have your ssh config set up correctly to allow access to the Dokku host. (Use IP address of server as Hostname in your SSH config.)

```
Host atk-collective.ch
    HostName 83.228.205.168
    User ubuntu
    IdentityFile ~/.ssh/...
```

Test:

```
ssh atk-collective.ch
```
