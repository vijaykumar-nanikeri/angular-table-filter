(function() {
	"use strict";

	var angularTableFilterApp = angular.module("angularTableFilterApp", ["ui.bootstrap"]);

	angularTableFilterApp.directive("angularTableFilterDir", function($compile) {
		return {
			restrict: "A",
			scope: {
				theadData: "=",
				initOrderBy: "=",
				tbodyOrderBy: "=",
				tbodyOrderByDir: "=",
				tbodyDataRef: "=",
				tbodyData: "="
			},
			link: function($scope, $element, $attrs) {
				var tpl = '';
				tpl += '<th';
					tpl += ' style="text-align: right;"';
					tpl += ' ng-repeat="thead in theadData">';
					tpl += '<span class="pull-left">{{ thead.name }}</span>';
					tpl += '<span';
						tpl += ' class="glyphicon glyphicon-triangle-bottom"';
						tpl += ' style="font-size: 70%; opacity: 0.75;"';
						tpl += ' ng-show="(thead.code === tbodyOrderBy) && !tbodyOrderByDir">';
					tpl += '</span>';
					tpl += '<span class="glyphicon glyphicon-triangle-top"';
						tpl += ' style="font-size: 70%; opacity: 0.75;"';
						tpl += ' ng-show="(thead.code === tbodyOrderBy) && tbodyOrderByDir">';
					tpl += '</span>';
					tpl += '<div';
					tpl += ' class="btn-group"';
					tpl += ' uib-dropdown';
					tpl += ' auto-close="outsideClick">';
						tpl += '<small';
						tpl += ' class="glyphicon glyphicon-filter cursor-pointer"';
						tpl += ' style="opacity: 0.75;"';
						tpl += ' uib-dropdown-toggle>';
						tpl += '</small>';
						tpl += '<div class="dropdown-menu pull-right" style="min-width: 200px;" uib-dropdown-menu>';
							tpl += '<div class="form-horizontal adv-filter-container">';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<div class="btn-group btn-group-justified btn-group-sm">';
											tpl += '<a';
												tpl += ' href="javascript:void(0);"';
												tpl += ' class="btn btn-default"';
												tpl += ' role="button"';
												tpl += ' ng-click="tbodyOrderByClk(thead.code, false)"';
												tpl += ' ng-class="{ \'active\': thead.code === tbodyOrderBy && !tbodyOrderByDir }">';
												tpl += '<span class="glyphicon glyphicon-sort-by-alphabet"></span>';
											tpl += '</a>';
											tpl += '<a';
												tpl += ' href="javascript:void(0);"';
												tpl += ' class="btn btn-default"';
												tpl += ' role="button"';
												tpl += ' ng-click="tbodyOrderByClk(thead.code, true)"';
												tpl += ' ng-class="{ \'active\': thead.code === tbodyOrderBy && tbodyOrderByDir }">';
												tpl += '<span class="glyphicon glyphicon-sort-by-alphabet-alt"></span>';
											tpl += '</a>';
										tpl += '</div>';
									tpl += '</div>';
								tpl += '</div>';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<hr class="no-margin" />';
									tpl += '</div>';
								tpl += '</div>';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<div class="input-group input-group-sm">';
											tpl += '<span class="input-group-addon">';
												tpl += '<span class="glyphicon glyphicon-search"></span>';
											tpl += '</span>';
											tpl += '<input';
												tpl += ' type="text"';
												tpl += ' class="form-control"';
												tpl += ' placeholder="Search in below list"';
												tpl += ' ng-model="thead.filterObj.tbodySearch" />';
										tpl += '</div>';
									tpl += '</div>';
								tpl += '</div>';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<hr class="no-margin" />';
									tpl += '</div>';
								tpl += '</div>';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<div class="list-group-container">';
											tpl += '<ul class="list-group">';
												tpl += '<li';
													tpl += ' class="list-group-item cursor-pointer"';
													tpl += ' ng-click="selectAll(thead)">';
													tpl += '<a class="small">';
														tpl += '<input type="checkbox"';
															tpl += ' class="cursor-pointer"';
															tpl += ' ng-show="!thead.filterObj.isSelectedAll" />';
														tpl += '<input type="checkbox"';
															tpl += ' class="cursor-pointer"';
															tpl += ' ng-show="thead.filterObj.isSelectedAll"';
															tpl += ' checked />';
														tpl += '<span style="margin-left: 5px;">';
															tpl += 'Select all';
														tpl += '</span>';
													tpl += '</a>';
												tpl += '</li>';
											tpl += '</ul>';
										tpl += '</div>';
									tpl += '</div>';
								tpl += '</div>';
								tpl += '<div class="form-group">';
									tpl += '<div class="col-sm-12">';
										tpl += '<div class="list-group-container">';
											tpl += '<ul class="list-group">';
												tpl += '<li';
													tpl += ' class="list-group-item cursor-pointer"';
													tpl += ' ng-repeat="tbody in thead.filterObj.tbodyUniqueDataAr | orderBy: \'code\' | filter: thead.filterObj.tbodySearch"';
													tpl += ' ng-click="selectSingle(thead, tbody)">';
													tpl += '<a class="small">';
														tpl += '<input';
															tpl += ' type="checkbox"';
															tpl += ' class="cursor-pointer"';
															tpl += ' ng-show="!tbody.isSelected" />';
														tpl += '<input';
															tpl += ' type="checkbox"';
															tpl += ' class="cursor-pointer"';
															tpl += ' ng-show="tbody.isSelected"';
															tpl += ' checked />';
														tpl += '<span style="margin-left: 5px;">';
															tpl += '{{ tbody.name }}';
														tpl += '</span>';
													tpl += '</a>';
												tpl += '</li>';
											tpl += '</ul>';
											// list-group
										tpl += '</div>';
										// list-group-container
									tpl += '</div>';
									// col-sm-12
								tpl += '</div>';
								// form-group
							tpl += '</div>';
							// dv-filter-container
						tpl += '</div>';
						// dropdown-menu
					tpl += '</div>';
					// btn-group filter-icon
				tpl += '</th>';

				// Compiling the HTML string >>
				var outputTpl = $compile(tpl)($scope);
				$element.replaceWith(outputTpl);
				// <<

				$scope.tbodyOrderBy = $scope.initOrderBy;
				$scope.tbodyOrderByDir = false;
				$scope.tbodyOrderByClk = function(code, isAsc) {
					$scope.tbodyOrderBy = code;
					$scope.tbodyOrderByDir = isAsc;
				};

				$scope.selectAll = function(thead) {
					thead.filterObj.isSelectedAll = !thead.filterObj.isSelectedAll;

					thead.filterObj.tbodyUniqueDataAr.forEach(function(obj) {
						obj.isSelected = thead.filterObj.isSelectedAll;
					});

					filterResults();
				};

				$scope.selectSingle = function(thead, tbody) {
					(tbody.isSelected = !tbody.isSelected);
					(thead.filterObj.isSelectedAll = (thead.filterObj.tbodyUniqueDataAr.length === selectedAr(thead.filterObj).length));
					filterResults();
				};

				function selectedAr(filterObj) {
					return filterObj.tbodyUniqueDataAr.filter(function(obj) {
						return (obj.isSelected === true);
					});
				}

				function valuesOfSelectedAr(inputAr) {
					return [].concat(inputAr.map(function(obj) {
						return obj.name;
					}));
				}

				function filterResults() {
					var tbodyData = $scope.tbodyDataRef.filter(function(tbodyObj) {
						var isSelected = true;

						$scope.theadData.forEach(function(theadObj) {
							if(selectedAr(theadObj.filterObj).length) {
								isSelected = (isSelected && (valuesOfSelectedAr(selectedAr(theadObj.filterObj)).indexOf(tbodyObj[theadObj.code]) !== -1));
							}
						});

						return isSelected;
					});

					$scope.tbodyData = [];
					angular.copy(tbodyData, $scope.tbodyData);
				}
			}
		};
	});
	
	angularTableFilterApp.controller("angularTableFilterCtrl", function($scope, $http) {
		// Objects decleration =>>
		// =======================
		function initObjs() {
			$scope.theadAr = [];

			$scope.tbodyRefAr = [];
			$scope.tbodyAr = [];
		}
		initObjs();
		// <<=

		// Rest calls for the page =>>
		// ===========================
		$http.get("model.json").success(function(responseData) {
			var jsonData = responseData[0];

			angular.copy(jsonData.theadAr, $scope.theadAr);

			angular.copy(jsonData.tbodyAr, $scope.tbodyRefAr);
			angular.copy(jsonData.tbodyAr, $scope.tbodyAr);

			$scope.theadAr.forEach(function(thead) {
				var distinctValsAr = getDistinctVals($scope.tbodyRefAr, thead.code);
				angular.copy(distinctValsAr, filterData($scope.theadAr, "code", thead.code)[0].filterObj.tbodyUniqueDataAr);
			}); 
		});
		// <<=

		// Behaviours of the page =>>
		// ==========================
		// Automated methods >>
		function filterData(inputAr, inputKey, inputVal) {
			if(inputAr !== undefined) {
				return inputAr.filter(function(obj) {
					return (obj[inputKey] === inputVal);
				});
			} else {
				return [];
			}
		};
		$scope.filterData = filterData;
		// <<

		function getDistinctVals(inputAr, key) {
			var checkAr = [];
			var outputAr = [];

			inputAr.forEach(function(obj) {
				if(checkAr.indexOf(obj[key]) === -1) {
					checkAr.push(obj[key]);

					outputAr.push({
						code: obj[key],
						name: obj[key],
						isSelected: true
					});
				}
			});

			return outputAr;
		}
		// <<=
	});
})();