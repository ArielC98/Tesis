import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { subjects } from '../data/subjects';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { students } from '../data/students';


interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {
  const [idEst,setIdEst] = useState(0);

  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL

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

  function changeValues1(){
    setRowData([
      {descripcion: "Nota 1", puntaje: rowData[0].puntaje+1, price: 35000},
    {descripcion: "Nota 2", puntaje: rowData[1].puntaje+1, price: 32000},
    {descripcion: "Nota 3", puntaje: rowData[2].puntaje+1, price: 72000}
    ])
  }

  function changeValues2(){

    setRowData([
      {descripcion: "Nota 1", puntaje: rowData[0].puntaje-1, price: 35000},
    {descripcion: "Nota 2", puntaje: rowData[1].puntaje-1, price: 32000},
    {descripcion: "Nota 3", puntaje: rowData[2].puntaje-1, price: 72000}
    ])
  }

  

  function randValues(){
    setRowData([
      {descripcion: "Nota 1", puntaje: Math.random() * (10), price: 35000},
    {descripcion: "Nota 2", puntaje:  Math.random() * (10), price: 32000},
    {descripcion: "Nota 3", puntaje:  Math.random() * (10), price: 72000}
    ])
  }

  const INITIAL = "dog2";
  const [value, setValue] = useState(INITIAL);
  const options = ["dog1", "dog2", "dog3"];

  function changeValues3(){
    setValue("dog1");
    console.log(options);
    
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{subject.name.toUpperCase() + " " + subject.curso + " " + subject.paralelo}</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/my/dashboard" />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSelect placeholder='Seleccionar estudiante'>
        {students.map((student)=>
            <IonSelectOption onSelect={randValues}>
                {student.name}
              </IonSelectOption>
          )}
        </IonSelect>
        
        <IonItem>
          <IonLabel position='stacked'>Select a Dog</IonLabel>
          <IonSelect value={value} onIonChange={e => setValue(e.detail.value)}>
            {options.map((option, i) => (
              <IonSelectOption value={option} key={i}>
                {option}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>  



          <div className="ag-theme-alpine" style={{height: 400, width: 250, marginLeft:40 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
        
          <IonButton style={{marginLeft:50}} onClick={changeValues2}>Anterior</IonButton>
          <IonButton onClick={changeValues1}>Siguiente</IonButton>
          <IonButton color="success" style={{marginLeft:105}} onClick={changeValues3}>Guardar</IonButton>
          
      </IonContent>
    </IonPage>
  );
};

export default SubjectPage;
