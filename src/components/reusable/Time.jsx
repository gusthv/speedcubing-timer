const Time = ({ value }) => {
  return (
    <>
      <span>
        {Math.floor((value % (360 * 10000)) / 60000)
          ? Math.floor((value % (360 * 10000)) / 60000) + ":"
          : ""}
      </span>
      <span>
        {Math.floor((value % (360 * 10000)) / 60000)
          ? Math.floor((value % (6 * 10000)) / 1000) < 10
            ? "0" + Math.floor((value % (6 * 10000)) / 1000)
            : Math.floor((value % (6 * 10000)) / 1000)
          : Math.floor((value % (6 * 10000)) / 1000)}
        .
      </span>
      <span>
        {Math.floor((value % 1000) / 10) < 10
          ? "0" + Math.floor((value % 1000) / 10)
          : Math.floor((value % 1000) / 10)}
      </span>
    </>
  );
};

export default Time;
