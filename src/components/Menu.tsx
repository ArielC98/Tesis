import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, code, codeOutline, grid, gridOutline, heartOutline, heartSharp, home, homeOutline, link, linkOutline, list, mailOutline, mailSharp, newspaperOutline, paperPlaneOutline, paperPlaneSharp, person, personOutline, settings, settingsOutline, shareSocial, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { userData } from '../data/information';
import { useEffect, useState } from 'react';
import Joyride, { Step } from 'react-joyride';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

interface State{
  run: boolean;
  steps: Step[];
}


const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/my/dashboard',
    iosIcon: homeOutline,
    mdIcon: home
  },
  {
    title: 'Perfil',
    url: '/my/profile',
    iosIcon: personOutline,
    mdIcon: person
  },
  {
    title: 'Reportes',
    url: '/my/reports',
    iosIcon: list,
    mdIcon: list
  },
  {
    title: 'Contacto',
    url: '/my/links',
    iosIcon: shareSocial,
    mdIcon: shareSocial
  },
  {
    title: 'Ajustes',
    url: '/my/settings',
    iosIcon: settingsOutline,
    mdIcon: settings
  },

];



const Menu: React.FC = () => {



  const location = useLocation();
  const [avatar,setAvatar] = useState("");
  const [name,setName] = useState("");
  const [identification,setIdentification] = useState("");



  useEffect(() =>{

    userData().then(response => {

      setAvatar(response.data.avatar);
      setName(response.data.user.name);
      setIdentification(response.data.user.identification);
      
    })

  },[])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonImg src={avatar} style={{width:190, height:200, marginBottom:5, borderRadius:10}}/>
          <IonListHeader>{name}</IonListHeader>
          <IonNote>{identification}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle  key={index} autoHide={false}>
                <IonItem  className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
