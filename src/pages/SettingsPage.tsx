import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

const SettingsPage: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
          <IonButtons slot='start'>
            <IonBackButton defaultHref="/my/dashboard"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines='none'>
          <IonLabel><h2>Cambio de contraseña</h2></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Contraseña actual</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Contraseña nueva</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonRow>
            <IonCol></IonCol>
            <IonCol><IonButton>Cambiar</IonButton></IonCol>
            <IonCol></IonCol>
          </IonRow>
          </IonList>
          <IonList>
          <IonItem>
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonItem>
          
            <IonRow>
              <IonCol></IonCol>
              <IonCol><IonButton color="medium" onClick={handleLogout}>Cerrar Sesión</IonButton></IonCol>
              <IonCol></IonCol>
            </IonRow>
          
        
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
