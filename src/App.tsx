import { IonApp, IonRouterOutlet} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppMenu from './AppMenu';
import { AuthContext} from './data/auth';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PasswordPage from './pages/PasswordPage';
import "@ionic/react/css/core.css"
import "./theme/variables.css"



const App: React.FC = () => {

  //Se crean variables con el hook useState para declarar el estado inicial de inicio de sesion del usuario
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [tutorial,setTutorial] =useState(false);
  
  
  
  return (
    <IonApp>
      <AuthContext.Provider value = {{loggedIn, role, tutorial}}>
          <IonReactRouter>
            {/* Se usa Switch para renderizar exclusivamente una ruta */}
            <Switch>
          <IonRouterOutlet>
              <Route exact path = "/login">

                  <LoginPage   onLogin={(roleAux, needTutorial)=>{setLoggedIn(true); setRole(roleAux); setTutorial(needTutorial)}}/>

              </Route>
              
              <Route exact path = "/password">
                <PasswordPage />
              </Route>
              <Route path={"/my"}>        
                <AppMenu/>
              </Route>
              <Redirect exact path="/" to="/my/dashboard" />
              <Route>
                <NotFoundPage/>
              </Route>
            
              </IonRouterOutlet>
            </Switch>
          </IonReactRouter>
      
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
