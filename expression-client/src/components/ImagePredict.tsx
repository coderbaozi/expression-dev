import React,{ useState} from "react";
import { Upload,Descriptions } from '@arco-design/web-react';
interface LayoutProps extends React.PropsWithChildren {}

const ImagePredict:React.FC<LayoutProps> = () => {
  const [fileList, setFileList] = useState([]);
  const [imageInfo,setImageInfo] = useState(null)
  return  <div className="text-center p-6">
    <Upload
      fileList={fileList}
      onChange={setFileList}
      customRequest={ async(option) => {
        const { file } = option;
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);
        xhr.open('post', 'http://localhost:5000/image', true);
        xhr.send(formData);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              // 既然已经收到响应，我们就在这里处理它
              setImageInfo(JSON.parse(xhr.responseText));
          }
      };
      }}
    />
    <img src={ imageInfo? `data:image/png;base64,${imageInfo.img}`:''} alt="" />
    <Descriptions colon=' :' layout='inline-horizontal' title='predict结果分析' data={imageInfo?.info ?? []} />
  </div>
}

export default ImagePredict
