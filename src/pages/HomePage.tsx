import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../data/auth';
import { studentGrades } from '../data/grades';
import { teacherSubjects } from '../data/subjects';


const HomePage: React.FC = () => {
  const {role} = useAuth();
  const [subjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [academicPeriod, setAcademicPeriod] = useState("1");
  
  

  useEffect(() => {


    
    if(role === "teacher"){
      teacherSubjects().then((response) => response.subjects.map((subject) => {subjectList.push(subject);setIsLoading(false);}));
    
      console.log(subjectList);
    
    }
    else{
      studentGrades(academicPeriod).then(response => response.grades.map((subject) => {subjectList.push(subject);setIsLoading(false);})
      )
    }
    
    
  },[]);
  
  if(isLoading){
    return <IonLoading isOpen/>
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTitle>Materias</IonTitle>
        <IonList className='ion-margin-top'>
          {role==="teacher"? //Si el rol es de profesor
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
            ): //Si el rol es de estudiante
            subjectList.map((subject)=>
              <IonItem 
                button 
                detail
                key={subject.id}
                routerLink={`/my/subjects/${subject.subject_id}`}
                >
                  
                  <IonLabel>
                    <h2>{subject.subject_name}</h2>
                  
                  </IonLabel>
                </IonItem>
            )
          }
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
