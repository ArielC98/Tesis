import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import Joyride, { Step } from 'react-joyride';
import { useAuth } from '../data/auth';

interface State{
  run: boolean;
  steps: Step[];
}

const LinksPage: React.FC = () => {

  const {tutorial} = useAuth();
  const [{run,steps}, setSteps] = useState<State>({
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
          <IonTitle>Enlaces </IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          
          <IonLabel className='ion-text-center'><h1> Contacto con la institución </h1></IonLabel>
          
        <IonList class='step15'>

        <IonLabel><h2>Página de Facebook</h2></IonLabel>
          <IonItem>
            <a href='https://www.facebook.com/I.E.Migueldesantiago/'>I.E. Miguel de Santiago</a>
          </IonItem>

          <IonLabel><h2>Sistema web</h2></IonLabel>
          <IonItem>
            <a href='
iefmigueldesantiago.edu.ec'>iefmigueldesantiago.edu.ec</a>
          </IonItem>

          <IonLabel><h2>Correo electrónico</h2></IonLabel>
          <IonItem>
            <a href='cole_migueldesantiago@hotmail.com'>cole_migueldesantiago@hotmail.com</a>
          </IonItem>

          <IonLabel><h2>Dirección</h2></IonLabel>
          <IonItem>
            
            Borbón S29 , Quito, Ecuador
          </IonItem>
        
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default LinksPage;
