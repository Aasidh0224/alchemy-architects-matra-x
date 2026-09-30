import {NextResponse} from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"MATRA-X",version:"2.0",time:new Date().toISOString()});}
