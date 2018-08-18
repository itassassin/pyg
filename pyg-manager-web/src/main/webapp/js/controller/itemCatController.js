 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			//添加父id,这样就可以根据父id插入数据了
			$scope.entity.parentId = $scope.parentId;
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
		        	$scope.findCatListByParentId($scope.entity.parentId);
		        	//清空entity
					$scope.entity= {};
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
                    $scope.findCatListByParentId($scope.parentId);
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//查询数据列表,顶级父节点查询
	$scope.findCatListByParentId = function (parentId) {
        itemCatService.findCatList(parentId).success(function (data) {
			$scope.list = data;
        })
    }

    //定义对象,记录级别,默认为1
    //面包屑导航js
    //1，定义级别方法，判断目前3级菜单，到底在哪一级
    //2,定义查询方法，此方法记录每一个级别对象
    $scope.grade = 1;

	//定义的方法,点击下一级,级别加1
	$scope.setGrade = function (value) {
        $scope.grade = value;
    }

    //定义查询方法，此方法记录每一个级别对象
	$scope.selectList = function (entity) {
		//记录此节点id,作为添加细节点的父id
		$scope.parentId = entity.id;

		//判断级别,目前在那一级目录
		if($scope.grade ==1) {
			//定义两个对象,记录级别对象
			$scope.entity_1 = null;
			$scope.entity_2 = null;
		}else if($scope.grade ==2) {
            $scope.entity_1 = entity;
            $scope.entity_2 = null;
        }else if($scope.grade ==3) {
            $scope.entity_2 = entity;
		}
		//根据父id查询子节点
		$scope.findCatListByParentId(entity.id);
    }
});	
