import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { studentsList } from '../data/students';
import { studentGrades } from '../data/grades';
import { updateGrades } from '../data/grades';


interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {

  const [students] = useState([]);
  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  const [actualStudent, setActualStudent] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([{}]);
  const [present, dismiss] = useIonLoading();


  


  useEffect(() => {
    
    studentsList(id).then((response) => {response.students.map((student) => {students.push(student)});setIsLoading(false);
    
    })
    
    
  },[]);

  async function handleGrades (studentId: string, subjectId: string) {
    
    present({
      message: 'Dismissing after 3 seconds...',
      duration: 3000
    })
    await studentGrades(studentId,subjectId).then(response =>{grades.push(response.grades[0]);grades.shift()});
    
    console.log(grades)

    setRowData([
      {descripcion: "Nota 1", puntaje: grades[0]["p1q1"]},
      {descripcion: "Nota 2", puntaje: grades[0]["p2q1"]},
      {descripcion: "Nota 3", puntaje: grades[0]["p3q1"]}
    ])
    
  }

  async function handleUpdate (studentId: string, subjectId: string) {
    
    const tempGrades = {
      p1q1:grades[0]["p1q1"],
      p2q1:grades[0]["p2q1"],
      p3q1:grades[0]["p3q1"],
      p1q2:6,
      p2q2:7,
      p3q2:8,
      supletorio:null,
      remedial:null,
      gracia:null
    }

    await updateGrades(studentId,subjectId,tempGrades).then(response => console.log(response.message));
    
        
  }

  const [rowData, setRowData] = useState([
    {descripcion: "Nota 1", puntaje: grades[0]["p1q1"]},
    {descripcion: "Nota 2", puntaje: grades[0]["p2q1"]},
    {descripcion: "Nota 3", puntaje: grades[0]["p3q1"]}
  ]);

  const [columnDefs] = useState([
      { field: 'descripcion', width: 120, editable: true},
      { field: 'puntaje', width: 120, editable: true},
      
  ])

  if(isLoading){
    return <IonLoading isOpen/>
  }

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Materia</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/my/dashboard" />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSelect placeholder='Seleccionar estudiante' value = {students[count].name} onIonChange={(e)=>{
          console.log(students); 
            students.map((student,position)=>{
              if(e.detail.value === student.name){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                setCount(position)
                console.log("activado");
            
                handleGrades(student.id,id) //Pasa los parametros del id del estudiante y materia
              
              }      
            })
            
          }}>
          {students.map((student)=>
              <IonSelectOption key={student.id}>
                {student.name}
              </IonSelectOption>
            )
          }
        </IonSelect>



          <div className="ag-theme-alpine" style={{height: 400, width: 250, marginLeft:40 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
          
            <IonButton style={{marginLeft:50}} onClick={()=>{console.log("count",count);setCount(count-1);
            }}>Anterior</IonButton>
          <IonButton onClick={()=>{console.log("countInicial",count);setCount(count+1);
          }}>Siguiente</IonButton>
          <IonButton color="success" style={{marginLeft:105}}
            onClick={e => {handleUpdate(students[count].id,id)}}
          >Guardar</IonButton>
          
      </IonContent>
    </IonPage>
  );
};

export default SubjectPage;
