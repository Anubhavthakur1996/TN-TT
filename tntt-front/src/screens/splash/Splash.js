import { useEffect } from "react";
import { useNavigate } from "react-router";
import Logo from "../../assets/tn&tt_logo.png";
import "./Splash.scss";

const Splash = () => {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 2000);
  }, [nav]);

  return (
    <div className="splash-screen">
      <img src={Logo} alt="TN&TT Logo" width={"20%"} className="scale-in-out" />
    </div>
  );
};

export default Splash;
