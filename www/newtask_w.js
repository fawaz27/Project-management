module.export= ()=>{var task={};var validite=false;var selected=false;var items=["date","duration"];var selected2="day(s)";var items2=["day(s)","month(s)"];var type=["START-START","FINISH-START","FINISH-FINISH"];var members=[];var membersmap=[];var tasksmap=[];var members_sec='';var tasks_sec='';var tasks=[];var show_start=false;var show_close=false;var newtask_w_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]); if (vnode.attrs.data.validite == true) { validite = true; }   members = app.get_userdata().members.filter(m => m.id != parseInt(app.userid()));  if (vnode.attrs.data.assigns != undefined && vnode.attrs.data.assigns.length > 1) {      vnode.attrs.data.assigned = vnode.attrs.data.assigns[1];      if (members.find(m => m.id == vnode.attrs.data.assigns[1])) {          vnode.attrs.data.name_assigne = (members.find(m => m.id == vnode.attrs.data.assigns[1])).partner.name;     }  }  if (vnode.attrs.data.id != undefined) {  tasks = app.get_userdata().tasks.filter(t => t.id != vnode.attrs.data.id);      }  else { tasks = app.get_userdata().tasks }  membersmap = members.map(m => m.partner.name);  tasksmap = tasks.map(t => t.task.nom);  if (vnode.attrs.data.depends != undefined) {      vnode.attrs.data.id_depends = vnode.attrs.data.depends[0].id_task;      vnode.attrs.data.typedepends = vnode.attrs.data.depends[0].type;      let  element= tasks.find(element=>element.id==vnode.attrs.data.id_depends);     if (element) {         vnode.attrs.data.task_depends = element.task.nom;   if (vnode.attrs.data.typedepends=='START-START') {             show_start=true;             show_close=false;                      }                  else if (vnode.attrs.data.typedepends=='FINISH-START') {             show_start=true;             show_close=false;                                   }         else if (vnode.attrs.data.typedepends=='FINISH-FINISH') {             show_close=true;             show_start=false;                                   }         else {             show_start=false;             show_close=false;         }  }             } },onupdate:(vnode)=>{if ((show_start==true || show_close==true) && ['START-START','FINISH-START','FINISH-FINISH'].includes(vnode.attrs.data.typedepends)   ) {            let  element = tasks.find(element=>element.id==vnode.attrs.data.id_depends);      if (element) {          if (vnode.attrs.data.typedepends=='START-START') {                 vnode.attrs.data.datestart=element.task.datestart;                         }          else if (vnode.attrs.data.typedepends=='FINISH-START') {                        vnode.attrs.data.datestart=element.task.dateclose;         }         else if (vnode.attrs.data.typedepends=='FINISH-FINISH') {                        vnode.attrs.data.dateclose=element.task.dateclose;                                  }     }                   }  if (!(['START-START','FINISH-START','FINISH-FINISH'].includes(vnode.attrs.data.typedepends) ) ) {     show_start=false;     show_close=false; }if (vnode.attrs.data.id != undefined) {       tasks = app.get_userdata().tasks.filter(t => t.id != vnode.attrs.data.id);       }   else { tasks = app.get_userdata().tasks } tasksmap = tasks.map(t => t.task.nom);  },view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'row',style:''}, [m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('.form-check',[m('input.form-check-input',{type: 'checkbox',id:'validite',checked:validite,onclick:(e)=>{if(vnode.attrs.data.validite==undefined){
  validite=true;
  vnode.attrs.data.validite=validite;
  
} else{
  vnode.attrs.data.validite=!vnode.attrs.data.validite;
  validite=!validite;
}


}}),m('label', {for:'validite'},'Self-validity')])])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('.form-check',[m('input.form-check-input',{type: 'checkbox',id:'checkbox39',checked:selected,onclick:(e)=>{selected=!selected;
if(selected==false)
vnode.attrs.data.duration=undefined;
else
vnode.attrs.data.dateclose=undefined;}}),m('label', {for:'checkbox39'},'Duration mode')])])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input4_6' },'Task name'),m('input', {id:'input4_6',name:'input4_6',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})])]),show_start==false && m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input8_8' },'Start date'),m('input', {id:'input8_8',name:'input8_8',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),show_start==true && m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input8_8_49' },'Start date'),m('input[readonly]', {id:'input8_8_49',name:'input8_8_49',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),selected==false &&  show_close==false && m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input9_10' },'Close date'),m('input', {id:'input9_10',name:'input9_10',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.dateclose=e.target.value},value:vnode.attrs.data.dateclose})])]),selected==false  &&  show_close==true && m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input9_10_51' },'Close date'),m('input[readonly]', {id:'input9_10_51',name:'input9_10_51',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.dateclose=e.target.value},value:vnode.attrs.data.dateclose})])]),selected==true && m('div',{class:'col-md-6 ',style:'display:flex;'}, [m('div',{class:'',style:'width:70%;'}, [m('.form-group',[m('label',{for:'input65_73' },'Duration'),m('input', {id:'input65_73',name:'input65_73',class:'form-control form-control-sm',type:'number',min: 0,onchange:(e)=>{vnode.attrs.data.duration=e.target.value},value:vnode.attrs.data.duration})])]),m('div',{class:'',style:'width:30%;margin-top: 28px;'}, [m('.dropdown',[m('button.btn.dropdown-toggle', {class:'btn-secondary', type:'button', id:'dropdown66', 'data-toggle':'dropdown', 'aria-haspopup':'true', 'aria-expanded':'false'},selected2),m('div.dropdown-menu', {'aria-labelledby':'dropdownMenuButton'},JSON.parse('["day(s)","month(s)"]').map((it,itx)=>{return m('a.dropdown-item',{href:'javascript:void(0)', onclick: ()=>{selected2=it;
vnode.attrs.data.type_duration=it;
console.log(vnode.attrs.data.type_duration);}},it)}))])])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input5_28' },'Depends on'),m('input', {id:'input5_28',name:'input5_28',class:'form-control form-control-sm',type:'text',list:'input5_28_list',oninput:(e)=>{vnode.attrs.data.task_depends=e.target.value;

