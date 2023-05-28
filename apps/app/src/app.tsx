import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { AppLayout } from "./components/layout";
import { AppRoutes } from "./routes";
import {
  StribordDeployment,
  StribordHost,
  HostConfig,
  WebpackLoader,
  LocalBackend,
} from "@stribord/react-client";

import manifest from "./manifest";

setupIonicReact({
  mode: "ios",
});

const stribordConfig: HostConfig = {
  backend: new LocalBackend(),
  loader: new WebpackLoader(),
  appManifest: manifest,
};

function App() {
  return (
    <StribordHost config={stribordConfig}>
      <StribordDeployment id="@stribord-examples/app:test">
        <IonReactRouter>
          <IonApp>
            <AppLayout>
              <IonRouterOutlet style={{ marginTop: 64 }}>
                <AppRoutes />
              </IonRouterOutlet>
            </AppLayout>
          </IonApp>
        </IonReactRouter>
      </StribordDeployment>
    </StribordHost>
  );
}

export default App;
