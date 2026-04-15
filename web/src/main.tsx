import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import { client } from "./graphql/client.ts";
import { RoutesComponent } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Toaster richColors />
      <RoutesComponent />
    </BrowserRouter>
  </ApolloProvider>,
);
