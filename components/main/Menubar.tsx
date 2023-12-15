"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { CgMenu } from 'react-icons/cg'
import { AccordionItem } from './AccordionItem'
import { MENU_LIST } from '@/lib/constants'

export default function Menubar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CgMenu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Jars</SheetTitle>
          <SheetDescription>
            Unlocking Digital Rarity: Where Every Byte Holds Infinite Value ($)
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <AccordionItem items={MENU_LIST}/>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
