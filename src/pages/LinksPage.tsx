import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,  IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import Joyride, { Step } from 'react-joyride';
import { useAuth } from '../data/auth';
import {Browser} from '@capacitor/browser';
import {CallNumber} from 'capacitor-call-number'

interface State{
  run: boolean;
  steps: Step[];
}

const LinksPage: React.FC = () => {

  const {tutorial} = useAuth();
  const [{steps}] = useState<State>({
    run:true,
    steps:[
        {
            target: 'body',
            placement:'center',
            content: <h3>Bienvenido/a a la sección de enlaces</h3>,
            showProgress:true,
            locale:{next:"Siguiente"}
        },
        {
          target: '.step15',
          content: "Aquí encontrará todo lo referente a información de contacto con la institución",
          showProgress:true,
          locale:{next:"Siguiente", last:"Final"}
      }
    
    ]
})



  return (
    <IonPage>
      <Joyride 
        steps={steps} 
        continuous
        run={tutorial && !(localStorage.getItem("repeatLinks") ==="no")}
        callback={()=>{localStorage.setItem("repeatLinks","no")}}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacto </IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          
        

        <IonCard>
      <IonCardHeader>
        <IonCardTitle>Enlaces</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem button onClick={() => Browser.open({url:"https://www.facebook.com/I.E.Migueldesantiago/"})}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="../assets/icon/facebook.png" />
            </IonThumbnail>
            <IonLabel>Página de Facebook</IonLabel>
          </IonItem>

          <IonItem button onClick={() => Browser.open({url:"https://sismds.vercel.app"})}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="../assets/icon/logo.png" />
            </IonThumbnail>
            <IonLabel>Sistema Web</IonLabel>
          </IonItem>

          <IonItem button onClick={() => Browser.open({url:"https://www.google.com/maps/place/Instituci%C3%B3n+Educativa+Fiscal+%22Miguel+de+Santiago%22/@-0.2802861,-78.5461629,20z/data=!4m6!3m5!1s0x91d598bdcbc21523:0x543f64d73c0a15f0!8m2!3d-0.2807232!4d-78.5459362!16s%2Fg%2F1pzw8x13y"})}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="../assets/icon/googleMaps.png" />
            </IonThumbnail>
            <IonLabel>Dirección</IonLabel>
          </IonItem>

          <IonItem lines="none" button onClick={() => CallNumber.call({number:"022634867",bypassAppChooser:true})}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="../assets/icon/phone.png" />
            </IonThumbnail>
            <IonLabel>Teléfono 1</IonLabel>
          </IonItem>
          <IonItem lines="none" button onClick={() => CallNumber.call({number:"022622725",bypassAppChooser:true})}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="../assets/icon/phone.png" />
            </IonThumbnail>
            <IonLabel>Teléfono 2</IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LinksPage;
