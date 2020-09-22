import React, { ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'

const Animation = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  margin-top: 50px;
  
  svg {
    animation: ${Animation} 1s linear infinite;
  }
`

const Loader = (): ReactElement => {
  return (
    <Wrapper>
      <svg
        fill="#34657F"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path d="M20 6.452c1.782 0 3.226-1.445 3.226-3.226C23.226 1.444 21.782 0 20 0s-3.226 1.444-3.226 3.226c0 1.781 1.444 3.226 3.226 3.226zM8.139 11.365c1.781 0 3.226-1.445 3.226-3.226 0-1.782-1.445-3.226-3.226-3.226-1.782 0-3.226 1.444-3.226 3.226 0 1.781 1.444 3.226 3.226 3.226zm28.635 11.86C38.556 23.226 40 21.783 40 20s-1.444-3.226-3.226-3.226c-1.781 0-3.226 1.444-3.226 3.226s1.445 3.226 3.226 3.226zm-33.548 0c1.781 0 3.226-1.443 3.226-3.225s-1.445-3.226-3.226-3.226C1.444 16.774 0 18.218 0 20s1.444 3.226 3.226 3.226zM31.86 35.088c1.782 0 3.226-1.444 3.226-3.226 0-1.781-1.444-3.226-3.226-3.226-1.781 0-3.226 1.445-3.226 3.226 0 1.782 1.445 3.226 3.226 3.226zm-23.722 0c1.781 0 3.226-1.444 3.226-3.226 0-1.781-1.445-3.226-3.226-3.226-1.782 0-3.226 1.445-3.226 3.226 0 1.782 1.444 3.226 3.226 3.226zM20 40c1.782 0 3.226-1.444 3.226-3.226 0-1.781-1.444-3.226-3.226-3.226s-3.226 1.445-3.226 3.226C16.774 38.556 18.218 40 20 40z" />
      </svg>
    </Wrapper>
  )
}

export default Loader