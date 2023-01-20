import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useAuth } from '../data/auth';
import { subjects } from '../data/subjects';
import SubjectPage from './SubjectPage';


const HomePage: React.FC = () => {
  const {role} = useAuth();
  console.log("role ->",role);
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTitle>Materias</IonTitle>
        <IonList>
          {subjects.map((subject)=>
            <IonItem 
              button 
              key={subject.id}
              routerLink={`/my/subjects/${subject.id}`}
              >
                {subject.name + " " + subject.curso + " " + subject.paralelo}
              </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
