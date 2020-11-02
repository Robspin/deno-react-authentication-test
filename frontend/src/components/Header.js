import React from 'react';

import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
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
                     <LinkContainer to='/login'>
                        <Nav.Link>
                           <i className='fas fa-user'></i> Sign In
                        </Nav.Link>
                     </LinkContainer>
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
