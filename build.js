const fs = require('fs');
require('dotenv').config();

/*
Firebase ENV inject helper
*/
function injectFirebase(content){

return content

.replace(
/__FIREBASE_API_KEY__/g,
process.env.FIREBASE_API_KEY || ''
)

.replace(
/__FIREBASE_AUTH_DOMAIN__/g,
process.env.FIREBASE_AUTH_DOMAIN || ''
)

.replace(
/__FIREBASE_DATABASE_URL__/g,
process.env.FIREBASE_DATABASE_URL || ''
)

.replace(
/__FIREBASE_PROJECT_ID__/g,
process.env.FIREBASE_PROJECT_ID || ''

);

}

/*
Create dist
*/
fs.mkdirSync(
'dist',
{
recursive:true
}
);

/*
Build HTML
*/
if(
fs.existsSync(
'index.html'
)
){

let html=

fs.readFileSync(
'index.html',
'utf8'
);

html=

injectFirebase(
html
);

fs.writeFileSync(
'dist/index.html',
html
);

}

/*
Build JS
*/
if(
fs.existsSync(
'app.js'
)
){

let js=

fs.readFileSync(
'app.js',
'utf8'
);

js=

injectFirebase(
js
);

fs.writeFileSync(
'dist/app.js',
js
);

}

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
Optional assets
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