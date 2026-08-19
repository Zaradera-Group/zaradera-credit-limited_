import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'
export default function sitemap():MetadataRoute.Sitemap { const routes=['','/about','/solutions','/diaspora','/contact','/faq','/insights','/privacy','/terms','/cookies']; return routes.map(route=>({url:`${siteConfig.url}${route}`,lastModified:new Date(),changeFrequency:route===''?'weekly':'monthly',priority:route===''?1:route==='/solutions'||route==='/diaspora'?0.9:0.7})) }
