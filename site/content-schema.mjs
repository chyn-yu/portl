export const IDS = ['aiid','passkeys','grateful','alchemy'];
export function validateContent(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.projects) || value.projects.length !== 4) throw Error('作品数据格式不正确，需要保留四个作品。');
  const limit=(v,n,label,required=true)=>{if(typeof v!=='string'||v.length>n||(required&&!v.trim()))throw Error(label+'内容为空或超出长度限制。');};
  const media=(v,label,optional=false)=>{limit(v,500,label,!optional);if(v&&!/^\/assets\/[a-zA-Z0-9_./-]+$/.test(v))throw Error(label+'必须使用已上传的站内文件。');if(v.split('/').includes('..'))throw Error('文件路径无效。');};
  value.projects.forEach((p,i)=>{
    if(p.id!==IDS[i])throw Error('作品顺序或标识无效。');
    for(const [field,max] of [['title1',80],['title2',80],['description',2500],['catalogTitle',160],['catalogDescription',600]])limit(p[field],max,field,field!=='title2');
    media(p.cover,'封面');media(p.icon,'图标');media(p.video,'视频',true);
    limit(p.href,1000,'作品链接',false);
    if(p.href){let u;try{u=new URL(p.href)}catch{throw Error('作品链接必须是完整的 https 地址。')}if(u.protocol!=='https:')throw Error('作品链接必须以 https:// 开头。');}
  });
  return value;
}
