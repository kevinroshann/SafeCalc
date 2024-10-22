import Wrapper from "./calculator/components/Wrapper"
import Screen from "./calculator/components/Screen"
import ButtonBox from "./calculator/components/ButtonBox"
import Button from "./calculator/components/Button"
import CalcProvider from "./calculator/context/CalcContext"

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
]

function App() {
  return (
    <CalcProvider className="App-body">
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button 
              value={btn}
              index={i}
            />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
