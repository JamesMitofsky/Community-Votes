export default function setState(setterFunction, newStateName) {
  // EXAMPLE object for page state

  //  const [pageState, setPageState] = useState({
  //    loading: true,
  //    insufficientParams: false,
  //    loaded: false,
  //  });

  try {
    setterFunction((prevStateObj) => {
      // set all properties from previous state as false
      const prevStateKeys = Object.keys(prevStateObj);
      const allFalseStates = prevStateKeys.reduce((acc, key) => {
        return { ...acc, [key]: false };
      }, {});

      // make the new state the single true object.
      const newActiveStateObj = {
        ...allFalseStates,
        [newStateName]: true,
      };

      return newActiveStateObj;
    });
  } catch (error) {
    console.log(
      "Problem with setting state from generalized function: ",
      error
    );
  }
}
