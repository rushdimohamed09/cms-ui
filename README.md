# CMS-UI Vue.js App

This is the front-end of the CMS-UI project, built using Vue.js. The project relies on a Laravel backend to provide API endpoints. In this README, you will find information on how to set up and run this project.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js: Download and Install Node.js
- Laravel CMS Backend: You will need to set up the Laravel CMS backend by following the instructions in the [CMS Laravel Repository](https://github.com/rushdimohamed09/cms).
- Make sure your laravel App is up and running

## Getting Started
### Laravel Backend
1. Clone the Laravel CMS backend repository:

    ```bash
    git clone https://github.com/rushdimohamed09/cms.git
    cd cms

2. Follow the installation instructions in the CMS Laravel Repository to set up and run the Laravel backend.

### Vue.js Frontend
1. Clone the CMS-UI Vue.js repository:
    ```bash
    git clone https://github.com/yourusername/CMS-UI.git
    cd CMS-UI

2. Install project dependencies:

    ```bash
    npm install
    
## Configuration
You'll need to configure the API endpoints in the Vue.js project to point to your Laravel backend. This can typically be done by modifying a configuration file, such as a .env file or a config.js file. Refer to the project's documentation or check for a file where the API endpoints are defined.

### Usage
* To run the development server:

    ```bash
    npm run serve

This will start a local development server, and you can access the application in your web browser at http://localhost:8080.

### Build
* To build the project for production:

    ```bash
    npm run build

The production-ready files will be placed in the dist/ directory.

## Acknowledgments
Thanks to the Laravel community for providing a powerful backend framework.

Thanks to the Vue.js community for creating a fantastic front-end framework.

## Contact
If you have any questions or need further assistance, feel free to contact.

Rushdi Mohamed.