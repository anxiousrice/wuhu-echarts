(function(doc, win) {
    var docEI = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientataionchange' : 'resize',
        recalc = function() {
            var clientWidth = docEI.clientWidth;
            if (!clientWidth) return;
            //16是字体大小，1920是开发时浏览器窗口的宽度，等比计算
            docEI.style.fontSize = 16 * (clientWidth / 1920) + 'px';
        }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


(function() {
    var Index=[];
    var totalCount = [];
    var realCount = [];
    var option = {
        title: {
            text: '实时应收实收分析',
            left: 'center',
            textStyle: {
                width: "100%",
                color: "#6BEFFF ",
                fontSize: '$(window).width()*0.0078125'
            }

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            right: '0',
            orient: 'vertical',
            data: ['实收', '应收'],
            textStyle: {
                color: '#ccc',
                fontSize: 'e/1920*15'
            }

        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '7%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:Index,
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            name: '结算日期',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [6, 0, 0, 0],
                fontSize: '.2rem',
                color: "#6BEFFF "
            }
        },
        yAxis: {
            type: 'value',
            name: '金额',
            nameTextStyle: {
                color: '#6BEFFF '
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            axisTick: {
                show: false
            },
        },
        series: [{
                name: '实收',
                type: 'line',
                smooth: true,
                data: realCount,
                itemStyle: {
                    normal: {
                        color: '#D67A9A', //拐点颜色
                        borderColor: '#D67A9A', //拐点边框颜色
                        borderWidth: 2, //拐点边框大小
                    },
                    emphasis: {
                        color: '#6BEFFF ' //hover拐点颜色定义
                    }
                },
            },
            {
                name: '应收',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#00FF00',
                        lineStyle: {
                            color: '#00FF00'
                        }
                    }
                },
                data: totalCount
            }
        ]
    };
    var myChart1 = echarts.init(document.getElementById('receive'));
    var e = document.body.clientWidth;
    function set1(){
        $.ajax({
        type: 'post',
        data:{
            level_area_name:'芜湖市',
            one_level_area_name:'芜湖县'
        },
        dataType: 'json',
        url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
        success:function(result){
            var hour=new Date();
            var h=hour.getHours()+1;
            Index=[];
            totalCount = [];
            realCount = [];
            $.each(result[0].data.slice(0,h),function(index,val){
                Index.push(index);
            })
            option.xAxis.data=Index;
            option.series[0].data=result[0].data.slice(0,h);;
            option.series[1].data=result[1].data1.slice(0,h);
            console.log("Index-------->",Index)
            myChart1.setOption(option)
        }
        })
    }
    set1();
    setInterval(        function(){
        if(new Date().getMinutes() == 01){
            set1();
            console.log("我被调用了")
        }
    },1000)

    $('.oute').on('click',function(){
        $(this).addClass('active1').siblings('a').removeClass('active1')
        $.ajax({
            type: 'post',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            dataType: 'json',
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                var a=result[0].data.slice(0,h);
                option.series[0].data=a;
                option.series[1].data=result[1].data1.slice(0,h);
                myChart1.setOption(option)
            }
            })
    })
    $('.inter').on('click',function(){
        $(this).addClass('active1').siblings('a').removeClass('active1')
        function set3(){
            $.ajax({
                type:'post',
                dataType:'json',
                url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadFactFeeAndReceivable',
                success:function(result){
                    var hour=new Date();
                    var h=hour.getHours()+1;
                    option.series[0].data=[]
                    option.series[1].data=[]
                    option.series[0].data=result[0].data.slice(0,h);
                    option.series[1].data=result[1].data1.slice(0,h);
                    console.log('a1',option.series[0].data)
                    console.log('a2',option.series[1].data)
                    myChart1.setOption(option)
                }
            })
        }
        set3();
        setInterval(function(){
            set3()
        },360000)
    })
    $('.all').on('click',function(){
        $(this).addClass('active1').siblings('a').removeClass('active1')
        var firstValue;
        var firstValue1;
        var secondValue;
        var secondValue1;
        var hour=new Date();
        var h=hour.getHours()+1;
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
            success:function(result){
                firstValue=result[0].data.slice(0,h);
                firstValue1=result[1].data1.slice(0,h);
            }
        })
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadFactFeeAndReceivable',
            success:function(result){
                secondValue=result[0].data.slice(0,h);
                secondValue1=result[1].data1.slice(0,h);
            }
        })
        var newArray=[]
        var newArray1=[]
        for(var i=0;i<firstValue.length;i++){
            newArray.push(firstValue[i]+secondValue[i]);
        }
        for(var i=0;i<firstValue1.length;i++){
            newArray1.push(firstValue1[i]+secondValue1[i])
        }
        option.series[0].data=newArray;
        option.series[1].data=newArray1;
        console.log(newArray)
        console.log(newArray1)
        myChart1.setOption(option)
    })
    window.addEventListener("resize", function() {
        myChart1.resize();
    })
})();


