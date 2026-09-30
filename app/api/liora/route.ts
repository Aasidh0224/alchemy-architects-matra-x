import {NextResponse} from "next/server";
import {GoogleGenAI} from "@google/genai";

function fallback(q:string){
 const t=q.toLowerCase();
 if(t.includes("sih26099")||t.includes("problem statement"))
  return "SIH26099 targets AI-assisted standardization and harmonization of material master data across CPSEs. MATRA-X addresses identity resolution, duplicate and near-duplicate discovery, functionally-equivalent candidates, technical attribute normalization, proposed common identity/code, legacy mapping, human validation, auditability and ERP-ready integration.";
 if(t.includes("engineering dna"))
  return "Engineering DNA is MATRA-X's structured material identity: type, function, subtype, dimensions, material grade, ratings, standards, UOM, manufacturer/part number, application, criticality, source provenance and evidence completeness.";
 if(t.includes("false merge")||t.includes("contrad")||(t.includes("304")&&t.includes("316")))
  return "MATRA-X treats semantic similarity as candidate evidence, not proof. If a critical attribute conflicts or required evidence is missing, the False-Merge Firewall blocks automatic consolidation and routes the case to human engineering review.";
 if(t.includes("how")||t.includes("workflow")||t.includes("work"))
  return "MATRA-X follows: ingest → schema harmonize → normalize → build Engineering DNA → retrieve candidates → hybrid match → contradiction guard → uncertainty → explain → human review → canonical identity → legacy mapping → prevention → analytics.";
 if(t.includes("benefit")||t.includes("impact"))
  return "MATRA-X is designed to improve material-master quality, cross-CPSE visibility, duplicate prevention, legacy rationalization, procurement analysis, inventory discovery and governance. Financial impact should be measured from validated data.";
 return "I’m LIORA, the grounded MATRA-X Material Intelligence Copilot. I can explain material identity, matching, technical conflicts, Engineering DNA, evidence, governance, common-code proposals, legacy mapping, procurement, inventory and ERP/SAP integration.";
}

export async function POST(req:Request){
 try{
  const body=await req.json();
  const message=String(body.message||"").trim();
  if(!message)return NextResponse.json({mode:"fallback",reply:"Please enter a question."},{status:400});
  const key=process.env.GEMINI_API_KEY;
  if(!key)return NextResponse.json({mode:"grounded-fallback",reply:fallback(message)});
  const ai=new GoogleGenAI({apiKey:key});
  const model=process.env.GEMINI_MODEL||"gemini-3.8-flash";
  const instruction=[
   "You are LIORA, the grounded Material Intelligence Copilot inside MATRA-X for SIH26099.",
   "Use supplied MATRA-X context. Explain industrial material standardization and harmonization clearly.",
   "Never invent confidential CPSE data, certification facts or financial savings. Demo/synthetic values must be identified as such.",
   "Never equate semantic similarity with technical equivalence. Missing or conflicting critical evidence must trigger human review.",
   "Prefer evidence-first answers and explain which fields support or contradict a conclusion.",
   "User question:",message,
   "MATRA-X context:",JSON.stringify(body.context||{})
  ].join("\\n\\n");
  const result=await ai.interactions.create({model,input:instruction});
  return NextResponse.json({mode:"gemini",reply:result.output_text||fallback(message)});
 }catch{
  return NextResponse.json({mode:"grounded-fallback",reply:fallback("")});
 }
}
