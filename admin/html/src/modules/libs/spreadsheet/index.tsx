import Spreadsheet, {
  createFormulaParser,
  Matrix,
  CellBase,
} from "react-spreadsheet";

const customCreateFormulaParser = (data: Matrix<CellBase>) =>
  createFormulaParser(data, { SUM: undefined });

const MyComponent = () => {
  return (
    <Spreadsheet 
      data={[
        [{ value: 1 }, { value: 4 }, { value: "=sum(A1:B1)" }],
        [{ value: 2 }, { value: 3 }, { value: "=sum(A2:B2)" }],
      ]} 
      createFormulaParser={customCreateFormulaParser} 
    />
  );
};

export default MyComponent;