import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageNotFound } from "../error/page-not-found";
import { AcceptToken } from "../auth/token";
import { Commits } from "../pages/commits/commits";
import { SavedCommits } from "../pages/saved-commits/saved-commits";

export function StaticRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={AcceptToken} />
      <Route exact path="/commits" component={Commits} />
      <Route exact path="/commits/saved" component={SavedCommits} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
