import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';


import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './data/auth';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SubjectPage from './pages/SubjectPage';




const AppMenu: React.FC = () => {

  const {loggedIn} = useAuth();
  
  

  if(!loggedIn){
    return <Redirect to="/login"/>
  }
  
  return (
    <IonPage>
      <IonSplitPane contentId="main">
          <Menu />
        <IonRouterOutlet id='main'>
          <Route exact path="/my/dashboard">
            <HomePage />
          </Route>
          <Route exact path = "/my/subjects/:id">
            <SubjectPage/>
          </Route>
          <Route exact path="/my/profile">
            <ProfilePage/>
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>



  );
};

export default AppMenu;