(function() {
    var payIndex = [];
    var payData = [];
    var myChart2 = echarts.init(document.getElementById('pay'));
    var e = document.body.clientWidth;
    var option = {
        xAxis: {
            type: 'category',
            data: payIndex,
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            name: '结算时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [7, 0, 0, 0],
                fontSize: '.2rem',
                color: "#6BEFFF "
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisLabel: {
                color: '#6BEFFF ',
                formatter: "{value}元"
            },
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0',
            right: '3%',
            bottom: '6%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
        },
        series: [{
            data: payData,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#D67A9A', //拐点颜色
                    borderColor: '#D67A9A', //拐点边框颜色
                    borderWidth: 2, //拐点边框大小
                    label: {
                        show: 'true',
                        color: '#fff',
                        position: 'top',
                        fontSize: '8'
                    }
                },
                emphasis: {
                    color: '#6BEFFF ' //hover拐点颜色定义
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#eb64fb'
                        },
                        {
                            offset: 1,
                            color: '#3fbbff0d'
                        }
                    ], false),
                }
            },
        }]
    };
    function set11(){
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                payIndex=[]
                payData=[]
                $.each(result[0].data.slice(0,h), function(index, val) {
                    payData.push(parseInt(val));
                    payIndex.push(parseInt(index));
                    option.series[0].data=payData;
                    option.xAxis.data=payIndex;
                    myChart2.setOption(option);
                })
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    }
    set11();
    setInterval(
        function(){
            if(new Date().getMinutes() == 01){
                set11();
                console.log("我被调用了")
            }
        },
        10000)
    window.addEventListener("resize", function() {
        myChart2.resize();
    })
    $(".left-1 .panel-right .panel22").on('click', function() {
        $(this).addClass('active1').siblings('a').removeClass('active1')
            payData = []
            payIndex = []
            $.ajax({
                type: 'post',
                async: true,
                dataType: 'json',
                data:{
                    level_area_name:'芜湖市',
                    one_level_area_name:'芜湖县'
                },
                url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
                success: function(result) {
                    var hour=new Date();
                    var h=hour.getHours()+1;
                    option.series[0].data = result[0].data.slice(0,h)
                    $.each(result[0].data.slice(0,h),function(index,val){
                        payIndex.push(index)
                    })
                    myChart2.setOption(option);
                },
                error: function(errMsg) {
                    alert('失败')
                }
            })
        })
    $(".panel-right .panel11").on('click', function() {
        $(this).addClass('active1').siblings('a').removeClass('active1')
        payData = []
        payIndex = []
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadFactFeeAndReceivable',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                option.series[0].data = result[0].data.slice(0,h)
                myChart2.setOption(option);
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    })

    $(".panel .panelTxt3").on('click', function() {
        $(this).addClass('active1').siblings('a').removeClass('active1')
        var value1;
        var value2;
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndReceivable',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                value1 = result[1].data1.slice(0,h);
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadFactFeeAndReceivable',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                value2 = result[0].data.slice(0,h)
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
        console.log('value1', value1)
        console.log('value2', value2)
        var value = new Array();
        for (var i = 0; i < value2.length; i++) {
            value.push(value1[i] + value2[i]);
        }
        option.series[0].data = value;
        myChart2.setOption(option)
    })
})();

