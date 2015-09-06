Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],

  
    init: function() {
        this.control({
          'authloglist':{
  //         select: this.showTab,
            render: this.showRender
          },
          //�ؼ��ֲ�ѯ
          'authloglist button[action=keycx]':{
                click: this.dwglkeycx
          },
          //����
          'authloglist button[action=advancecx]':{
                click: this.cxyhadd
          },
          			//��ʾ�ϴ�ͼƬ����
		     'addwin button[action=upfile]':{
				  click: this.showupload
			    },
			              //���ӱ���
          'authloglist button[action=add]':{
                click: this.add
          },
          'authloglist button[action=del]':{
            click: this.cxyhdel
          },
          'authloglist button[action=hidShw]':{
            click: this.cxyhhidshw
          },
            'authloglist button[action=active]':{
                click: this.active
          },
           'authloglist button[action=disable]':{
                click: this.disable
          },
          'authloglist button[action=exp]':{
                click: this.exp
          }
        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
          store.on('beforeload', function (store, options) {
        //������ͼ�߶�
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height)+25);
        	
            var keyword = Ext.getCmp('keyword').value;
           // var statway = Ext.getCmp('statway').value;
       
            var new_params={keyword:keyword};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },// showRender: function(){
   showupload: function(thisBtn){
   var sid=thisBtn.up('form').getForm().findField('sid').getValue();
  
   if(sid==''){
		alert("���ȱ����¼,���ϴ�");
		return 0;	
		}
  
	   	var win = Ext.create('proauthRzAuthlog.view.common.UploadWin',{
	     title: "�ϴ�ͼƬ",
	    field1: sid,
	    field2:''
	    });
	    win.showAt(340,100); 
  
  },
    del:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('cid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
          tstore.load({params:{del:"del",cid:selsid}});   
      },
   active:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
       var str = '';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('cid') + "'";
           str+=rows[i].get('taskname');
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
           if(i>1)
            str+='  ��'+i+'�����񽫱�־�Ϲ�';
          else
            str+='  �����־�Ϲ�';
          Ext.MessageBox.confirm('ȷ��', str, function(btn){
            if(btn=='yes')
               tstore.load({params:{update:"0",cid:selsid}});  
          });
       },
       disable:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
       var j = 0;
       var str = '';
         for(var i=0;i<rows.length;i++){
          if(i==0){
            str+=rows[i].get('taskname');
           selsid="'" + rows[i].get('cid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
             if(i>1)
            str+='  ��'+i+'�����񽫱�־���Ϲ�';
          else
            str+='  �����־���Ϲ�';
          Ext.MessageBox.confirm('ȷ��', str, function(btn){
            if(btn=='yes')
               tstore.load({params:{update:"1",cid:selsid}});  
          });
         
       },
    //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
  
    //����
    add: function(thisBtn){
    var win = Ext.create('proauthRzAuthlog.view.common.AddWin',{
        title: "�༭",
        field1: ""

      });
      win.showAt(340,20); 	  	
    },// dwglavcx: function(thisBtn){
    cxyhaddsave:function(thisBtn){


  	var tstore=Ext.ComponentQuery.query('authloglist')[0].getStore();
  	
   	var tform=thisBtn.up('window').query('form')[0];   	
   
    var aname=tform.getForm().findField('name').value;
    if(aname==''){
    	alert('��������Ʒ����');
    	return;
    }
    var acid=tform.getForm().findField('cid').value;
    if(acid==''){
    	alert('�������̳�����');
    	return;
    }
 
    tform.getForm().doAction('submit',{
                url:'/pronline/Msg',
                 method:'post',
                 waitMsg: '���ڱ���...',
                  params:{FunName:'ncmCxyh_Save'},
                  success:function(form,action){

         tform.getForm().findField('sid').setValue(action.result.sid);  
    //      var store = Ext.ComponentQuery.query('resourcelist')[0].getStore();
          Ext.Msg.alert('����',"����ɹ�");  
          tstore.load();         
                  }
                  ,
                 failure:function(form,action){
                 	Ext.Msg.alert(action.result.msg);

                   }         
                 })  	
   },
     cxyhdel:function(thisBtn){
      var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('sid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('sid') + "'";
             }
           }
          tstore.load({params:{del:"del",selsid:selsid}});
         },
    cxyhhidshw:function(thisBtn){
      var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('sid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('sid') + "'";
             }
           }
          tstore.load({params:{hidshw:"hidShw",selsid:selsid}});
         },
          exp:function(thisBtn){
        var form1 = document.getElementById('form1');
        
         //form1.keyword.value =  Ext.getCmp('keyword').value;
         //form1.statway.value = Ext.getCmp('statway').value;

        form1.exp.value='exp';
        form1.submit();
        form1.exp.value=""; 
      },
    /**************************************
    * ���Ա�ǩ 
    ***************************************/  
    showTips: function( thisTV, eOpts ){
      thisTV.tip = Ext.create('Ext.tip.ToolTip', {
        target: thisTV.el,
        trackMouse: true,
        dismissDelay : 60000,
        html: '<p>���磺</p><p>&nbsp;&nbsp;&nbsp;�����˿ڣ�80,21</p><p>&nbsp;&nbsp;&nbsp;�˿ڶΣ�2000~3000</p><p>&nbsp;&nbsp;&nbsp;��ϣ�80,2000~3000,3005</p>'
      });
    },
    /**************************************
    * ȫ�ֺ��� 
    ***************************************/
    inheritableStatics:{
        loadProcyListStore:function(){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            var keyword = Ext.getCmp('keyword').value;
         
            store.load({mac:keyword});
        },
        SetPage:function(curpage){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            store.currentPage = curpage;
        },
        setTitle: function(title){
             document.getElementById("titledx").innerHTML = 
                 '&nbsp'+ title +'&nbsp;&nbsp;';   
        }
    }
   
});
