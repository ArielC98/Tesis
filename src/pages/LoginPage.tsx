import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import { loginUser, useAuth} from '../data/auth';



interface Props{
  onLogin: (string) => void,


}

const LoginPage: React.FC<Props> = ({onLogin}) => {
  
  

  //Si la propiedad loggedIn es verdadera retornara la ruta de la pagina principal
  const {loggedIn, role} = useAuth();
  console.log("Login Page",loggedIn);
  console.log("Role", role);
  
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  


const handleSubmit = async e => {
  e.preventDefault();
  const response = await loginUser({
    identification,
    password
  });

  
  if ('access_token' in response.data) {
    console.log(response.data);
    
    localStorage.setItem('access_token', response.data['access_token']);
    localStorage.setItem('user', JSON.stringify(response.data['user']));
    
    swal("Success", response.message, "success", {
      timer: 2000,
      buttons:{}
    })
    
    console.log("success", response.data.user.role);
    onLogin(response.data.user.role);
  } else {
    
    
    swal("Failed", response.message, "error");
    console.log(response.data.access_token);
    
  }

  
}

console.log("Loggedin 2",loggedIn);
  
  if(loggedIn){
    return <Redirect to ='/my/dashboard'/>
  }
console.log("Loggedin 3",loggedIn);


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
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


