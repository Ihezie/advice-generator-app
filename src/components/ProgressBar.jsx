const ProgressBar = () => {
  return (
    <div className="absolute top-3 left-1/2 translate-x-[-50%] h-[6px] w-[90%] bg-darkBlue rounded-xl overflow-hidden">
      <div className="bg-neonGreen h-full w-full rounded-xl animate-progressBar origin-left"></div>
    </div>
  );
};
export default ProgressBar;
