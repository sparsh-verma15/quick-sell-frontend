import Page from './components/Page';
import styled from 'styled-components';

function App() {
  return (
    <OuterContainer>
      <Page />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  height: 100vh;
`

export default App;
