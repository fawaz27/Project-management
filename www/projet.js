module.export= ()=>{var users=["CHABI BOUKARI Fawaz","ODJO Mike","AMADOU Ruchdane"];var getusers=()=>{
    return app.request({method :"get",url:"/project/projects/partners"});
};var items=["myself","others"];var selected="";var partners=[];var pattern="";var visibilty=false;var projet_cls = function(){return {getpartners_byname:(id)=>{return app.request({method:'GET',url:'/project/partners/names?pattern='+id});}
};}();return {oninit:(vnode)=>{app.setActions([]); if (vnode.attrs.data.visibilty==true) {     visibilty=true;      } ;},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'row',style:''}, [m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('.form-check',[m('input.form-check-input',{type: 'checkbox',id:'checkbox',checked:visibilty,onclick:(e)=>{ if(vnode.attrs.data.visibilty==undefined){
  visibilty=true;
  vnode.attrs.data.visibilty=visibilty;
  
} else{
  vnode.attrs.data.visibilty=!vnode.attrs.data.visibilty;
  visibilty=!visibilty;
}}}),m('label', {for:'checkbox'},'Visibility')])])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input16' },'Project Name '),m('input', {id:'input16',name:'input16',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})])]),m('div',{class:'col-md-12 ',style:''}, [m('div',{class:'d-flex',style:''}, [m('.form-group',[m('label', 'Responsible'),items.map((it,i)=>{return m('.form-check',[m('input.form-check-input',{name:'radio35',type:'radio',value:it,id:it+i,onchange:(e)=>{selected=it;if(e.target.value!="others")vnode.attrs.data.responsible=app.userid();}}),m('label',{for:it+i},it)]);})])]),selected=="others" && m('div',{class:'',style:''}, [m('.form-group',[m('input', {id:'input17_42',name:'input17_42',class:'form-control form-control-sm',type:'text',oninput:(e)=>{pattern=e.target.value;
if(pattern.length==3)
projet_cls.getpartners_byname(pattern).then(
        (d)=>{
            if(d && d.status=='ok'){
                partners=d.data;
            }
        }
    )},value:pattern})]),m('div',{class:'list-group',style:''},partners.map((it,itx)=>{if(it.partner.name.startsWith(pattern))return m('a',{id:'link62',onclick:()=>{vnode.attrs.data.responsible=""+it.id;
pattern=it.partner.name+"  "+it.partner.others;


partners=[];}},[m('button',{class:'list-group-item list-group-item-action'},[m('a',{id:'link52_64'},[m('span',{class:''},it.partner.name),m('span',{class:'ml-2'},it.partner.others)])])]);}))])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[ m('label',{for:'textarea18'},'Description'), m('textarea.form-control',{        id:'textarea18',        name:'textarea18'                        ,onchange:(e)=>{vnode.attrs.data.description = e.target.value;}      },vnode.attrs.data.description) ])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input19' },'Start date'),m('input', {id:'input19',name:'input19',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input20' },'Close date'),m('input', {id:'input20',name:'input20',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.deadline=e.target.value},value:vnode.attrs.data.deadline})])])])])];}};}
