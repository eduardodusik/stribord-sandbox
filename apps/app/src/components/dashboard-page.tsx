import { IonButton, IonCol, IonContent, IonGrid, IonLoading, IonRow } from "@ionic/react";
import React, { Suspense, useState } from "react";
import { Bar, BarChart, Legend, XAxis } from "recharts";
import { DashboardCardSlot } from '../extension-points/dashboard-card-extension';
import { useSlot } from "@stribord/react-client";

import { salesMtd, salesYtd } from "../mock-data/sales";
import { FilterBy } from "../types/filters";

import { DashboardCard } from "./dashboard-card";

export const DashboardPage = () => {
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.YTD);
  const DashboardCardSlot = useSlot<DashboardCardSlot>('dashboard-card', true);

  return (
    <IonContent className="ion-padding">
      <h1 style={{ fontWeight: "bold" }}>Dashboard</h1>
      <IonGrid className="ion-no-padding ion-margin-top">
        <IonRow style={{ gap: 16 }}>
          <h5>Filter by:</h5>
          <IonButton
            shape="round"
            fill={filterBy === FilterBy.YTD ? "solid" : "outline"}
            onClick={() => setFilterBy(FilterBy.YTD)}
          >
            YTD
          </IonButton>
          <IonButton
            shape="round"
            fill={filterBy === FilterBy.MTD ? "solid" : "outline"}
            onClick={() => setFilterBy(FilterBy.MTD)}
          >
            MTD
          </IonButton>
        </IonRow>
      </IonGrid>
      <IonGrid className="ion-no-padding ion-margin-top">
        <IonRow style={{ gap: 16 }}>
          <IonCol size="12" sizeMd="4">
            <DashboardCard title={"Sales in " + filterBy}>
              <BarChart
                width={300}
                height={360}
                data={filterBy === FilterBy.YTD ? salesYtd : salesMtd}
              >
                <Bar dataKey="value" fill="#8884d8" />
                <XAxis dataKey="date" />
                <Legend />
              </BarChart>
            </DashboardCard>
          </IonCol>
          
          <Suspense fallback={<IonLoading />}>
            <DashboardCardSlot />
          </Suspense>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
