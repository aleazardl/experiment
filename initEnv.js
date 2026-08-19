const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question, defaultValue = '') => new Promise((resolve) => {
  rl.question(`${question} (${defaultValue}): `, (answer) => {
    resolve(answer || defaultValue);
  });
});

const writeEnvFile = (envValues) => {
  let envContent = ``;
  for (const [key, value] of Object.entries(envValues)) {
    console.log(`${key}: ${value}`);
    envContent = envContent + `${key}=${value}\n`;
  }  

  fs.writeFileSync('.env', envContent);
  console.log('.env file has is now created');
};

const checkEnvFileExists = () => fs.existsSync('.env');

const sanitizeAndConvertSpaces = (str) => {
  // Replace all non-alphanumeric characters with underscores
  let sanitizedStr = str.replace(/[^a-z0-9]+/gi, '_');
  
  // Replace spaces with underscores
  sanitizedStr = sanitizedStr.replace(/ /g, '_');
  
  return sanitizedStr;
}

const initializeEnv = async () => {
  try {
    if (checkEnvFileExists()) {
      console.log('.env file already exists, skipping initialization.');
      rl.close();
      return;
    }

    let envValues = [];

    // Project Name
    while(!envValues['PROJECT_NAME']) {
      envValues['PROJECT_NAME'] = await askQuestion('Enter project name:', '');
    }
    envValues['PROJECT_NAME'] = sanitizeAndConvertSpaces(envValues['PROJECT_NAME']);

    let wpEnvs = await askQuestion('Initialize WP Credentials? (Y/n) (Y - input values manually, n - use default config)', '');

    if(wpEnvs == 'Y' || wpEnvs == 'y' || wpEnvs == 'yes') {
      // Service Versions
      envValues['MYSQL_VERSION'] = await askQuestion('Mysql version', 'latest');
      envValues['WORDPRESS_VERSION'] = await askQuestion('Wordpress version', 'latest-apache');
      envValues['PHPMYADMIN_VERSION'] = await askQuestion('PhpMyAdmin version', 'latest');

      // MYSQL Config
      envValues['MYSQL_ROOT_PASSWORD'] = await askQuestion('Mysql root password', 'password');
      envValues['MYSQL_DATABASE'] = await askQuestion('Mysql database name', 'wordpress_template');

      // WP Settings
      envValues['WORDPRESS_PORT'] = '8000';
      envValues['WORDPRESS_LOCALE'] = 'ja';
      envValues['WORDPRESS_TITLE'] = await askQuestion('Enter wordpress title', envValues['PROJECT_NAME']);
      envValues['WORDPRESS_USERNAME'] = await askQuestion('Enter wordpress username', 'admin');
      envValues['WORDPRESS_PASSWORD'] = await askQuestion('Enter wordpress password', 'password');
      envValues['WORDPRESS_EMAIL'] = await askQuestion('Enter wordpress email', 'wordpresstemplate@info.com');
      envValues['WORDPRESS_ENV'] = 'dev';
      envValues['WORDPRESS_DEBUG'] = 1;
    }
    else {
      // Service Versions
      envValues['MYSQL_VERSION'] = 'latest';
      envValues['WORDPRESS_VERSION'] = 'latest-apache';
      envValues['PHPMYADMIN_VERSION'] = 'latest';

      // MYSQL Config
      envValues['MYSQL_ROOT_PASSWORD'] = 'password';
      envValues['MYSQL_DATABASE'] = 'wordpress_template';

      // WP Settings
      envValues['WORDPRESS_PORT'] = '8000';
      envValues['WORDPRESS_LOCALE'] = 'ja';
      envValues['WORDPRESS_TITLE'] = envValues['PROJECT_NAME'];
      envValues['WORDPRESS_USERNAME'] = 'admin';
      envValues['WORDPRESS_PASSWORD'] = 'password';
      envValues['WORDPRESS_EMAIL'] = 'wordpresstemplate@info.com';
      envValues['WORDPRESS_ENV'] = 'dev';
      envValues['WORDPRESS_DEBUG'] = 1;
    }

    writeEnvFile(envValues);
    
    rl.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

initializeEnv();