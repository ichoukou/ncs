
Ext.define('MyDesktop.BkgjWindow', {
    extend: 'Ext.ux.desktop.Module',

   

    id:'bkgj-win',

    init : function(){
        this.launcher = {
            text: '���ظ澯��ѯ',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bkgj-win');
        var htmlvar='<iframe src="/pronline/Msg?FunName@ncsWebReplace&plate@windows/main_frm.htm&title@�澯��Ϣ" style="width:1350px;height:950px;display:block;" FrameBorder=0 scrolling="yes">';
        if(!win){
            win = desktop.createWindow({
                id: 'bkgj-win',
                title:'���ظ澯��ѯ',
                width:1024,
                height:700,
                autoScroll: true,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
    //            layout: 'fit',
                 html:htmlvar

            });
        }
        return win;
    }
});
