# UPWARD NEXT Boilerplate

Coding boilerplate using Gulp + PugJS + SASS + Typescript

## Update 010923
* add additional default configuration and css tools

* add header tag in layout.pug

* adjust docker theme folder creation. The config will now set the theme folder name in docker the same as the defined project name in .env file


## Requirements:
  > nodejs: >16.17.1
  > yarn: >1.22

## To install:
```yarn install```
or 
```npm install```

## To start the boilerplate:
```yarn dev```

## To Build:
```yarn build```


## Note

* NodeJS must be greater or equal than the said requirements. Take note that previous projects from webpack won't work when you upgrade your NodeJS version. You will have to upgrade and downgrade everytime you edit. You can install "nvm" if you want to use and switch between nodejs versions

* Everything is compiled in dist folder no need to upload outside of it. Even images and external JS are automatically compiled inside dist folder.

* when migrating from the old boilerplate you may need to change some directory paths in the .pug, .scss, or .ts files

* when migrating a site from the test server to local. You need to close and run the wp server again in docker to make any filechanges

* when using this boilerplate on a new project. run yarn install first before making the first commit




## Version 2 Added Features

* Strict checking on css and ts files

* linting will always run on build and dev, to check for existing errors

* pre-commit checking

* no url replace for dist.

* global folder for static assets

* changed from parcel bundler to gulp taskrunner

* add dockered wordpress to use in local env
