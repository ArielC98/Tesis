import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import { loginUser, useAuth} from '../data/auth';
import "@ionic/react/css/core.css"
import "../theme/variables.css"



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
      message: "Cargando..."
    })
    loginUser({
      identification,
      password
    }).then(response => {
      console.log(response);
      
      if ('access_token' in response.data) {
        dismiss();
        localStorage.setItem('access_token', response.data['access_token']);
        localStorage.setItem('user', JSON.stringify(response.data['user']));
        
        swal("Bienvenido", response.message, "success", {
          timer: 2000,
          buttons:{}
        })
          
        onLogin(response.data.user.role);
      } 
    }).catch(error => {swal("Error", "Usuario o contraseña incorrecta", "error"); dismiss()})
  
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
              <IonImg src='../assets/icon/logo.png'/>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem>
            <IonLabel position='floating'><h2>Identificación</h2></IonLabel>
            <IonInput  type='number' onIonChange={e => setIdentification(e.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Contraseña</IonLabel>
            <IonInput  type='password' onIonChange={e => setPassword(e.detail.value)}/>
          </IonItem>
          <IonItem  lines='none' routerLink="/password" className='ion-text-center ion-margin-vertical' >
              <IonLabel><h4>¿Olvidó su contraseña?</h4></IonLabel>
          </IonItem>
        </IonList>
        <IonButton disabled = {identification === "" || password === ""} className='ion-margin-vertical' expand='block' onClick={handleSubmit}color="primary">Ingresar</IonButton>
      
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


