import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createCharactersQueryClient } from "./data/characters-query";
import { CharacterListRoute } from "./character-list-route";
import { Shell } from "./shell";

const applicationQueryClient = createCharactersQueryClient();

interface AppProps {
  readonly queryClient?: QueryClient;
}

export function App({ queryClient = applicationQueryClient }: AppProps = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Shell>
                <CharacterListRoute />
              </Shell>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
