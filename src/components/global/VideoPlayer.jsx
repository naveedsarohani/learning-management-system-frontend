import React, { useRef, useState } from "react"
import videoss from "../assets/videoss.mp4" // Import the video file
import nextVideo from "../assets/videoss.mp4" // You can add more videos for the next/previous functionality

const VideoPlayer = ({ isVisible, onClose }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [videoSrc, setVideoSrc] = useState(videoss) // State for current video source
  const [videoList] = useState([videoss, nextVideo]) // List of video sources
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Index to track current video

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
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

  const handleClose = () => {
    onClose()
    videoRef.current.pause()
    setIsPlaying(false)
  }

  const handleNext = () => {
    const nextIndex = (currentVideoIndex + 1) % videoList.length
    setCurrentVideoIndex(nextIndex)
    setVideoSrc(videoList[nextIndex])
    setIsPlaying(false)
    videoRef.current.pause()
  }

  const handlePrevious = () => {
    const prevIndex =
      (currentVideoIndex - 1 + videoList.length) % videoList.length
    setCurrentVideoIndex(prevIndex)
    setVideoSrc(videoList[prevIndex])
    setIsPlaying(false)
    videoRef.current.pause()
  }

  const handleVideoClick = () => {
    togglePlay() // Toggle play/pause when clicking on the video
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm min-h-screen">
      <div className="relative w-full max-w-3xl p-6 bg-gray-900 rounded-xl shadow-lg">
        <video
          ref={videoRef}
          className="w-full rounded-md"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleVideoClick} // Handle click to play/pause the video
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Play icon in the center */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
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
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-2xl hover:text-gray-400 transition-all"
            >
              {isPlaying ? "⏸" : "▶️"}
            </button>
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
            {/* Close */}
            <button
              onClick={handleClose}
              className="text-2xl hover:text-gray-400 transition-all"
            >
              ❌
            </button>
          </div>
          <div className="mt-4 flex justify-between w-full text-white">
            {/* Previous Video */}
            <button
              onClick={handlePrevious}
              className="text-3xl hover:text-gray-400 transition-all"
            >
              ⏪
            </button>
            {/* Next Video */}
            <button
              onClick={handleNext}
              className="text-3xl hover:text-gray-400 transition-all"
            >
              ⏩
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
