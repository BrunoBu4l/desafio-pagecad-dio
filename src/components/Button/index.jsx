import React from 'react'

import { ButtonContainer } from './styles';

const Button = ({title, variant="primary", valid=false, onClick}) => {
  return (
    <ButtonContainer variant={variant} valid={valid} onClick={onClick}>
      {title}
    </ButtonContainer>
  )
}

export { Button }
