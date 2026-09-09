'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export function DeletePostButton({id}:{id:string}){const router=useRouter();const [busy,setBusy]=useState(false);async function remove(){if(!window.confirm('Delete this post permanently?'))return;setBusy(true);const response=await fetch('/api/admin/posts',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});if(response.ok)router.refresh();else{const result=await response.json();alert(result.error||'The post could not be deleted.')}setBusy(false)}return <button type="button" disabled={busy} onClick={remove} className="text-red-700 disabled:opacity-50">{busy?'Deleting…':'Delete'}</button>}
