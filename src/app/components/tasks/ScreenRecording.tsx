import React, { useState, useRef, useEffect } from "react";
import { Grid, Typography, Button, Chip } from "@mui/material";
import { useReactMediaRecorder } from "react-media-recorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";
import ScreenRecordingIcon from "@mui/icons-material/Videocam"; // Placeholder for your actual icon

const ScreenRecordingComponent = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    error,
  } = useReactMediaRecorder({ screen: true, video: true });

  const handleRecordClick = () => {
    if (status === "idle" || status === "stopped") {
      console.log("Starting recording");
      startRecording();
    } else if (status === "recording") {
      console.log("Stopping recording");
      stopRecording();
      setShowVideo(true);
    }
  };

  const handleDeleteClick = () => {
    setShowVideo(false);
  };

  useEffect(() => {
    console.log("mediaBlobUrl updated:", mediaBlobUrl);
    if (mediaBlobUrl && videoRef.current) {
      console.log("Setting video src to:", mediaBlobUrl);
      videoRef.current.src = mediaBlobUrl;
      videoRef.current.load();
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.currentTime = 0;
      };
    }
  }, [mediaBlobUrl]);

  console.log("Recording Status:", status);
  if (error) {
    console.error("Recording Error:", error);
  }
  console.log("===videoRef==", videoRef);

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Typography variant="h6" className="mb-5">
          {showVideo ? "Record Your Screen Again" : "Screen Recording"}
        </Typography>
        {!showVideo && (
          <Chip
            color="primary"
            variant="outlined"
            label={
              showVideo ? "Record Your Screen Again" : "Record Your Screen"
            }
            onClick={handleRecordClick}
            icon={<ScreenRecordingIcon />}
            style={{ border: "0.5px solid #4F46E5" }}
          />
        )}
        {showVideo && (
          <div className="relative mt-2">
            <video className="rounded" width="450px" ref={videoRef} controls />
            <div className="absolute top-2 right-2">
              <CloseIcon
                onClick={handleDeleteClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {status === "recording" && (
          <div className="bg-[#FEECEB] border-[0.5px] border-[#F44336] my-2 rounded flex items-center justify-between px-2 py-1">
            <Typography className="text-[#F44336] text-[16px] ">
              Stop Recording
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<StopIcon />}
              onClick={stopRecording}
            >
              Stop
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ScreenRecordingComponent;
