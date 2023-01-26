import { IonApp} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppMenu from './AppMenu';
import { AuthContext} from './data/auth';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';


const App: React.FC = () => {

  //Se crean variables con el hook useState para declarar el estado inicial de inicio de sesion del usuario
  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setRole] = useState("");
  console.log(`rendering App wih loggedIn: ${loggedIn}`);
  
  
  return (
    <IonApp>
      <AuthContext.Provider value = {{loggedIn, role}}>
          <IonReactRouter>
            {/* Se usa Switch para renderizar exclusivamente una ruta */}
            <Switch>
              <Route exact path = "/login">

                  <LoginPage   onLogin={(roleAux)=>{setLoggedIn(true); setRole(roleAux); console.log("Role ->",loggedIn);
                  }
                  }/>

              </Route>

              <Route path={"/my"}>        
                <AppMenu/>
              </Route>
              <Redirect exact path="/" to="/my/dashboard" />
              <Route>
                <NotFoundPage/>
              </Route>
            </Switch>

          </IonReactRouter>
      
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
