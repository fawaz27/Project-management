module.export= ()=>{var check=()=>{var checktask=false;var validate_p=true;var cancel_p=true;var loading=false;var checkclose_cls = function(){return {gettasks:(id)=>{return app.request({method:'GET',url:'/project/projects/'+id+'/tasks'});}
 };}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'d-flex justify-content-center',style:''}, [m('div',{class:'',style:''}, [m('span',{class:''},'You are trying to close '),m('span',{class:'mr-1 ml-1 text-primary'},vnode.attrs.data.project.nom),m('span',{class:''},'project.')])]),loading==true && m('div',{class:'',style:''}, [m('span',{class:''},'Loading ...')]),checktask==true && m('div',{class:'',style:''}, [m('span',{class:''},'Please close all tasks in this project first.')]),m('div',{class:'d-flex justify-content-between',style:''}, [cancel_p==true && m('div',{class:'',style:''}, [m('button',{    type:'button',    class:'btn btn-link text-danger'    ,onclick:()=>{app.modal2.cancel();}},'cancel')]),validate_p==true && m('div',{class:'',style:''}, [m('button',{    type:'button',    class:'btn btn-link text-primary'    ,onclick:()=>{validate_p=false;
loading=true;
checkclose_cls.gettasks(vnode.attrs.data.id)
            .then((d)=>{
                if (d && d.status == 'ok') {
                    let tasks= d.data;
                    
                    for ( t of tasks) {
                        if (t.task.status!="close") {
                            loading=false;
                            checktask=true;
                            break;
                        }
                    }
                    if (checktask==false) {
                       app.modal2.close() ;
                    }
                    
                    
                }
            })}},'validate')])])])];}};};var projects=[];var functionjour=function (date2){
    date1=new Date();
    const day1 = date1.getTime()-date2.getTime();
    
   if(date1.getFullYear()!=date2.getFullYear()){

  return '  '+(date1.getFullYear()-date2.getFullYear())+' years';
  }
  else if(date1.getMonth()!=date2.getMonth()){
  return '  '+(date1.getMonth()-date2.getMonth())+' months';
  }
  else if (date1.getDay()!=date2.getDay()){
    var Diff_jours = day1 / (1000 * 3600 * 24);
  return '  '+Math.round(Diff_jours)+' days';
  }
  else if(date1.getHours()!=date2.getHours()){
  return '  '+(date1.getHours()-date2.getHours())+' hours';
  }
  else if(date1.getMinutes()!=date2.getMinutes()){
  return '  '+(date1.getMinutes()-date2.getMinutes())+' minutes' ;
  }
  else if(date1.getSeconds()!=date2.getSeconds()){
  return '  '+(date1.getSeconds()-date2.getSeconds())+' seconds' ;
  }
  };;var newproject={};var selectproject={};var infos=[
"You are a member of no project or no projects have been created yet.",
"Create a new project.",
"To create a project, please click on the button located at the top right of your screen."
];var loading=true;var home_cls = function(){return {getprojects:()=>{return app.request({method:'GET',url:'/project/projects'});}
,newproject:(project)=>{return app.request({method:'POST',url:'/project/projects',body:{project:project}});}
,updateproject:(id,project)=>{return app.request({method:'PUT',url:'/project/projects/'+id+'',body:{project:project}});}
,addmembers:(id,users_id)=>{return app.request({method:'POST',url:'/project/projects/'+id+'/members',body:{users_id:users_id}});}
,updatemember:(id,id_member,id_member_new)=>{return app.request({method:'PUT',url:'/project/projects/'+id+'/members',body:{id_member:id_member,id_member_new:id_member_new}});}
};}();return {oninit:(vnode)=>{app.setActions([{icon:'fa fa-plus',fn:()=>{newproject.type="add";
app.modal2.open(null, 'project/projet','col-md-6 offset-md-3', [{type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'},{type : 'button', click : app.modal2.close, text : 'create', class: 'btn btn-primary'} ], newproject )
    .then((d)=>{ 
        if(d==null){ newproject={};      return;}

        
    
        if(newproject.nom != undefined && newproject.responsible!=undefined){
    
            if(newproject.visibilty==undefined){
                newproject.visibilty=false;
            }
            if(newproject.description==undefined || newproject.description==""){
                newproject.description="No description provided";
            }
            if (newproject.datestart==undefined || newproject.datestart=="") {
                newproject.datestart=utils.now();
                if (newproject.deadline!=undefined && newproject.deadline!="") {
                    newproject.datestart=newproject.deadline;
                }     
            }
            if (newproject.deadline==undefined || newproject.deadline=="") {
                newproject.deadline=utils.now();
                if (newproject.datestart!=undefined && newproject.datestart!="") {
                    newproject.deadline=newproject.datestart;
                }
            }
            if((new Date(newproject.datestart)).getTime()>(new Date(newproject.deadline)).getTime()){
                app.alert('The close date must be later than the start date.'); return;
                
            }
            

            newproject.date=new Date();
            newproject.statut='open';
            newproject.createur=app.username();

            if (newproject.type=="add") {
                delete newproject.type;
                home_cls.newproject(newproject)
                    .then((dd)=>{
                        if(dd && dd.status == 'ok'){

                            if (newproject.responsible!=app.userid()) {
                                home_cls.addmembers(dd.data,newproject.responsible)
                                    .then((data)=>{
                                        if (data && data.status=='ok') {

                                            home_cls.getprojects()
                                                .then((d)=>{
                                                    if (d && d.status=='ok'){
                                                        projects=d.data; 
                                                        app.get_userdata().projects=projects;
                                                    } else{
                                                        app.alert('no projects found');
                                                    }
                                                });
                                        }
                                    });
                            } 
                            else {
                                home_cls.getprojects()
                                                .then((d)=>{
                                                    if (d && d.status=='ok'){
                                                        projects=d.data; 
                                                        app.get_userdata().projects=projects;
                                                        app.alert('Your project is created');
                                                    } 
                                                });
                            }



                            
                        }
                        newproject={};
                    });
            }
            else if (newproject.type=="update") {
                let id = newproject.id;
                let id_responsible=newproject.respo;
                delete newproject.respo;
                delete newproject.id;
                delete newproject.type;
                home_cls.updateproject(id,newproject.project)
                    .then((dd)=>{
                        if (dd && dd.status=='ok') {

                            home_cls.updatemember(dd.data,id_responsible,newproject.project.responsible)
                                .then((data)=>{
                                    if (data && data.status=='ok') {
                                        home_cls.getprojects()
                                            .then((d)=>{
                                                if (d && d.status=='ok'){
                                                    projects=d.data; 
                                                    app.get_userdata().projects=projects;
                                                    app.alert('Your project is updated');
                                                }
                                            });
                                    }
                                });



                            
                        }
                        newproject={};
                    })
            }

        
        }
        else
            app.alert('You must provide the name and responsible');
    
    
    

    
 });},title:'new project',role:''}]);app.set_userdata({projects:projects});   home_cls.getprojects().then((d)=>{if (d && d.status=='ok'  ){projects=d.data; loading=false;app.get_userdata().projects=projects;}});    },view:(vnode)=>{return [m('div',{class:'',style:''}, [loading==true && m('div',{class:'d-flex align-items-center justify-content-center',style:''}, [m('div',{class:'spinner-border',style:''}, [m('span',{class:'sr-only'},'Loading...')])]),loading ==false && projects.length==0 && m('div',{class:'',style:''}, [m('div',{class:'card col-md-6 offset-3',style:''}, [m('div',{class:'',style:''}, [m('div',{class:'d-flex align-items-center justify-content-center',style:'height: 200px;'}, [m('div',{class:'d-flex align-items-center ',style:'flex-direction: column;'}, [m('h5',{},'No project found'),m('h6',{},'Contact your manager '),m('div',{class:'',style:''}, [m('span',{class:'',style:'font-size:16px;'},'Click on '),m('span',{class:'fa fa-plus',style:'background: #777784;'},''),m('span',{class:'',style:'font-size:16px;'},'  to create one.')])])])])])]),loading==false && projects.length>0 && m('div',{class:'row',style:''}, [projects.map((it,itx)=>{return m('div',{class:'col-md-4 mt-3',style:''}, [m('div',{class:'card',style:''}, [app.userid()===it.project.responsible && m('div',{class:'pt-2 d-flex justify-content-end hidden-item-show',style:' margin-top: -5px; '}, [m('div',{class:'hidden-item',style:''}, [m('span',{class:'fa fa-pen pt-1 mr-2',title:'edit',style:'cursor: pointer;',onclick:()=>{newproject=it.project;
 newproject.id=it.id;
 newproject.respo=it.project.responsible;
 newproject.type='update';
 app.modal2.open(null, 'project/projet','col-md-6 offset-md-3', [{type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'},{type : 'button', click : app.modal2.close, text : 'edit', class: 'btn btn-primary'} ], newproject )
     .then((d)=>{ 
         if(d==null){newproject={}; return;}
 
     
         if(newproject.nom != undefined  && newproject.responsible!=undefined){
     
            if(newproject.visibilty==undefined){
                newproject.visibilty=false;
            }
            if(newproject.description==undefined){
                 newproject.description="No description provided";
            }
            if (newproject.datestart==undefined || newproject.datestart=="") {
                newproject.datestart=utils.now();
                if (newproject.deadline!=undefined && newproject.deadline!="") {
                    newproject.datestart=newproject.deadline;
                }     
            }
            if (newproject.deadline==undefined || newproject.deadline=="") {
                newproject.deadline=utils.now();
                if (newproject.datestart!=undefined && newproject.datestart!="") {
                    newproject.deadline=newproject.datestart;
                }
            }
            if((new Date(newproject.datestart)).getTime()>(new Date(newproject.deadline)).getTime()){
                app.alert('The close date must be later than the start date.');
                return;
            }
             newproject.date=new Date();
             newproject.statut='open';
             newproject.createur=app.username();
             if (newproject.type=="add") {
                 delete newproject.type;               
                 home_cls.newproject(newproject)
                     .then((dd)=>{
                         if(dd && dd.status == 'ok'){
                             
                             if (newproject.responsible!=app.userid()) {
                                 home_cls.addmembers(dd.data,newproject.responsible)
                                     .then((data)=>{
                                         if (data && data.status=='ok') {
 
                                             home_cls.getprojects()
                                                 .then((d)=>{
                                                     if (d && d.status=='ok'){
                                                         projects=d.data; 
                                                         app.get_userdata().projects=projects;
                                                     } else{
                                                         app.alert('no projects found');
                                                     }
                                                 });
                                         }
                                     });
                             } 
 
 
                         }
                         newproject={};
                     });
             }
             else if (newproject.type=="update") {
                     let id = newproject.id;
                     let id_responsible=newproject.respo;
                     delete newproject.respo;
                     delete newproject.id;  
                     delete newproject.type;              
                     home_cls.updateproject(id,newproject)
                         .then((dd)=>{
                             if (dd && dd.status=='ok') {


                                if (id_responsible==app.userid() && newproject.responsible!=app.userid() ) {

                                    home_cls.addmembers(dd.data,newproject.responsible)
                                        .then((data)=>{
                                            if (data && data.status=='ok') {

                                                home_cls.getprojects()
                                                    .then((d)=>{
                                                        if (d && d.status=='ok'){
                                                            projects=d.data; 
                                                            app.get_userdata().projects=projects;
                                                            app.alert('Your project is updated');
                                                        } else{
                                                            app.alert('no projects found');
                                                        }
                                                    });
                                            }
                                        });


                                
                                } 
                                else if(id_responsible!=app.userid() && newproject.responsible!=id_responsible) {
                                    home_cls.updatemember(dd.data,id_responsible,newproject.responsible)
                                        .then((data)=>{
                                            if (data && data.status=='ok') {
                                                home_cls.getprojects()
                                                    .then((d)=>{
                                                        if (d && d.status=='ok'){
                                                            projects=d.data; 
                                                            app.get_userdata().projects=projects;
                                                            app.alert('Your project is updated');
                                                        } else{
                                                            app.alert('no projects found');
                                                        }
                                                    });
                                            }
                                 });
                                }
                                else{
                                    home_cls.getprojects()
                                        .then((d)=>{
                                            if (d && d.status=='ok'){
                                                projects=d.data; 
                                                app.get_userdata().projects=projects;
                                                app.alert('Your project is updated');
                                            } else{
                                                app.alert('no projects found');
                                            }
                                        });
                                }
                                

                                 
                                 
 
 
                             }
                             newproject={};
                         })
             }
 
         
         }
         else
             app.alert('You must provide the name and responsible');
     
     
     
 
     
  })}},''),m('span',{class:'fa fa-times pt-1 mr-2',style:'cursor: pointer;',onclick:()=>{selectproject=it;

if (app.userid()==selectproject.project.responsible) {
    app.modal2.open(null, check ,'col-md-4 offset-md-4', 
    [],selectproject )
    .then((d)=>{ 
        if (d==null) return ;

        selectproject.project.statut='close';
        home_cls.updateproject(selectproject.id,selectproject.project)
            .then((dd)=>{
                if (dd && dd.status=='ok') {
                   let id=projects.indexOf(it);
                   projects.splice(id,1);
                   app.get_userdata().projects=projects;
                   
                   
                }
            })
    });
} 
else{
    app.alert('You do not have permissions to perform this action.')
}
}},'')])]),m('div',{class:'card-body',style:''}, [m('a',{id:'title',onclick:()=>{if(app.get_userdata())
app.get_userdata().project=it;
app.go('/home/project/viewonproject','viewonproject','Viewonproject');},href:'javascript:;'},[m('h5',{class:'card-title'},it.project.nom)]),m('p#text',{class:'card-text  text-truncate',style:'max-width: 400px; height:20px;'},[it.project.description,]),m('p#createur',{},[m('span',{class:'mr-2'},'Created by :'),m('span',{class:'',style:'width: 400px;'},it.project.createur)]),m('div',{class:' text-muted border-top pt-2',style:''}, [m('span',{class:'mt-2 mr-1'},'There are'),m('span',{class:'mt-2'},functionjour(new Date(it.project.date)))])])])]);})])])];}};}
