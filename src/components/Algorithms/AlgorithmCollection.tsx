import { Algorithm } from "../../types";

interface AlgorithmItemProps {
  algorithmList: Algorithm[];
}

const AlgorithmCollection: React.FC<AlgorithmItemProps> = ({
  algorithmList,
}) => {
  return (
    <>
      {algorithmList.map((algorithm, index) => (
        <span key={index} className="w-[170px] flex flex-col items-center">
          <img
            src={algorithm.image}
            alt="algorithm-image"
            className="w-[80%] pointer-events-none select-none"
          />
          <p className="text-[80%] font-semibold whitespace-nowrap">
            {algorithm.rotations}
          </p>
        </span>
      ))}
    </>
  );
};

export default AlgorithmCollection;
