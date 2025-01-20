'use client'
import { getUserProfile } from '@/contracts/query'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { CategorizedObjects, calculateTotalBalance, formatBalance } from '@/lib/assetsHelpers'
import TextWithCopyIcon from '@/lib/textWithCopy'

export default function Home() {
  const account = useCurrentAccount();
  const [userObjects, setUserObjects] = useState<CategorizedObjects | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (account?.address) {
        try {
          const profile = await getUserProfile(account.address);
          setUserObjects(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else{
        setUserObjects(null);
      }
    }

    fetchUserProfile();
  }, [account]);

  return (
    <div className="min-h-screen flex justify-center">
      {userObjects!=null ? (
      <main className="container flex-grow flex flex-col items-center p-8">        
        {userObjects && (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
            
            <div className="flex gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Coins</h3>
                <div className="h-min-[500px] overflow-y-auto flex flex-wrap">
                {Object.entries(userObjects.coins).map(([coinType, coins]) => {
                  const totalBalance = calculateTotalBalance(coins);
                  return (
                    <div key={coinType} className="mb-4 lg:w-1/2 w-full">
                      <div className='rounded-lg mx-2 p-4 bg-gray-100'>
                        <h4 className="font-medium text-lg">{coinType.split('::').pop()}</h4>
                        <p>Count: {coins.length}</p>
                        <p>Total Balance: {formatBalance(totalBalance)}</p>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
            
            
            <div className="flex gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Other Objects</h3>
                <div className="overflow-y-auto flex flex-wrap">
                  {Object.entries(userObjects.objects).map(([objectType, objects]) => (
                    <div key={objectType} className="relative mb-4 lg:w-1/2 w-full">
                      <div className='rounded-lg mx-2 p-4 bg-gray-100'>
                        <h4 className="font-medium text-lg">{objectType.split('::').pop()}</h4>
                        <p>Count: {objects.length}</p>
                        <p className="text-gray-500 text-sm">{objectType.split('::').pop()}</p>
                        {/* <p className="flex-1 text-gray-500 text-sm overflow-hidden whitespace-nowrap text-ellipsis">{objectType.split('::')[0]}</p> */}
                        <TextWithCopyIcon text={objectType.split('::')[0]}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      ):(
        <div className="flex-grow flex flex-col items-center p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Nextjs Sui Dapp Template</h1>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Please connect your wallet to view your assets</h3>
        </div>        
      )}
    </div>
  );
}
