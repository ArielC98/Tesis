import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      
      <IonContent className="ion-padding">
        <IonText>Page not found</IonText>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
