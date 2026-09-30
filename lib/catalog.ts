export type Material={
  id:string; source:string; description:string; category:string; family:string; uom:string;
  size?:string; dimension?:string; grade?:string; standard?:string; pressure?:string;
  manufacturer?:string; part?:string; canonical:string; critical:boolean;
  sourceType:"demo"|"public"|"synthetic";
};

export const seedMaterials:Material[]=[
{id:"CPCL-0018472",source:"CPCL",description:"HEX HEAD BOLT M16 X 80 SS304",category:"FASTENERS",family:"BOLTS",uom:"EA",size:"M16",dimension:"80 mm",grade:"SS304",standard:"DIN 933",canonical:"CM-000001",critical:true,sourceType:"demo"},
{id:"ONGC-0077341",source:"ONGC",description:"SS 304 HEX HD BOLT 16MM-80MM",category:"FASTENERS",family:"BOLTS",uom:"EA",size:"M16",dimension:"80 mm",grade:"SS304",standard:"DIN 933",canonical:"CM-000001",critical:true,sourceType:"demo"},
{id:"SAIL-0055182",source:"SAIL",description:"HEXAGONAL HEAD BOLT M16 X 80MM SS304",category:"FASTENERS",family:"BOLTS",uom:"EA",size:"M16",dimension:"80 mm",grade:"SS304",standard:"DIN 933",canonical:"CM-000001",critical:true,sourceType:"demo"},
{id:"CPCL-0018231",source:"CPCL",description:"VALVE GATE 2 IN 150# FLANGED CS",category:"VALVES",family:"GATE VALVES",uom:"EA",size:"2 IN",dimension:"150",grade:"CARBON STEEL",standard:"API 600",pressure:"CLASS 150",canonical:"CM-000002",critical:true,sourceType:"demo"},
{id:"ONGC-0088201",source:"ONGC",description:"2IN GATE VALVE CL150 CS RF FLG",category:"VALVES",family:"GATE VALVES",uom:"EA",size:"2 IN",dimension:"150",grade:"CARBON STEEL",standard:"API 600",pressure:"CLASS 150",canonical:"CM-000002",critical:true,sourceType:"demo"},
{id:"SAIL-0045211",source:"SAIL",description:"GATE VLV 2 INCH CLASS 150 CARBON STEEL",category:"VALVES",family:"GATE VALVES",uom:"EA",size:"2 IN",dimension:"150",grade:"CARBON STEEL",standard:"API 600",pressure:"CLASS 150",canonical:"CM-000002",critical:true,sourceType:"demo"},
{id:"CPCL-ERR-0001",source:"CPCL",description:"HEX BOLT M16 X 90 SS304",category:"FASTENERS",family:"BOLTS",uom:"EA",size:"M16",dimension:"90 mm",grade:"SS304",standard:"DIN 933",canonical:"CM-ERR-001",critical:true,sourceType:"demo"},
{id:"ONGC-ERR-0001",source:"ONGC",description:"HEX BOLT M16 X 80 SS316",category:"FASTENERS",family:"BOLTS",uom:"EA",size:"M16",dimension:"80 mm",grade:"SS316",standard:"DIN 933",canonical:"CM-ERR-001",critical:true,sourceType:"demo"},
{id:"NTPC-042981",source:"NTPC",description:"CABLE PWR 240MM2 1C STRANDED AL 11KV",category:"ELECTRICAL",family:"POWER CABLES",uom:"M",size:"240 MM2",dimension:"1C",grade:"AL",standard:"11KV",canonical:"CM-000031",critical:true,sourceType:"public"},
{id:"OIL-008721",source:"OIL INDIA",description:"LINE PIPE 2 IN ERW GALVANISED SCREWED",category:"PIPES",family:"LINE PIPE",uom:"M",size:"2 IN",dimension:"ERW",grade:"GALVANISED",standard:"API",canonical:"CM-000047",critical:true,sourceType:"public"},
{id:"IOCL-PP-0118",source:"IOCL",description:"Pumps 275 Nos procurement plan",category:"ROTATING EQUIPMENT",family:"PUMPS",uom:"NOS",canonical:"CM-000081",critical:false,sourceType:"public"},
{id:"OIL-VAL-0412",source:"OIL INDIA",description:"GATE VALVE - STEEL",category:"VALVES",family:"GATE VALVES",uom:"EA",grade:"STEEL",canonical:"CM-000091",critical:true,sourceType:"public"}
];

export const sources=[
{title:"SIH26099 Public Working Corpus",rows:21513,kind:"Public research corpus",url:"https://huggingface.co/datasets/sarthak20024/sih26099-cpse-material-codes"},
{title:"UNSPSC Master Taxonomy",rows:71502,kind:"Reference taxonomy",url:"https://huggingface.co/datasets/sarthak20024/sih26099-cpse-material-codes"},
{title:"Product Classification & Clustering",rows:null,kind:"Auxiliary entity-matching dataset",url:"https://www.kaggle.com/datasets/lakritidis/product-clustering-matching-classification"},
{title:"Product Data Mining / Entity Linking",rows:null,kind:"Auxiliary entity-matching dataset",url:"https://www.kaggle.com/datasets/ziqizhang/product-data-miningentity-classificationlinking"},
{title:"Product Titles Text Classification",rows:null,kind:"Auxiliary NLP dataset",url:"https://www.kaggle.com/datasets/asaniczka/product-titles-text-classification"}
];

export const virtualUniverse=1018427;

export function virtualMaterials(count=120):Material[]{
 const cats=[["FASTENERS","BOLTS"],["FASTENERS","NUTS"],["FASTENERS","WASHERS"],["VALVES","GATE VALVES"],["VALVES","GLOBE VALVES"],["VALVES","CHECK VALVES"],["PIPES","LINE PIPE"],["PIPES","FITTINGS"],["ROTATING EQUIPMENT","PUMPS"],["ROTATING EQUIPMENT","BEARINGS"],["ELECTRICAL","POWER CABLES"],["ELECTRICAL","SWITCHGEAR"],["INSTRUMENTATION","SENSORS"],["GASKETS & SEALS","GASKETS"],["STRUCTURAL","PLATES"]];
 const sizes=["M6","M8","M10","M12","M16","M20","M24","1/2 IN","1 IN","2 IN","3 IN","4 IN","6 IN","8 IN"];
 const grades=["SS304","SS316","CARBON STEEL","AL","BRONZE","EPDM","NBR"];
 const standards=["ISO","DIN","API 600","ASTM","IEC","IS"];
 return Array.from({length:count},(_,i)=>{
   const [category,family]=cats[i%cats.length];
   const size=sizes[(i*7)%sizes.length];
   const grade=grades[(i*5)%grades.length];
   const standard=standards[(i*3)%standards.length];
   return {id:"VX-"+String(i+1).padStart(7,"0"),source:"SIMULATED CPSE UNIVERSE",description:family+" "+size+" "+grade+" "+standard,category,family,uom:["EA","NOS","M","KG"][i%4],size,dimension:(25+(i%240))+" mm",grade,standard,canonical:"CM-V-"+String(100000+i).padStart(6,"0"),critical:i%9===0,sourceType:"synthetic"};
 });
}
