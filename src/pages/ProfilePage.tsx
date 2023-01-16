import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { userData } from '../data/information';


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
            <IonGrid>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol size='6'>
                        <IonImg src={avatar}/>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid>


            <IonLabel>INFORMACIÓN PERSONAL</IonLabel>

        

            <IonList className='ion-margin-bottom'>
                <IonItem>
                    <IonLabel position='stacked'>Nombres</IonLabel>
                    <IonInput type='text'>{name}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Apellidos</IonLabel>
                    <IonInput type='text'>{lastName}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Identificación</IonLabel>
                    <IonInput type='text'>{id}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Fecha de nacimiento</IonLabel>
                    <IonInput type='text'>{birthDate}</IonInput>
                </IonItem>
            </IonList>

            <IonLabel>INFORMACIÓN DE CONTACTO</IonLabel>

        

            <IonList>
                <IonItem>
                    <IonLabel position='stacked'>Correo</IonLabel>
                    <IonInput type='email'>{email}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono fijo</IonLabel>
                    <IonInput type='text'>{homePhone}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono celular</IonLabel>
                    <IonInput type='text'>{mobilePhone}</IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Dirección</IonLabel>
                    <IonTextarea>{address}</IonTextarea>
                </IonItem>
            </IonList>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;