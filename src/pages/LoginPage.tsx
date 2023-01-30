import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { loginUser, useAuth} from '../data/auth';


interface Props{
  onLogin: (string) => void,
}

const LoginPage: React.FC<Props> = ({onLogin}) => {

  //Si la propiedad loggedIn es verdadera retornara la ruta de la pagina principal
  const {loggedIn} = useAuth();
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const [present, dismiss] = useIonLoading();
  const [isLoading, setIsLoading] = useState(false);
  


  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    present({
      message: "cargando"
    })
    loginUser({
      identification,
      password
    }).then(response => {

      if ('access_token' in response.data) {
        dismiss();
        localStorage.setItem('access_token', response.data['access_token']);
        localStorage.setItem('user', JSON.stringify(response.data['user']));
        
        swal("Success", response.message, "success", {
          timer: 2000,
          buttons:{}
        })
          
        onLogin(response.data.user.role);
      } 
    }).catch(error => swal("Error", "Usuario o contraseña incorrecta", "error"))
  
  }

  


  
  if(loggedIn){
    return <Redirect to ='/my/dashboard'/>
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
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Identificación</IonLabel>
            <IonInput type='text' onIonChange={e => setIdentification(e.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Contraseña</IonLabel>
            <IonInput type='text' onIonChange={e => setPassword(e.detail.value)}/>
          </IonItem>
        </IonList>
        <IonButton expand='block' onClick={handleSubmit}>Login</IonButton>
        <IonItem routerLink="/password">
            <IonLabel>¿Olvidó su contraseña?</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


