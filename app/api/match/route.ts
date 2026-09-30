import {NextResponse} from "next/server";
type M={description:string;category:string;uom?:string;size?:string;dimension?:string;grade?:string;standard?:string;};
const n=(s:string)=>s.toLowerCase().replace(/[^a-z0-9. ]/g," ").replace(/\s+/g," ").trim();
const jac=(a:string,b:string)=>{const A=new Set(n(a).split(" ").filter(Boolean)),B=new Set(n(b).split(" ").filter(Boolean));let i=0;A.forEach(x=>B.has(x)&&i++);const u=new Set([...A,...B]).size;return u?i/u:0;};
export async function POST(req:Request){
 const {a,b}=await req.json() as {a:M;b:M};
 const keys=(["category","uom","size","dimension","grade","standard"] as (keyof M)[]);
 let hit=0,conflicts:string[]=[];
 for(const k of keys){const av=a[k],bv=b[k];if(av&&bv&&n(String(av))===n(String(bv)))hit++;else if(av&&bv)conflicts.push(String(k));}
 const semantic=Math.round(jac(a.description,b.description)*1000)/10;
 const attributeCompatibility=Math.round(hit/keys.length*1000)/10;
 const score=Math.round((semantic*.55+attributeCompatibility*.45)*10)/10;
 const blocked=conflicts.some(x=>["grade","dimension","standard","category"].includes(x));
 const decision=blocked?"TECHNICAL CONFLICT":score>=90?"EQUIVALENCE CANDIDATE":score>=72?"MANUAL REVIEW":"NOT EQUIVALENT";
 return NextResponse.json({semantic,attributeCompatibility,score,conflicts,decision,blocked});
}
