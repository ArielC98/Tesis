import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { userData, updateProfileData, updateProfilePic } from '../data/information';
import './ProfilePage.css'





const ProfilePage: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [id, setId] = useState(null);
    const [birthDate, setBirthdate] = useState(null);
    const [email, setEmail] = useState(null);
    const [homePhone, setHomePhone] = useState(null);
    const [mobilePhone, setMobilePhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [photo, setPhoto] = useState("");
    const [present, dismiss] = useIonLoading();
    const [showAlert, hideAlert] = useIonAlert();
    const [image, setImage] = useState({});

    
    async function takePicture() {
        const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
        });
        var imageUrl = image.webPath;
        // Can be set to the src of an image now
        setPhoto(imageUrl)
        console.log(imageUrl);
    }

    function changeImage(event){
        
        const foto = event.target.files[0];
        const data = new FormData();
        data.append("image",foto);
        //data["image"] = files;
        setImage(data);
        
    }

    function dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    // function changeImage(event){
        
    //     let reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
        
        
    //     reader.onload = () =>{
    //         console.log("resultado", reader.result);
    //         setPhoto(reader.result.toString());
    //         let img = dataURLtoFile(reader.result,'profile.png')
    //         console.log(img);
    //         setImage({"image":img});
    //     }
        
    // }

    
    
    const changeEmail = (e) =>{
        e.preventDefault();
        setEmail(e.target.value);
        
    }
    const changeHomePhone = (e) =>{
        e.preventDefault();
        setHomePhone(e.target.value);
        
    }
    const changeMobilePhone = (e) =>{
        e.preventDefault();
        setMobilePhone(e.target.value);
        
    }
    const changeAddress = (e) =>{
        e.preventDefault();
        setAddress(e.target.value);
        
    }
    async function updateInput(){
        
        present({
            message:"Un momento..."
        })

        //aqui
        await updateProfileData({
            "personal_phone":mobilePhone,
            "home_phone":homePhone,
            "email":email,
            "address":address
        }).then(() => {dismiss(); showAlert("Información actualizada con éxito")});
        


    }
    
    

    useEffect(() => {
        const information = userData();
        
        information.then(response => {
            setAvatar(response.data.avatar);
            setName(response.data.user.name);
            setLastName(response.data.user.last_name);
            setId(response.data.user.identification);
            setBirthdate(response.data.user.birthdate);
            setEmail(response.data.user.email);
            setHomePhone(response.data.user.home_phone);
            setMobilePhone(response.data.user.personal_phone);
            setAddress(response.data.user.address);
            setIsLoading(false);
        })
        }, []);

    if(isLoading){
        return(
            <IonLoading isOpen/>
        );
    }

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Perfil</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonGrid className='ion-margin-bottom'>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <IonImg  style={{width:"150px", height:"200px"}} src={photo === ""? avatar:photo}/>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
                
                <IonRow>
                    
                   
                        <IonItem className='ion-text-center'>
                            <IonLabel position='stacked' ><h2 style={{fontWeight:"bold"}}>Editar Foto</h2></IonLabel>
                            
                            <input  type={'file'} onChange={e => changeImage(e)}/>
                        
                        
                        </IonItem>
                   
                    
                </IonRow>
            </IonGrid>


            <IonLabel  style={{fontWeight:"bold"}}>INFORMACIÓN PERSONAL</IonLabel>

        

            <IonList className='ion-margin-bottom'>
                <IonItem>
                    <IonLabel position='stacked'>Nombres</IonLabel>
                    <IonInput type='text' value={name} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Apellidos</IonLabel>
                    <IonInput type='text' value={lastName} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Identificación</IonLabel>
                    <IonInput type='text' value={id} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Fecha de nacimiento</IonLabel>
                    <IonInput type='text' value={birthDate} readonly/>
                </IonItem>
            </IonList>

            <IonLabel style={{fontWeight:"bold"}}>INFORMACIÓN DE CONTACTO</IonLabel>

        

            <IonList>
                <IonItem>
                    <IonLabel position='stacked'>Correo</IonLabel>
                    <IonInput type='email' value={email} onIonChange={changeEmail}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono fijo</IonLabel>
                    <IonInput type='text' value={homePhone} onIonChange={changeHomePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono celular</IonLabel>
                    <IonInput type='text' value={mobilePhone} onIonChange={changeMobilePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Dirección</IonLabel>
                    <IonTextarea  value={address} onIonChange={changeAddress}/>
                </IonItem>
                
                    <IonButton expand='block' onClick={() => updateProfilePic(image)}>Guardar</IonButton>
                
            </IonList>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;