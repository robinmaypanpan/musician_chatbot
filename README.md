# Musician Chatbot
A Telegram bot that remembers music you post to a chatroom and reposts daily/weekly digests

### Technologies in use
* Node.js server
* MongoDB database
* Telegram Bot API
* Heroku

# Getting Started
You want to help out with this app?  OMG, that's so cool!  Here's what you need to know.

## Setup
There's a few pieces parts you'll need to get setup to make things run.

### MongoDB
1. Install a mongodb server from [MongoDB](https://www.mongodb.com/download-center#community)
2. Create a folder *data* underneath the directory you cloned this repository to
3. You can start the database using <pre>npm run db</pre> or any other method you like

### Telegram Bot
1. Use the instructions on [Telegram](https://core.telegram.org/bots#6-botfather) to create a new bot to test with.
2. Turn off privacy mode on your test bot so it can see messages in groups
3. If you add your test bot to a supergroup, be sure to set it to an admin so it can see messages in that group.

### Environment variables
Create a .env file with the following values.
<pre>
NODE_ENV=development
BOT_KEY=YOUR_BOT_KEY_HERE
MONGODB_URI=mongodb://localhost:27017/musicianbotdb
MONGODB_DB=musicianbotdb
</pre>

Replace the values in this sample file with the values that are appropriate for your setup.

### Running the bot
Once your bot is setup and your database is running, just type <pre>npm run dev</pre> to connect to your bot and get moving!  This will automatically pull in environment variables you put in your .env file.

## Managing Git
It is recommended that you do all of your development in the dev branch, and send pull requests to both master and dev master when you have something ready to push.

It is important to note that *ANYTHING* posted to master will be deployed to heroku momentarilly, so only fully tested adn verified code should be there.
