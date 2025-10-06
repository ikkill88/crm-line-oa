// Dashboard.jsx (ส่วน Export)
const [selectedFields, setSelectedFields] = useState([
  "id",
  "user",
  "content",
  "created_at",
]);

const toggleField = (field) => {
  setSelectedFields((prev) =>
    prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
  );
};

<div style={{ marginTop: "1rem" }}>
  <h4>เลือก Columns ที่ต้องการ Export</h4>
  {["id", "user", "direction", "content", "status", "created_at"].map(f => (
    <label key={f} style={{ marginRight: "1rem" }}>
      <input
        type="checkbox"
        checked={selectedFields.includes(f)}
        onChange={() => toggleField(f)}
      />
      {f}
    </label>
  ))}

  <div style={{ marginTop: "1rem" }}>
    <button
      onClick={() => {
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
        window.open(
          `/api/dashboard/export?start=${start}&end=${end}&fields=${selectedFields.join(",")}`,
          "_blank"
        );
      }}
    >
      📥 Export CSV
    </button>

    <button
      style={{ marginLeft: "1rem" }}
      onClick={() => {
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
        window.open(
          `/api/dashboard/export-excel?start=${start}&end=${end}&fields=${selectedFields.join(",")}`,
          "_blank"
        );
      }}
    >
      📊 Export Excel
    </button>
  </div>
</div>
