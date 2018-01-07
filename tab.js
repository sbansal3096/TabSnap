chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
       if(command==='save-tabs') {
           chrome.storage.sync.clear(function(){});
           for(i=0;i<tabs.length;i++)
           {
                var key = JSON.stringify(i);
                var item = {};
                item[key] =tabs[i].url;
                chrome.storage.sync.set(item);
           }
            var key='count';
            var items={};
            items[key]=tabs.length;
            chrome.storage.sync.set(items);
       }
       else
       {
           chrome.storage.sync.get('count',function(items) {
               var c=items['count'];
               for (i = 0; i < c; i++)
               {
                   (function(i){
                   var si=JSON.stringify(i);
                   chrome.storage.sync.get(si,function(item){
                       chrome.tabs.create({url:item[si]},function(){});
                    });
               }).call(this,i); }
           });
       }
    });
});
