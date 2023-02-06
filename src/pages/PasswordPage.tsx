import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import swal from 'sweetalert';




const PasswordPage: React.FC = () => {
  
  const [identification, setIdentification] = useState("");


  async function handlePasswordReset (id : string){
    console.log(id);
    
    return await fetch('https://sismds.herokuapp.com/api/forgot-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({identification:id})
    })
        .then(data => data.json()).then(response => console.log(response)
        )
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
        <IonButton className='ion-margin-top' expand='block' onClick={e => handlePasswordReset(identification)
        }>Enviar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PasswordPage;


