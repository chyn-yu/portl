const imageStyle='position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",display:"block",opacity:0';
export function previewComponent(part){
 part=part.replace('r=(0,i.useRef)(null)','r=(0,i.useRef)([])');
 part=part.replaceAll('children:f.map((e,t)=>(0,n.jsxs)("div",{','children:f.map((e,t)=>(0,n.jsxs)("div",{className:"recognition-row",role:"button",tabIndex:0,onPointerDown:e=>{if(e.pointerType==="mouse"&&e.button===0)I(t,e)},onClick:e=>I(t,e),onKeyDown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();I(t,e)}},');
 part=part.replaceAll('onMouseEnter:e=>{I(t,e),b(t)},','').replaceAll('onMouseLeave:()=>b(null),','').replaceAll('onMouseLeave:()=>{H(),b(null)},','');
 part=part.replaceAll('color:null!==w&&w!==t?"#2e2e2e":"#fafafa"','color:"#fafafa"').replaceAll('color:null!==w&&w!==t?"#2e2e2e":w===t?"#fafafa":"#777"','color:"#777"').replaceAll('color:null!==w&&w!==t?"#2e2e2e":"#777"','color:"#777"');
 const preview='(0,n.jsx)("div",{ref:t,className:"recognition-preview",style:{position:"relative",width:"100%",aspectRatio:"4 / 5",backgroundColor:"#080808",overflow:"hidden"},children:f.map((entry,index)=>(0,n.jsx)("img",{ref:img=>{r.current[index]=img},src:entry.image,alt:entry.award,loading:"lazy",decoding:"async",fetchPriority:"low",style:{'+imageStyle+'}},index))})';
 const oldStart=part.indexOf('!e&&(0,n.jsx)("div",{ref:t,style:{position:"fixed"'),oldEnd=part.indexOf(',!e&&(0,n.jsx)("div",{ref:E',oldStart);
 if(oldStart<0||oldEnd<0)throw Error('Recognition floating image template not found');
 part=part.slice(0,oldStart)+part.slice(oldEnd+1);
 let count=0;part=part.replace(/\(0,n.jsx\)\("div",\{style:\{display:"flex",flexDirection:"column",gap:(?:"max\(6px, 0.42vw\)"|4)\},children:p.map\([\s\S]*?,t\)\)\}\)/g,()=>{count++;return preview;});
 if(count!==2)throw Error('Recognition preview slots: '+count);
 let start=part.indexOf('I=(0,i.useCallback)'),end=part.indexOf(',H=(0,i.useCallback)',start);
 part=part.slice(0,start)+'I=(0,i.useCallback)((n,i)=>{if(!r.current[n]||x.current===n)return;const previous=r.current[x.current];if(previous)previous.style.opacity="0";x.current=n;r.current[n].style.opacity="1"},[e])'+part.slice(end);
 start=part.indexOf('H=(0,i.useCallback)');end=part.indexOf(',z=(0,i.useCallback)',start);
 part=part.slice(0,start)+'H=(0,i.useCallback)(()=>{},[e])'+part.slice(end);
 start=part.indexOf('z=(0,i.useCallback)');end=part.indexOf(';return(0,n.jsxs)("section"',start);
 if(start<0||end<0)throw Error('Recognition pointer handler template not found');
 part=part.slice(0,start)+'z=(0,i.useCallback)(()=>{},[e])'+part.slice(end);
 const marker=';return(0,n.jsxs)("section"';
 part=part.replace(marker,';(0,i.useEffect)(()=>{const frame=t.current;if(!frame)return;const warm=()=>r.current.forEach(img=>{if(img){img.loading="eager";if(img.decode)img.decode().catch(()=>{})}});if(!window.IntersectionObserver){warm();return}const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){warm();observer.disconnect()}},{rootMargin:"1800px"});observer.observe(frame);return()=>observer.disconnect()},[e])'+marker);
 return part;
}
export function previewMarkup(part,entries){
 part=part.replace(/<div style="position:fixed;[^\"]*"><img[^>]*><\/div>/,'');
 const before=part;
 const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 const images=entries.map(entry=>'<img src="'+escape(entry.image)+'" alt="'+escape(entry.award)+'" loading="lazy" decoding="async" fetchPriority="low" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center;display:block;opacity:0"/>').join('');
 part=part.replace(/<div style="display:flex;flex-direction:column;gap:max\(6px, 0.42vw\)">[\s\S]*?<\/div>/,'<div class="recognition-preview" style="position:relative;width:100%;aspect-ratio:4 / 5;background-color:#080808;overflow:hidden">'+images+'</div>');
 if(part===before)throw Error('Recognition preview SSR slot not found');return part;
}
