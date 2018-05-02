# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Please go inside hdfob-wysiwyg folder and write "npm install"
* Please create a bundle file by typing "npm run dev"
* To run the server type command "node server/server.js"
* On browser type "localhost:5000" this will open front page.
* Inorder to run secure server on localhost run it on port - "https://localhost:3000


## How to run SSL localhost 

* Type in this command in root directory "openssl req -x509 -newkey rsa:2048 -keyout    key.pem -out cert.pem -days XXX".
* You will be asked some question after that answer them as per the need.
* When they ask you about CommomName - type "localhost"
* When they ask you about passphare - give a name which you will later pass it in       server.js file as done by me.
* Two files will be generated after this process.
* Rest of the code in already present in server.js file
* Credential for the site is username : harryanddavid and password:harryanddavid@123
 

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
