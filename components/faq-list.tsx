'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqCategories } from '@/lib/site.config'
export function FaqList(){const [open,setOpen]=useState<string|null>(null);return <div className="space-y-12">{faqCategories.map(group=><section key={group.category}><h2 className="text-2xl font-bold">{group.category}</h2><div className="mt-5 divide-y border-y">{group.items.map(item=>{const id=`${group.category}-${item.q}`;const active=open===id;return <div key={item.q}><button className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold" aria-expanded={active} onClick={()=>setOpen(active?null:id)}>{item.q}<ChevronDown className={`size-5 shrink-0 transition ${active?'rotate-180':''}`}/></button>{active&&<p className="max-w-3xl pb-6 leading-relaxed text-muted-foreground">{item.a}</p>}</div>})}</div></section>)}</div>}
