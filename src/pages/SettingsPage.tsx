import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

const SettingsPage: React.FC = () => {

  const [passwd, setPasswd] = useState("");
  const [passwdConf, setPasswdConf] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  
  const handlePasswordChange = async () => {
      return await fetch('https://sismds.herokuapp.com/api/teacher/update-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("access_token")
          },
          body: JSON.stringify({
            password:passwd,
            password_confirmation:passwdConf
          })
      })
      .then(response => response.json()).then(response => console.log(response)
      )
      console.log(passwd, passwdConf);
      
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
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
            <IonInput  onIonChange={e => setPasswd(e.detail.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Confirmar contraseña</IonLabel>
            <IonInput  onIonChange={e => setPasswdConf(e.detail.value)}></IonInput>
          </IonItem>
          <IonRow>
            <IonCol></IonCol>
            <IonCol><IonButton onClick={handlePasswordChange}>Cambiar</IonButton></IonCol>
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
