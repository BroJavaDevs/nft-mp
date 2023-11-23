import {
  Accordion,
  AccordionContent as Content,
  AccordionItem as Item,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IAccordion } from '@/lib/constants'
import Link from 'next/link'
 
export function AccordionItem({ items } : { items: IAccordion[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <Item value={`item-${i+1}`} key={i}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          {item.content.map((c, i) => (
            <Content key={i}>
              <Link href={c.path}>
                {c.name}
              </Link>
            </Content>
          ))}
        </Item>
      ))}
    </Accordion>
  )
}