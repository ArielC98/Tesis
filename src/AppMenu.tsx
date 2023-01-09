import { IonApp, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';

import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './auth';
import Menu from './components/Menu';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';




const AppMenu: React.FC = () => {

  const {loggedIn} = useAuth();

  if(!loggedIn){
    return <Redirect to={"/login"}/>
  }
  
  return (
    <IonPage>
      <IonSplitPane contentId="main">
          <Menu />
        <IonRouterOutlet id='main'>
          <Route exact path="/my/entries">
            <HomePage />
          </Route>
          <Route exact path="/my/entries/:id">
            <EntryPage />
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
