# Flutter_UI_builder
 A no-code Builder for android ,web, linux, windows ,mac and ios applications. 🚧(under development)🚧

## Demo
![screenshot](https://github.com/devanmolsharma/Flutter_UI_builder/raw/main/demos/screenshot.png)
![demo](https://github.com/devanmolsharma/Flutter_UI_builder/raw/main/demos/beta1.webm)

### Requirements:
1. **npm**: npm is a tool used for managing packages and dependencies for JavaScript projects. You can install it by downloading and installing Node.js, which includes npm by default.
   
   - Download Node.js from [nodejs.org](https://nodejs.org/).
   - Follow the installation instructions for your operating system.
   - After installation, npm will be available in your command line or terminal.

2. **Node.js**: Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It's essential for running JavaScript applications, including servers and development tools.

   - Install Node.js by downloading the installer from [nodejs.org](https://nodejs.org/).
   - Follow the installation instructions for your operating system.
   - After installation, you can use Node.js to execute JavaScript code from the command line.

3. **Docker**: Docker is a platform for developing, shipping, and running applications in containers. It provides an efficient way to package and distribute software with all its dependencies.

   - Install Docker from [docker.com](https://www.docker.com/get-started).
   - Follow the installation instructions for your operating system.
   - After installation, Docker should be available in your command line or terminal.

### Steps:
1. **Open UI Backend:**
   - Navigate to the UI_backend folder in your file system using a file explorer or terminal.
   - Inside the UI_backend folder, locate the `devcontainer.json` file. This file is used to configure a development container for VS Code.
   - Open the UI_backend folder in Visual Studio Code (VS Code). If you have the Remote Development extension pack installed, VS Code will detect the devcontainer.json file and suggest opening the folder in a container.
   - Once the folder is opened in the development container, locate the `app.js` file within the UI_backend folder.
   - Open a terminal within VS Code (or use your preferred terminal application) and navigate to the UI_backend folder.
   - Run the command `node app.js` in the terminal to start the backend server.

2. **Start Flutter UI Builder:**
   - Navigate to the Flutter_UI_builder folder in your file system.
   - Open a terminal window in this folder.
   - Run the command `npm run dev` in the terminal. This command is defined in the package.json file and will start a development server for the Flutter UI builder application.
   - After running the command, wait for the server to start. Once it's running, you should see a message indicating that the server is listening on a specific port (likely port 3000).
   - Open your web browser and type `localhost:3000` in the address bar to access the Flutter UI builder application.

## TODOS


- move compiling logic to backend
- work on UI a bit
- make the whole layout resizable
- Improve the parametes list widget to be easier to ineract
- prettify copy button near each widget to copy dart code for that widget
- add button to get dart code for whole application
- Add a LLM to convert comments in funtions to actual code
- handle the case where a widget accepts only a small subset of widgets, like BottomNavigationBar accepts only BottomNavigationBarItem , which is technically a widget
- Handle when a property is a Widget