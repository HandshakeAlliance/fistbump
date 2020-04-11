import * as React from 'react';
import { Menu3 } from 'styled-icons/remix-fill'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Search, Wallet } from 'styled-icons/boxicons-regular'
import { Settings3, FileMark } from 'styled-icons/remix-line'

const MenuContainer = styled.div`
  position: relative;
`

const MenuButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  color: rgba(255, 255, 255, .7);
  padding: 0;
  transition: color 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`

const MenuBox = styled.div`
  position: absolute;
  top: 2rem;
  right: 0;
  width: 38vw;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  box-shadow: -3px 6px 15px -1px #333;
  z-index: 99;
`

const MenuItem = styled.div`
  text-align: right;

  & a {
    padding: 15px;
    display: block;
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
  }

  & a:hover {
    background: rgba(254, 205, 68, .3);
  }

  & svg {
    margin-left: 6px;
  }
`

const Navigation = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  function toggleMenuOpen() {
    setMenuOpen(!menuOpen)
    const clickHandler = (e: any) => {
      e.preventDefault()
      document.removeEventListener('click', clickHandler)
      setMenuOpen(false)
    }
    document.addEventListener('click', clickHandler)
  }

  return (
    <MenuContainer>
      <MenuButton onClick={toggleMenuOpen}>
        <Menu3 size={25} />
      </MenuButton>
      {menuOpen &&
        <MenuBox>
          <MenuItem>
            <NavLink to="/tld/search">Search TLDs <Search size={20} /></NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/tld/watch">Saved TLDs<FileMark size={20} /></NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/wallet/overview">Wallet <Wallet size={20} /></NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/node-setup">Settings <Settings3 size={20} /></NavLink>
          </MenuItem>
        </MenuBox>}
    </MenuContainer>
  )
}

export default Navigation
