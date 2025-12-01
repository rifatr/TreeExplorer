import type { Path } from "../types/common"

interface Props {
  path: Path;
}

const Breadcrumb = ({ path }: Props) => {
  return (
    <div className="max-h-[4.5rem] overflow-y-auto mb-4 leading-[1.5rem]">
      <h2 className="text-xl font-semibold text-gray-800 whitespace-normal">
        {path.join(" > ")}
      </h2>
    </div>
  );
};

export default Breadcrumb