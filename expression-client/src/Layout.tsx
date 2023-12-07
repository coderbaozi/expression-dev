import React from "react";
interface LayoutProps extends React.PropsWithChildren {
  header?:React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode 
}

const DefaultLayout:React.FC<LayoutProps> = ({header,content,footer}) => {
  return <div className="flex justify-center">
          <div>{header}</div>
          <div>{content}</div>
          <div>{footer}</div>
        </div>
}

export default DefaultLayout
