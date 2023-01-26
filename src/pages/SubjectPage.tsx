import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { studentsList } from '../data/students';
import { studentGrades } from '../data/grades';
import { updateGrades } from '../data/grades';
import { useAuth } from '../data/auth';


interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {

  const [students] = useState([]);
  const {role} = useAuth();
  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  const [actualStudent, setActualStudent] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([{}]);
  const [present, dismiss] = useIonLoading();
  const [showAlert, hideAlert] = useIonAlert();


  


  useEffect(() => {
    console.log(role);
    
    studentsList(id).then((response) => {response.students.map((student) => {students.push(student)});setIsLoading(false);
    
    })
    console.log("El rol es", role);
    
  },[]);

  async function handleGrades (studentId: string, subjectId: string) {
    
    present({
      message: 'Cargando...',
      duration: 4000
    })
    await studentGrades(studentId,subjectId).then(response =>{grades.push(response.grades[0]);grades.shift()});
    
    console.log(grades)

    setRowData([
      {descripcion: "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]},
      {descripcion: "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]},
      {descripcion: "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]},
      {descripcion: "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]},
      {descripcion: "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]},
      {descripcion: "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]},
      {descripcion: "Quimestre 1", puntaje: grades[0]["q1"]},
      {descripcion: "Quimestre 2", puntaje: grades[0]["q2"]},
      
    ])
    
  }

  async function handleUpdate (studentId: string, subjectId: string) {
    present({
      message: 'Cargando...',
      duration: 3000
    })
    const tempGrades = {
      p1q1:grades[0]["p1q1"],
      p2q1:grades[0]["p2q1"],
      p3q1:grades[0]["p3q1"],
      p1q2:grades[0]["p1q2"],
      p2q2:grades[0]["p2q2"],
      p3q2:grades[0]["p3q2"],
      supletorio:null,
      remedial:null,
      gracia:null
    }

    await updateGrades(studentId,subjectId,tempGrades).then(response =>showAlert(response.message));
    
        
  }

  const [rowData, setRowData] = useState([
      {descripcion: "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]},
      {descripcion: "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]},
      {descripcion: "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]},
      {descripcion: "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]},
      {descripcion: "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]},
      {descripcion: "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]},
      {descripcion: "Quimestre 1", puntaje: grades[0]["q1"]},
      {descripcion: "Quimestre 2", puntaje: grades[0]["q2"]},
  ]);

  const [columnDefs] = useState([
      { field: 'descripcion', width: 120, editable:true},
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
