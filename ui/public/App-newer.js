/* eslint linebreak-style: ["error", "windows"] */

/* eslint "react/react-in-jsx-scope": "off" */

/* globals React ReactDOM */

/* eslint "react/jsx-no-undef": "off" */

/* eslint "react/no-multi-comp": "off" */

/* eslint "no-alert": "off" */

/* eslint max-classes-per-file: off */
import ProductList from './ProductList.jsx';
const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));