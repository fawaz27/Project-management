module.export= ()=>{var users=["CHABI BOUKARI Fawaz","moi","ODJO Mike","AMADOU Ruchdane"];var priorite=["high","normal","low"]

;var tache_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('form#form',{},[m('.form-group',[m('label',{for:'sujet' },'Subject :'),m('input', {id:'sujet',name:'sujet',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})]),m('.form-group',[ m('label',{for:'desc'},'Description :'), m('textarea.form-control',{        id:'desc',        name:'desc'                        ,onchange:(e)=>{vnode.attrs.data.description = e.target.value;}      },vnode.attrs.data.description) ]),m('.form-group',[m('label',{for:'priorite' },'Priority:'),m('input', {id:'priorite',name:'priorite',class:'form-control form-control-sm',type:'text',list:'priorite_list',onchange:(e)=>{vnode.attrs.data.priorite=e.target.value},value:vnode.attrs.data.priorite}),m('datalist', {id:'priorite_list'}, priorite.map((it)=>{return  m('option', {value: it}); }))]),m('.form-group',[m('label',{for:'start' },'Start Date:'),m('input', {id:'start',name:'start',class:'form-control form-control-sm',type:'text',placeholder:'Ex : 2021-07-22',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})]),m('.form-group',[m('label',{for:'echeance' },'End Date:'),m('input', {id:'echeance',name:'echeance',class:'form-control form-control-sm',type:'text',placeholder:'Ex : 2021-07-22',onchange:(e)=>{vnode.attrs.data.deadline=e.target.value},value:vnode.attrs.data.deadline})]),m('.form-group',[m('label',{for:'duration' },'Duration:'),m('input', {id:'duration',name:'duration',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.duration=e.target.value},value:vnode.attrs.data.duration})])])])];}};}