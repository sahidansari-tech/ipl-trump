const fs = require('fs');
require('dotenv').config();

/*
Read HTML
*/
let html =
fs.readFileSync(
'index.html',
'utf8'
);

/*
Inject Firebase ENV
*/
html = html

.replace(
'__FIREBASE_API_KEY__',
process.env.FIREBASE_API_KEY || ''
)

.replace(
'__FIREBASE_AUTH_DOMAIN__',
process.env.FIREBASE_AUTH_DOMAIN || ''
)

.replace(
'__FIREBASE_DATABASE_URL__',
process.env.FIREBASE_DATABASE_URL || ''
)

.replace(
'__FIREBASE_PROJECT_ID__',
process.env.FIREBASE_PROJECT_ID || ''
);

/*
Create dist folder
*/
fs.mkdirSync(
'dist',
{
recursive:true
}
);

/*
Write HTML
*/
fs.writeFileSync(
'dist/index.html',
html
);

/*
Copy CSS
*/
if(
fs.existsSync(
'style.css'
)
){

fs.copyFileSync(
'style.css',
'dist/style.css'
);

}

/*
Copy JS
*/
if(
fs.existsSync(
'app.js'
)
){

fs.copyFileSync(
'app.js',
'dist/app.js'
);

}

/*
Optional assets folder support
*/
if(
fs.existsSync(
'assets'
)
){

fs.cpSync(
'assets',
'dist/assets',
{
recursive:true
}
);

}

console.log(
'✅ Build complete'
);

console.log(
'📦 Dist ready'
);