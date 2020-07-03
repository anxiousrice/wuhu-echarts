var newData,newData1,newData2,newData3,totalData,totalMoney;
function getTotal(){
    $.ajax({
        type: 'post',
        data:{
            level_area_name:'芜湖市',
            one_level_area_name:'芜湖县'
        },
        url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultToDayRecord',
        success: function(result) {
            newData = parseInt(result.all);
            console.log('newData的值是',newData)
            //路外总订单
            $(".outcount").html(newData);
            $.ajax({
                type: 'post',
                data:{
                    level_area_name:'芜湖市',
                    one_level_area_name:'芜湖县'
                },
                url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultToDayMoney',
                success: function(result) {
                    newData1 = parseInt(result.allmoney);
                    //路外总营收
                    $(".outside").html(newData1)
                    $.ajax({
                        type: 'post',
                        url: "http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostToDayFee",
                        success: function(result) {
                            newData2 = parseInt(result.num);
                            //路内总营收
                            $(".inside").html(newData2)
                            $.ajax({
                                type: 'post',
                                url: "http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostToDayOrder",
                                success: function(result) {
                                    //路内订单
                                    newData3 = parseInt(result.todayall);
                                    $(".insidecount").html(newData3)
                                    var totalData=newData + newData3;
                                    var totalMoney = newData1 + newData2;
                                    $(".totalCount").html(totalMoney)
                                    $(".totalRecord").html(totalData)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
setInterval(function(){getTotal()},10000)
// var totalData=newData + newData3;
// var totalMoney = newData1 + newData2;
// console.log(totalData,totalMoney)
// $(".totalCount").html(totalData)
// $(".totalRecord").html(totalMoney)
// var totalData=sessionStorage.getItem(newData)+sessionStorage.getItem(newData2)


// function getTotal(){
//     if(typeof(newData) != 'undefined' && typeof(newData2) != 'undefined'){
//         totalData = newData + newData2;
//     }

//     if(typeof(newData1) != 'undefined' && typeof(newData3) != 'undefined'){
//         totalMoney = newData1 + newData3;
//     }

//     $(".totalCount").html(totalData);
//     $(".totalRecord").html(totalMoney);

//     if(typeof(totalData) != 'undefined' && typeof(totalMoney) != 'undefined'){
//         clearInterval(totalVar);
//     }
// }

// var totalVar = setInterval(function(){
//     getTotal();
// }, 3000);

// totalData = newData + newData2;
// console.log(newData);
// console.log(newData2);
// console.log(totalData);
// var totalMoney=sessionStorage.getItem(newData1)+sessionStorage.getItem(newData3)
// $(".totalCount").html(totalData)
// $(".totalRecord").html(totalMoney)