import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';

const NotFound = () => React.createElement("h1", null, "Page Not Found");

export default function Contents() {
  return React.createElement(Switch, null, React.createElement(Redirect, {
    exact: true,
    from: "/",
    to: "/products"
  }), React.createElement(Route, {
    path: "/products",
    component: ProductsList
  }), React.createElement(Route, {
    path: "/addProduct",
    component: AddProduct
  }), React.createElement(Route, {
    component: NotFound
  }));
}