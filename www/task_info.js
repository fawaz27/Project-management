module.export= ()=>{var members=[];var task_info_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);if (vnode.attrs.data.depends!=undefined) {                         vnode.attrs.data.id_depends= vnode.attrs.data.depends[0].id_task;                                vnode.attrs.data.typedepends=vnode.attrs.data.depends[0].type;          let  element=app.get_userdata().tasks.find(element=>element.id==vnode.attrs.data.id_depends);          console.log(element);          if (element) {                  vnode.attrs.data.taskdepends = element.task.nom;     }                                        }             if (vnode.attrs.data.assigns!=undefined && vnode.attrs.data.assigns.length>1 ) {        members = app.get_userdata().members;       console.log(members) ;                        vnode.attrs.data.assigned = vnode.attrs.data.assigns[1] ;     if (members.find(m => m.id == vnode.attrs.data.assigns[1])) {         vnode.attrs.data.member= (members.find(m => m.id == vnode.attrs.data.assigns[1])).partner.name;     }                                                   } },view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'row',style:''}, [m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input4_6' },'Task name'),m('input[readonly]', {id:'input4_6',name:'input4_6',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input7_25' },'Assigned to'),m('input[readonly]', {id:'input7_25',name:'input7_25',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.member=e.target.value},value:vnode.attrs.data.member})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input8_8' },'Start date'),m('input[readonly]', {id:'input8_8',name:'input8_8',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input9_10' },'Close date'),m('input[readonly]', {id:'input9_10',name:'input9_10',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.dateclose=e.target.value},value:vnode.attrs.data.dateclose})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input6_15' },'Type depends'),m('input[readonly]', {id:'input6_15',name:'input6_15',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.typedepends=e.target.value},value:vnode.attrs.data.typedepends})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input5_20' },'Depends on'),m('input[readonly]', {id:'input5_20',name:'input5_20',class:'form-control form-control-sm',type:'text',onchange:(e)=>{for ( t of tasks){
    if(t.task.nom==e.target.value){
         vnode.attrs.data.id_depends=t.id;
         tasks_sec=e.target.value;
    }
     
  }},value:vnode.attrs.data.taskdepends})])])])])];}};}