import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { createPDF } from '../data/report';



const ReportPage: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reporte</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Pagina de reporte</h1>

          <IonButton onClick ={createPDF}>Download</IonButton>
          

      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
