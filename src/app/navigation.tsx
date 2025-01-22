'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { ConnectButton } from '@mysten/dapp-kit'
import { Banana } from 'lucide-react'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { networkConfig, suiClient } from '@/contracts/index';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Resources' },
  { path: '/profile', label: 'Profile' },
]

export function Navigation() {
  const pathname = usePathname()
  const account = useCurrentAccount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <div className="flex w-8 items-center rounded-full overflow-hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Banana className='size-8' />
              {/* <Image src="/logo/logo.jpg" alt="Sui Logo" width={80} height={40} /> */}
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground",
                  item.path === pathname && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {account && account.address==networkConfig.testnet.variables.ownerId && <Link href="/admin"
            className={cn(
              "flex items-center text-sm font-medium text-muted-foreground",
              "/admin" === pathname && "text-foreground"
            )}>Manage</Link>}
          </nav>
        </div>
        
        <div className='flex justify-center items-center'>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}