import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Import Screens
import WorkoutScreen from './screens/WorkoutScreen'
import ProgramScreen from './screens/ProgramScreen'
import RoutineScreen from './screens/RoutineScreen'

//Import Components
import BottomNav from './components/BottomNav'

function App() {
  return (
    <div>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<WorkoutScreen />} exact />
            <Route path='/program/:id' element={<ProgramScreen />} exact />
            <Route path='/program/:id/routine/:id' element={<RoutineScreen />} exact />
          </Routes>
        </main>
        <BottomNav/>
      </Router>
    </div>
  );
}

export default App;
