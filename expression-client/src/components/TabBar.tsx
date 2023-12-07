import React from "react";
import { Tabs } from '@arco-design/web-react';
import { IconVideoCamera, IconImage } from "@arco-design/web-react/icon";
import VideoStream from "./VideoStream";
import ImagePredict, {  } from "./ImagePredict";
interface LayoutProps extends React.PropsWithChildren {}
const TabPane = Tabs.TabPane;

const TabBar:React.FC<LayoutProps> = () => {
  return  <div className="text-center p-6">
    <Tabs type='rounded'>
      <TabPane key='1' title={<div><IconVideoCamera /> video-stream</div>}>
        <VideoStream></VideoStream>
      </TabPane>
      <TabPane key='2' title={<div><IconImage /> image</div>}>
        <ImagePredict></ImagePredict>
      </TabPane>
    </Tabs>
  </div>
}

export default TabBar
