import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route path='/' component={HomePage} exact />
               <Route path='/login' component={LoginPage} />
               <Route path='/profile' component={ProfilePage} />
               <Route path='/register' component={RegisterPage} />
            </Container>
         </main>
         <Footer />
      </Router>
   );
};

export default App;
