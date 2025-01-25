import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { R } from "@/types";
import kk from 'keccak256';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandomString(length: number) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
  }
  return result;
}

export function keccak256(content: string): Uint8Array{
  return kk(content);
}

// 定义一个泛型函数来获取数据并解析为特定类型
export async function fetchData<T>(url: string): Promise<T> {
  try {
    // 使用 Fetch API 发送 GET 请求
    const response = await fetch(url);

    // 检查响应是否成功（状态码 200-299）
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON 响应
    const apiResponse: R<T> = await response.json();
    if(!apiResponse.ok){
      console.error('Error fetching data:', apiResponse.desc);
      throw new Error(apiResponse.desc);
    }    
    // 返回数据部分
    return apiResponse.data;
  } catch (error) {
    // 处理错误并打印到控制台或重新抛出
    console.error('Error fetching data:', error);
    throw error;
  }
}
