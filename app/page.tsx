"use client";

import {useMemo,useState} from "react";
import {seedMaterials,virtualMaterials,virtualUniverse,sources,Material} from "../lib/catalog";

type View="command"|"explorer"|"workbench"|"counterfactual"|"graph"|"governance"|"procurement"|"copilot"|"data";

const nav:{id:View;label:string;icon:string}[]=[
 {id:"command",label:"Command Center",icon:"◈"},
 {id:"explorer",label:"Material Explorer",icon:"⌕"},
 {id:"workbench",label:"Match Workbench",icon:"⇄"},
 {id:"counterfactual",label:"Counterfactual Lab",icon:"◎"},
 {id:"graph",label:"Knowledge Graph",icon:"◉"},
 {id:"governance",label:"Governance",icon:"✓"},
 {id:"procurement",label:"Procurement Intel",icon:"◇"},
 {id:"copilot",label:"LIORA Copilot",icon:"✦"},
 {id:"data",label:"Data & Models",icon:"▦"}
];

function Field({name,value}:{name:string;value?:string}){return <div><span>{name}</span><b>{value||"—"}</b></div>}
function Metric({label,value,sub,tone}:{label:string;value:string;sub:string;tone:string}){return <div className="card"><div className="label">{label}</div><div className={"metric "+tone}>{value}</div><div className={"status "+tone}>{sub}</div></div>}

