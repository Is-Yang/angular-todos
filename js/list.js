var app = angular.module('listApp', ['ng-sortable']);

app.controller('listController', ['$scope', function ($scope) {

    $scope.items = [{
            content: '今天学习Angular',
            time: '2017-09-19'
        },
        {
            content: '明天学习JavaScript',
            time: '2017-09-19'
        },
        {
            content: '后天去欢乐谷玩耍',
            time: '2017-09-19'
        },
        {
            content: '大后天去同事家包饺子',
            time: '2017-09-19'
        },
        {
            content: '我不管，我最酷',
            time: '2017-09-20'
        },
        {
            content: 'isyang为什么那么帅',
            time: '2017-09-19'
        }
    ]

    // 表格操作
    $scope.table = {

        /* 上下拖动
         *  删除
         */
        sortItemConfig: {
            animation: 150,
            filter: '.js-remove',
            onFilter: function (evt) {
                evt.item.parentNode.removeChild(evt.item);
            }
        }
    }

    // 填写内容
    $scope.writerContent = "";

    // 当前时间，年-月-日
    var date = new Date();
    var currentTime = date.getFullYear() + '-' + changeTime(parseInt(date.getMonth() + 1)) + '-' + changeTime(date.getDate());

    /*弹窗操作
        增
        查
        改
    */
    $scope.showDialog = function (judge) {
        // 设置输入框聚焦
        $('#dialogBox').on('shown.bs.modal', function () {
            $("#writerContent").focus();
        })

        if (judge === -1) { //新增
            
            // 先清空，以免修改时留下了数据
            $scope.writerContent = "";
           
            // 确定提交
            $scope.courseWriteFn = function () {
                // 新增
                $scope.items.push({
                    content: $scope.writerContent,
                    time: currentTime
                });

                // 关闭窗口
                $("#dialogBox").modal('hide');
            }


        } else { // 修改

            // 加载上来显示修改信息  
            $scope.writerContent = this.items[judge].content;

            // 确定提交
            $scope.courseWriteFn = function () {
                // 修改
                $scope.items[judge].content = $scope.writerContent;
                $scope.items[judge].time = currentTime;

                // 关闭窗口
                $("#dialogBox").modal('hide');
            }

        }
    }

    // 监听输入框是否为空
    $scope.$watch("writerContent", function (newVal, oldVal) {
        $scope.isSubmit = !newVal;
    });

    // 例如当时间为9时，重新返回为09
    function changeTime(i) {
        if (i < 10 && i >= 0) {
            i = "0" + i;
        }
        return i;
    }


}]);
