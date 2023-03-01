import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  useRef,
} from "react";

import ThemeProvider, { ThemeContext } from "./Contexts/ThemeProvider";

type State = {
  count: number;
};

enum ActionType {
  Increment = "Increment",
  Decrement = "Decrement",
}

type Action = {
  type: ActionType;
};

const initialState: State = { count: 0 };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Increment":
      return { count: state.count + 1 };
    case "Decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

function App() {
  //  Define states
  //  useState
  const [value, setValue] = useState(0);
  const [pow, setPow] = useState(0);
  //  useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //  Run an effect at every time
  useEffect(() => {
    console.log(
      "Run an effect at every time",
      "ComponentDidMount, CompleteDidUpdate",
      value
    );

    return () => {
      console.log("Run an effect at every time", "ComponentWillUnmount", value);
    };
  });

  //  Run an effect and clean it up only once(on mount and unmount)
  useEffect(() => {
    console.log(
      "Run an effect and clean it up only once(on mount and unmount)",
      "ComponentDidMount, ComponentWillUnmount"
    );

    return () => {
      console.log(
        "Run an effect and clean it up only once(on mount and unmount)",
        "ComponentWillUnmount"
      );
    };
  }, []);

  //  Run an effect if only dependencies are changed
  useEffect(() => {
    console.log(
      "Run an effect if only dependencies are changed",
      "ComponentDidUpdate",
      value
    );

    return () => {
      console.log(
        "Run an effect if only dependencies are changed",
        "ComponentWillUnmount",
        value
      );
    };
  }, [value]);

  //  useMemo
  const doubleValue = useMemo(() => Math.pow(value, pow), [value, pow]);

  //  useCallback
  const decrementPow = useCallback(() => {
    setPow(pow - 1);
  }, [pow]);

  //  useRef
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(theme) => (
          <div>
            <h1>Welcome to the course of React Hooks</h1>
            <h1 data-testid="test-value">Value: {value}</h1>
            <h1>Pow: {pow}</h1>
            <h2>Value ** Pow: {doubleValue}</h2>
            <button
              data-testid="test-button-increment-value"
              onClick={() => setValue(value + 1)}
            >
              State Value Increment Update
            </button>
            <button onClick={() => setPow(pow + 1)}>
              State Pow Increment Update
            </button>
            <button onClick={decrementPow}>State Pow Decrement Update</button>
            <h1>{state.count}</h1>
            <button onClick={() => dispatch({ type: ActionType.Decrement })}>
              Reducer Derement Update
            </button>
            <button onClick={() => dispatch({ type: ActionType.Increment })}>
              Reducer Increment Update
            </button>
            <input ref={inputRef} type="text" />
            <button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              Focus the input
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