(function() {
    var package = []
    var payIndex = []
    var aliPay = []
    var weixin = []
    var xianjin = []
    var myChart3 = echarts.init(document.getElementById('payline'));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['微信', '现金', '预支付', '支付宝'],
            itemWidth: 5,
            itemHeight: 5,
            textStyle: {
                color: '#6BEFFF ',
                fontSize: '$(window).width()*0.0078125'
            }
        },
        grid: {
            left: '3%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:payIndex,
            axisLabel: {
                color: '#6BEFFF '
            },
            name: '结算时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [7, 0, 0, 0],
                fontSize: '.1rem',
                color: "#6BEFFF "
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisTick: {
                show: false
            },
            name: '金额',
            nameTextStyle: {
                color: '#6BEFFF '
            },
            nameTextStyle: {
                padding: [0, 40, 0, 0]
            }
        },
        series: [
        {
            name: '微信',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            itemStyle: {
                    normal: {
                    color:'#F02FC2'},
            },
            data: weixin
        }, {
            name: '支付宝',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            itemStyle: {
                    normal: {
                    color:'#1C57CD'},
            },
            data: aliPay
        }, {
            name: '现金',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            itemStyle: {
                    normal: {
                    color:'#9B15A5'},
            },
            data: xianjin
        }, {
            name: '预支付',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#F7216B', 
                },
            },
            data: package
        }]
    };
    function set6(){
        $.ajax({
            type: 'post',
            async: true,
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            dataType: 'json',
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeHour',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                payIndex=[]
                console.log('res', result)
                $.each(result[0].money.slice(0,h), function(index, val) {
                    xianjin.push(parseInt(val));
                    payIndex.push(parseInt(index));
                    option.xAxis.data=payIndex
                    myChart3.setOption(option);
                });
                $.each(result[1].package.slice(0,h), function(index, val) {
                    package.push(parseInt(val));
                    myChart3.setOption(option);
                });
                $.each(result[2].ali.slice(0,h), function(index, val) {
                    aliPay.push(parseInt(val));
                    myChart3.setOption(option);
                });
                $.each(result[3].weixin.slice(0,h), function(index, val) {
                    weixin.push(parseInt(val));
                    myChart3.setOption(option);
                });
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    }
    set6();
    setInterval(        
        function(){
        if(new Date().getMinutes() == 01){
            set6();
            console.log("我被调用了")
        }
    },10000)
    myChart3.setOption(option);
    window.addEventListener("resize", function() {
        myChart3.resize();
    })
    $(".panel-right .panel111").on('click', function() {
        $(this).addClass('active1').siblings("a").removeClass("active1")
        console.log('1')
        function set7(){
            package = []
            payIndex = []
            aliPay = []
            weixin = []
            xianjin = []
            $.ajax({
                type: 'post',
                async: true,
                dataType: 'json',
                data:{
                    level_area_name:'芜湖市',
                    one_level_area_name:'芜湖县'
                },
                url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadManFee',
                success: function(result) {
                    var hour=new Date();
                    var h=hour.getHours()+1;
                    console.log('res', result)
                    option.series[3].data = result[1].package.slice(0,h)
                    option.series[1].data = result[2].ali.slice(0,h)
                    option.series[0].data = result[3].weixin.slice(0,h)
                    option.series[2].data = result[0].money.slice(0,h)
                    console.log('现金value', xianjin);
                    myChart3.setOption(option);
                    sessionStorage.setItem('pays', result)
                },
                error: function(errMsg) {
                    alert('失败')
                }
            })
        }
        set7();
        setInterval(set7(),10000)
    })
    $(".panel-right .panel222").on('click', function() {
        $(this).addClass('active1').siblings("a").removeClass("active1")
        package = []
        payIndex = []
        aliPay = []
        weixin = []
        xianjin = []
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeHour',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                console.log('res', result)
                option.series[3].data = result[1].package.slice(0,h)
                option.series[1].data = result[2].ali.slice(0,h)
                option.series[0].data = result[3].weixin.slice(0,h)
                option.series[2].data = result[0].money.slice(0,h)
                console.log('现金value', xianjin);
                myChart3.setOption(option);
                sessionStorage.setItem('pays1', result)
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    })

    $(".panel-right .pay-count").on('click', function() {
        var value = new Array();
        var arrOut=[]
        var arrIn=[]
        var moneyTotal=[]
        var weixinTotal=[]
        var aliTotal=[]
        var packageTotal=[]
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',

            url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadManFee',
            success: function(result) {
                arrIn=result
            },
        }),
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeHour',
            success: function(result1) {
                arrOut=result1
            },
        })
        console.log("arr",arrIn[0].money)
        for(let i=0;i<arrIn[0].money.length;i++){
            moneyTotal[i]=arrIn[0].money[i]+arrOut[0].money[i]
        }
        for(let i=0;i<arrIn[1].package.length;i++){
            packageTotal[i]=arrIn[1].package[i]+arrOut[1].package[i]
        }
        for(let i=0;i<arrIn[2].ali.length;i++){
            aliTotal[i]=arrIn[2].ali[i]+arrOut[2].ali[i]
        }
        for(let i=0;i<arrIn[3].weixin.length;i++){
            weixinTotal[i]=arrIn[3].weixin[i]+arrOut[3].weixin[i]
        }
        
        console.log("moneyTotal",moneyTotal)
         option.series[3].data = packageTotal
         option.series[1].data =  aliTotal
         option.series[0].data = weixinTotal
         option.series[2].data = moneyTotal
         console.log('现金value', xianjin);
        myChart3.setOption(option);
    })
})();


