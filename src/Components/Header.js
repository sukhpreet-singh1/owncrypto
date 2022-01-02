import React from 'react'
import {AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography} from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles({
  title: {
    flex:1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "800",
    cursor:"pointer",
    
  },
});
function Header() {
    const classes=useStyles();
    const navigate =useNavigate();
    const {currency,setCurrency,user}=CryptoState();
    const darkTheme=createTheme({
        palette:{   
            primary:{
                main:"#000",
            },
            type:"light",
            }
    });
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={()=>navigate("/")}
                        className={classes.title}
                        variant='h4' >
                        OwnCrypto 
                    </Typography>
                    <Select 
                        variant='outlined'
                        style={{
                            width:100,
                            height:40,
                            marginRight:15,
                        }}
                        value={currency}
                        onChange={(e)=> setCurrency(e.target.value)} >
                       <MenuItem value={'USD'}>USD</MenuItem>  
                       <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                    {user?<UserSidebar/>:<AuthModal/>}
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header
