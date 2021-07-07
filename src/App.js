import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm'; 
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header title='Gestor Cajon de las Muchascosas'/>
      <UserForm/>
    </div>
  );
}

export default App;
