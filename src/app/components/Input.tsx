import * as React from 'react';
import styled from 'styled-components'
import { Search } from 'styled-icons/evil'

const InputIcon = styled(Search)`
`

const StyledInput = styled.input`
  color: rgba(255, 255, 255, 0.8);
  border-width: 0;
  font-size: 15px;
  background-color: #1c1c1c;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const StyledSearchInput = styled(StyledInput)`
  width: 100%;
`
const StyledInputWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row no-wrap;
  background-color: #1c1c1c;
  border-radius: 0.40rem;
`

const StyledSelect = styled.select.attrs({
})`
  background-color: #1c1c1c;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 0.40rem;
  border-width: 0;
  height: 3rem;
  font-size: 1rem;
  outline: none;
  padding: 0px 2.4rem 0px 1rem;

  &::after {
    content: '';
    position: absolute;
    right: 1rem;
    bottom: 1.15rem;
    width: 0px;
    height: 0px;
    pointer-events: none;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-top: 0.4rem solid transparent;
  }
`

const Input = ({ input: { value, onChange}, placeholder}: any) => (
  <StyledInput value={value} onChange={onChange} placeholder={placeholder} />
)

const SearchInput = ({ input: { value, onChange}, placeholder}: any) => (
  <StyledInputWrapper>
    <StyledSearchInput value={value} onChange={onChange} placeholder={placeholder} />
    <InputIcon size="25" />
  </StyledInputWrapper>
)

const Select = ({ input, options }: any) => (
  <StyledSelect {...input}>
    {options.map((opt: any) => {
      return (
        <option
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </option>
      )
    })}
  </StyledSelect>
)

export { Input, Select, SearchInput }
