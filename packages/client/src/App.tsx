import { styled } from "@linaria/react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Container>
      <h1>Hello World</h1>
    </Container>
  );
}

export default App
