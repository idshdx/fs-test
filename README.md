#Full Stack Dev Test
Express + Vue

###### Check each READ.ME for the related codebases

[Client docs](./fe/README.md)

[Server docs](./be/README.md)

#### Getting started

If you want to run the project from *here* as in root path of repo:
+ `npm install` - install server libs
+ `npm install-all` - installs all libs(if you want to run the client separate)
+ `start` - seeds data and starts the server(which has the *latest* client build)
+ `start-no-seed` - starts the server with no data seed
+ `start-fe` - starts only the client
(or use yarn)

Tips:
+ If you do changes at the client and want it served from the Express server, dont forget to build again.
Building the client will *first remove the existing build* and then move the assets in the plublic folder

Tested on Ubuntu Server, Mint and Windows 10, node 10,11,12, npm 6+, yarn, MongoDB 4,5
