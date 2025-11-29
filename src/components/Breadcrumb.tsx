import type { Path } from "../types/common"

interface Props {
    path: Path;
}

const Breadcrumb = ({path}: Props) => {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">{path.join(" > ")}</h2>
    </div>
  )
}

export default Breadcrumb