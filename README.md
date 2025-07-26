# Crystal Website

## Project Overview

This is a modern web application built with Vite, TypeScript, React, shadcn-ui, and Tailwind CSS. It provides a fast and efficient development environment with a focus on performance and developer experience.

## Getting Started

To run this project locally, ensure you have [Node.js](https://nodejs.org/) and npm installed. You can use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions.

### Steps to Run Locally

1. **Clone the Repository**

   ```sh
   git clone <YOUR_GIT_URL>
   ```

2. **Navigate to the Project Directory**

   ```sh
   cd crystal-website
   ```

3. **Install Dependencies**

   ```sh
   npm install
   ```

4. **Start the Development Server**

   Run the following command to start the development server with auto-reloading and an instant preview:

   ```sh
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173` (or the port specified in the terminal) to view the application.

## Available Scripts

- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Builds the project for production, outputting optimized files to the `dist` folder.
- `npm run preview`: Serves the production build locally for testing.
- `npm run lint`: Runs the linter to check for code quality issues.
- `npm run format`: Formats the codebase using configured formatting tools (e.g., Prettier).

## Technologies Used

This project is built with the following technologies:

- **Vite**: A fast build tool and development server for modern web projects.
- **TypeScript**: A typed superset of JavaScript for enhanced developer experience and type safety.
- **React**: A JavaScript library for building user interfaces.
- **shadcn-ui**: A collection of reusable, accessible UI components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Folder Structure

```plaintext
crystal-website/
├── src/                    # Source files
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components
│   ├── styles/             # Tailwind CSS and other styles
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── dist/                   # Production build output (generated)
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Deployment

To deploy the project, follow these steps:

1. **Build the Project**

   ```sh
   npm run build
   ```

   This generates an optimized production build in the `dist` folder.

2. **Deploy to a Hosting Service**

   Upload the contents of the `dist` folder to your preferred hosting service (e.g., Vercel, Netlify, or GitHub Pages). Follow the hosting provider’s instructions for deploying a static site.

   For a quick preview of the production build locally:

   ```sh
   npm run preview
   ```

## Custom Domain

To connect a custom domain to your deployed site, refer to your hosting provider’s documentation for setting up custom domains. Typically, this involves:

1. Adding the domain in your hosting provider’s dashboard.
2. Updating your domain’s DNS settings to point to the hosting provider’s servers (e.g., adding A or CNAME records).

Consult your hosting provider for detailed instructions.

## Contributing

To contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.