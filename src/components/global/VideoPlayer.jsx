import React, { useEffect, useRef, useState } from "react"
import { readFile } from "../../uitils/functions/global"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication";
import progress from "../../uitils/api/progress";
import { useParams } from "react-router-dom";

const VideoPlayer = ({ videos, playing, setEnded }) => {
  const { handler } = useHandler();
  const { credentials: { token, } } = useAuth();
  const { courseId } = useParams();
  const [currentVideoSrc, setCurrentVideoSrc] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  const unlockNext = async () => {
    const newProgress = {
      completion_percentage: calcPercetage(videos.length, playing),
      lesson_index: playing + 1,
    }

    await progress.update(courseId, newProgress, token, handler).then(() => {
      setEnded(pre => !pre);
    })
  }

  const calcPercetage = (total, given) => {
    return ((given + 1) / total) * 100
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration)
  }

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressWidth = rect.width
    const newTime = (clickX / progressWidth) * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    setCurrentVideoSrc(videos[playing ?? 0]);
  }, [playing, videos])

  return currentVideoSrc && (
    <div className="relative w-full max-w-3xl p-6 bg-gray-900 rounded-xl shadow-lg">
      <video
        ref={videoRef}
        className="w-full rounded-md"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        onEnded={unlockNext}
      >
        <source src={readFile(currentVideoSrc)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Play icon in the center */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ display: isPlaying ? "none" : "flex" }}
      >
        <button
          onClick={togglePlay}
          className="text-white text-5xl hover:text-gray-400 transition-all"
        >
          ▶️
        </button>
      </div>
      <div className="mt-4 flex flex-col items-center">
        {/* Custom Progress Bar */}
        <div
          ref={progressRef}
          className="relative w-full h-2 bg-gray-600 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          ></div>
        </div>
        <div className="mt-2 flex items-center justify-between w-full text-white">
          {/* Time */}
          <span className="text-sm">
            {new Date(currentTime * 1000).toISOString().substr(11, 8)} /{" "}
            {new Date(duration * 1000).toISOString().substr(11, 8)}
          </span>
          {/* Mute */}
          <button
            onClick={handleMute}
            className="text-2xl hover:text-gray-400 transition-all"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer 