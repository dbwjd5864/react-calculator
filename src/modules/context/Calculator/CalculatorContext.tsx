import { createContext, useContext, useReducer } from 'react';
import { OperationType } from '../../../types/calculator';
import {
  ADD_FIRST_DIGIT,
  ADD_SECOND_DIGIT,
  ADD_OPERATION,
  RESET,
} from './CalculatorActionType';
import CalculatorReducer, {
  defaultValue,
  DefaultValueState,
} from './CalculatorReducer';

interface ContextProps {
  readonly calculator: DefaultValueState;
  readonly operationList: OperationType[];
  addFirstDigit: (digit: string) => void;
  addSecondDigit: (digit: string) => void;
  addOperation: (operation: OperationType) => void;
  reset: () => void;
}

export const CalculatorContext = createContext<ContextProps>({
  calculator: defaultValue,
  operationList: [],
  addFirstDigit: () => {},
  addSecondDigit: () => {},
  addOperation: () => {},
  reset: () => {},
});

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const operationList: OperationType[] = ['/', 'X', '-', '+', '='];
  const [state, dispatch] = useReducer(CalculatorReducer, defaultValue);

  const addFirstDigit = (digit: string): void => {
    dispatch({ type: ADD_FIRST_DIGIT, digit });
  };

  const addSecondDigit = (digit: string): void => {
    dispatch({ type: ADD_SECOND_DIGIT, digit });
  };

  const addOperation = (operation: OperationType): void => {
    dispatch({ type: ADD_OPERATION, operation });
  };

  const reset = (): void => {
    dispatch({ type: RESET });
  };

  return (
    <CalculatorContext.Provider
      value={{
        calculator: state,
        operationList,
        addFirstDigit,
        addSecondDigit,
        addOperation,
        reset,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
