# WhatsApp Chatbot + Meta Integration

This project is a WhatsApp chatbot built using the **BuilderBot** library and integrated with **Meta** to manage messages.

---

## **Table of Contents**

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [Dependencies](#dependencies)
- [Autor](#autor)
- [Credits](#credits)

---

## **Requirements**

Make sure you have the following installed:

- **Node.js** (version 18+ recommended)
- **npm** or **yarn**
- **Meta API Access Token** (admin permissions required)
- **WhatsApp Business Account** with a phone number ready to connect
- **BuilderBot library** (latest version)

---

## **Installation**

Follow these steps to set up the project:

1. **Clone the repository**:
   ```https://github.com/DanielDevHN/bot-whatsapp-meta.git``

   ```base-ts-baileys-memory```

2. **Install project dependencies**:
   ```npm install```


## **Environment Configuration**

Create a ```.env``` file in the root directory and add the following environment variables:

```JWT_TOKEN=your_jwt_token```

```MUMBER_ID=number_id```

```VERIFY_TOKEN=your-custom-token```               

## BuilderBot Configuration
```PORT=you_port```                                      

## Running the Project

To start the chatbot server, run the following command:

```npm run dev```

The bot server will start at ```http://localhost:3002```

## Dependencies

The following libraries and tools are used in this project:

| **Package**                         | **Version** | **Description**                                     |
|-------------------------------------|-------------|----------------------------------------------------|
| **@builderbot/bot**                 | ^1.2.2      | Core library for creating the WhatsApp bot.        |
| **@builderbot/provider-meta**       | ^1.2.2      | WhatsApp provider using Baileys library.           |
| **dotenv**                          | ^16.0.0     | Loads environment variables from `.env` file.      |
| **typescript**                      | ^5.3.0      | TypeScript support for the project.                |


## License

This project is licensed under the MIT License.

## Autor

[Daniel Reyes](mailto:dangrereyes@gmail.com)

## Credits

[Builderbot](https://www.builderbot.app/)