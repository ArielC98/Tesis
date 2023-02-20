import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../data/auth';
import {updatePassword} from '../data/password';
import swal from 'sweetalert';
import Joyride,{ Step } from 'react-joyride';

interface State{
  run: boolean;
  steps: Step[];
}


const SettingsPage: React.FC = () => {

  const [passwd, setPasswd] = useState("");
  const [passwdConf, setPasswdConf] = useState("");
  const [present, dismiss] = useIonLoading();
  const {tutorial} = useAuth();
  const [{run,steps}, setSteps] = useState<State>({
    run:true,
    steps:[
        {
            target: 'body',
            placement:'center',
            content: <h3>Bienvenido/a a la sección de ajustes</h3>,
            showProgress:true,
            locale:{next:"Siguiente"}
        },
        {
            target: '.step10',
            title:"Cambio de contraseña",
            content: 'Aquí podrá cambiar su contraseña en caso de ser necesario',
            showProgress:true,
            locale:{next:"Siguiente", back:"Anterior"}
        },
        {
            target: '.step11',
            content: 'Finalmente, puede cerrar su sesión cuando haya terminado de usar la aplicación',
            showProgress:true,
            locale:{next:"Siguiente", back:"Anterior", last:"Final"}
        }
      
    
    ]
})



  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("repeatHome");
    localStorage.removeItem("repeatLinks");
    localStorage.removeItem("repeatProfile");
    localStorage.removeItem("repeatReport");
    localStorage.removeItem("repeatSettings");
    localStorage.removeItem("repeatSubject");
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
      <Joyride  
        steps={steps} 
        continuous={true} 
        run={tutorial && !(localStorage.getItem("repeatSettings") ==="no")}
        callback={()=>{localStorage.setItem("repeatSettings","no")}}
        
        />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList class='step10'>
          <IonItem lines='none'>
          <IonLabel style={{fontWeight:"bold"}}><h1>Cambio de contraseña</h1></IonLabel>
          </IonItem>
          <IonItem lines='none' style={{marginBottom:-15}}>
            <IonLabel>La nueva contraseña debe tener:</IonLabel>
          </IonItem>
          <IonItem lines='none'>
            <ul>
              <li>Letras mayúsculas y minúsculas</li>
              <li>Al menos un número</li>
              <li>Un caracter especial (.,?*/) </li>
            </ul>
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
          <IonList class='step11'>
            <IonItem>
              <IonLabel><h1>Cerrar Sesión</h1></IonLabel>
            </IonItem>
          
            <IonRow >
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
