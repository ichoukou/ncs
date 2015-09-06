Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List','common.AddWin','common.DownWin'],
    servicecode:'',
    servicename:'',
    mac:'',
    apname:'',
    apmac:'',
    ssid:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',
  
    init: function() {
        this.control({
          'authloglist':{
  //         select: this.showTab,
            render: this.showRender
          },
          //�ؼ��ֲ�ѯ
          'authloglist button[action=keycx]':{
                click: this.keycx
          },
          //�߼���ѯ
          'authloglist button[action=add]':{
                click: this.add
          },
          'addwin button[action=adds]':{
                click: this.adds
          },
          
          'authloglist button[action=del]':{
                click: this.del
          },
          'authloglist button[action=exp]':{
                click: this.exp
          },
          'authloglist button[action=active]':{
                click: this.active
          },
           'authloglist button[action=disable]':{
                click: this.disable
          },
          'authloglist button[action=help]':{
                click: this.help
          },
          //�༭
          'upwin button[action=edit]':{
                click: this.edit
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
            var statway = Ext.getCmp('statway').value;
       
            var new_params={keyword:keyword,statway:statway};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
     help:function  (thisBtn) {
    	Ext.Msg.alert("��ʾ","������MAC��ַ����ʽXX-XX-XX-XX-XX-XX����';'�ָ�");
    },
      edit:function(thisBtn){
      
      var taskname = Ext.getCmp('taskname').value;
         if(taskname==''){
         Ext.Msg.alert('����','�������Ʋ���Ϊ��');
         return;
       }
         var taskdesc = Ext.getCmp('taskdesc').value;
         if(taskdesc==''){
         Ext.Msg.alert('����','������������Ϊ��');
         return;
       }
         var  mac = Ext.getCmp('mac').value;
        
         if(mac==''||typeof(mac)=="undefined"){
         Ext.Msg.alert('����','MAC����Ϊ��');
         return;
       }
         var  dids = Ext.getCmp('groupid').value;
         if(dids==''){
         Ext.Msg.alert('����','��������Ϊ��');
       return;}
         var  sdate=Ext.getCmp('sdate').value;
         if(sdate==''){
         Ext.Msg.alert('����','��ʼʱ�䲻��Ϊ��');
         return;
       }
         var  edate=Ext.getCmp('edate').value;
         if(edate==''){
         Ext.Msg.alert('����','����ʱ�䲻��Ϊ��');
         return;
       }
         var  servcount = Ext.getCmp('servcount').value;
         if(servcount ==''){
         Ext.Msg.alert('����','�ظ����ָ�������Ϊ��');
         return;
       }
         var  maccount = Ext.getCmp('maccount').value;
         if(maccount ==''){
         Ext.Msg.alert('����','����mac��������Ϊ��');
         return;
       }
         var cid = Ext.getCmp('cid').value;
         var startdate = new Date(sdate);
         var starttime = startdate.getTime()/1000;
         var enddate = new Date(edate);
          var endtime = enddate.getTime()/1000;
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
      
        tstore.load({params:{edit:"edit",taskname:taskname,taskdesc:taskdesc,mac:mac,dids:dids,servcount:servcount,
          maccount:maccount,starttime:starttime,endtime:endtime,cid:cid}});
          
         var tform=thisBtn.up('window'); 
         tform.close();  
      },
      add:function(thisBtn){
         var win = Ext.create('proauthRzAuthlog.view.common.UpdateWin',{
        title: "������Ϊ����",
        field1: ""

      });
      win.showAt(300,20);      
      },
       adds:function(thisBtn){
           alert("ddd");
         var taskname = Ext.getCmp('taskname').value;
         if(taskname==''||typeof(taskname)==undefined)
         Ext.Msg.alert('�������Ʋ���Ϊ��');
         var taskdesc = Ext.getCmp('taskdesc').value;
         if(taskdesc=='')
         Ext.Msg.alert('������������Ϊ��');
         var  mac = Ext.getCmp('mac').value;
         if(mac=='')
         Ext.Msg.alert('MAC����Ϊ��');
         var  dids = Ext.getCmp('groupname').value;
         if(dids=='')
         Ext.Msg.alert('��������Ϊ��');
         var  sdate=Ext.getCmp('sdate').value;
         if(sdate=='')
         Ext.Msg.alert('��ʼʱ�䲻��Ϊ��');
         var  edate=Ext.getCmp('edate').value;
         if(edate=='')
         Ext.Msg.alert('����ʱ�䲻��Ϊ��');
        
         var  servcount = Ext.getCmp('servcount').value;
         if(servcount =='')
         Ext.Msg.alert('�ظ����ָ�������Ϊ��');
         var  maccount = Ext.getCmp('maccount').value;
         if(maccount =='')
         Ext.Msg.alert('����mac��������Ϊ��');
         var startdate = new Date(sdate);
         var starttime = startdate.getTime()/1000;
         var enddate = new Date(edate);
          var endtime = enddate.getTime()/1000;
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
      
        tstore.load({params:{add:"add",taskname:taskname,taskdesc:taskdesc,mac:mac,dids:dids,servcount:servcount,
          maccount:maccount,starttime:starttime,endtime:endtime}});
          
         var tform=thisBtn.up('window'); 
         tform.close();
         

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
            str+='  ��'+i+'��������Ч';
          else
            str+='  ������Ч';
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
            str+='  ��'+i+'������ʧЧ';
          else
            str+='  ����ʧЧ';
          Ext.MessageBox.confirm('ȷ��', str, function(btn){
            if(btn=='yes')
               tstore.load({params:{update:"1",cid:selsid}});  
          });
         
       },
       exp:function(thisBtn){
        var form1 = document.getElementById('form1');
        
         form1.keyword.value =  Ext.getCmp('keyword').value;
         form1.statway.value = Ext.getCmp('statway').value;

        form1.exp.value='exp';
        form1.submit();
        form1.exp.value=""; 
      },


      keycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
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
            
         
            store.load();
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
