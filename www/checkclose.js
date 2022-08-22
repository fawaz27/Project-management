()=>{var checktask=false;var validate_p=true;var cancel_p=true;var checkclose_cls = function(){return {gettasks:(id)=>{return app.request({method:'GET',url:'/project/projects/'+id+'/tasks'});}
 };}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:'' }, [m('div',{class:'d-flex justify-content-center',style:'' }, [m('div',{class:'',style:'' }, [m('span',{class:''},'You are trying to close '),m('span',{class:'mr-1 ml-1 text-primary'},vnode.attrs.data.nom),m('span',{class:''},'project.')])]),validate_p==false || cancel_p==false && m('div',{class:'',style:'' }, [m('span',{class:''},'Loading ...')]),m('div',{class:'d-flex justify-content-between',style:'' }, [cancel_p==true && m('div',{class:'',style:'' }, [m('button',{    type:'button',    class:'btn btn-link text-danger'    ,onclick:()=>{app.modal2.cancel();}},'cancel')]),validate_p==true && m('div',{class:'',style:'' }, [m('button',{    type:'button',    class:'btn btn-link text-primary'    ,onclick:()=>{//app.modal2.close();
validate_p=false;
cancel_p=false;

checkclose_cls.gettasks(vnode.attrs.data.id)
            .then((d)=>{
                if (d && d.status == 'ok') {
                    let tasks= d.data;
                    
                    for ( t of tasks) {
                        if (t.task.status!="close") {
                            cancel_p=true;
                            break;
                        }
                    }
                    if (cancel_p==false) {
                       app.modal2.close() ;
                    }
                    
                    
                }
            })}},'validate')])])])];}};}