export default function Home(){
 const [view,setView]=useState<View>("command");
 const [materials,setMaterials]=useState<Material[]>(seedMaterials);
 const [query,setQuery]=useState("");
 const [selected,setSelected]=useState(0);
 const [selectedB,setSelectedB]=useState(1);
 const [cfLen,setCfLen]=useState(80);
 const [cfGrade,setCfGrade]=useState("SS304");
 const [cfPressure,setCfPressure]=useState("150");
 const [messages,setMessages]=useState([{role:"ai",text:"I’m LIORA, the grounded MATRA-X Material Intelligence Copilot. Ask about SIH26099, material identity, matching, technical conflicts, governance, procurement or the dashboard."}]);
 const [input,setInput]=useState("");
 const [loading,setLoading]=useState(false);
 const [csvName,setCsvName]=useState("");

 const filtered=useMemo(()=>materials.filter(m=>(m.id+" "+m.description+" "+m.category+" "+m.family).toLowerCase().includes(query.toLowerCase())).slice(0,120),[materials,query]);
 const a=materials[selected]||seedMaterials[0];
 const b=materials[selectedB]||seedMaterials[1];
 const conflict=a.grade&&b.grade&&a.grade!==b.grade;
 const cfConflict=cfLen!==80||cfGrade!=="SS304"||cfPressure!=="150";
 const title=nav.find(x=>x.id===view)?.label||"Command Center";

 async function askLiora(){
  if(!input.trim()||loading)return;
  const q=input.trim();
  setMessages(v=>[...v,{role:"user",text:q}]);
  setInput("");
  setLoading(true);
  try{
   const res=await fetch("/api/liora",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,context:{material:a,materialB:b,view}})});
   const data=await res.json();
   setMessages(v=>[...v,{role:"ai",text:data.reply||"No grounded response available."}]);
  }catch{
   setMessages(v=>[...v,{role:"ai",text:"LIORA could not reach the model service. The app can still operate in grounded fallback mode."}]);
  }finally{setLoading(false);}
 }

 function importCsv(file:File){
  setCsvName(file.name);
  const reader=new FileReader();
  reader.onload=()=>{
   const raw=String(reader.result||"");
   const lines=raw.split(/\r?\n/).filter(Boolean);
   if(lines.length<2)return;
   const headers=lines[0].split(",").map(x=>x.trim().toLowerCase());
   const rows=lines.slice(1,81).map((line,i)=>{
    const parts=line.split(",");
    const get=(keys:string[])=>{for(const k of keys){const idx=headers.indexOf(k);if(idx>=0)return (parts[idx]||"").trim();}return undefined;};
    return {
     id:get(["material_code","id"])||"CSV-"+(i+1),
     source:get(["source","cpse"])||"IMPORTED",
     description:get(["description","material_description","material_desc"])||"Imported material",
     category:get(["category","material_group"])||"UNCLASSIFIED",
     family:get(["family","subcategory"])||"UNKNOWN",
     uom:get(["uom","unit"])||"EA",
     size:get(["size","nominal_size"]),
     dimension:get(["dimension","dimensions"]),
     grade:get(["grade","material_grade"]),
     standard:get(["standard","specification"]),
     pressure:get(["pressure","pressure_class"]),
     canonical:get(["canonical","common_id"])||"CM-CSV-"+(i+1),
     critical:false,
     sourceType:"public" as const
    };
   });
   setMaterials(rows);
  };
  reader.readAsText(file);
 }

 return <div className="app">
  <aside className="side">
   <div className="brand"><div className="logo"/><div><h1>MATRA-X</h1><small>ALCHEMY ARCHITECTS</small></div></div>
   <div className="eyebrow" style={{margin:"4px 8px 12px"}}>Material Intelligence</div>
   <nav className="nav">{nav.map(n=><button key={n.id} className={view===n.id?"active":""} onClick={()=>setView(n.id)}><span>{n.icon}</span><span>{n.label}</span></button>)}</nav>
   <div className="sidefoot"><div className="online"><span className="dot"/> Systems online</div><div className="subtle">SIH26099 · Software</div><div className="subtle">Cloud-ready · v2.0</div></div>
  </aside>

  <main className="main">
   <div className="top">
    <div><div className="eyebrow">NATIONAL MATERIAL INTELLIGENCE LAYER</div><h2 className="title">{title}</h2><p className="subtitle">AI-assisted material identity resolution, contradiction-aware harmonization, evidence, governance and cross-CPSE intelligence.</p></div>
    <div className="actions"><button className="btn" onClick={()=>document.getElementById("csv")?.click()}>＋ Ingest CSV</button><button className="btn primary" onClick={()=>setMaterials(virtualMaterials(500))}>Load benchmark sample</button><input id="csv" type="file" accept=".csv,text/csv" style={{display:"none"}} onChange={e=>e.target.files?.[0]&&importCsv(e.target.files[0])}/></div>
   </div>

   {view==="command"&&<><section className="hero"><div className="eyebrow cyan">UNDERSTAND → COMPARE → CHALLENGE → EXPLAIN → GOVERN</div><h2>One material. One governed identity.</h2><p>MATRA-X turns fragmented CPSE material records into structured Engineering DNA, discovers equivalence candidates, blocks critical contradictions, preserves legacy traceability and exposes procurement intelligence.</p><div className="chips"><span className="chip">Engineering DNA 2.0</span><span className="chip">Hybrid Matching</span><span className="chip">False-Merge Firewall</span><span className="chip">Evidence Fusion</span><span className="chip">LIORA</span></div></section>
   <div className="grid four section"><Metric label="Material universe" value={virtualUniverse.toLocaleString()+"+"} sub="1M+ virtual scale capacity" tone="cyan"/><Metric label="Public SIH corpus" value="21,513" sub="research rows" tone="green"/><Metric label="UNSPSC reference" value="71,502" sub="taxonomy rows" tone="violet"/><Metric label="Safety policy" value="VETO" sub="critical conflict guard" tone="red"/></div>
   <div className="grid two section"><div className="panel"><div className="sectiontitle"><h3>Cross-category intelligence</h3><span className="pill">prototype telemetry</span></div><div className="bars">{[74,92,64,49,84,58].map((h,i)=><div className="barcol" key={i}><div className="bar" style={{height:h+"%"}}/><div className="barlabel">{["FAST","VALVE","PIPE","BEAR","SEAL","INST"][i]}</div></div>)}</div><div className="small">Replace illustrative telemetry with measured benchmark results before external judging.</div></div><div className="panel"><div className="sectiontitle"><h3>Decision safety</h3><span className="pill">risk-aware</span></div><div style={{position:"relative"}}><div className="ring"/><div className="ringtext">92%</div></div><div className="small centertext">Evidence completeness target · hard conflicts veto automatic consolidation</div></div></div></>}

   {view==="explorer"&&<><div className="panel"><div className="searchrow"><input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search code, description, category, family…"/><span className="pill">{materials.length} loaded · {virtualUniverse.toLocaleString()} virtual capacity</span></div></div><div className="panel section"><table className="table"><thead><tr><th>Source</th><th>Code</th><th>Description</th><th>Category</th><th>Grade</th><th>Canonical</th></tr></thead><tbody>{filtered.map(m=><tr key={m.id} onClick={()=>{const i=materials.findIndex(x=>x.id===m.id);setSelected(i);setView("workbench")}}><td>{m.source}</td><td>{m.id}</td><td>{m.description}</td><td><span className="pill">{m.category}</span></td><td>{m.grade||"—"}</td><td><span className="pill">{m.canonical}</span></td></tr>)}</tbody></table><div className="footer">Demo and synthetic records are labelled. Public source references appear under Data & Models.</div></div></>}

   {view==="workbench"&&<><div className="workbench"><div className="panel record"><h4>{a.source} · {a.id}</h4><p className="small">{a.description}</p><div className="kv"><Field name="Category" value={a.category}/><Field name="Family" value={a.family}/><Field name="Size" value={a.size}/><Field name="Dimension" value={a.dimension}/><Field name="Grade" value={a.grade}/><Field name="Standard" value={a.standard}/><Field name="UOM" value={a.uom}/><Field name="Pressure" value={a.pressure}/></div></div><div className="panel center"><div className={conflict?"score red":"score cyan"}>{conflict?"BLOCK":"96.4%"}</div><div className="small">{conflict?"Technical conflict":"candidate equivalence"}</div><button className="btn primary" onClick={()=>setView("governance")}>Open governance</button></div><div className="panel record"><h4>{b.source} · {b.id}</h4><p className="small">{b.description}</p><div className="kv"><Field name="Category" value={b.category}/><Field name="Family" value={b.family}/><Field name="Size" value={b.size}/><Field name="Dimension" value={b.dimension}/><Field name="Grade" value={b.grade}/><Field name="Standard" value={b.standard}/><Field name="UOM" value={b.uom}/><Field name="Pressure" value={b.pressure}/></div></div></div><div className="grid two section"><div className="panel"><div className="sectiontitle"><h3>Evidence matrix</h3><span className="pill">hybrid</span></div>{[["Category",a.category,b.category],["Size",a.size,b.size],["Dimension",a.dimension,b.dimension],["Grade",a.grade,b.grade],["Standard",a.standard,b.standard],["UOM",a.uom,b.uom]].map(r=><div key={r[0]} className="split" style={{padding:"9px 0",borderBottom:"1px solid #14273d"}}><span>{r[0]}</span><b className={r[1]===r[2]?"green":"red"}>{r[1]===r[2]?"MATCH":"CONFLICT"}</b></div>)}</div><div className="panel"><div className="sectiontitle"><h3>Decision reasoning</h3><span className={conflict?"pill red":"pill"}>{conflict?"AUTO-MERGE BLOCKED":"CANDIDATE"}</span></div><p className="small">Semantic retrieval proposes the pair. Structured Engineering DNA validates compatibility. The contradiction guard can veto unsafe consolidation. Human approval creates the governed mapping.</p><div className="signalbox"><div className="split"><span>False-Merge Firewall</span><b className={conflict?"red":"green"}>{conflict?"TRIGGERED":"CLEAR"}</b></div><div className="progress" style={{marginTop:9}}><span style={{width:(conflict?42:94)+"%"}}/></div></div></div></div></>}

   {view==="counterfactual"&&<div className="cfgrid"><div className="panel"><div className="sectiontitle"><h3>Engineering DNA sandbox</h3><span className="pill">counterfactual</span></div><div className="kv"><Field name="Type" value="HEX HEAD BOLT"/><Field name="Size" value="M16"/><Field name="Baseline" value="SS304 · 80 mm · Class 150"/></div><div style={{marginTop:18}}><div className="small">Length: {cfLen} mm</div><input className="slider" type="range" min="40" max="140" value={cfLen} onChange={e=>setCfLen(+e.target.value)}/></div><div style={{marginTop:16}}><div className="small">Material grade</div><select className="select" value={cfGrade} onChange={e=>setCfGrade(e.target.value)}><option>SS304</option><option>SS316</option><option>CARBON STEEL</option></select></div><div style={{marginTop:16}}><div className="small">Pressure class</div><select className="select" value={cfPressure} onChange={e=>setCfPressure(e.target.value)}><option>150</option><option>300</option><option>600</option></select></div></div><div className="panel"><div className="sectiontitle"><h3>Counterfactual decision</h3><span className="pill">{cfConflict?"challenge":"baseline"}</span></div><div className={"metric "+(cfConflict?"red":"green")}>{cfConflict?"BLOCKED":"96.8%"}</div><p className="small">{cfConflict?"Critical material attributes changed. MATRA-X blocks or routes the candidate to engineering review.":"All tested baseline attributes remain aligned."}</p><div className="signalbox"><div className="split"><span>Changed attributes</span><b>{[cfLen!==80,cfGrade!=="SS304",cfPressure!=="150"].filter(Boolean).length}</b></div></div></div></div>}

   {view==="graph"&&<><div className="threeD"><div className="cube">{["f1","f2","f3","f4","f5","f6"].map(x=><div key={x} className={"face "+x}/>)}</div><div className="node n1">CPCL · MAT-18472</div><div className="node n2">ONGC · MAT-77341</div><div className="node n3">CNMC · CM-000001</div><div className="node n4">DIN 933 · SS304 · M16</div></div><div className="grid three section"><Metric label="Graph edges" value="12,842" sub="demo relationship graph" tone="cyan"/><Metric label="Evidence nodes" value="4,118" sub="source-linked demo" tone="violet"/><Metric label="Trace depth" value="7" sub="source → decision layers" tone="green"/></div></>}

   {view==="governance"&&<div className="grid two"><div className="panel"><div className="sectiontitle"><h3>Risk-based review queue</h3><span className="pill">human-in-loop</span></div>{["Critical attribute conflict","Incomplete technical evidence","High semantic / low structural match","Potential duplicate cluster"].map((x,i)=><div key={x} className="source"><div><b>{x}</b><div className="small">{i+2} items · reviewer action required</div></div><button className="btn">Inspect</button></div>)}</div><div className="panel"><div className="sectiontitle"><h3>Secure action gate</h3><span className="pill">Passkey / WebAuthn ready</span></div><p className="small">Prototype gate for high-risk approvals. Production implementation should use WebAuthn/passkeys so raw biometric material is never stored by MATRA-X.</p><div className="actionrow"><button className="btn primary">Verify device</button><button className="btn">Audit log</button></div></div></div>}

   {view==="procurement"&&<div className="grid two"><div className="panel"><div className="sectiontitle"><h3>Cross-CPSE opportunity</h3><span className="pill">decision support</span></div><div className="kv"><Field name="CPSE A demand" value="12,000 units"/><Field name="CPSE B demand" value="17,000 units"/><Field name="CPSE C demand" value="21,000 units"/><Field name="Combined visibility" value="50,000 units"/></div><div className="signalbox" style={{marginTop:14}}><b className="cyan">Aggregation opportunity</b><div className="small">Scenario data for prototype demonstration. Do not present as verified savings.</div></div></div><div className="panel"><div className="sectiontitle"><h3>Inventory intelligence</h3><span className="pill">BUY · TRANSFER · REVIEW</span></div>{["Local stock match","Cross-CPSE equivalent","Potential dormant stock","Substitution candidate"].map((x,i)=><div key={x} style={{margin:"13px 0"}}><div className="split"><span>{x}</span><b className={i===2?"amber":"green"}>{[82,71,64,55][i]}%</b></div><div className="progress" style={{marginTop:7}}><span style={{width:[82,71,64,55][i]+"%"}}/></div></div>)}</div></div>}

   {view==="copilot"&&<div className="panel chat"><div className="messages">{messages.map((m,i)=><div key={i} className={"msg "+(m.role==="ai"?"ai":"user")}>{m.text}</div>)}{loading&&<div className="msg ai">LIORA is reasoning over MATRA-X context…</div>}</div><div><div className="chips"><button className="chip" onClick={()=>setInput("Why is semantic similarity alone not enough?")}>Why not embeddings alone?</button><button className="chip" onClick={()=>setInput("Explain Engineering DNA.")}>Engineering DNA</button><button className="chip" onClick={()=>setInput("How does the False-Merge Firewall work?")}>False-Merge Firewall</button></div><div className="compose"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askLiora()} placeholder="Ask LIORA anything about MATRA-X…"/><button className="btn primary" onClick={askLiora}>Send</button></div></div></div>}

   {view==="data"&&<><div className="grid two"><div className="panel"><div className="sectiontitle"><h3>Data sources</h3><span className="pill">{csvName||"demo + public references"}</span></div>{sources.map(s=><div className="source" key={s.title}><div><b>{s.title}</b><div className="small">{s.kind}{s.rows?(" · "+s.rows.toLocaleString()+" rows"):""}</div></div><a href={s.url} target="_blank" rel="noreferrer">Open ↗</a></div>)}</div><div className="panel"><div className="sectiontitle"><h3>Scale simulator</h3><span className="pill">virtual</span></div><div className="metric cyan">{virtualUniverse.toLocaleString()}+</div><div className="small">Designed capacity demonstration, not confidential CPSE production data.</div><button className="btn primary" style={{marginTop:12}} onClick={()=>setMaterials(virtualMaterials(500))}>Generate synthetic sample</button><div className="upload" style={{marginTop:14}}>Upload a permitted CSV to run the explorer and matching demo on your own dataset.</div></div></div><div className="grid three section"><Metric label="Retrieval" value="Vector-ready" sub="candidate generation" tone="cyan"/><Metric label="Reasoner" value="Gemini + fallback" sub="server-side LLM route" tone="violet"/><Metric label="Governance" value="Human" sub="review + audit" tone="green"/></div></>}

   <div className="footer">MATRA-X · Alchemy Architects · SIH26099 · Prototype/demo values are labelled. The public SIH26099 corpus and auxiliary datasets are source references, not confidential CPSE ground truth.</div>
  </main>
 </div>
}
