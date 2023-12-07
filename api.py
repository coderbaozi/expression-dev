import asyncio
import websockets
import json
import pybase64
from PIL import Image
from io import BytesIO
from ultralytics import YOLO
import cv2
import numpy as np
import base64


model = YOLO('./SEAttention-train65/weights/best.pt')

# result = model.predict(source='0',show=True)

def predict(image):
    while True:
        results_list = model.predict(image)
        for results in results_list:
            if results.boxes is not None:
                xyxy_boxes = results.boxes.xyxy
                conf_scores = results.boxes.conf
                cls_ids = results.boxes.cls

                for box, conf, cls_id in zip(xyxy_boxes, conf_scores, cls_ids):
                    x1, y1, x2, y2 = map(int, box)
                    cls_id = int(cls_id)
                    label = model.names[cls_id]
                    confidence = f"{conf:.2f}"
                    # 颜色
                    rectangle_color = (0, 255, 0)
                    label_color = (0, 0, 255)

                    # 在图像上绘制矩形框和标签
                    cv2.rectangle(image, (x1, y1), (x2, y2), rectangle_color, 2)
                    cv2.putText(image, f"{label} {confidence}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, label_color,2)


async def server_handler(socket, path):
    print('客户端{}已连接！'.format(socket.remote_address))
    while True:
        # 等待接收客户端发送的消息
        message = await socket.recv()
        message_obj = json.loads(message)
        if message_obj.get('type') == 'source':
            content = pybase64.b64decode(message_obj.get('content').split(',')[1], altchars=None, validate=True)
            image = Image.open(BytesIO(content))
            image_np = np.array(image)
            while True:
                results_list = model.predict(image)
                for results in results_list:
                    if results.boxes is not None:
                        xyxy_boxes = results.boxes.xyxy
                        conf_scores = results.boxes.conf
                        cls_ids = results.boxes.cls

                        for box, conf, cls_id in zip(xyxy_boxes, conf_scores, cls_ids):
                                x1, y1, x2, y2 = map(int, box)
                                cls_id = int(cls_id)
                                label = model.names[cls_id]
                                confidence = f"{conf:.2f}"
                                # 颜色
                                rectangle_color = (0, 255, 0)
                                label_color = (0, 0, 255)

                                # 在图像上绘制矩形框和标签
                                cv2.rectangle(image_np, (x1, y1), (x2, y2), rectangle_color, 2)
                                cv2.putText(image_np, f"{label} {confidence}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, label_color,2)
                                _, img_encoded = cv2.imencode('.jpg', image_np)
                                image_base64 = base64.b64encode(img_encoded).decode('utf-8')
                                await socket.send(json.dumps({"type":'predict','content':image_base64}))
        else:
            print('客户端{}发送的消息：{}'.format(socket.remote_address, message))
            await socket.send(json.dumps({"type": "response", "content": "收到你的消息啦！"}))

start_server = websockets.serve(server_handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()