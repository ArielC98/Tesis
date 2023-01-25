import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
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
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([{}]);

  
  

  useEffect(() => {
  
    studentsList(id).then((response) => response.students.map((student) => {students.push(student);setIsLoading(false);}));
    console.log(students);  
  },[]);

  async function handleGrades (studentId: string, subjectId: string) {
    
    await studentGrades(studentId,subjectId).then(response =>{grades.push(response.grades[0]);grades.shift()});
    
    console.log(grades)

    setRowData([
      {descripcion: "Nota 10", puntaje: grades[0]["p1q1"]},
      {descripcion: "Nota 2", puntaje: grades[0]["p2q1"]},
      {descripcion: "Nota 3", puntaje: grades[0]["p3q1"]}
    ])
    
  }

  async function handleUpdate (studentId: string, subjectId: string) {
    
    const tempGrades = {
      p1q1:9,
      p2q1:8,
      p3q1:5,
      p1q2:6,
      p2q2:7,
      p3q2:80,
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
        <IonSelect placeholder='Seleccionar estudiante' onIonChange={(e)=>{
          console.log(e.detail.value); 
            students.map((student)=>{
              if(e.detail.value === student.name){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                setStudentId(student.id);
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
        
          <IonButton style={{marginLeft:50}}>Anterior</IonButton>
          <IonButton onClick={()=>{
            console.log(rowData[0].descripcion)
          }}>Siguiente</IonButton>
          <IonButton color="success" style={{marginLeft:105}}
            onClick={e => handleUpdate(studentId,id)}
          >Guardar</IonButton>
          
      </IonContent>
    </IonPage>
  );
};

export default SubjectPage;
