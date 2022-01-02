import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Header from './Components/Header';
import './App.css';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@mui/styles';
import Alert from './Components/Alert';
const useStyles = makeStyles({
  App: {
    backgroundColor: 'white',
    color: 'black',
    minHeight: '100vh',
  },
});


function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
            <Route exact path="/" element={<Homepage/>}/>
            <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
        <Alert/>
       </div>
    </BrowserRouter>
  );
}

export default App;
