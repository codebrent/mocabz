import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import NotFound from "./not-found";

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ "./homepage"),
  loading: () => null,
  modules: ["homepage"]
});

const Wordfind = Loadable({
  loader: () => import(/* webpackChunkName: "wordfind" */ "./wordfind"),
  loading: () => null,
  modules: ["wordfind"]
});

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/wordfind" component={Wordfind} />
    <Route component={NotFound} />
  </Switch>
);
