import React, { useState } from 'react';
// import { faCopy } from '@fortawesome/free-solid-svg-icons'; // 引入 Font Awesome 图标
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 引入 Font Awesome React 组件
// import '@fortawesome/fontawesome-free/css/all.css';
import { useToast } from "@/hooks/use-toast";
import {FaCopy} from "react-icons/fa";


 
const TextWithCopyIcon: React.FC<{ text: string }> = ({text}) => {
  const [textToCopy, _] = useState(text);
  const { toast } = useToast()
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        description: "copied！",
      })
    }).catch((err) => {
      toast({
        variant: "destructive",
        title: "can not copy.",
        description: err
      });
    });
  };
 
  return (
    <div className="flex items-center justify-between relative h-4 w-full">
      <div className='absolute flex justify-between w-full'>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {textToCopy}
        </span>
        <button
          className=" bg-gray-50 text-gray-200 px-2 py-1 rounded"
          onClick={handleCopy}
          aria-label="copy" // 添加无障碍标签以描述按钮的用途
        >
          <FaCopy color='gray' />
        </button>
      </div>
    </div>
  );
};
 
export default TextWithCopyIcon;