(function() {
    var option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0',
            right: '3%',
            bottom: '6%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [{
            // 使用类目，必须有data属性
            type: 'category',
            // 使用 data 中的数据设为刻度文字
            data: lists,
            // 刻度设置
            //文字
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#6BEFFF '
            },
            name: '停车场',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [4, 0, 0, 0],
                fontSize: '.2rem',
                color: "#6BEFFF "
            }
        }],
        // 控制y轴
        yAxis: [{
            // 使用数据的值设为刻度文字
            type: 'value',
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                show: false
            },
            //文字
            axisLabel: {
                color: '#6BEFFF ',
                formatter: "{value}元"
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
        }],
        series: [{
            // series配置
            // 颜色
            itemStyle: {
                // 提供的工具函数生成渐变颜色
                color: new echarts.graphic.LinearGradient(
                    // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                    0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00fffb'
                        }, // 0 起始颜色
                        {
                            offset: 1,
                            color: '#0061ce'
                        } // 1 结束颜色
                    ]
                ),
            },
            label: {
                show: 'true',
                color: '#E0B654',
                position: 'top',
                fontSize: '6'
            },
            // 图表数据名称
            name: '车场',
            // 图表类型
            type: 'bar',
            barWidth:'10%',
            // 柱子宽度
            barBorderRadius: 10,
            data: park,
        }]
    };
    var lists=[]
    var park=[]
    var park1=[]
    var list1=[]
    var myChart4 = echarts.init(document.getElementById('weekcount'))
    myChart4.setOption(option)
    window.addEventListener("resize", function() {
        myChart4.resize();
    })
    function set8(){
        $.ajax({
            type:'post',
            dataType:'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultParkingSevenDay',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                lists=[]
                park=[]
                park1=[]
                list1=[]
                console.log('result',result[0])
                for (var key in result[0]){
                    lists.push(key)
                    park.push(result[0][key])
                }
                console.log('park',park);
                option.series[0].data = park;
                option.xAxis[0].data = lists;
                // sessionStorage.setItem('park1',park)
                // sessionStorage.setItem('lists1',lists)
                myChart4.setOption(option)
            },
        })
    }
    set8()
    setInterval(
        function(){
            if(new Date().getMinutes() == 57){
                set8();
                console.log("我也被调用了")
            }
        }
    ,10000)
    $(".panel1 .bottom-left .income-inner").on('click',function(){
        park=[]
        lists=[]
        var barwid=10
        $(this).addClass('active1').siblings("a").removeClass("active1")
        console.log(1)
        $.ajax({
            type:'post',
            dataType:'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadSevenDay',
            success:function(result){
                console.log('result',result[0],result)
                for(var key in result[0]){
                    lists.push(key)
                    park.push(result[0][key])
                }
                if(result[0].value==null){
                    result[0]={路内:0}
                    park.push(result[0])
                }
                console.log('result',result[0],result)
                option.series[0].data = park;
                option.xAxis[0].data = lists;
                option.series[0].barWidth=barwid;
                myChart4.setOption(option)
            },
        })
    })
    $(".panel1 .bottom-left .income-outer").on('click',function(){
        park=[]
        lists=[]
        $(this).addClass('active1').siblings("a").removeClass("active1")
        $.ajax({
            type:'post',
            dataType:'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultParkingSevenDay',
            success:function(result){
                console.log('result',result[0])
                for (var key in result[0]){
                    lists.push(key)
                    park.push(result[0][key])
                }
                console.log('park',park);
                option.series[0].data = park;
                option.xAxis[0].data = lists;
                myChart4.setOption(option)
            },
        })
    })
    $('.panel1 .pay-count11').on('click',function(){
        $(this).addClass('active1').siblings("a").removeClass("active1")
         lists=[]
         park=[]
         park1=[]
         list1=[]
        $.ajax({
            type:'post',
            dataType:'json',
            async:false,
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultParkingSevenDay',
            success:function(result){
                console.log('result',result[0])
                for (var key in result[0]){
                    lists.push(key)
                    park.push(result[0][key])
                }
                myChart4.setOption(option)
            },
        })
        $.ajax({
            type:'post',
            dataType:'json',
            async:false,
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadSevenDay',
            success:function(result){
                console.log('result',result[0],result)
                for(var key in result[0]){
                    list1.push(key)
                    park1.push(result[0][key])
                }
                // if(result[0].value==null){
                //     result[0]={路内:0}
                //     park1.push(result[0])
                // }
                myChart4.setOption(option)
                console.log('result',result[0],result)
                // option.series[0].barWidth=barwid;
            },
        })
        var totalList1=list1.concat(lists)
        var totalParks1=park1.concat(park)
        console.log(totalList1)
        console.log(totalParks1)
        option.series[0].data = totalParks1;
        option.xAxis[0].data = totalList1;
        myChart4.setOption(option)
    })
})();


