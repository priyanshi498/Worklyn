type Props = {
  projectName: string;
};

const PreviewPanel = ({ projectName }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg w-[420px] p-6">
      <h3 className="text-lg font-semibold text-[#3B0764]">
        {projectName || "Your project"}
      </h3>

      <div className="mt-4 space-y-3">
        {["Planning", "In Progress", "Review"].map((item) => (
          <div
            key={item}
            className="border rounded-lg px-3 py-2 text-gray-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPanel;
