Ext.define('proauthApset.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.apsetlist',
  store : 'List', 
  height:parent.grid_height,
  width:parent.grid_width,
  autoScroll: true,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('apsetlist')[0];
                  
              grid.down('#removeButton').setDisabled(selections.length == 0);
              grid.down('#shButton').setDisabled(selections.length == 0);
                
            }
        }
    
    });
    this.selModel=sm;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
                  {
               xtype:'textfield',
               id:'keyword_dwgl',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'AP���/Mac/��װ��ַ/��·/����',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
        
                 },
         
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
                if(aae==13){
                    proauthApset.controller.Procy.loadProcyListStore();     
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
                action:'keycx'
            },
         '-',
   
     	 {
     	 	text:'����',
     	 	iconCls:'add',
     	 	action:'add'
     	},'-',
     	 {
     	 	text:'ɾ��',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-',
     	 {
     	 	text:'���',
     	 	itemId: 'shButton',
     	 	iconCls:'add',
     	 	disabled: true,
     	 	action:'sh'
     	},
		'-',
     	 {
     	 	text:'����',
     	 	itemId: 'impButton',
     	 	iconCls:'exp',
     	 	disabled:false,
     	 	action:'import'
     	},
     	/*'-',
     	 {
     	 	text:'��λ����',
     	 	itemId: 'dwszButton',
     	 	iconCls:'add',
     	
     	 	action:'dwsz'
     	},*/
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
     {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸�AP��Ϣ���档',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        },
      {header: 'AP����',     dataIndex: 'aptype',width:80, sortable: true,
      	  renderer:function(value,metaData,record){
          if(value=='1'){return '�̶��ɼ��豸'}
          else if(value=='2'){return '�ƶ������豸'}
          else if(value=='3'){return '�����ɼ��豸'}
          else {return '����'}
          }
      	
      	},
       {header: 'AP���',     dataIndex: 'gwid',width:80, sortable: true},
       {header: 'AP��ʾ��',     dataIndex: 'dispname',width:120, sortable: true},
      {header: '��������',       dataIndex: 'servicename',width:120, sortable: false},
       {header: '��������',       dataIndex: 'servicecode',width:120, sortable: false},
       {header: '���볧��',       dataIndex: 'fname',width:120, sortable: false},
      {header: 'AP MAC', dataIndex: 'mac', width:150,sortable: false},
      {header: '��װ��ַ', dataIndex: 'address', width:160,sortable: true},
      {header: '����', dataIndex: 'longitude',  width:80},
      {header: 'γ��', dataIndex: 'latitude',   width:80},
  
      {header: 'SSID', dataIndex: 'ssid',   width:70},
      {header: '��ͨ��·', dataIndex: 'line',   width:70},
      {header: '�������', dataIndex: 'plate',   width:70},
      {header: '��ͼ��ʶ', hidden:true, dataIndex: 'mapid',   width:60},
      {header: '�����汾', hidden:true, dataIndex: 'version',   width:60},
      {header: '���״̬', dataIndex: 'flags',   width:70,
      	 renderer:function(value,metaData,record){
          if(value=='1'){return '<font color=green>����</font>'}
          else if(value=='0'){return '<font color=red>δ��</font>'};
          }
      	}
       
      
    ];

    this.callParent(arguments);
  }
    
});