(function() {
    var myChart5 = echarts.init(document.getElementById('paypie'))
    var option = {
        color: ['#bf19ff', '#854cff', '#5f45ff', '#02cdff'],
        title: {
            text: "缴费方式占比分析",
            left: "center",
            top: '5',
            textStyle: {
                width: "100%",
                color: "#6BEFFF ",
                fontSize: '15'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
            left: 0,
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true,
            show: true,
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        legend: {
            top: 30,
            itemGap: 20,
            icon: "circle",
            left: 'center',
            data: ['微信', '支付宝', '现金', '预支付金额'],
            itemWidth: 10,
            textStyle: {
                color: "#6BEFFF "
            }
        },
        series: [{
            name: '支付占比',
            type: 'pie',
            radius: ["30%", '60%'],
            center: ['50%', '60%'],
            data: brower,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }
    var brower=[]
    function set13(){
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeCount',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                console.log(result)
                option.series[0].data = result
                myChart5.setOption(option);
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    }
    set13();
    setInterval(  function(){
        if(new Date().getMinutes() == 01){
            set13();
            console.log("我被调用了")
        }
    },10000)

    $(".panel-right .panel111").on('click', function() {
        $(this).addClass('active1').siblings("a").removeClass("active1")
        brower = []
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostAllType',
            success: function(result) {
                console.log(result)
                option.series[0].data = result
                sessionStorage.setItem("browser1",result)
                myChart5.setOption(option);
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    })
    $(".panel-right .panel222").on('click', function() {
        $(this).addClass('active1').siblings("a").removeClass("active1")
        brower = []
        $.ajax({
            type: 'post',
            async: true,
            dataType: 'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeCount',
            success: function(result) {
                console.log(result)
                option.series[0].data = result
                myChart5.setOption(option);
            },
            error: function(errMsg) {
                alert('失败')
            }
        })
    })
    $(".panel-right .weektotal").on("click",function(){
        var brower11=[]
        var brower22=[]
        $(this).addClass('active1').siblings("a").removeClass("active1")
        $.ajax({
            type: 'post',
            async:false,
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url: "http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultAllTypeCount",
            success: function(result) {
                $.each(result, function(index, item) {
                    console.log("item------------>",item)
                    brower11.push({
                        name: item.name,
                        value: item.value
                    });
                });
            },
        })
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            url: 'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostAllType',
            success: function(result) {
                $.each(result, function(index, item) {
                    console.log("item------------>",item)
                    brower22.push({
                        name: item.name,
                        value: item.value
                    });
                });
            },
        })
        var totalBrower=[];
        for(let i=0;i<brower11.length;i++){
            totalBrower.push({name:brower11[i].name,value:brower11[i].value+brower22[i].value})
        }
        console.log(totalBrower)
        option.series[0].data=totalBrower
        myChart5.setOption(option)
    })
    window.addEventListener("resize", function() {
        myChart5.resize();
    })
})();

(function() {
    var myChart6 = echarts.init(document.getElementById('orderline'))
    var pay = []
    var record = []
    var Index2=[]
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            itemSize:10,
            itemGap:5,
            right:'20%',
            feature: {
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
            }
        },
        legend: {
            data: ['金额', '订单'],
            textStyle: {
                color: '#ccc',
                fontSize: '$(window).width()*0.0078125'
            }
        },
        grid: {
            // 距离 上右下左 的距离
            left: '8%',
            right: '9%',
            bottom: '10%',
            top: '15%',
            // containLabel:true,
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [{
            type: 'category',
            data: Index2,
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            name: '结算时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [7, 0, 0, 0],
                fontSize: '.1rem',
                color: "#6BEFFF "
            }
        }],
        yAxis: [{
            type: 'value',
            name: '金额',
            nameTextStyle: {
                color: "#6BEFFF "
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisTick: {
                show: false
            },
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
                color: '#6BEFFF ',
                formatter:"{value}元"
            }
        }, {
            type: 'value',
            // min: 0,
            // max: 1500,
            // interval: 300,
            axisLabel: {
                color: '#6BEFFF ',
                formatter:"{value}个"
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show:false,
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
        }],
        series: [{
                name: '金额',
                type: 'bar',
                barWidth:10,
                data: pay,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#BD18FF', '#854cff', '#5f45ff', '#02cdff', '#314976', '#f9e264', '#f47a75', '#c23531', '#2f4554', '#BD18FF', '#854cff', '#5f45ff', '#02cdff', '#314976', '#f9e264', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#61a0a8'];
                            var index;
                            if (params.dataIndex >= colorList.length) {
                                index = params.dataIndex - colorList.length;
                                return colorList[index];
                            }
                            return colorList[params.dataIndex];
                        },
                        label: {
                            show: 'true',
                            color: '#E0B654',
                            position: 'top',
                            fontSize: '6'
                        }
                    },
                },
            },
            {
                name: '订单',
                type: 'line',
                smooth: true, //是否平滑曲线显示
                yAxisIndex: 1,
                data: record,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DEB654', //拐点颜色
                        borderWidth: 1 //拐点边框大小
                    },
                    emphasis: {
                        color: '#6BEFFF ' //hover拐点颜色定义
                    }
                },
            }
        ]
    };
    function setOrder(){
        $.ajax({
            type: 'post',
            dataType: 'json',
            data:{
                    level_area_name:'芜湖市',
                    one_level_area_name:'芜湖县'
            },
            url: 'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultFactFeeAndRecord',
            success: function(result) {
                var hour=new Date();
                var h=hour.getHours()+1;
                var Index2=[];
                var pay=[];
                var record=[];
                $.each(result[0].shishou.slice(0,h), function(index, item) {
                    pay.push(parseInt(item))
                    Index2.push(parseInt(index))
                    sessionStorage.setItem("realcome",result[0].shishou)
                })
                $.each(result[1].record.slice(0,h), function(index, val) {
                    record.push(parseInt(val))
                    sessionStorage.setItem("records",result[1].record)
                })
                option.xAxis[0].data=Index2;
                option.series[0].data=pay;
                option.series[1].data=record
                console.log('index2 --- >',Index2);
                console.log('pay',pay)
                myChart6.setOption(option)
            },
        })
    }
    setOrder();
    setInterval(  
        function(){
        if(new Date().getMinutes() == 01){
            setOrder();
        }
    },1000)
    $(".title1 .panel2222").on('click',function(){
        pay=[]
        record=[]
        $(this).addClass('active1').siblings("a").removeClass("active1")
        var payOuter=sessionStorage.getItem("realcome")
        var recordOuter=sessionStorage.getItem("records")
        option.series[0].data=payOuter.split(",")
        option.series[1].data=recordOuter.split(",")
        myChart6.setOption(option)
    })

    $(".title1 .panel1111").on('click',function(){
        pay=[]
        record=[]
        $(this).addClass('active1').siblings("a").removeClass("active1");
        $.ajax({
            type:'post',
            dataType:'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostToDayFeeAndRecord',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                $.each(result[1].shishou.slice(0,h), function(index, item) {
                    pay.push(parseInt(item))
                    option.series[0].data=pay
                    myChart6.setOption(option)
                    sessionStorage.setItem("realcome1",result[1].shishou)
                })
                $.each(result[0].record.slice(0,h), function(index, val) {
                    record.push(parseInt(val))
                    option.series[1].data=record
                    myChart6.setOption(option)
                    sessionStorage.setItem('records1',result[0].record)
                })
            }
        })
    })
    window.addEventListener("resize", function() {
    myChart6.resize();
    })
    $(".title1 .pay-count").on('click',function(){
        $(this).addClass('active1').siblings("a").removeClass("active1");
        pay=[]
        record=[]
        var pay1=sessionStorage.getItem("realcome").split(',')
        var pay2=sessionStorage.getItem("realcome1").split(',')
        var rec=sessionStorage.getItem("records").split(',')
        var rec1=sessionStorage.getItem("records1").split(',')
        var newPay=[]
        var newPay1=[]
        for(var i=0;i<pay1.length;i++){
            newPay.push(parseInt(pay1[i])+parseInt(pay2[i]));
        }
        for(var i=0;i<rec.length;i++){
            newPay1.push(parseInt(rec[i])+parseInt(rec1[i]));
        }
        console.log("totalPay------>",newPay)
        console.log("totalRec------>",newPay1)
        option.series[0].data=newPay
        option.series[1].data=newPay1
        myChart6.setOption(option)
    })
})();


