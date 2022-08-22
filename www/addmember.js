module.export= ()=>{var pattern='';var partners=[];var test="sqdqsdqs";var addmember_cls = function(){return {getpartners_byname:(id)=>{return app.request({method:'GET',url:'/project/partners/names?pattern='+id});}
};}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'',style:''}, [m('.form-group',[m('label',{for:'input17_42_3' },'Add member'),m('input', {id:'input17_42_3',name:'input17_42_3',class:'form-control form-control-sm',type:'text',oninput:(e)=>{pattern=e.target.value;
if(pattern.length==3)
addmember_cls.getpartners_byname(pattern).then(
        (d)=>{
            if(d && d.status=='ok'){
                partners=d.data;
            }
        }
    )},value:pattern})]),m('div',{class:'list-group',style:''},partners.map((it,itx)=>{if(it.partner.name.startsWith(pattern))return m('a',{id:'link14',onclick:()=>{vnode.attrs.data.id=it.id;
vnode.attrs.data.partner=it.partner;
partners=[];
pattern=it.partner.name+' '+it.partner.others;
}},[m('button',{class:'list-group-item list-group-item-action'},[m('a',{id:'link52_6_16',onclick:()=>{vnode.attrs.data.id=it.id;
vnode.attrs.data.partner=it.partner;
partners=[];
pattern=it.partner.name+' '+it.partner.others;
}},[m('span',{class:''},it.partner.name),m('span',{class:'ml-2'},it.partner.others)])])]);}))])])];}};}
//1