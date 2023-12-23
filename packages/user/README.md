# Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped.

This application serves as the frontend for our monolithic application.

## Prerequisites

Firstly, create a `.env.local` file from a copy of `.env.example`. This will house the configuration for the project.

This project depends on multiple AWS infrastructures to be configured, and you will need to fill in these key details to communicate with AWS Lex:

````env
...
AWS_PROFILE=
AWS_REGION=
BOT_ID=
BOT_ALIAS_ID=
BOT_LOCALE_ID=
...

## Getting Started

Once the [.env.local](.env.local) file has been configured you can start the application with

```bash
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) and you should be greeted with the front end

## Bot Messages

AWS Lex bot returns messages as generic strings. To make the application more robust, we make use of the xml format to send the message and options for each response from the bot.

An example of a response would be like:

```xml
<root>
	<messages>Nice to meet you {Name}</messages>
	<messages>What would you like to do today?</messages>
	<options>
		<key>Raise An Incident</key>
		<value>Raise An Incident</value>
	</options>
</root>
```

This response will then be converted to JSON and rendered appropriately:

```json
{
  "messages": ["Nice to meet you Dami", "What would you like to do today?"],
  "options": [
    {
      "key": ["Raise An Incident"],
      "value": ["Raise An Incident"]
    }
  ]
}
```
