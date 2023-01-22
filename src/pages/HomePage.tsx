import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../data/auth';
import { subjects } from '../data/subjects';
import { teacherSubjects } from '../data/subjects';


const HomePage: React.FC = () => {
  const {role} = useAuth();
  const [subjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  
  

  
  async function handleSubjects(){
    await fetch('https://sismds.herokuapp.com/api/teacher/mySubjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    })
    .then(response => response.json()).then((response) => response.data).then((response) => response.subjects.map((subject) => subjectList.push(subject)));
    setIsLoading(false);
  }
  
  

  useEffect(() => {
  
    handleSubjects();
    console.log(subjectList);
    
    
    
  },[]);
  
  if(isLoading){
    return <IonLoading isOpen/>
  }
  

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
          {
          subjectList.map((subject)=>
            <IonItem 
              button 
              detail
              key={subject.id}
              routerLink={`/my/subjects/${subject.id}`}
              >
                
                <IonLabel>
                  <h3>{subject.name}</h3>
                  <p>{subject.course + " " + subject.parallel}</p>
                </IonLabel>
              </IonItem>
          )}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
