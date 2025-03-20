import "./App.css";
import { Canvas } from "@react-three/fiber";
import MaxwellScene from "./scenes/maxwell/scene";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <div className="App">
        <Canvas camera={{ position: [1, 2, 5] }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <MaxwellScene />
        </Canvas>
        <div className="space">
          press <span>SPACE</span>
        </div>
      </div>
    </>
  );
}

export default App;
