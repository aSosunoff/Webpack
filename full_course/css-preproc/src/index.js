import * as $ from 'jquery';

import Post from '@model/Post.js';

import '@style/styles.scss';

import json from '@assets/my_json.json';
import WebpackLogo from '@assets/logo.png';
import xml from '@assets/data.xml';
import csv from '@assets/data.csv';


const post = new Post('Webpack Post Title', WebpackLogo);
$('pre').addClass('code').html(post.toString());

console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);