(function() {
    var myChart7 = echarts.init(document.getElementById('bargin'))
    var realMoney=[]
    var barginMoney=[]
    var Index3=[]
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            icon: 'circle',
            data: ['减免金额', '实收金额'],
            textStyle: {
                color: '#6BEFFF ',
                fontSize: 12,
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#6BEFFF ',
                formatter: "{value}元"
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisTick: {
                show: false
            },
            // axisLine: {
            //     lineStyle: {
            //         color: "#6BEFFF "
            //     }
            // }
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#6BEFFF ',
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            name: '结算时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [7, 0, 0, 0],
                fontSize: '.2rem',
                color: "#6BEFFF "
            },
            data: Index3
        },
        series: [{
                name: '实收金额',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 0, color: '#E78DB9' },
                            { offset: 0.5, color: '#E55C9F' },
                            { offset: 1, color: '#DC227C' }
                        ]
                    ),
                },
                data: barginMoney
            },
            {
                name: '减免金额',
                type: 'bar',
                barWidth: 3,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00fffb'
                                }, // 0 起始颜色
                                {
                                    offset: 1,
                                    color: '#0061ce'
                                } // 1 结束颜色
                            ]
                        ),
                        label: {
                            show: 'true',
                            color: '#E0B654',
                            position: 'top',
                            fontSize: '6'
                        },
                        barBorderRadius: 10,
                    }
                },
                data:realMoney
            }
        ]
    };
    function setBargin(){
        $.ajax({
            type:'post',
            dataType:'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadReduce',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                Index3=[]
                realMoney=[]
                barginMoney=[]
                console.log("result",result)
                 $.each(result[0].roadincome.slice(0,h),function(index,val){
                     realMoney.push(parseInt(val))
                     Index3.push(parseInt(index))
                     option.series[1].data=realMoney
                     option.xAxis.data=Index3
                 })
                 $.each(result[1].roadrelief.slice(0,h),function(index,val){
                     barginMoney.push(parseInt(val))
                     option.series[0].data=barginMoney
                     myChart7.setOption(option)
                 })
            }
        })
    }
    setBargin();
    setInterval(
        function(){
            if(new Date().getMinutes() == 01){
                setBargin();
            }
        },
        10000)
    $(".out").on('click',function(){
        $(this).addClass('active1').siblings("a").removeClass("active1")
        console.log(1111111)
        barginMoney=[]
        realMoney=[]
        $.ajax({
            type:'post',
            dataType:'json',
            data:{
                level_area_name:'芜湖市',
                one_level_area_name:'芜湖县'
            },
            url:'http://screen.yichuangzhihui.com/out/road/finance/OutRoad/Default/PostOutRoadDefaultReduce',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                console.log("result",result)
                option.series[0].data=result[0].roadincome.slice(0,h)
                option.series[1].data=result[1].roadrelief.slice(0,h)
                myChart7.setOption(option)
            }
        })
    })
    $(".in").on('click',function(){
        $(this).addClass('active1').siblings("a").removeClass("active1")
        realMoney=[]
        barginMoney=[]
        $.ajax({
            type:'post',
            dataType:'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadReduce',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                 console.log("result",result)
                  $.each(result[0].roadincome.slice(0,h),function(index,val){
                      realMoney.push(parseInt(val))
                      option.series[0].data=realMoney
                      myChart7.setOption(option)
                  })
                  $.each(result[1].roadrelief.slice(0,h),function(index,val){
                      barginMoney.push(parseInt(val))
                      option.series[1].data=barginMoney
                      myChart7.setOption(option)
                  })
            }
        })
    })
    window.addEventListener("resize", function() {
        myChart7.resize();
    })
})();

