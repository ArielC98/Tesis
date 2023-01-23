import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { subjects } from '../data/subjects';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { students, studentsList } from '../data/students';


interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {
  const [idEst,setIdEst] = useState(0);
  const [students] = useState([]);
  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
  
    const estudiantes = studentsList(id).then((response) => response.students.map((student) => {students.push(student);setIsLoading(false);}));
  
    console.log(students);
    
    
    
  },[]);



  
  const subject = subjects.find((subject) => subject.id === id);

  const [rowData, setRowData] = useState([
    {descripcion: "Nota 1", puntaje: 10, price: 35000},
    {descripcion: "Nota 2", puntaje: 9, price: 32000},
    {descripcion: "Nota 3", puntaje: 8, price: 72000}
  ]);

  const [columnDefs] = useState([
      { field: 'descripcion', width: 120, editable: true},
      { field: 'puntaje', width: 120, editable: true},
      
  ])

  

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
        <IonSelect placeholder='Seleccionar estudiante'>
        {students.map((student)=>
            <IonSelectOption id={student.id}>
                {student.name}
              </IonSelectOption>
          )}
        </IonSelect>



          <div className="ag-theme-alpine" style={{height: 400, width: 250, marginLeft:40 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
        
          <IonButton style={{marginLeft:50}}>Anterior</IonButton>
          <IonButton>Siguiente</IonButton>
          <IonButton color="success" style={{marginLeft:105}}>Guardar</IonButton>
          
      </IonContent>
    </IonPage>
  );
};

export default SubjectPage;
