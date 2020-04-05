import React from 'react';
import Contents from './Contents.jsx';

function NavBar() {
  return React.createElement("nav", null, React.createElement("a", {
    href: "/"
  }, "Home"), ' | ', React.createElement("a", {
    href: "/#/issues"
  }, "Product List"), ' | ', React.createElement("a", {
    href: "/#/report"
  }, "Add Product"));
}

export default function Page() {
  return React.createElement("div", null, React.createElement(NavBar, null), React.createElement(Contents, null));
}