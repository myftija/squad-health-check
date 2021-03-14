import { navigate, useRoutes } from "hookrouter";
import React from "react";
import { Logo } from "./components/logo";
import { Landing } from "./scenes/landing";
import { Survey } from "./scenes/survey";
import { PageNotFound } from "./scenes/pageNotFound";

const routes = {
  "/": () => <Landing />,
  "/survey/:date": ({ date }) => <Survey date={date} />,
};

export const App = () => {
  return (
    <React.Fragment>
      <Logo onClick={() => navigate("/")} />
      {useRoutes(routes) || <PageNotFound />}
    </React.Fragment>
  );
};
