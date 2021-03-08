import "./Retro.css";
import ColumnComponent from "./components/ColumnComponent";

function Retro() {
  return (
    <div className="retro">
      <ColumnComponent color="#742727" name="BAD things" />
      <ColumnComponent color="#1e5f1e" name="GOOD things" />
      <ColumnComponent color="#373795" name="JUST things" />
    </div>
  );
}

export default Retro;
