import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import PDFFile from '../components/PDFFile';
import {PDFDownloadLink} from "@react-pdf/renderer";




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
        <PDFDownloadLink document={<PDFFile/>} fileName="Reporte">
          <IonButton>Download</IonButton>
        </PDFDownloadLink>

      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