(function() {
    var myChart8 = echarts.init(document.getElementById('entry'))
    var oweMoney=[]
    var oweRecord=[]
    var Index7=[]
    var option = {
        xAxis: {
            type: 'category',
            data:Index7,
            axisLabel: {
                color: '#6BEFFF ',
            },
            axisLine: {
                lineStyle: {
                    color: "#6BEFFF "
                }
            },
            name: '结算时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [7, 0, 0, 0],
                fontSize: '.2rem',
                color: "#6BEFFF "
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: '12%',
            left: '10%',
            right: '6%',
            bottom: '16%',
        },
        yAxis: [{
                type: 'value',
                name:'金额',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#6BEFFF "
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
                axisLabel: {
                    color: '#6BEFFF ',
                    formatter:"{value}元"
                },
                name: '停车金额',
                nameTextStyle: {
                    color: "#6BEFFF "
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            },
            {
                min:0,
                max:50,
                interval:10,
                type: 'value',
                name:'订单数',
                axisLabel: {
                    color: '#6BEFFF ',
                    formatter:"{value}个"
                },
                name: '欠费订单',
                nameTextStyle: {
                    color: "#6BEFFF "
                },
            }
        ],
        series: [{
                data:oweMoney,
                type: 'line',
                name: "停车金额",
                smooth: true, //是否平滑曲线显示
                itemStyle: {
                    normal: {
                        color: '#DEB654', //拐点颜色
                        borderWidth: 1 //拐点边框大小
                    },
                    emphasis: {
                        color: '#6BEFFF ' //hover拐点颜色定义
                    }
                },
                showAllSymbol: true,
                symbol: 'emptyCircle',
                itemStyle: {
                        normal: {
                        color:'#F02FC2'},
                },
            }, 
            {
                name: '欠费订单',
                type: 'bar',
                barWidth: '10',
                yAxisIndex:1,
                data: oweRecord,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#61a0a8', '#d48265', '#91c7ae'];
                            var index;
                            if (params.dataIndex >= colorList.length) {
                                index = params.dataIndex - colorList.length;
                                return colorList[index];
                            }
                            return colorList[params.dataIndex];
                        },
                        label: {
                            show: 'true',
                            color: '#E0B654',
                            position: 'top',
                            fontSize: '6'
                        }
                    },
                },
            }
        ]
    };
    function total(){
        $.ajax({
            type:'post',
            dataType:'json',
            url:'http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInRoadArrearage',
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                Index7=[]
                $.each(result[0].fee.slice(0,h),function(index,item){
                    oweMoney.push(parseInt(item))
                    Index7.push(parseInt(index))
                    option.xAxis.data=Index7
                })
                $.each(result[1].counts.slice(0,h),function(index,item){
                    oweRecord.push(parseInt(item))
                    myChart8.setOption(option)
                })
                console.log('result的结果是',result)
            }
        })
    }
    total();
    setInterval(
        function(){
            if(new Date().getMinutes() == 01){
                total();
                console.log("我被调用了")
            }
        }
    ,10000)
    window.addEventListener("resize", function() {
        myChart8.resize();
    })
})();

