import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Authentication Check
import PrivateRoute from './PrivateRoute';

//Import Screens
import HomeScreen from './screens/HomeScreen'
import ProgramScreen from './screens/ProgramScreen'
import RoutineScreen from './screens/RoutineScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddWorkoutScreen from './screens/AddRoutineScreen';


//Import Components
import BottomNav from './components/BottomNav'

function App() {

  return (
    <div id="main">
      <Router>
        <main>
          <Routes>
            <Route path='/login' element={<LoginScreen />}/>
            <Route path='/register' element={<RegisterScreen />}/>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<HomeScreen />} exact />
            </Route>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/program/:id' element={<ProgramScreen />} exact />
            </Route>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/program/:id/routine/:id' element={<RoutineScreen />} exact />
            </Route>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/add-workout' element={<AddWorkoutScreen />} exact />
            </Route>
          </Routes>
        </main>
        <BottomNav/>
      </Router>
    </div>
  );
}

export default App;
