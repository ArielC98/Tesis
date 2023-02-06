import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { updatePassword } from '../data/password';
import swal from 'sweetalert';

const SettingsPage: React.FC = () => {

  const [passwd, setPasswd] = useState("");
  const [passwdConf, setPasswdConf] = useState("");
  const [present, dismiss] = useIonLoading();
  

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  
  const handlePasswordChange = async e => {
    present({
      message: "Un momento..."
    })  
    const confirmation =  await updatePassword(passwd, passwdConf);
    console.log(confirmation);
    setPasswd("");
    setPasswdConf("");
    dismiss();
    swal({ text:confirmation, icon:"info"})
      
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
            <IonLabel position='stacked'>Contraseña nueva</IonLabel>
            <IonInput  value = {passwd} onIonChange={e => setPasswd(e.detail.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Confirmar contraseña</IonLabel>
            <IonInput  value = {passwdConf} onIonChange={e => setPasswdConf(e.detail.value)}></IonInput>
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
