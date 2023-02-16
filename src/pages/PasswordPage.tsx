import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import swal from 'sweetalert';




const PasswordPage: React.FC = () => {
  
  const [identification, setIdentification] = useState("");
  const [present, dismiss] = useIonLoading();

  async function handlePasswordReset (id : string){
    console.log(id);
    present({
      message:"Cargando"
    })
    return await fetch('https://sismds.herokuapp.com/api/forgot-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
        },
        body: JSON.stringify({identification:id})
    })
        .then(data => data.json()).then(response => {swal({ text:response.message, icon:"info"});dismiss()})
        
  }

  //Si no es verdadera retorna el contenido de la pagina de inicio de sesion
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='Volver' defaultHref="/login"/>
          </IonButtons>
          <IonTitle>Recuperar contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size='6'>
              <IonImg src='../assets/icon/logo.png'/>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>Identificación</IonLabel>
            <IonInput type='text' onIonChange={e => setIdentification(e.detail.value)}/>
          </IonItem>
          
        </IonList>
        <IonButton disabled = {identification === ""} className='ion-margin-top' expand='block' onClick={() => handlePasswordReset(identification)
        }>Enviar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PasswordPage;