let t=tasks.find(element=>element.task.nom==e.target.value);

if (t) {
    vnode.attrs.data.id_depends=t.id;
    if ((show_start==true || show_close==true) && ['START-START','FINISH-START','FINISH-FINISH'].includes(vnode.attrs.data.typedepends)   ) {
      
        let  element = tasks.find(element=>element.id==vnode.attrs.data.id_depends);
    
        if (element) {
    
            if (vnode.attrs.data.typedepends=='START-START') {    
                vnode.attrs.data.datestart=element.task.datestart;                
            }
    
            else if (vnode.attrs.data.typedepends=='FINISH-START') {           
                vnode.attrs.data.datestart=element.task.dateclose;
            }
            else if (vnode.attrs.data.typedepends=='FINISH-FINISH') {           
                vnode.attrs.data.dateclose=element.task.dateclose;
                            
            }
        }
    
    } 

}
else{
    if (['START-START','FINISH-START','FINISH-FINISH'].includes(vnode.attrs.data.typedepends)) {
        if (vnode.attrs.data.typedepends=='START-START') {    
            vnode.attrs.data.datestart='';               
        }

        else if (vnode.attrs.data.typedepends=='FINISH-START') {           
            vnode.attrs.data.datestart='';
        }
        else if (vnode.attrs.data.typedepends=='FINISH-FINISH') {           
            vnode.attrs.data.dateclose='';
                        
        }
    }
        
}},value:vnode.attrs.data.task_depends}),m('datalist', {id:'input5_28_list'}, tasksmap.map((it)=>{return  m('option', {value: it}); }))])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input6_23' },'Type depends'),m('input', {id:'input6_23',name:'input6_23',class:'form-control form-control-sm',type:'text',list:'input6_23_list',oninput:(e)=>{vnode.attrs.data.typedepends=e.target.value;
if (e.target.value=='START-START') {
        show_start=true;
        show_close=false;
        
    }

    else if (e.target.value=='FINISH-START') {
        show_start=true;
        show_close=false;
        
        
    }
    else if (e.target.value=='FINISH-FINISH') {
        show_close=true;
        show_start=false;
        
        
    }
    else {
        show_start=false;
        show_close=false;
    }


if ((show_start==true || show_close==true) && ['START-START','FINISH-START','FINISH-FINISH'].includes(vnode.attrs.data.typedepends)   ) {
      
    let  element = tasks.find(element=>element.id==vnode.attrs.data.id_depends);

    if (element) {

        if (vnode.attrs.data.typedepends=='START-START') {    
            vnode.attrs.data.datestart=element.task.datestart;                
        }

        else if (vnode.attrs.data.typedepends=='FINISH-START') {           
            vnode.attrs.data.datestart=element.task.dateclose;
        }
        else if (vnode.attrs.data.typedepends=='FINISH-FINISH') {           
            vnode.attrs.data.dateclose=element.task.dateclose;
                        
        }
    } 
            
    


 }},value:vnode.attrs.data.typedepends}),m('datalist', {id:'input6_23_list'}, type.map((it)=>{return  m('option', {value: it}); }))])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input7_33' },'Assigned to'),m('input', {id:'input7_33',name:'input7_33',class:'form-control form-control-sm',type:'text',list:'input7_33_list',onchange:(e)=>{for ( mem of members){
  if(mem.partner.name==e.target.value){
       vnode.attrs.data.assigned=mem.id;
       vnode.attrs.data.name_assigne=e.target.value;
       break;
  }
   
}},value:vnode.attrs.data.name_assigne}),m('datalist', {id:'input7_33_list'}, membersmap.map((it)=>{return  m('option', {value: it}); }))])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input44' },'Shift'),m('input', {id:'input44',name:'input44',class:'form-control form-control-sm',type:'number',onchange:(e)=>{},value:''})])])])])];}};}
