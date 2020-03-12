import Post from '@model/Post.js';

import '@style/styles.scss';

import json from '@assets/my_json.json';
import WebpackLogo from '@assets/logo.png';
import xml from '@assets/data.xml';
import csv from '@assets/data.csv';

import '@/babel.js';


const post = new Post('Webpack Post Title', WebpackLogo);
console.log(post.toString());

console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);

import React from 'react';
import {render} from 'react-dom';

const App = () => (
    <div className="container">
		<h1>Webpack Course</h1>
		<hr/>
		<div className="logo"></div>
		<hr/>
		<pre>

		</pre>
	</div>
);

render(<App/>, document.getElementById('app'));