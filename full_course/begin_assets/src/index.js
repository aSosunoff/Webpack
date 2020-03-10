import Post from './Post';

import './styles/styles.css';

import json from './assets/my_json.json';

import WebpackLogo from './assets/logo.png';

const post = new Post('Webpack Post Title', WebpackLogo);

console.log(post.toString());

console.log(json);