sap.ui.define(['sap/ui/core/UIComponent'],
    function(UIComponent){
        return UIComponent.extend("com.rg.sd.or.Component",{
           metadata: {
             manifest: "json"
           },
           init: function(){
            UIComponent.prototype.init.apply(this);
            this.getRouter().initialize();
           },
           
           //createContent: function(){},
           destroy: function(){
            sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
           }
        });
    });