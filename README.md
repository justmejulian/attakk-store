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

2. Start the development server:
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
```

On Local Machine:
```
git remote add dokku dokku@atk-collective.ch:attakk-store
```

### Deployment

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
