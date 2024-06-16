"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";

interface VideoPlayerProps {
  chapterId: string;
  title?: string;
  courseId: string;
  nextChapterId?: string;
  playbackId?: string | null;
  isLocked: boolean;
  completeOnEnd: boolean;
  description?: string | null;
}

const VideoPlayer = ({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  nextChapterId,
  playbackId,
  title,
  description,
}: VideoPlayerProps) => {
  const [ready, setReady] = useState(false);

  return (
    <div>
      {isLocked && <>Locked</>}
      {!ready && !isLocked && <>Free</>}
      {!isLocked && (
        <>
          <MuxPlayer
            title={title}
            onCanPlay={() => setReady(true)}
            onEnded={() => {}}
            autoPlay
            playbackId={playbackId ?? ""}
          ></MuxPlayer>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