(function() {
    var data1=[]
    var data2=[]
    var Index8=[]
    var myChart9 = echarts.init(document.getElementById('owe'))
    var option = {
        title: {
            text: '收费录入分析',
            left: 'center',
            textStyle: {
                width: "100%",
                color: '#6BEFFF ',
                fontSize: '$(window).width()*0.0078125'
            }

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            right: '0',
            orient: 'vertical',
            data: ['收费', '录入'],
            textStyle: {
                color: '#ccc',
                fontSize: 'e/1920*15'
            }

        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '7%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:Index8,
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: '#6BEFFF '
                }
            },
            name: '结算日期',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [6, 0, 0, 0],
                fontSize: '.2rem',
                color: '#6BEFFF '
            }
        },
        yAxis: {
            type: 'value',
            name: '率',
            nameTextStyle: {
                color: '#6BEFFF '
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            axisLabel: {
                color: '#6BEFFF '
            },
            axisLine: {
                lineStyle: {
                    color: '#6BEFFF '
                }
            },
            axisTick: {
                show: false
            },
        },
        series: [{
                name: '收费',
                type: 'line',
                smooth: true,
                data: data1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#00d887',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
            },
            {
                name: '录入',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#7E74F4',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: data2
            }
        ]
    };

    function set8(){
        $.ajax({
            type:'post',
            dataType:'json',
            url:"http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostInputRate" ,
            success:function(result){
                var hour=new Date();
                var h=hour.getHours()+1;
                var Index8=[]
                $.each(result.intputrate.slice(0,h),function(index,val){
                    data1.push(val)
                    Index8.push(index)
                    option.xAxis.data=Index8;
                    myChart9.setOption(option)
                })
            }
        })
        $.ajax({
            type:'post',
            dataType:'json',
            url:"http://screen.yichuangzhihui.com/in/road/finance/wh/inRoad/PostPayRate",
            success:function(result){
                console.log(result);
                $.each(result.payrate,function(index,val){
                    data2.push(val)
                    myChart9.setOption(option)
                })
            }
        })
    }
    set8();
    setInterval(
        function(){
            if(new Date().getMinutes() == 00){
                set8();
                console.log("我被调用了sfasfsa")
            }
        },10000
    )
    window.addEventListener("resize", function() {
        myChart9.resize();
    })
})()