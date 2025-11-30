import React, { useEffect } from "react";

export default function Toast({ mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="toast">{mensaje}</div>;
}
