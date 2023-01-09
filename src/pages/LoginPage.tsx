import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';


interface Props{
  loggedIn: boolean,
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({loggedIn, onLogin}) => {

  //Si la propiedad loggedIn es verdadera retornara la ruta de la pagina principal
  if(loggedIn){
    return <Redirect to ='/entries'/>
  }

  //Si no es verdadera retorna el contenido de la pagina de inicio de sesion
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size='6'>
              <IonImg src='../assets/icon/logo.jpg'/>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonButton expand='block' onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
