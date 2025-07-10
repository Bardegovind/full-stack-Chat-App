import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useAuthStore } from "../store/useAuthStrore";

const FaceExpressionDetector = () => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");
  const { socket, authUser } = useAuthStore();

  useEffect(() => {
   const loadModels = async () => {
  const MODEL_URL = "/models";
  console.log("Loading models from:", MODEL_URL);
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  console.log("Models loaded successfully");
};

    const startVideo = () => {
  console.log("Requesting webcam access");
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    videoRef.current.srcObject = stream;
    console.log("Webcam stream set");
  }).catch((err) => {
    console.error(" Webcam access error:", err);
  });
};
   
   const detectExpressions = () => {
  console.log("Starting detection loop");
  setInterval(async () => {
    if (!videoRef.current) return;

    console.log("Trying to detect face");

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    console.log("Raw detection:", detection);

    if (detection && detection.expressions) {
      const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];

      setExpression(topExpression);
      console.log("Detected:", topExpression);

      socket?.emit("expression", {
        userId: authUser?._id,
        expression: topExpression,
      });
    }
  }, 1500);
};


    loadModels().then(startVideo).then(detectExpressions);
  }, []);

  const emojiMap = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    surprised: "😲",
    disgusted: "🤢",
    fearful: "😨",
    neutral: "😐",
  };

  return (
    <div>
  <video ref={videoRef} autoPlay muted width="0" height="0"  />
     <p>{emojiMap[expression] || "😐"}</p>
</div>
  );
};

export default FaceExpressionDetector;