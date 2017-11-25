# SE Workshop - London Dec 2017

In order to get make the most effective use of the time we have there are a number of pre-requisits to make sure that you are able to participate fully in the workshop. We will cover 2 scenarios in 2 different languages therefore you need these setup on your laptop before hand along with some basic tooling, we will cover:

* Proxy Calls with PHP
* Websockets with Node.js

## Basic VAPI Tooling

### Nexmo CLI Tool
You will require the nexmo cli tool installed on your laptop please follow the instructions at [https://github.com/nexmo/nexmo-cli] to install it.

to confirm that you have successully installed and setup the tool run:
`nexmo balance` in your terminal/command prompt


### Git
Mac users will have git already installed,

Windows users goto [https://git-scm.com/download/win] and run the installer that is downloaded

You can then confirm that you have git installed by typing `git --version`

### ngrok
VAPI uses webhooks therefore you will need to be able to expose the local development servers on your laptop to the internet, the best tool for doing this is ngrok, you need to signup for an account and download the tool from [https://ngrok.com/]

You will also need to signup to a paid plan hte basic plan is more than sufficient for what we will be doing but you will each need your own subscription its $60 per year and should be a reasonable business expense, the free tier is not suitable as you get a new hostname each time you connect and this wastes far to much time reconfiguring applications.

Once you have signed up to the paid plan you need to configre a reserved domain name at [https://dashboard.ngrok.com/reserved] we reccomend something like your name eg `janedoe.ngrok.io` You can leave the region as United States.

Get your authtoken from [https://dashboard.ngrok.com/auth] and configure it on your machine with the instructions on that page.

Test that your ngrok configuration is correct run:

`ngrok http 8000 --subdomain janedoe` Replace janedoe with the name of your subdomain 

you should see a screen like this:
[ngroksetupok]: https://github.com/nexmo/SEWorkshop/raw/images/ngrsetupok.png 

### Homebrew (Mac users only)

Homebrew package manager will be required to install some tools, if you don't already have brew installed then do so by running:
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`


### PHP

Mac users: should have PHP installed by default, you will need at least version 5.6 (Bundled with OSX 10.12 or later)

You can check your version by running `php -v` in the terminal.

If you have earlier than 5.6 then update to a newer version (we reccomend 7.1) using homebew as follows:

```
brew tap homebrew/dupes
brew tap homebrew/php
brew install php71
```

You will also need composer the PHP package manager, install this with:
`brew install composer`


Windows users:
Goto [http://windows.php.net/download] and download the latest version (7.1) Select the `VC14 x64 Thread Safe` build and download the zip file.

You will also need the Visual Studio C++ Redistributabel VS2015 Installed from [https://www.microsoft.com/en-us/download/details.aspx?id=48145] Download and run the x64 version

Extract the php zip to `C:\php` (reccomended path)

Open System Properties, then click on the Advanced Tab
Click on the `Environment Variables` Button
Edit the `Path` User Variable
Add `C:\php`

If all the above has been completed successfuly you can run `php -v` at the command prompt and you should see confirmation of version 7.1

You will also need composer the php package manager,
Goto [http://getcomposer.org/download] To download and run the Composer_setup.exe

### Node.js

You should already have Node.js installed as part of the installation of the Nexmo CLI, if not goto 
[https://nodejs.org/en/download/]

Download & run the relevent installer from there

## Setup a test Nexmo Applicaiton

First of all clone this repository into a new folder with the command
`git clone https://github.com/nexmo-community/voice_workshop`

Then cd into that directory
`cd voice_workshop`

Now you can create a nexmo voice application that will be used with the sample code here, using the CLI tool run:

`nexmo ac "Voice Workshop" https://[YOURNAME].ngrok.io/ncco https://[YOURNAME].ngrok.io/event --keyfile private.key`
Make a note of the app id that is returned.

Next purchase a number (bear in mind the workshop is in London so you might want a UK number to avoid international call charges)

Find a number 
`nexmo number:search GB --voice`

Buy the Number
`nexmo number:buy [NUMBER]`

Link that number to your applicaiton
`nexmo link:app [NUMBER] [APP ID]`

### Test the PHP App

Switch into the PHP Simple Talk app
`cd PHP_SimpleTalk`

Run the server
`php -S localhost:8000 -t ./`

In a new terminal window
Launch ngrok  if its not still running from earlier:
`ngrok http 8000 --subdomain [YOUR NAME]`


Now open a browser and goto `https:\\[YOURNAME].ngrok.io` You should see a page that says "PHP Simple Talk"

If thats worked then your app is running on the web :D

Now call the number you purchased and linked earler and you should hear "Hello World" you should also see the Call events being logged in the PHP applications terminal window.

Congratulations Your PHP Environment is now up and running.

### Test the Node App

Stop the PHP Applicaton, you can leave the ngrok window running

move into the Node application folder
`cd ../Node_SimpleTalk`

Start the node app

`node ./server.js` 

Again open a browser and goto `https:\\[YOURNAME].ngrok.io` You should see a page that says "Node Simple Talk"


Now call the number you purchased and linked earler and you should hear "Hello World" you should also see the Call events being logged in the Node applications terminal window.

Congratulations your Node Environment is now up and running.






