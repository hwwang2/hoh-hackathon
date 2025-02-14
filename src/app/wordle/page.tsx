'use client'
import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { useToast } from '@/hooks/use-toast'
import { R, WordleGuess, WordleDetail } from "@/types";
import {fetchData} from "@/lib/utils"
import Link from "next/link";

function App() {
  const [items, setItems] = useState<WordleDetail[]>([]); // 存储所有项目
  const [page, setPage] = useState(1);    // 当前页码
  const [loading, setLoading] = useState(false); // 是否正在加载中

  const { toast } = useToast();

  const loadMoreItems = async () => {
    if (loading) return;
    setLoading(true);
    fetchData<WordleDetail[]>("/api/wordle?action=list&page="+page).then(res=>{
      setItems([...items, ...res]);
      if(res){
        setPage(page + 1);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreItems();
    };
  
    window.addEventListener('scroll', handleScroll);
    loadMoreItems();
    // 清理函数
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // 确保依赖项正确，以避免不必要的调用或内存泄露


  return (
    <div className="py-8 mx-auto flex flex-wrap">
        {items.map(item => (
          <GameCard wordle={item} />
          // <li key={item.id}><Link href={"./wordle/"+item.id}>{item.word}</Link></li>
        ))}
      {loading && <p className="w-full text-center">Loading more items...</p>}
    </div>
  );
}

export default App;
