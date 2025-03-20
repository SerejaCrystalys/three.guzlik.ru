import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const Cat = () => {
  const model = useGLTF("models/maxwell/maxwell-the-cat.glb");
  const animations = useAnimations(model.animations, model.scene);

  const [isPressed, setPressed] = useState<boolean>(false);
  const soundRef = useRef<Howl | null>(null);
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["models/maxwell/maxwell-the-cat-theme.mp3"],
      autoplay: false,
      loop: true,
      volume: 0.5,
    });

    const keyDownHandle = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        soundRef.current &&
        !soundRef.current.playing()
      ) {
        soundRef.current.play();
        setPressed(true);
      }
    };

    const keyUpHandle = () => {
      soundRef.current?.stop();
      setPressed(false);
    };

    document.addEventListener("keydown", keyDownHandle);
    document.addEventListener("keyup", keyUpHandle);

    return () => {
      document.removeEventListener("keydown", keyDownHandle);
      document.removeEventListener("keyup", keyUpHandle);
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    const span = document.querySelector(".space span");

    const action = animations.actions["Take 001"];

    if (isPressed) {
      action?.reset().fadeIn(0.5).play();
      span?.classList.add("active");
    } else {
      action?.fadeOut(0.5);
      span?.classList.remove("active");
    }

    return () => {
      action?.fadeOut(0.5);
      span?.classList.remove("active");
    };
  }, [isPressed]);

  return (
    <>
      <primitive object={model.scene} scale={[2, 2, 2]} />
    </>
  );
};

const MaxwellScene = () => {
  return (
    <>
      <ambientLight intensity={5} />
      {/* <spotLight position={[0, 0.5, 0.5]} angle={0} penumbra={1} /> */}
      <Suspense>
        <Cat />
        <Environment
          files={[
            "panorama_1.png",
            "panorama_3.png",

            "panorama_4.png",
            "panorama_5.png",

            "panorama_0.png",
            "panorama_2.png",
          ]}
          background
          path="models/maxwell/maxwell-the-cat-enviroment/"
        />
      </Suspense>
    </>
  );
};

useGLTF.preload("models/maxwell/model.glb");

export default MaxwellScene;
