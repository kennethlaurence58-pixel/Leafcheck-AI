import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export type Plant = { id:string; name:string; species:string; space:string; health:number; water:string; ph:string; moisture:string; temp:string };
type AppData = {
  plants: Plant[]; archivedPlants: Plant[]; archivedSpaces:string[]; notifications:{id:string;text:string;read:boolean;archived:boolean}[];
  addPlant:(space:string,name:string)=>void; archivePlant:(id:string)=>void; archiveSpace:(name:string)=>void;
  markAllRead:()=>void; archiveNotification:(id:string)=>void;
};
const Ctx=createContext<AppData|null>(null);
const initial:Plant[]=[
 {id:'1',name:'Monstera Deliciosa',species:'Living Room • Added June 2',space:'Porch',health:94,water:'2x / week',ph:'6.4',moisture:'62%',temp:'27 C'},
 {id:'2',name:'Snake Plant',species:'Sansevieria',space:'Garden',health:88,water:'1x / week',ph:'6.7',moisture:'54%',temp:'26 C'},
 {id:'3',name:'Basil',species:'Ocimum basilicum',space:'Table',health:91,water:'3x / week',ph:'6.2',moisture:'67%',temp:'25 C'},
];
export function AppDataProvider({children}:PropsWithChildren){
 const [plants,setPlants]=useState(initial); const [archivedPlants,setArchivedPlants]=useState<Plant[]>([]); const [archivedSpaces,setArchivedSpaces]=useState<string[]>(['Old Balcony']);
 const [notifications,setNotifications]=useState([{id:'1',text:'Water your Snake Plant',read:false,archived:false},{id:'2',text:'Low soil moisture: Tomato',read:false,archived:false},{id:'3',text:'12-day care streak',read:true,archived:false}]);
 const value=useMemo(()=>({plants,archivedPlants,archivedSpaces,notifications,
  addPlant:(space:string,name:string)=>setPlants(p=>[...p,{id:Date.now().toString(),name,species:'New plant',space,health:90,water:'2x / week',ph:'6.5',moisture:'60%',temp:'26 C'}]),
  archivePlant:(id:string)=>setPlants(p=>{const x=p.find(v=>v.id===id); if(x)setArchivedPlants(a=>[...a,x]); return p.filter(v=>v.id!==id)}),
  archiveSpace:(name:string)=>setArchivedSpaces(s=>s.includes(name)?s:[...s,name]), markAllRead:()=>setNotifications(n=>n.map(x=>({...x,read:true}))), archiveNotification:(id:string)=>setNotifications(n=>n.map(x=>x.id===id?{...x,archived:true}:x))
 }),[plants,archivedPlants,archivedSpaces,notifications]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export function useAppData(){const v=useContext(Ctx); if(!v) throw new Error('useAppData outside provider'); return v}
