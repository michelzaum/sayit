import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { client } from "./graphql/client.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);
