<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://www.shutterstock.com/image-vector/talk-bubble-speech-icon-blank-600nw-1415472902.jpg" borderRadius=50% alt="Project logo"></a>
</p>

<h3 align="center">Chat App</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">This is a minimized chat app using firebase with instant messaging and image sharing
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is a chat-app which has instant messaging feature and you can also share images

## 🏁 Getting Started <a name = "getting_started"></a>

you have to clone the repo and install all the packages then you have to have a firebase account for the database you can follow this tutorial [firebase](https://firebase.google.com/learn/pathways/firebase-web)
then copy the config file and create a firebase.js file in the lib folder and export the app function you'll also have to export the auth and storage 


### Prerequisites

You'll need to have Node.js installed on your computer.
and have a firebase account


### Installing

A step by step series of examples that tell you how to get a development env running.

clone the repo

```
git remote add origin https://github.com/vhiz/firebase-chat.git
```

then install all the dependencies

```
npm install
```
create a firebase.js file in the lib folder and export the app function you'll also have to export the auth and storage 

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ******,
  authDomain: ******,
  projectId: **********,
  storageBucket: ****,
  messagingSenderId:****,
  appId: ****,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
```

Run the dev server

```
npm run dev
```

## 🎈 Usage <a name="usage"></a>

you can send messages 
you can add users 
you can send images



## ⛏️ Built Using <a name = "built_using"></a>

- [Firebase](https://firebase.google.com/) - Database
- [Vite](https://vitejs.dev/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@vhiz](https://github.com/vhiz/) - Idea & Initial work


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [lamadev](https://github.com/safak)

