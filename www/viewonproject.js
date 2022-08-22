module.export= ()=>{var tasks=[];var noms=[];var selected="all";var members=[];var project={};var newtask={};var newmember={};var taskupd={};var functionprogress=function  (tasks) {
    if(tasks.length==0)return '0%';
    
    const nbretasks= tasks.length;
        
    const nbretasksfinish= tasks.filter(obj => obj.task.status=="close").length;
    
    return Math.round((nbretasksfinish/nbretasks)*100)+'%';
    
    };var partners=[];var alltasks=[];var functionretard=function(date) {
               let now = new Date();
    
               if ( now> (new Date(date))) {
                   return 'color:red;';
               }
               else{
                   return 'color:#5a5757;';
               }
            };var loading=true;var classcheck="ml-3 hidden-item";var taskselected="";var task_style=function(task){
        if (task)
            return 'margin-left: '+task.depth*25+'px;';
        else 
            return '';
        };var getInitiales=function(t){ 
        if (t.task.assigns.length==1) {
            return;
        }
        let result;
        let partner= partners.find(p=> {
            if (t.task.assigns.length>1 && p.id==t.task.assigns[1]) {
                return p;
            }
        });
    
        if (partner != undefined) {
            let name = partner.partner.name;
    
    
            if (partner.partner.others != undefined) {
                let others = partner.partner.others;
                result = (name[0] + others[0]).toUpperCase();
    
            }
            else {
    
                result = (name[0] + name[1]).toUpperCase();
            }
    
            return result;
        }
        
    
    };var getNom=function(t){ 
    
    if (t.task.assigns.length==1) {
            return;
        }
    
    let partner= partners.find(p=> {
            if (t.task.assigns.length>1 && p.id==t.task.assigns[1]) {
                return p;
            }
        });
    if(partner) return partner.partner.name +'  '+partner.partner.others;
    };var status_color=function (t){
        if (t.task.status=='todo') {
            return 'mb-2  border-dark d-flex hidden-item-show';
        }
        else if (t.task.status=='inprogress') {
            return 'mb-2  border-primary d-flex hidden-item-show';
        }
        else if (t.task.status=='waiting') {
            return 'mb-2  border-warning d-flex hidden-item-show';
        }
        else if (t.task.status=='close') {
            return 'mb-2  border-success d-flex hidden-item-show';
            
        }
        else if (t.task.status=='late') {
            return 'mb-2  border-danger d-flex hidden-item-show';
            
        }
    
    };var check_children_finish=function (id , alltasks,calls,updates){
    let children=alltasks.filter(element=>element.task.parent==id);
       let parent = alltasks.find(element=>element.id==id);
       let check=false;
       
       for(t of children){
            if (t.task.status!="close") {
                check=true;
                break;
            }
       }
       if(check==false && parent.task.status!="close"){
            parent.task.status="close";	
            calls.push({name:'put',path:'/project/projects/'+project.id+'/tasks/'+parent.id,params:{task:parent.task}});
            updates.push(parent);
       } 
    
       if (parent.task.parent!=undefined) {
        check_children_finish(parent.task.parent,alltasks,calls,updates);
       }
    
    };var update_propagation=function (id,alltasks,calls,updates,datestart,dateclose){
    let parent=id;
        let tasks_FF=alltasks.filter(element=>element.task.depends[0].id_task==parent && element.task.depends[0].type=="FINISH-FINISH");
        let tasks_FS=alltasks.filter(element=>element.task.depends[0].id_task==parent && element.task.depends[0].type=="FINISH-START");
        let tasks_SS=alltasks.filter(element=>element.task.depends[0].id_task==parent && element.task.depends[0].type=="START-START");
    
        if(tasks_FF.length!=0)
        tasks_FF.forEach( function(element){
            element.task.dateclose=dateclose;
            if((new Date(element.task.datestart)).getTime()>(new Date(element.task.dateclose)).getTime())
                element.task.dateclose=element.task.datestart;
            calls.push({name:'put',path:'/project/projects/'+project.id+'/tasks/'+element.id,params:{task:element.task}});
            updates.push(element);
        });
        if(tasks_FS.length!=0)
        tasks_FS.forEach(element => {                               
            element.task.datestart=dateclose;
            if((new Date(element.task.datestart)).getTime()>(new Date(element.task.dateclose)).getTime())
                element.task.dateclose=element.task.datestart;
            calls.push({name:'put',path:'/project/projects/'+project.id+'/tasks/'+element.id,params:{task:element.task}});
            updates.push(element);
        });
        if(tasks_SS.length!=0)
        tasks_SS.forEach(element => {
            element.task.datestart=datestart;
            if((new Date(element.task.datestart)).getTime()>(new Date(element.task.dateclose)).getTime())
            element.task.dateclose=element.task.datestart;                           
            calls.push({name:'put',path:'/project/projects/'+project.id+'/tasks/'+element.id,params:{task:element.task}});
            updates.push(element);
        });
    
        alltasks.forEach(element => {
            if (updates.find(el=>el.id==element.id)) {
                element=updates.find(el=>el.id==element.id);
            }                                               
        });
        let children=alltasks.filter(element=>element.task.depends[0].id_task==parent);
    
        for(elem of children){
            update_propagation(elem.id,alltasks,calls,updates,elem.task.datestart,elem.task.dateclose);
        }
    
    };var search=[];var filter=true;var searchfn='';var viewonproject_cls = function(){return {gettasks:(id,)=>{return app.request({method:'GET',url:'/project/projects/'+id+'/tasks'});}
    
    ,addmembers:(id,users_id)=>{return app.request({method:'POST',url:'/project/projects/'+id+'/members',body:{users_id:users_id}});}
    ,getpartnerstask:(id,idtask)=>{return app.request({method:'GET',url:'/project/projects/'+id+'/tasks/'+idtask+'/partners'});}
    ,gettaskmembers:(id,idtask)=>{return app.request({method:'GET',url:'/project/projects/'+id+'/tasks/'+idtask+'/members'});}
    ,updatetask:(id,idtask,task)=>{return app.request({method:'PUT',url:'/project/projects/'+id+'/tasks/'+idtask+'',body:{task:task}});}
    ,addtaskmembers:(id,idtask,users_id,assign_info)=>{return app.request({method:'POST',url:'/project/projects/'+id+'/tasks/'+idtask+'/members',body:{users_id:users_id,assign_info:assign_info}});}
    ,newtask:(id,task,assign_info)=>{return app.request({method:'POST',url:'/project/projects/'+id+'/tasks',body:{task:task,assign_info:assign_info}});}
    ,search3:(alltasks,children)=>{var result=[];
        alltasks.forEach(element => {
            if (children.includes(element.id)) {
                result.push(element);
            }
        });
    
        return result;},ordonne:(tasks,alltasks)=>{alltasks.sort((a,b)=>(a.id>b.id)? 1 : -1);
    
        for(t of alltasks){
            if (t.task.parent==undefined || t.task.parent!=undefined && tasks.find(element=>element.id==t.task.parent)==undefined  ) {
                let element=t;
                tasks.push(element);
                if (t.task.children.length!=0) {
                    let index = tasks.indexOf(t);
    
                    let my_children=viewonproject_cls.search3(alltasks,t.task.children);
                    
                    for (el of my_children){
                        tasks.splice(++index,0,el);
                    }
                }
            } 
            else {
                if (t.task.children.length!=0) {
                    let index = tasks.indexOf(t);
    
                    let my_children=viewonproject_cls.search3(alltasks,t.task.children);
                    
                    for (el of my_children){
                        tasks.splice(++index,0,el);
                    }
                } 
                
            }
    
           
    
        }},calcul_depth:(tasks)=>{let index;
        for (index = 0; index <tasks.length;index++ ) {
    
            if (tasks[index].task.parent==undefined) {
                tasks[index].depth=0;
            }
    
            if (tasks[index].task.children.length!=0) {
                
                viewonproject_cls.dept_children(tasks,tasks[index].task.children,tasks[index].depth+1);  
            }
    
           
    
        }},dept_children:(tasks,children,depth)=>{tasks.forEach(element => {
            if (children.includes(element.id)) {
                element.depth=depth;
            }
        });},arrangement:(tasks,alltasks)=>{viewonproject_cls.ordonne(tasks,alltasks);
        viewonproject_cls.calcul_depth(tasks);},change:(alltasks,project)=>{
       if (alltasks.length!=0) {
            let tmp_alltasks= JSON.parse(JSON.stringify(alltasks));
            tmp_alltasks.sort((a,b)=>((new Date(a.task.dateclose)).getTime()<(new Date(b.task.dateclose)).getTime())? 1 : -1);
            let max_date_task= tmp_alltasks[0].task.dateclose;
    
            if ((new Date(max_date_task)).getTime()>(new Date(project.project.deadline)).getTime()) {
                project.project.deadline=max_date_task;
                app.request({
                        method:'PUT',
                        url:'/project/projects/'+project.id+'',
                        body:{project:project.project}
                }).then((d)=>{
                    if (d && d.status=='ok') {
                        app.alert('Your project is updated');
                    }
                });
                
            }
        }
        }};}();return {oninit:(vnode)=>{app.setActions([{icon:'fa fa-arrow-left',fn:()=>{app.go('home/project/home','home','Home')},title:'back',role:''},{icon:'fa fa-tasks',fn:()=>{newtask={};
    if(taskselected!="")
    newtask.parent=taskselected.id;
    
    app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3', [
        {type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'},
        {type : 'button', click : ()=>{ 
            if(newtask.nom != undefined || newtask.nom!='' ){
                console.log("1");
                console.log(newtask);
                
                newtask.date=utils.now();
                newtask.status='todo';
                newtask.assigns=[];
                newtask.children=[];
                newtask.assigns.push( parseInt(app.userid()));
                if (newtask.parent==undefined) {
                    newtask.parent=undefined;
                }            
                if(newtask.validite==undefined){
                    newtask.validite=false;
                }
                if (newtask.assigned!=undefined) {
                    let assigned = newtask.assigned;
                    newtask.assigns.push(assigned);
                    
                }
                if (newtask.type_duration==undefined) {
                    newtask.type_duration="days(s)";
                }
    
                if (newtask.duration!=undefined ) {
                    if (newtask.datestart==undefined || newtask.datestart=="" ) {
                        newtask.datestart=utils.now();
                    }
                    if(newtask.type_duration=="days(s)"){
                        console.log("a");
                        var result = new Date(newtask.datestart);
                        result.setDate(result.getDate() + parseInt(newtask.duration) );
                        newtask.dateclose=result.getFullYear()+"-"+(result.getMonth()+1)+"-"+result.getDate();
                        console.log(newtask.dateclose);
    
                    }
                    else if (newtask.type_duration=="month(s)") {
                        var result = new Date(newtask.datestart);
                        console.log("b");
                        result.setMonth(result.getMonth() + parseInt(newtask.duration));
                        newtask.dateclose=result.getFullYear()+"-"+(result.getMonth()+1)+"-"+result.getDate();
                        console.log(newtask.dateclose);
                        
                    }
                    
                }
    
    
    
                if (newtask.datestart==undefined || newtask.datestart=="") {
                    newtask.datestart=utils.now();
                    if (newtask.dateclose!=undefined && newtask.dateclose!="") {
                        newtask.datestart=newtask.dateclose;
                    }     
                }
                if (newtask.dateclose==undefined || newtask.dateclose=="") {
                    newtask.dateclose=utils.now();
                    if (newtask.datestart!=undefined && newtask.datestart!="") {
                        newtask.dateclose=newtask.datestart;
                    }
                }
    
                if((new Date(newtask.datestart)).getTime()>(new Date(newtask.dateclose)).getTime()){
                    app.alert('The close date must be later than the start date.');
                    return;
                }
    
    
                if ((newtask.id_depends!=undefined && newtask.typedepends==undefined) || (newtask.id_depends==undefined && newtask.typedepends!=undefined) ){
                    app.alert('You must provide the task it depends on and the type of the dependency.');
                    return;
                } else{
                    let typedepends=newtask.typedepends;
                    let id_task=newtask.id_depends;
                    
                    newtask.depends=[];
                    newtask.depends.push({
                        type:typedepends,
                        id_task:id_task 
                    });
                }
                delete newtask.duration;
                delete newtask.type_duration;
                delete newtask.assigned;
                delete newtask.typedepends;
                delete newtask.id_depends;
                delete newtask.assigns_others;
                delete newtask.name_assigne;
                delete newtask.task_depends;
                console.log("2");
                console.log(newtask);
    
                viewonproject_cls.newtask(project.id, newtask)
                    .then((dd)=>{
                                if(dd && dd.status == 'ok'){
                                    if (taskselected!="") {
                                        let taskparent = taskselected.task;
                                        taskparent.children.push(parseInt(dd.data));
                                        taskparent.status="todo";
                                        viewonproject_cls.updatetask(project.id,taskselected.id,taskparent)
                                            .then((data)=>{
                                                if (data && data.status=='ok'){
                                                    alltasks.push({
                                                        id: parseInt(dd.data),
                                                        checked:false,
                                                        task:JSON.parse(JSON.stringify(newtask))
                                                    });
                                                    alltasks.forEach(element => {
                                                        if (element.id==taskselected.id) {
                                                            element.task=taskparent;
                                                        } 
                                                    });
                                                    
                                                    let tasksn=alltasks.filter(task => task.task.assigns.includes(parseInt(app.userid())));
                                                    tasks=[];
                                                    viewonproject_cls.arrangement(tasks,tasksn);
                                                    app.get_userdata().tasks=tasks;
                                                    app.alert('Your task is created.');
                                                    
                                                    newtask.nom="";
                                                    newtask.date="";
                                                    newtask.dateclose="";
                                                    newtask.datestart="";
                                                    newtask.status="";
                                                    newtask.assigns=[];
                                                    newtask.depends=[];
                                                    newtask.name_assigne="";
                                                    newtask.task_depends="";
                                                    newtask.duration="";
                                                    newtask.type_duration=""; 
                                                    
                                                }
                                            })
    
                                    } else {
                                        alltasks.push({
                                            id: parseInt(dd.data),
                                            checked:false,
                                            task: JSON.parse(JSON.stringify(newtask))
                                        });
                                        console.log(alltasks);
                                        let tasksn=alltasks.filter(task => task.task.assigns.includes(parseInt(app.userid())));
                                        tasks=[];
                                        viewonproject_cls.arrangement(tasks,tasksn);
                                        app.get_userdata().tasks=tasks;
                                        app.alert('Your task is created.');
    
                                        newtask.nom="";
                                        newtask.date="";
                                        newtask.dateclose="";
                                        newtask.datestart="";
                                        newtask.status="";
                                        newtask.assigns=[];
                                        newtask.depends=[];
                                        newtask.name_assigne="";
                                        newtask.task_depends="";
                                        newtask.duration="";
                                        newtask.type_duration="";
    
                                         
                                    }
                                    
                                }
                    });
    
    
                viewonproject_cls.change(alltasks,project);
                
                }
            else{
                app.alert('You must provide the name.');
                return;
            }
        }, text : 'create', class: 'btn btn-primary'} 
    ], newtask )},title:'new task',role:''},{icon:'fa fa-pen',fn:()=>{if(taskselected=="") {
        app.alert("No task selected. Please select a task before editing it.");
    } else {
        let id = taskselected.id;
        newtask=taskselected.task;
        newtask.id=taskselected.id;
        app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3',[
            {type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'},
            {type : 'button', click : app.modal2.close, text : 'edit', class: 'btn btn-primary'} 
        ], newtask )
        .then((d)=>{ 
            if(d==null) return;
    
            if(newtask.nom !=""){
    
                newtask.date=utils.now();
                newtask.assigns=[];
                newtask.assigns.push( parseInt(app.userid()));
    
                if (newtask.assigned!=undefined) {
                    let assigned = newtask.assigned;
                    newtask.assigns.push(assigned);
                    
                }
                if (newtask.datestart==undefined || newtask.datestart=="") {
                    newtask.datestart=utils.now();
                    if (newtask.dateclose!=undefined && newtask.dateclose!="") {
                        newtask.datestart=newtask.dateclose;
                    }     
                }
                if (newtask.dateclose==undefined || newtask.dateclose=="") {
                    newtask.dateclose=utils.now();
                    if (newtask.datestart!=undefined && newtask.datestart!="") {
                        newtask.dateclose=newtask.datestart;
                    }
                }
    
                if((new Date(newtask.datestart)).getTime()>(new Date(newtask.dateclose)).getTime()){
                    app.alert('The close date must be later than the start date.');
                    return;
                }
                
                if ((newtask.id_depends!=undefined && newtask.typedepends==undefined) || (newtask.id_depends==undefined && newtask.typedepends!=undefined) ){
                    app.alert('You must provide the task it depends on and the type of the dependency.');
                    return;
                } else{
                    let typedepends=newtask.typedepends;
                    let id_task=newtask.id_depends;
                    
                    newtask.depends=[];
                    newtask.depends.push({
                        type:typedepends,
                        id_task:id_task 
                    });
                }
                delete newtask.id;
                delete newtask.assigned;
                delete newtask.typedepends;
                delete newtask.id_depends;
                delete newtask.assigns_others;
                delete newtask.name_assigne;
                delete newtask.task_depends;
                viewonproject_cls.updatetask(project.id,id,newtask)
                    .then((dd)=>{
                        if (dd && dd.status=='ok') {
    
                            var calls=[];
                            var updates=[];
                            update_propagation(id,alltasks,calls,updates,newtask.datestart,newtask.dateclose);
                            console.log(calls);
    
                            if (calls.length!=0) {
                                app.request({
                                    method:'post',
                                    url:'/apputils/callchain',
                                    body:{ 
                                        calls : calls
                                    }
                                }).then((d)=>{
                                    if (d && d.data!=null) {
    
                                        tasks.forEach(element => {
                                            if (updates.find(el=>el.id==element.id)) {
                                                element=updates.find(el=>el.id==element.id);
                                            }  
                                            else if (element.id==id) {
                                                element.task=newtask;
                                            }
    
                                        });
                                        app.get_userdata().tasks=tasks;
                                        app.alert('Your task is updated.');
                                        newtask={};
                                        
                                    }});
                            } 
                            else{
                                tasks.forEach(element => { 
                                    if (element.id==id) {
                                        element.task=newtask;
                                    }
    
                                });
                                app.get_userdata().tasks=tasks;
                                app.alert('Your task is updated.');
                                newtask={};                   
                                
                            }                    
                        }
                    })
    viewonproject_cls.change(alltasks,project);
            } else {
                app.alert('You must provide the name.');
            }
        });
    
    
    }},title:'edit task',role:''},{icon:'fa fa-user-plus',fn:()=>{
    app.modal2.open(null, 'project/addmember', 'col-md-4 offset-md-4', [{type:'button',text:'cancel',class:'btn btn-link',click:app.modal2.cancel},{type:'button',text:'add',class:'btn btn-primary',click:app.modal2.close}],newmember).then((dd)=>{if(dd==null || dd.id==undefined) return;
    
    viewonproject_cls.addmembers(project.id,dd.id).then(
        (d)=>{
            if(d && d.status=='ok'){
                app.get_userdata().members.push(dd);
                noms.push(dd.partner.name);
                partners.push(dd);
    
            };
            
         }
        
    );
    
    
    
    
    })},title:'add member',role:''}]);project=app.get_userdata().project;             app.set_userdata({tasks:tasks});     app.request({method:'get',url:'/project/projects/'+project.id+'/members'})                             .then((d)=>{                                                                              if(d && d.status=='ok'){                                                                                      members=d.data;                                                                                      var url='/project/partners?ids=[';                                                                         members.map( (it,ix)=>{if (ix==0) url=url+it;else url=url+','+it;});                                      url=url+']';                                                                                            app.request( {method: 'get',url : url} )                                                                     .then((dd)=>{                                                                                                   if(dd && dd.status){                                                                                        partners=dd.data;                                                                                        for (t of dd.data)                                                                                             noms.push(t.partner.name);                                                                                app.get_userdata().members=dd.data;                                                                                                                                                                              }                                                                                                                                                                        })                                                                                           }                                                });    viewonproject_cls.gettasks(project.id)                                  .then((d)=>{                                                                            if (d && d.status=='ok'){                                                     alltasks=d.data ;                                                                               let tasksn=alltasks.filter(t => t.task.assigns.includes(parseInt(app.userid())));                   tasksn.forEach(element => { element.checked = false; });                          tasks=[];                          viewonproject_cls.arrangement(tasks,tasksn);       console.log(tasks);                                          loading=false;                                                                 app.get_userdata().tasks=tasks;                                                                }                                                                                         }); },view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'',style:'widht:100%;height:60px;'}, [m('h2',{class:'text-uppercase '},project.project.nom),m('span',{class:'badge badge-primary',style:'border-radius:30px; border:1px; margin-top:-10px;'},project.project.statut)]),m('div',{class:'row mt-7',style:''}, [m('div',{class:'col-md-9 ',style:''}, [m('div',{class:'card-lg',style:''}, [loading==true && m('div',{class:'d-flex align-items-center justify-content-center',style:''}, [m('div',{class:'spinner-border',style:''}, [m('span',{class:'sr-only'},'Loading...')])]),loading ==false && tasks.length==0 && m('div',{class:'',style:''}, [m('div',{class:' col-md-6 offset-3',style:''}, [m('div',{class:'',style:''}, [m('div',{class:'d-flex align-items-center justify-content-center',style:'height: 200px; flex-direction: column;'}, [m('span',{class:' fa fa-times',style:'font-size:100px;'},''),m('div',{class:'d-flex align-items-center text-center',style:'flex-direction: column;'}, [m('h',{class:'font-weight-bold  mb-3'},'No Tasks Found'),m('h',{},'You have no tasks assigned.'),m('h8',{},'To create a task click on the new task button')])])])])]),loading==false && tasks.length>0 && m('div',{class:'p-1',style:''}, [m('div',{class:'container  ',style:'margin-top: 15px;'}, [m('div',{class:'d-flex justify-content-end mb-4',style:''}, [m('div',{class:'mr-2',style:''}, [m('.form-group',[m('input', {id:'input941',name:'input941',class:'form-control form-control-sm',type:'text',placeholder:'Search ....',oninput:(e)=>{searchfn=e.target.value;
    if(e.target.value.length>0){
        filter=false;
        search=tasks.filter(t=>t.task.nom.toLowerCase().includes(e.target.value.toLowerCase()));
    }   
    else{
        filter=true;
    }},value:searchfn})])]),m('.dropdown',[m('button.btn.dropdown-toggle', {class:'btn-secondary', type:'button', id:'dropdown602_607_613', 'data-toggle':'dropdown', 'aria-haspopup':'true', 'aria-expanded':'false'},selected),m('div.dropdown-menu', {'aria-labelledby':'dropdownMenuButton'},JSON.parse('["all","todo","inprogress","waiting","close"]').map((it,itx)=>{return m('a.dropdown-item',{href:'javascript:void(0)', onclick: ()=>{selected=it;
    }},it)}))])]),tasks.map((it,itx)=>{if((selected=="all" || it.task.status==selected) && (filter || search.includes(it)))return m('div',{class:status_color(it),style:'height:60px; border: 2px solid;'}, [m('div',{class:'d-flex align-items-center',style:'width:50px; height:60px;margin-left:-5px;'}, [app.userid()===project.project.responsible && m('div',{class:classcheck,style:'margin-top: -25px;'}, [m('.form-group',[m('.form-check',[m('input.form-check-input',{type: 'checkbox',id:'checkbox511',checked:it.checked,onclick:(e)=>{
    if (it.checked) {
        taskselected="";
        classcheck="ml-3 hidden-item";
        it.checked=false;
    }
            
        
    
     else {
    
        if (taskselected!="" )
            return;
       
            taskselected=it;
            classcheck="ml-3";
            it.checked=true;
        
    }
    }})])])])]),m('div',{class:'d-flex ',style:'margin-left:-5px;width: 100%;'}, [m('div',{class:'w-100 ',style:task_style(it)}, [m('div',{class:'mt-2 d-flex justify-content-between hidden-item-show',style:''}, [m('div',{class:'d-flex',style:''}, [m('a',{id:'link',style:'color:#5a5757;',onclick:()=>{if(app.get_userdata()){
        
        selecttask=it.task;
        selecttask.assigns_others=it.assigns_others;
    
        app.modal2.open(null, 'project/task_info','col-md-6 offset-md-3', [{type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'}], selecttask )
            .then((d)=>{
    if(d==null){
                selecttask={};
    return;
    }
            });
    }},href:'javascript:;'},[m('span',{class:'',title:it.task.nom},it.task.nom)]),it.task.depends.length!=0 && it.task.depends[0].id_task!=undefined && m('div',{class:'ml-2',style:''}, [m('span',{class:'fa fa-link pt-1'},'')])]),(it.task.status=='todo' && it.task.children.length==0) && m('div',{class:'hidden-item',style:''}, [m('div',{class:'',style:''}, [m('span',{class:'fa fa-play pt-1 mr-2',title:'start task',style:'cursor:pointer;',onclick:()=>{
    
    taskupd=it;
    
    if(taskupd.task.status=="todo") {
    
    
        if (taskupd.task.depends.length!=0 && taskupd.task.depends[0].id_task!=undefined) {
            
            let parent=taskupd.task.depends[0].id_task;
            let type_depends= taskupd.task.depends[0].type;
            let task_parent=tasks.find(element=>element.id==parent);
            
            if (task_parent) {
    
                if (type_depends=="FINISH-START") {
                    if (task_parent.task.status!='close') {
                        app.alert('The task <<'+taskupd.task.nom+'>> cannot be closed because it has a FINISH-START dependency with the task <<'+task_parent.task.nom+'>> which is not closed');
                         return;
                    }      
                } 
                
    
                
            }
    
            
        }
        taskupd.task.status="inprogress";
        viewonproject_cls.updatetask(project.id,taskupd.id,taskupd.task)
            .then((d)=>{
                if(d && d.status=='ok'){
                    it=taskupd;
                    app.get_userdata().tasks=tasks; 
                }
            });
    
    
    
    
        
    };
    taskupd={};}},'')])]),((it.task.status=='inprogress' || it.task.status=='waiting') && it.task.children.length==0) && m('div',{class:'hidden-item',style:''}, [m('div',{class:'',style:''}, [m('span',{class:' fa fa-times pt-1 mr-2',title:'close task',style:'cursor:pointer;',onclick:()=>{taskupd=it;
    if (taskupd.task.status=="inprogress" || taskupd.task.status=="waiting") {
        if (taskupd.task.depends.length!=0 && taskupd.task.depends[0].id_task!=undefined) {
    
            let parent=taskupd.task.depends[0].id_task;
            var type_depends= taskupd.task.depends[0].type;
            var task_parent=tasks.find(element=>element.id==parent);
            
            
            
    
            
        }
    
        
        if(taskupd.task.validite==true){
            if (task_parent) {
        
                if (type_depends=="FINISH-FINISH") {
                    if (task_parent.task.status!='close') {
                        app.alert('The task <<'+taskupd.task.nom+'>> cannot be closed because it has a FINISH-FINISH dependency with the task <<'+task_parent.task.nom+'>> which is not closed');
                        return;
                    } 
                    
                }    
            }
            taskupd.task.status="close";
        }
        else{
            if(app.userid()==project.project.responsible){
                if (task_parent) {
    
                    if (type_depends=="FINISH-FINISH"  ) {
                        if (task_parent.task.status!='close') {
                            app.alert('The task <<'+taskupd.task.nom+'>> cannot be closed because it has a FINISH-FINISH dependency with the task <<'+task_parent.task.nom+'>> which is not closed');
                                return;
                        } 
                        
                    }    
                }
                taskupd.task.status="close";
            } else{
                taskupd.task.status="waiting";
            }
        }
        
        console.log("a");
        viewonproject_cls.updatetask(project.id,taskupd.id,taskupd.task)
            .then((d)=>{
                if(d && d.status=='ok'){
                    console.log("b");
                    it=taskupd;
                    console.log(taskupd);
                    if (taskupd.task.status=="close") {
    
                        var calls=[];
                        var updates=[];
                        check_children_finish(taskupd.id,alltasks,calls,updates);
                        console.log("c");
                        console.log(calls);
                        if (calls.length!=0) {
                            console.log("d");
                            app.request({
                                method:'post',
                                url:'/apputils/callchain',
                                body:{ 
                                    calls : calls
                                }
                            }).then((d)=>{
                                if (d && d.status=='ok') {
                                    tasks.forEach(element => {
                                        if (updates.find(el=>el.id==element.id)) {
                                            element=updates.find(el=>el.id==element.id);
                                        }                                               
                                    });
                                    taskupd={};
                                    
                                }
                            
                            });
                            
                        }
                        
                    }
                    app.get_userdata().tasks=tasks;
                }
            });
    }
    }},'')])])]),m('div',{class:'text-muted d-flex justify-content-between',style:''}, [m('div',{class:'d-flex',style:''}, [it.task.assigns.length>1 && m('div',{class:'',style:''}, [m('span',{class:'',title:getNom(it),style:'margin-top: -5px; display: inline-block;min-width:10px;font-size:15px;font-weight: bold;color:black;'},getInitiales(it)),m('span',{class:'',style:'margin-top: -5px; display: inline-block;min-width:10px;font-size:15px;font-weight: bold;color:black;'},',')]),it.task.assigns.length==1 && m('div',{class:'',style:''}, [m('span',{class:'',title:'unassigned',style:'margin-top: -5px; display: inline-block;min-width:10px;font-size:15px;font-weight: bold;color:black;'},'<>'),m('span',{class:'',style:'margin-top: -5px; display: inline-block;min-width:10px;font-size:15px;font-weight: bold;color:black;'},',')]),m('div',{class:'ml-2',style:''}, [m('span',{class:'',style:'font-size:12px;'},it.task.datestart)]),m('div',{class:'ml-1',style:''}, [m('span',{class:'',style:'font-size:12px;'},'--')]),m('div',{class:'ml-1',style:''}, [m('span',{class:'',style:'font-size:12px;'},it.task.dateclose)]),m('div',{class:'',style:''}, [m('span',{class:'',style:'font-size:12px;'},'')])])])])])]);})])])])]),m('div',{class:'col-md-3',style:''}, [m('div',{class:'',style:''}, [m('h4',{class:'text-capitalize'},'about'),m('div',{class:'overflow-auto',style:'height:50px;'}, [m('p#paragraph254_622',{class:'ml-2',style:'max-height: 10%;'},[m('span',{class:''},project.project.description)])]),m('div',{class:'',style:''}, [m('div',{class:'d-flex mb-2',style:''}, [m('span',{class:'fa fa-spinner mr-2 mt-2'},''),m('span',{class:'text-capitalize mr-2 mt-1'},'progress'),m('div',{class:'progress mt-2',style:'width:100px; background-color: #091d0d; border-radius:30px'}, [m('span',{class:'progress-bar',style:'width:'+functionprogress(tasks)+'; border-raduis:30px;' },functionprogress(tasks))])]),m('div',{class:'d-flex mb-2',style:''}, [m('span',{class:'fa fa-calendar mr-2 mt-1'},''),m('span',{class:'text-muted mr-2 text-capitalize'},'open date'),m('span',{class:''},project.project.datestart)]),m('div',{class:'d-flex',style:''}, [m('span',{class:'fa fa-calendar mr-2 mt-1'},''),m('span',{class:'text-muted mr-2 text-capitalize'},'close date'),m('span',{class:''},project.project.deadline)])])]),m('hr',{}),m('div',{class:'',style:''}, [m('h4',{class:'text-capitalize'},'members'),m('ul',{class:'list-unstyled overflow-auto',style:'height: 150px;'},noms.map((it,itx)=>{return m('li',{class:'ml-2'},[m('span',{class:''},it)]);}))])])])])];}};}
    