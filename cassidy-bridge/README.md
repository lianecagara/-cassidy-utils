# Cassidy Bridge

**Cassidy Bridge** is a library designed to facilitate database queries and interactions for the Cassidy bot. It uses `axios` to communicate with a specified URL and handles data retrieval and storage efficiently.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [CassidyBridge](#cassidybridge)
  - [sendQuery](#sendquery)
  - [goatQuery](#goatquery)
  - [fromGoatBot](#fromgoatbot)
- [Examples](#examples)
- [License](#license)

## Installation

To install `cassidy-bridge`, you can use npm:

```bash
npm install cassidy-bridge
```

Usage

First, require the package in your project:

```js
const CassidyBridge = require("cassidy-bridge");
```
You can create an instance of CassidyBridge by providing the necessary parameters.

```js
const bridge = new CassidyBridge({
  onGetAllData: yourGetAllDataFunction,
  onSetEachData: yourSetEachDataFunction,
});
```

API

CassidyBridge

The main class for interacting with the Cassidy bot.

Constructor:

url (String): The URL to send requests to (default: https://cassidybot.onrender.com).

onGetAllData (Function): A function to retrieve all user data.

onSetEachData (Function): A function to set each user's data.



sendQuery

Method: async sendQuery(event)

Parameters:

event (Object): The event data to be sent with the query.


Returns: The result from the server or null in case of an error.


goatQuery

Method: async goatQuery(message, event)

Parameters:

message (Object): The message object for responding to events.

event (Object): The event data to be processed.


Returns: A reply or send message based on the result.


fromGoatBot

Static Method: static fromGoatBot({ usersData, ...etc })

Parameters:

usersData (Object): An object to manage user data.


Returns: An instance of CassidyBridge.


Examples

Creating an Instance

Here's an example of how to create a CassidyBridge instance with user data functions:

const usersData = {
  getAll: async () => {
    // Function to retrieve all user data
  },
  set: async (userID, data, type) => {
    // Function to set user data
  }
};
```js
const bridge = CassidyBridge.fromGoatBot({ usersData });
```

Sending a Query

You can send a query using the goatQuery method:

const message = {
  reply: (body) => console.log("Reply:", body),
  send: (body) => console.log("Send:", body),
};

const event = { action: "someAction" };

bridge.goatQuery(message, event);
