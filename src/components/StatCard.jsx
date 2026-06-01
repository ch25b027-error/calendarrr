
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-3xl">{icon}</div>

      <h3 className="text-gray-600 mt-2">
        {title}
      </h3>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default StatCard;