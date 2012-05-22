$(document).ready(function(){
    
    //iPad or not???
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart" : "click";

    //count selects
    var selectsCount = $('select').length;
    
    changeSelects();
    
    //set values and generate change event when option selected
    $(document).on(event,'div.optionsDivInvisible span',function(){
        $(this).closest('.selectArea').find('input[type="hidden"]').attr("value", $(this).attr("name"));   
        $(this).closest('.selectArea').find('input[type="text"]').attr("value", $(this).text());     
        $(this).closest('.optionsDivInvisible').hide();
        $(this).closest('.selectArea').find('input[type="hidden"]').trigger('change');
    });
    
    $('div.optionsDivInvisible span').hover(
        function(){
          $(this).addClass('over');
        }, 
        function(){
          $(this).removeClass('over');
        }
    );
    
    $(document).on(event, 'div.selectArea > input,div.center_a', function(){
        $(this).closest('.selectArea').find('.optionsDivInvisible').slideToggle(200);

        //generate scrollbar if options more than 8
        if($(this).closest('.selectArea').find('.scrollbar-container').length)
        {
            var a=this.parentNode.getElementsByTagName('div').item(3).id;
            var b=this.parentNode.getElementsByTagName('div').item(8).id;
            scroller=new jsScroller(document.getElementById(b),0,143);
            scrollbar=new jsScrollbar(document.getElementById(a),scroller,false,false)
        }
        
    });
    
    $(document).on(event, function(e){
        if ($(e.target).closest(".selectArea").length) return;
        $('.selectArea').find('.optionsDivInvisible:visible').slideUp(200);
        e.stopPropagation();
    });
});

    var counter = 0;
    
    function changeSelects(selector){
        if (!selector) selector = '';
      
        $("." + selector + "select").each(function(index){
            
            index = counter;
        
            var visElCount = 8,
                selOpts = $(this).children(),
                selOptsCount = $(this).children().length,
                selClassName = $(this).attr('class'),
                selName = $(this).attr('name'),
                selId = $(this).attr('id'),
                currentOpt;
        
            if(selOptsCount > visElCount)
            {
                $(this).hide();
                
                $(this).before("\
                    <div class='selectArea " + selClassName + "' style='z-index:"+(100-index)+"'>\
                        <div class='left'></div>\
                        <div class='center_a'></div>\
                        <div class='optionsDivInvisible' id='optInvis_" + index + "'>\
                            <div class='scrollbar-container' id='scroll_container_"+index+"'>\
                                <div class='scrollbar-up'></div>\
                                <div class='scrollbar-down' id='scrollbar-down'></div>\
                                <div class='scrollbar-track' id='scrollbar-track'>\
                                    <b class='scrollbar-handle' id='scrollbar-handle'></b>\
                                </div>\
                                <div class='container2' id='container'>\
                                    <div class='scroller-1' id='scroller_"+ index +"'>\
                                        <div class='scroller-container' id='" + selId + "_fake'></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <input type='text' readonly id='v" + selId + "' />\
                        <input type='hidden' name='" + selName + "' id='" + selId + "' />\
                    \</div>");
                    
                var scrollContainer = $("#scroller_" + index + " > div");
                
                //filling
                for(var i = 0; i < selOptsCount ; i++){
                    currentOpt = selOpts.eq(i);
                    scrollContainer.append("<span name='" + currentOpt.val() + "'>" + currentOpt.text() + "</span>");
                }
                
                $("#" + selId).val($("#" + $(this).attr('id') + " > option[selected='selected']").val());
                $("#v" + selId).val($("#" + $(this).attr('id') + " > option[selected='selected']").text());
                
                //init scrollbar
                var k='scroll_container_'+index;
                var l='scroller_'+index;
                scroller=new jsScroller(document.getElementById(l),0,143);
                scrollbar=new jsScrollbar(document.getElementById(k),scroller,false,false);
            
                $("#optInvis_"+ index).hide().css("visibility","visible");
                
                $(this).remove()
            }
            else
            {
                $(this).before("\
                    <div class='selectArea " + selClassName + "' style='z-index:"+ (100-index)+"'>\
                        <div class='left'></div>\
                        <div class='center_a'></div>\
                        <div class='optionsDivInvisible' id='" + selId + "_fake'></div>\
                        <input type='text' readonly name='v" + selName + "' id='v" + selId + "' />\
                        <input type='hidden' name='" + selName + "' id='"+ selId +"' />\
                    \</div>");
                
                //filling
                for(var i = 0; i < selOptsCount; i++)
                {
                    currentOpt = selOpts.eq(i);
                    $("#" + selId + "_fake").append("<span name='" + currentOpt.val() + "'>" + currentOpt.text() + "</span>")
                }
                
                $("#" + selId).val($("#" + $(this).attr('id') + " > option[selected='selected']").val());
                $("#v" + selId).val($("#" + $(this).attr('id') + " > option[selected='selected']").eq(0).text());
                
                $("#" + selId + "_fake").hide().css("visibility","visible");
                
                $(this).remove()
            }
            counter++;
        });
    }
    
    
    
    


	
    
    
    
	
	
