import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const logoutHandler = () => {
      dispatch(logout());
   };

   return (
      <header>
         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>GreenTemple</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto'>
                     {/* <Nav.Link href='/home'>Home</Nav.Link> */}

                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link>
                              <i className='fas fa-user'></i> Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}

                     {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                           Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>
                           Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>
                           Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>
                           Separated link
                        </NavDropdown.Item>
                     </NavDropdown> */}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
