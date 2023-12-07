import React, { useEffect, useRef, useState } from "react";
import { Card } from "@arco-design/web-react";
import { IconPlayCircle } from "@arco-design/web-react/icon";
interface VideoStreamProps extends React.PropsWithChildren {}

const { Meta } = Card;

const VideoStream:React.FC<VideoStreamProps> = () => {
  const [start, setStart] = useState(false);
  let imgRef = useRef<HTMLImageElement>(null)

  const handleOpenCam = () => {
    setStart(true)
  }

  const handleCloseCam = () => {
    setStart(false)
  }

  useEffect(()=>{
    if(start) {
      imgRef.current.src = 'http://localhost:5000/video_feed'
    }
  },[])
  return  <div className="flex justify-center p-6">
      <Card
      hoverable
      style={{ width: 360 }}
      cover={
        <div className="h-204px ">
          {
            start ?  <img
            onClick={handleCloseCam}
            ref={imgRef}
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt='video-stream'
          />: <div onClick={handleOpenCam} className=" cursor-pointer text-2xl flex w-full h-full justify-center items-center"><IconPlayCircle /></div>
          }
         
        </div>
      }
    >
      <Meta
        title={<div className="text-black">模型推理结果</div>}
        description={<div className="text-sm">视频流预览</div>}
      />
    </Card>
  </div>
}

export default VideoStream
