import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page now redirects to the Messages page
const Connection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/messages", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
};

export default Connection;
