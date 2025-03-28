import { render } from 'preact';
import App from './App.tsx';
import './index.css';

const dom = document.getElementById('app');

if (dom) render(<App />, dom);
