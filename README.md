# Flutter_UI_builder

![screenshot](https://github.com/devanmolsharma/Flutter_UI_builder/raw/main/demos/screenshot.png)

## Introduction

Flutter_UI_builder is a no-code builder for Android, web, Linux, Windows, macOS, and iOS applications. It is currently under development, utilizing AI to write code for you. This tool is particularly beneficial for non-coders looking to get started with app development.

## Why Flutter_UI_builder?

Flutter_UI_builder aims to simplify the app development process by providing a no-code solution that leverages AI to generate code automatically. Whether you're a beginner or an experienced developer, this tool can streamline your workflow and reduce the time spent on writing repetitive code.

## Get Started

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

### Detailed Steps:
1. **Open UI Backend:**
   - Navigate to the UI_backend folder in your file system using a file explorer or terminal.
   - Inside the UI_backend folder, locate the `devcontainer.json` file. This file is used to configure a development container for VS Code.
   - Open the UI_backend folder in Visual Studio Code (VS Code).
   - Create a file `.key.js` and add the line `exports.OPENAI_KEY = YOUR_OPENAI_KEY`.
   - Open a terminal window in this folder.
   - Build Docker Container.
   - Run it with `--net host`.

2. **Start Flutter UI Builder:**
   - Navigate to the Flutter_UI_builder folder in your file system.
   - Open a terminal window in this folder.
   - Build Docker Container.
   - Run it with port 3000 forwarded.

## Contributing Guide

## TODOS

- Move compiling logic to backend.
- Show icon next to icon name in properties view.
- Make the build async.
- Work on UI a bit.
- Make the widgets on WidgetList draggable.
- Make the whole layout resizable.
- Improve the parameters list widget to be easier to interact.
- Prettify copy button near each widget to copy Dart code for that widget.
- Add button to get Dart code for the whole application.
- Handle the case where a widget accepts only a small subset of widgets, like BottomNavigationBar accepts only BottomNavigationBarItem, which is technically a widget.
- Handle when a property is a Widget.

## License

This project is licensed under the Apache License.
