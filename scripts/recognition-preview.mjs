const imageStyle='position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:0';
export function previewComponent(part){
 const preview='(0,n.jsx)("div",{ref:t,className:"recognition-preview",style:{position:"relative",width:"100%",aspectRatio:"4 / 5",backgroundColor:"#080808",overflow:"hidden"},children:(0,n.jsx)("img",{ref:r,alt:"",style:{'+imageStyle+'}})})';
 const oldStart=part.indexOf('!e&&(0,n.jsx)("div",{ref:t,style:{position:"fixed"'),oldEnd=part.indexOf(',!e&&(0,n.jsx)("div",{ref:E',oldStart);
 if(oldStart<0||oldEnd<0)throw Error('Recognition floating image template not found');
 part=part.slice(0,oldStart)+part.slice(oldEnd+1);
 let count=0;part=part.replace(/\(0,n.jsx\)\("div",\{style:\{display:"flex",flexDirection:"column",gap:(?:"max\(6px, 0.42vw\)"|4)\},children:p.map\([\s\S]*?,t\)\)\}\)/g,()=>{count++;return preview;});
 if(count!==2)throw Error('Recognition preview slots: '+count);
 let start=part.indexOf('I=(0,i.useCallback)'),end=part.indexOf(',H=(0,i.useCallback)',start);
 part=part.slice(0,start)+'I=(0,i.useCallback)((n,i)=>{if(!r.current)return;x.current=n;r.current.src=f[n].image;o.Ay.to(r.current,{opacity:1,duration:.18,overwrite:!0})},[e])'+part.slice(end);
 start=part.indexOf('H=(0,i.useCallback)');end=part.indexOf(',z=(0,i.useCallback)',start);
 part=part.slice(0,start)+'H=(0,i.useCallback)(()=>{x.current=null;r.current&&o.Ay.to(r.current,{opacity:0,duration:.18,overwrite:!0})},[e])'+part.slice(end);
 start=part.indexOf('z=(0,i.useCallback)');end=part.indexOf(';return(0,n.jsxs)("section"',start);
 if(start<0||end<0)throw Error('Recognition pointer handler template not found');
 part=part.slice(0,start)+'z=(0,i.useCallback)(()=>{},[e])'+part.slice(end);
 return part;
}
export function previewMarkup(part){
 part=part.replace(/<div style="position:fixed;[^\"]*"><img[^>]*><\/div>/,'');
 const before=part;
 part=part.replace(/<div style="display:flex;flex-direction:column;gap:max\(6px, 0.42vw\)">[\s\S]*?<\/div>/,'<div class="recognition-preview" style="position:relative;width:100%;aspect-ratio:4 / 5;background-color:#080808;overflow:hidden"><img alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0"/></div>');
 if(part===before)throw Error('Recognition preview SSR slot not found');return part;
}
