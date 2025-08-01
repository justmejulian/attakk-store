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
