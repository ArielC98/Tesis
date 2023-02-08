import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';


const LinksPage: React.FC = () => {

 


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enlaces </IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          
          Links page

        
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default LinksPage;
