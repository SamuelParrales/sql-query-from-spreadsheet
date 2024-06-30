import { useCallback, useState } from "react";


export const useForceUpdate = () => {
    const [, updateState] = useState(Symbol());
    const forceUpdate = useCallback(() => updateState(Symbol()), []);
  return forceUpdate
}
