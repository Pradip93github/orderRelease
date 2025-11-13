
sap.ui.define(['com/rg/sd/or/controller/BaseController',
               'sap/ui/model/Filter',
               'sap/ui/model/FilterOperator',
               'sap/m/MessageBox',
               'sap/m/MessageToast',
               'sap/m/Text',
               'sap/m/CheckBox'
],
    function(BaseController,Filter,FilterOperator,MessageBox,MessageToast,Text,CheckBox){

     return BaseController.extend("com.rg.sd.or.controller.Master",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("startPage").attachMatched(this.harculus, this);
        },

      

        onButtonPress: function(oEvent){
            debugger;
           var soNumber = this.getView().byId("idSO").getValue();

           if ( !soNumber || soNumber.length === 0 ) {

                var oTable = this.getView().byId("idTab");  
                   if (oTable) {
                   oTable.unbindAggregation("items");
                    }

               MessageBox.error("oops! please enter correct Sales Document No");
               
                }else {
                  
                 var oTable = this.getView().byId("idTab");  
                   if (oTable) {
                   oTable.unbindAggregation("items");
                    }

                 var soFilter = [];
                soFilter = new Filter("SO", FilterOperator.EQ, soNumber);

               var oItemTemplate = new sap.m.ColumnListItem({
                    //type: 'Navigation',
                    cells:[
                      // new CheckBox({ 
                      //    selected: "{ordrels>CHECK}",
                      //     select: this.onCheckBoxSelect
                      //  }),
                    
                      // new Text({ text: "{ordrels>CHECK}"}),
                      new Text({ text: "{ordrels>KKBER}"}),
                      new Text({ text: "{ordrels>SO}" }),
                      new Text({ text: "{ordrels>VBTYP}" }),
                      new Text({ text: "{ordrels>VKORG}" }),
                      new Text({ text: "{path: 'ordrels>VTWEG'}" }),
                      new Text({ text: "{path: 'ordrels>SPART'}" }),
                      new Text({ text: "{ordrels>KNKLI}" }),
                      new Text({ text: "{ordrels>ERDAT}" }),
                      new Text({ text: "{ordrels>ERNAM}" }),
                      new Text({ text: "{ordrels>CTLPC}" }),
                      new Text({ text: "{ordrels>WAERK}" }),
                      new Text({ text: "{ordrels>NETWR}" }),
                      new Text({ text: "{ordrels>CMGST}" }),
                      new Text({ text: "{ordrels>GBSTK}" }),
                      new Text({ text: "{ordrels>SHP}" }),
                    ],
                    
                  });

                    this.getView().byId("idTab").bindAggregation("items",{
                        path: "ordrels>/SalesDocSet",
                        template: oItemTemplate,
                        filters: soFilter,
                      
                    });
            }
           
        },

        onCheckBoxSelect: function(oEvent){
             
               var bSelected = oEvent.getParameter("selected");
               var oSource = oEvent.getSource();
               var oBindingContext = oSource.getBindingContext();
                if (oBindingContext) {
            oBindingContext.getModel().setProperty(oBindingContext.getPath() + "/IsSelected", bSelected);
        }
        },

        onButtonRelease: function(oEvent){
          // debugger;
           var oModel = this.getView().getModel("ordrels");
          
          var oList = this.getView().byId("idTab");
           var aItems = oList.getItems();

          for (var i = 0; i < aItems.length; i++) {
           var oBindingContext = aItems[i].getBindingContext("ordrels");
           if (oBindingContext) {
          var oPayload = oBindingContext.getObject();
          }
         };
         if (oPayload.CHECK === false) {
            oModel.create("/SalesDocSet", oPayload, {
            success: function(sData){
                
               MessageToast.show("Document Release sucessfully");
            },
            error: function(eData){
              
              MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].messages);
            }
          });
         } else {
            MessageBox.error("Please select the item");
            return;
         }
          
        }





     });

});