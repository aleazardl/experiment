let fs = require('fs');
let path = require('path');
let process = require("process");

let distdir = './dist';
let patterns = [
  {
    toreplace: /srcset="\/assets/g,
    replaced: 'srcset="./assets'
  },
  {
    toreplace: /src="\/assets/g,
    replaced: 'src="./assets'
  },
  {
    toreplace: /href="\/assets/g,
    replaced: 'href="./assets'
  }
];


fs.readdir(distdir, function(err, files){
  if(err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    
    if(path.extname(file) == '.html') {
      fs.readFile(distdir + '/' +file, 'utf8', function (err,data) {
        if(err) {
          console.log('File:' + file + 'cannot be read');
          process.exit(1);
        }

        //let tmpfile = data.replace(/src="\//g, 'src="./');
        //tmpfile = tmpfile.replace(/href="\//g, 'href="./');
        
        let tmpfile = data;
        
        patterns.forEach(element => {
          tmpfile = tmpfile.replace(element['toreplace'], element['replaced']);
          // console.log(tmpfile);
          // console.log(element['toreplace']);
        });
        
        fs.writeFile(distdir + '/' +file, tmpfile, 'utf8', function (err) {
          if(err) return console.log(err); else console.log('Replaced html static urls')
        });
      });
    }
  });
});
