import patternDividerMobile from "./assets/images/pattern-divider-mobile.svg";
import patternDividerDesktop from "./assets/images/pattern-divider-desktop.svg";
import dice from "./assets/images/icon-dice.svg";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [{ id = "00", advice = "" }, setAdviceSlip] = useState({});
  const [error, setError] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const getAdvice = async () => {
    try {
      const response = await axios("https://api.adviceslip.com/advice");
      setAdviceSlip(response.data.slip);
      setError(false);
    } catch (error) {
      console.log(error);
      setAdviceSlip({ id: "00", advice: "Unable to provide advice" });
      setError(true);
    }
  };
  useEffect(() => {
    getAdvice();
  }, []);

  useEffect(() => {
    let timerId = null;
    if (autoRefresh) {
      timerId = setInterval(getAdvice, 6000);
    }
    return () => {
      clearInterval(timerId)
    }
  }, [autoRefresh]);
  return (
    <>
      <header className="mt-[15vh] flex justify-center gap-5">
        <p className="text-lightCyan font-extrabold">Automatic Refresh:</p>
        <div
          className="w-10 h-5 bg-darkGrayishBlue rounded-xl cursor-pointer"
          onClick={() => {
            setAutoRefresh(!autoRefresh);
          }}
        >
          <span
            className={`h-5 w-5  block rounded-full ${
              autoRefresh ? "bg-neonGreen translate-x-full " : "bg-white"
            }`}
          ></span>
        </div>
      </header>
      <main className="bg-darkGrayishBlue text-center w-[337px] min-h-[300px] pt-10 pb-16 px-5 mt-[5vh] mx-auto rounded-xl relative sm:min-h-[270px] sm:w-[500px] shadow-2xl shadow-black lg:m-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%]">
        <h1 className="text-neonGreen uppercase text-[12px] font-bold tracking-[4px] pb-5">
          advice #{id}
        </h1>
        <p
          className={`text-2xl font-extrabold ${
            error ? "text-red-500" : "text-lightCyan"
          } pb-6 min-h-[140px] sm:min-h-[110px]`}
        >
          {advice}
        </p>
        <picture>
          <source media="(min-width: 640px)" srcSet={patternDividerDesktop} />
          <img
            className="mx-auto"
            src={patternDividerMobile}
            alt="pattern divider"
          />
        </picture>
        <button
          className="bg-neonGreen w-16 h-16 rounded-full absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 cursor-pointer hover:shadow-[0_0_20px_4px_#52FFA8] duration-200"
          onClick={getAdvice}
        >
          <img src={dice} alt="dice" className="mx-auto" />
        </button>
      </main>
    </>
  );
}

export default App;
