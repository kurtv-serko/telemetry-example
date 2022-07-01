import { useCallback, useState } from "react";

export const useRefChange = () => {
  const [domNode, setDomNode] = useState(null);
  const onRefChange = useCallback((node: any) => {
    setDomNode(node); // trigger re-render on changes
  }, []);

  return [domNode, onRefChange];
};
