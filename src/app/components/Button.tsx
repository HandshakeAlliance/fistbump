import styled from 'styled-components'

export interface ButtonProps {
  readonly bt: 'primary' | 'secondary';
}

const buttonStyles = {
  submit: {
    bgColor: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    borderColor: '#333',
  },
  delete: {
    bgColor: 'rgba(255,255,255,0.15)',
    color: '#3ad7ff',
    borderColor: '#3ad7ff',
  }
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  margin-top: 30px;
  font-size: 1.2rem;
  border: 1px solid ${(props) => props.theme[props.bt] };
  border-radius: 3px;
  color: ${(props) => props.theme[props.bt]};
  background-color: ${({ theme }) => theme.buttonBg};
  padding: 10px 0;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #d4a418;
    border-color: #d4a418;
  }
`

export { Button }
