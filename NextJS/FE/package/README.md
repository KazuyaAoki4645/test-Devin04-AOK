# KENSAKI Product 2025 Frontend

This is the frontend application for the KENSAKI Product 2025 project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Authentication Configuration

## Development Mode
In development mode, the application uses dummy credentials for authentication.

## Production Mode
In production mode, the application attempts to use the logged-in user's credentials.

## Configuration
To configure the authentication settings:

1. Create a `.env` file in the root directory (you can copy from `.env.example`)
2. Set the API URL by changing the `NEXT_PUBLIC_API_URL` value
3. Set `NODE_ENV=production` to switch to production mode

When deploying to production, make sure to set the correct environment variables.
